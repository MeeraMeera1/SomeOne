import datetime
from .db import db 

class PostLike(db.Model):
    __tablename__ = "post_likes"

    id = db.Column(db.Integer, primary_key = True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    display_name_id = db.Column(db.Integer, db.ForeignKey("display_names.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    post = db.relationship("Post", foreign_keys=[post_id], back_populates="likes")
    display_name = db.relationship("DisplayName", foreign_keys=[display_name_id], back_populates="post_likes")
    
    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "display_name_id": self.display_name_id,
            "display_name": self.display_name.to_dict()
        }