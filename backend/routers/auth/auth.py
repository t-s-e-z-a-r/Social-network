#auth file
from fastapi import APIRouter
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models.User import User
from database.config import get_db
from database.schemas.UserSchemas import CreateUserSchemas, LoginUserSchemas
from services import row2dict, hash_password, verify_password, create_access_token
from authlib.integrations.starlette_client import OAuth, OAuthError
from .googleApi import CLIENT_ID, CLIENT_SECRET
from starlette.requests import Request
import jwt
from .schemas import GoogleLoginRequest, LoginResponse, UserResponse

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login_user(request_data: LoginUserSchemas, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    is_valid_user = verify_password(request_data.password, user.password)
    if not is_valid_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"user_id": user.id})
    user = db.query(User).get(user.id)
    return {
        "token": token,
        "user": user    
        }

@router.post("/google-login")
async def google_login_callback(request_data: GoogleLoginRequest):
    try:
        id_token = request_data.id_token
        print(f"Token {id_token}")
        user_info = jwt.decode(id_token, options={"verify_signature": False})
        print(f"User {user_info}")
        access_token = create_access_token(data={"user_id": user_info["sub"]})
        print(f"Token access {access_token}")
        user = UserResponse(
            id=user_info["sub"],
            first_name=user_info["given_name"],
            last_name=user_info["family_name"],
            email=user_info["email"]
        )
        print(f"User schema {user}")
        return {
            "token": access_token, 
            "user": user
            }

    except Exception as e:
        print(e)
        # raise HTTPException(status_code=401, detail="Google authentication failed")


@router.post("/registration")
def create_user(request_data: CreateUserSchemas, db: Session = Depends(get_db)):
    request_data.password = hash_password(request_data.password)
    user = User(**request_data.dict())
    db.add(user)
    db.commit()
    db.flush()
    return {"message": "User created successfully", "user_id": user.id}


