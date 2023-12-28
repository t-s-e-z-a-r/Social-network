from fastapi import APIRouter, Depends
from services import get_current_user
from sqlalchemy.orm import Session
from database.models import Post, User, Like
from database.config import get_db
from services import row2dict
from sqlalchemy import exists, and_
from .tools import add_like, remove_like
router = APIRouter()

@router.get("/")
def read_posts(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    # Use exists to check if the current user has liked a post
    liked_subquery = (
        exists().where((Like.user_id == user_id) & (Like.post_id == Post.id))
    )

    # Construct the main query, including the additional field 'liked'
    posts = (
        db.query(
            Post.id,
            Post.title,
            Post.text,
            User.first_name,
            User.last_name,
            liked_subquery.label('liked')
        )
        .join(User, Post.user_id == User.id)
        .all()
    )

    posts_dict = [row2dict(post) for post in posts]
    return posts_dict

@router.get("/{post_id}")
def read_post(post_id: int, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return {"message": f"Read post {post_id}"}

@router.post("/")
def add_post(request_data: dict, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    post = Post(**request_data, user_id=user_id)
    db.add(post)
    db.commit()
    db.flush()
    return {"message": "Created post"}

@router.put("/")
def update_post(request_data: dict, db: Session=Depends(get_db), user_id: str = Depends(get_current_user)):
    like = db.query(Like).filter(and_(Like.user_id == user_id, Like.post_id == request_data.get("id"))).first()
    print(f"LIke ------{like}")
    
    if request_data.get("liked") and like == None:
        add_like(db, request_data.get("id"), user_id)
    elif request_data.get("liked") == False and like != None:
        remove_like(db, like)
    
    post= db.query(Post).get(request_data.get('id'))
    for key, value in request_data.items():
        setattr(post, key, value)
    db.commit()
    db.flush()
    return post.as_dict()
