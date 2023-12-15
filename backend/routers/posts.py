from fastapi import APIRouter, Depends
from services import get_current_user
from sqlalchemy.orm import Session
from database.models import Post, User
from database.config import get_db
from services import row2dict
from database.schemas import ResponseSchema

router = APIRouter()

@router.get("/")
def read_posts(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    posts = db.query(Post.id, Post.title, Post.text, User.first_name, User.last_name ).filter(Post.user_id == User.id).all()
    print(f"Posts: {posts}")
    posts_dict = [row2dict(post) for post in posts]
    print(f"Dicts: {posts_dict}")
    # posts_mapped = [
    #     ResponseSchema(
    #         id=post['id'],
    #         title=post['title'],
    #         text=post['text'],
    #         user_first_name=post['user_first_name'],
    #         user_last_name=post['user_last_name']
    #     ) for post in posts_dict
    # ]
    return posts_dict

@router.get("/{post_id}")
def read_post(post_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return {"message": f"Read post {post_id}"}

@router.post("/")
def add_post(request_data: dict, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    print(f"Data: {request_data}")
    post = Post(**request_data, user_id=user_id)
    db.add(post)
    db.commit()
    db.flush()
    print(f"Posts: {post}")
    return {"message": "Created post"}
