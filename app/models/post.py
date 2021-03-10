from .db import db
import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id") nullable=False)
    post_text = db.Column(db.Text)
    imgUrl = db.Column(db.String(2083))
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", foreign_keys=[user_id], back_populates="posts")
    tag = db.relationship("Tag", foreign_keys=[tag_id], back_populates="posts")
    
    def to_dict(self):
        return {
            "id": self.id,
            "tag": self.tag
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }