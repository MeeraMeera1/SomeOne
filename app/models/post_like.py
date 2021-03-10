import datetime
from .db import db 

class PostLike(db.Model):
    __tablename__ = "post_likes"

    id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    post = db.relationship("Post", foreign_keys=[post_id], back_populates="likes")
    user = db.relationship("User", foreign_keys=[user_id], back_populates="likes")
    
    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user.to_dict()
        }