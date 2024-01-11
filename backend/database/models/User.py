from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from ..config import Base
from . import Post

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    password = Column(String)
    google_id = Column(String, nullable=True)

    chats = relationship("Chat", back_populates="user")    
    posts = relationship("Post", back_populates="user")
    likes = relationship("Like", back_populates="user") 
    __table_args__ = (
        UniqueConstraint('email', 'phone', name='unique_email_phone'),
    )
    
    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}