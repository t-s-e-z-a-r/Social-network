from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models.User import User
from database.config import get_db
from database.schemas.UserSchemas import CreateUserSchemas, LoginUserSchemas
from services import row2dict, hash_password, verify_password
from fastapi.responses import RedirectResponse
router = APIRouter()

@router.get("/")
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return {"message": users}

@router.get("/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    print(user_id)
    user = db.query(User).get(user_id)
    return {"message": f"Read user {row2dict(user)}"}
    # return {"message": f"Read user {CreateUserSchemas(user)}"}

@router.post("/registration")
def create_user(request_data: CreateUserSchemas, db: Session = Depends(get_db)):
    request_data.password = hash_password(request_data.password)
    user = User(**request_data.dict())
    db.add(user)
    db.commit()
    db.flush()
    return {"message": "User created successfully", "user_id": user.id}

@router.post("/login")
def create_user(request_data: LoginUserSchemas, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request_data.email).first()
    print(user.password)
    is_valid_user = verify_password(request_data.password, user.password)
    print(is_valid_user)
    if is_valid_user:
        return {"message": "User logined"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
