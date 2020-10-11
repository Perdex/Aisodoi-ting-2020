from typing import Optional, List

from fastapi import FastAPI
from pydantic import BaseModel

from backend.crud import CrudAPI
from backend.models import Task

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


class TaskDetail(BaseModel):
    obj_id: int
    obj: Optional[Task]


class TaskList(BaseModel):
    objs: List[Task]


task_api = CrudAPI[Task](
    list_model=TaskList,
    detail_model=TaskDetail,
)
task_api.register(app, "tasks")
