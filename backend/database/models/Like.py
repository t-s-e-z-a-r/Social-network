from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..config import Base

class Like(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)
    post_id = Column(Integer, ForeignKey('posts.id'), index=True)

    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")
    
    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}