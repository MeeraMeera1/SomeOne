from .db import db
import datetime

class DisplayName(db.Model):
    __tablename__ = 'display_names'

    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(65), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", foreign_keys=[user_id, back_populates="displaynames"])

    def to_dict(self):
        return {
            "id": self.id,
            "display_name": self.display_name,
            "userId": self.user.to_dict()
        }