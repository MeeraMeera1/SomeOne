from .db import db
import datetime

class ChatRoom(db.Model):
    __tablename__ = 'chat_rooms'

    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(50), nullable=False)
    display_name_id = db.Column(db.Integer, db.ForeignKey("display_names.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    display_name = db.relationship("DisplayName", foreign_keys=[display_name_id], back_populates="chat")
    
    def to_dict(self):
        return {
            "id": self.id,
            "room_name": self.room_name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "displaynameId": self.display_name_id,
            "display_name": self.display_name.to_dict(),
        }