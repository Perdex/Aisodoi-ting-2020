from typing import TypeVar, Dict, Generic

T = TypeVar("T")


class ObjectNotFoundException(Exception):

    def __init__(self, obj_id):
        super().__init__(f"No object found with ID {obj_id}")


class ObjManager(Generic[T]):

    def __init__(self):
        self.objs: Dict[int, T] = {}
        self.next_id = 0

    def add_obj(self, obj: T) -> int:
        obj_id = self.next_id
        self.objs[obj_id] = obj
        self.next_id += 1
        return obj_id

    def update_obj(self, obj_id: int, obj: T) -> None:
        if obj_id not in self.objs:
            raise ObjectNotFoundException
        self.objs[obj_id] = obj

    def get_obj(self, obj_id: int) -> T:
        if obj_id not in self.objs:
            raise ObjectNotFoundException
        return self.objs[obj_id]

    def delete_obj(self, obj_id: int) -> None:
        if obj_id not in self.objs:
            raise ObjectNotFoundException
        del self.objs[obj_id]
