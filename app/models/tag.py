from .db import db
import datetime

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(65), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    posts = db.relationship("Post",)

    def to_dict(self):
        return {
            "id": self.id,
            "tag": self.tag
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }