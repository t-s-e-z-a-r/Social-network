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
    
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    id: str | None = None