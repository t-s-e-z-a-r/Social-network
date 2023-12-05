from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_orders():
    return {"message": "Read all orders"}

@router.get("/{order_id}")
def read_order(order_id: int):
    return {"message": f"Read order {order_id}"}
