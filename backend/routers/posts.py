from fastapi import APIRouter, Depends
from services import get_current_user

router = APIRouter()

@router.get("/")
def read_orders(user_id: str = Depends(get_current_user)):
    return {"message": "Read all orders"}

@router.get("/{order_id}")
def read_order(order_id: int, user_id: str = Depends(get_current_user)):
    return {"message": f"Read order {order_id}"}
