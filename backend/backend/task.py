from enum import Enum
from typing import Optional, Dict

from pydantic import BaseModel

from backend.app import app
from backend.orm import ObjManager


class Rarity(str, Enum):
    common = "common"
    uncommon = "uncommon"
    rare = "rare"
    epic = "epic"
    legendary = "legendary"


class Difficulty(str, Enum):
    easy = "easy"
    normal = "normal"
    hard = "hard"


class Task(BaseModel):
    name: str
    image: str
    difficulty: Difficulty
    rarity: Rarity
    start: str
    destination: str
    expiry: str


class TaskDetail(BaseModel):
    obj_id: int
    obj: Optional[Task]


class TaskList(BaseModel):
    objs: Dict[int, Task]


TaskManager = ObjManager[Task]()


@app.get(f"/tasks", response_model=TaskList)
async def get_tasks():
    return TaskList(objs=TaskManager.objs)


@app.put(f"/tasks", response_model=TaskDetail)
async def create_task(obj: Task):
    obj_id = TaskManager.add_obj(obj)
    return TaskDetail(
        obj_id=obj_id,
        obj=obj,
    )


@app.get(f"/tasks/{{obj_id}}", response_model=TaskDetail)
async def get_task_detail(obj_id: int):
    obj = TaskManager.get_obj(obj_id)
    return TaskDetail(
        obj_id=obj_id,
        obj=obj,
    )


@app.put(f"/tasks/{{obj_id}}", response_model=TaskDetail)
async def update_task(obj_id: int, obj: Task):
    TaskManager.update_obj(obj_id, obj)
    return TaskDetail(
        obj_id=obj_id,
        obj=obj,
    )


@app.delete(f"/tasks/{{obj_id}}", response_model=TaskDetail)
async def delete_task(obj_id: int):
    TaskManager.delete_obj(obj_id)
    return TaskDetail(
        obj_id=obj_id,
        obj=None,
    )
