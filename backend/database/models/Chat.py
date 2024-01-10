from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from ..config import Base

class Chat(Base):
    __tablename__ = "chat"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey('users.id'), index=True)
    text = Column(String, nullable = False )
    chat_id = Column(String, nullable = False)
    created_at = Column(DateTime, default=func.now())
    
    user = relationship("User", back_populates="chats")
    
    def as_dict(self):
        result = {column.name: getattr(self, column.name) for column in self.__table__.columns}
        result['created_at'] = str(result['created_at'])
        return result