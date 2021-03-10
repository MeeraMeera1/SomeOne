import datetime
from .db import db 

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    display_name_id = db.Column(db.Integer, db.ForeignKey("display_names.id"), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    post = db.relationship("Post", back_populates="comments")
    display_name = db.relationship("DisplayName", back_populates="comments")
    
    def to_dict(self):
        return {
            "id": self.id,
            "post": self.post_id
            "display_name": self.display_name_id
            "comment": self.comment 
        }