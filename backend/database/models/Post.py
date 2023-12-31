from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..config import Base

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    title = Column(String)
    text = Column(String)

    user = relationship("User", back_populates="posts")
    likes = relationship("Like", back_populates="post")

    
    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}