from .db import db
import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    sender = db.relationship("User", foreign_keys=[sender_id], back_populates="sent_mess")
    receiver = db.relationship("User", foreign_keys=[receiver_id], back_populates="received_mess")

    def to_dict(self):
        return {
            "id": self.id,
            "sender": self.sender.to_simple_dict(),
            "receiver": self.receiver.to_simple_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }