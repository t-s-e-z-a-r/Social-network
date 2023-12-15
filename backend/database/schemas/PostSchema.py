from typing import List
from pydantic import BaseModel

class PostSchema(BaseModel):
    id: int
    title: str
    text: str
    user_first_name: str
    user_last_name: str

class ResponseSchema(BaseModel):
    posts: List[PostSchema]
