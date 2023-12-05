# database\schemas\UserSchemas.py
from pydantic import BaseModel

class CreateUserSchemas(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    password: str

class LoginUserSchemas(BaseModel):
    email: str
    password: str