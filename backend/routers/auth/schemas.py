from pydantic import BaseModel

class GoogleLoginRequest(BaseModel):
    id_token: str

class FacebookLoginRequest(BaseModel):
    user: dict
    
class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str | None = None
    
class LoginResponse(BaseModel):
    token: str
    user: UserResponse