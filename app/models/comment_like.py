import datetime
from .db import db 

class CommentLike(db.Model):
    __tablename__ = "comment_likes"

    id = db.Column(db.Integer, primary_key = True, nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    display_name_id = db.Column(db.Integer, db.ForeignKey("display_names.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    # user = db.relationship("User", back_populates="comment_likes")
    comment = db.relationship("Comment", back_populates="comment_likes")
    display_name = db.relationship("DisplayName", back_populates="comment_likes")

    def to_dict(self):
        return {
            "id": self.id,
            "comment_id": self.comment_id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            # "user": self.user.to_dict(),
            "displayname": self.displayname.to_dict()
        }