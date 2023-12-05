from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..config import Base
from . import Post

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String)
    email = Column(String)
    phone = Column(String)
    password = Column(String)

    # Define a one-to-many relationship with posts
    posts = relationship("Post", back_populates="user")