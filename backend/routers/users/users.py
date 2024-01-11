from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models import User
from database.config import get_db
from services import row2dict, get_current_user
from .schemas import UserResponse
router = APIRouter()

@router.get("/")
def read_users(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    # try:
        users = db.query(User).filter(User.id != user_id).all()
        return users
    # except Exception:
    #     return []
