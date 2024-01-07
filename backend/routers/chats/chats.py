from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from services import get_current_user
from sqlalchemy.orm import Session
from database.models import Post, User, Like, Chat
from database.config import get_db
from services import row2dict
from sqlalchemy import exists, and_
import json
# from .tools import add_like, remove_like
router = APIRouter() 

@router.websocket("/ws/{connection_id}")
async def websocket_endpoint(websocket: WebSocket, connection_id: int, db: Session = Depends(get_db)):
    try:
        await websocket.accept()
        print(f"WebSocket connection established with connection_id: {connection_id}")

        while True:
            data = await websocket.receive_text()
            data_to_send = await chat_mapper(data, db, connection_id)
            response = f"Message received: {data}"
            print(response)
            await websocket.send_text(data_to_send)

    except WebSocketDisconnect as e:
        print(f"WebSocket disconnected with connection_id: {connection_id}, code: {e.code}")

def chat_read(db, connection_id):
    try:
        chat_history = db.query(Chat).filter(Chat.chat_id == connection_id).order_by(Chat.created_at).all()
        return chat_history
    except Exception as e:
        print(f"Error fetching chat history: {str(e)}")
        return []

def chat_add(data):
    pass        

def chat_update(data):
    pass

def chat_delete(data):
    pass

async def chat_mapper(data, db, connection_id):
    try:
        data_dict = json.loads(data)
        mapper = {
            "get": chat_read(db, connection_id),
            "add": chat_add,
            "update": chat_update,
            "delete": chat_delete
        }
        return mapper[data_dict["type"]]
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON data: {str(e)}")
        return None