from typing import TypeVar, Generic, Type

from fastapi import FastAPI
from pydantic import BaseModel

from backend.orm import ObjManager


T = TypeVar("T")


class CrudAPI(Generic[T]):
    manager: ObjManager[T]

    def __init__(self, list_model: Type[BaseModel], detail_model: Type[BaseModel]):
        self.list_model = list_model
        self.detail_model = detail_model
        self.manager = ObjManager[T]()

    def register(self, app: FastAPI, path: str):

        @app.get(f"/{path}", response_model=self.list_model)
        async def get_tasks():
            return {
                "tasks": list(self.manager.objs.values()),
            }

        @app.put(f"/{path}", response_model=self.detail_model)
        async def create_task(obj: T):
            obj_id = self.manager.add_obj(obj)
            return {
                "obj_id": obj_id,
                "obj": obj,
            }

        @app.get(f"/{path}/{{obj_id}}", response_model=self.detail_model)
        async def get_task_detail(obj_id: int):
            obj = self.manager.get_obj(obj_id)
            return {
                "obj_id": obj_id,
                "obj": obj,
            }

        @app.put(f"/{path}/{{obj_id}}", response_model=self.detail_model)
        async def update_task(obj_id: int, obj: T):
            self.manager.update_obj(obj_id, obj)
            return {
                "obj_id": obj_id,
                "obj": obj
            }

        @app.delete(f"/{path}/{{obj_id}}", response_model=self.detail_model)
        async def delete_task(obj_id: int):
            self.manager.delete_obj(obj_id)
            return {
                "obj_id": obj_id,
                "obj": None
            }
