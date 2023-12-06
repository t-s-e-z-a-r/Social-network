from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models.User import User
from database.config import get_db
from services import row2dict, get_current_user
router = APIRouter()

@router.get("/")
def read_users(db: Session = Depends(get_db), get_current_user: str = Depends(get_current_user)):
    users = db.query(User).all()
    return {"message": users}

@router.get("/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    print(user_id)
    user = db.query(User).get(user_id)
    return {"message": f"Read user {row2dict(user)}"}
    # return {"message": f"Read user {CreateUserSchemas(user)}"}

