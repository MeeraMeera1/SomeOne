from .db import db
import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.Text)
    imgUrl = db.Column(db.String(2083))
    display_name_id = db.Column(db.Integer, db.ForeignKey("display_names.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    display_name = db.relationship("DisplayName", foreign_keys=[display_name_id], back_populates="post")
    comments = db.relationship("Comment", back_populates="post")
    likes = db.relationship("PostLike", back_populates="post")
    
    def to_dict(self):
        return {
            "id": self.id,
            "post": self.post,
            "imgUrl": self.imgUrl,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "displaynameId": self.display_name_id,
            "display_name": self.display_name.to_dict(),
            "comments": self.comments.to_dict(),
            "likes": self.likes.to_dict()
        }