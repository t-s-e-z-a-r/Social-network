from fastapi import APIRouter
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models.User import User
from database.config import get_db
from database.schemas.UserSchemas import CreateUserSchemas, LoginUserSchemas
from services import row2dict, hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/login")
def login_user(request_data: LoginUserSchemas, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    is_valid_user = verify_password(request_data.password, user.password)
    if not is_valid_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"user_id": user.id})
    return {
        "token": token,
        "tokenType": "Bearer"    
        }

@router.post("/registration")
def create_user(request_data: CreateUserSchemas, db: Session = Depends(get_db)):
    request_data.password = hash_password(request_data.password)
    user = User(**request_data.dict())
    db.add(user)
    db.commit()
    db.flush()
    return {"message": "User created successfully", "user_id": user.id}



