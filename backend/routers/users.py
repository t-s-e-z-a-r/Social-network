from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models import User
from database.config import get_db
from services import row2dict, get_current_user
router = APIRouter()

@router.get("/")
def read_users(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    users = db.query(User).all()
    return {"message": users}

@router.get("/myaccount")
def read_user(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    user = db.query(User).get(user_id)
    return row2dict(user)
    # return {"message": f"Read user {CreateUserSchemas(user)}"}

