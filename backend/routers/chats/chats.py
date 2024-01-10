from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from services import get_current_user
from sqlalchemy.orm import Session
from database.models import Post, User, Like, Chat
from database.config import get_db
from services import row2dict
from sqlalchemy import exists, and_
import json
from .Websocket import ConnectionManager
# from .tools import add_like, remove_like
router = APIRouter() 

manager = ConnectionManager()

@router.websocket("/ws/{connection_id}")
async def websocket_endpoint(websocket: WebSocket, connection_id: str, db: Session = Depends(get_db)):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            data_to_send = await chat_mapper(data, db, connection_id)
            data_to_send_json = json.dumps(data_to_send)
            # await manager.send_personal_message(data_to_send_json)
            await manager.broadcast(data_to_send_json)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(json.dumps({"data":"User left"}))

def chat_read(db, data, connection_id):
    try:
        chat_history = db.query(Chat).filter(Chat.chat_id == connection_id).order_by(Chat.created_at).all()
        chat_history_parsed = [i.as_dict() for i in chat_history]
        return {
            "type": "history",
            "data": chat_history_parsed
            }
    except Exception as e:
        print(f"Error fetching chat history: {str(e)}")
        return []
    
def chat_add(db, data, connection_id):
    print("Trug 2")
    try:
        new_message = Chat(sender_id = str(data["sender"]), text = str(data["text"]), chat_id = connection_id)
        db.add(new_message)
        db.commit()
        db.flush()
        return {
            "type": "new",
            "data": new_message.as_dict()
            }
    except Exception as e:
        print(f"Error adding message: {str(e)}")     
        return {}  

def chat_update(data):
    pass

def chat_delete(data):
    pass

async def chat_mapper(data, db, connection_id):
    try:
        data_dict = json.loads(data)
        print(f"Message type: {data_dict['type']}")
        mapper = {
            "get": chat_read,
            "add": chat_add,
            "update": chat_update,
            "delete": chat_delete
        }

        result = mapper[data_dict["type"]](db, data_dict, connection_id)
        return result
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON data: {str(e)}")
        return None
