from .db import db
import datetime

class DisplayName(db.Model):
    __tablename__ = 'display_names'

    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(65), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("UserProfile", foreign_keys=[user_id], back_populates="displaynames")
    comments = db.relationship("Comment", back_populates="display_name")
    post = db.relationship("Post", back_populates="display_name")
    comment_likes = db.relationship("CommentLike", back_populates="display_name")
    post_likes = db.relationship("PostLike", back_populates="display_name")
    chat = db.relationship("ChatRoom", back_populates="display_name")

    def to_dict(self):
        return {
            "id": self.id,
            "display_name": self.display_name,
            "userId": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict(),
            "comments": self.comments.to_dict(),
            "post": self.post.to_dict(),
            "comment_likes": self.comment_likes.to_dict(),
            "post_likes": self.post_likes.to_dict()
        }