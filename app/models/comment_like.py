import datetime
from .db import db 

class CommentLike(db.Model):
    __tablename__ = "comment_likes"

    id = db.Column(db.Integer, nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    user = db.relationship("User")
    comment = db.relationship("Comment", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "comment_id": self.comment_id,
            "user_id": self.user.to_dict()
        }