from random import choice, random
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

names = ['Insomniac', 'Thunderbird', 'Cloudbreaker', 'Nightstrike', 'Nova', 'Firebird', 'Sidewinder']
rarity = [Rarity.common, Rarity.rare, Rarity.epic, Rarity.legendary]

for i in range(4):
    start_lat = 60.6382379 + random()*0.01 - 0.005
    end_lat = 60.6382379 + random()*0.01 - 0.005
    start_lon = 25.3179172 + random()*0.01 - 0.005
    end_lon = 25.3179172 + random()*0.01 - 0.005
    task = Task(
        name = names[i],
        start = f"{start_lat},{start_lon}",
        destination = f"{end_lat},{end_lon}",
        difficulty = Difficulty.easy,
        expiry = "lol",
        image = "but why",
        rarity = rarity[i] # choice([Rarity.common]*8 + [Rarity.uncommon]*6 + [Rarity.rare]*5 + [Rarity.epic]*2 + [Rarity.legendary])
    )
    TaskManager.add_obj(task)

@app.get(f"/tasks", response_model=TaskList)
async def get_tasks():
    return TaskList(objs=TaskManager.objs)


@app.post(f"/tasks", response_model=TaskDetail)
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
    if len(TaskManager.objs) < 3:
        start_lat = 60.6382379 + random()*0.01 - 0.005
        end_lat = 60.6382379 + random()*0.01 - 0.005
        start_lon = 25.3179172 + random()*0.01 - 0.005
        end_lon = 25.3179172 + random()*0.01 - 0.005
        task = Task(
            name = choice(names),
            start = f"{start_lat},{start_lon}",
            destination = f"{end_lat},{end_lon}",
            difficulty = Difficulty.easy,
            expiry = "lol",
            image = "but why",
            rarity = choice([Rarity.common]*8 + [Rarity.uncommon]*6 + [Rarity.rare]*5 + [Rarity.epic]*2 + [Rarity.legendary])
        )
        TaskManager.add_obj(task)
    return TaskDetail(
        obj_id=obj_id,
        obj=None,
    )
