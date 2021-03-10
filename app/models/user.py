from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

class UserProfile(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  display_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  birthday = db.Column(db.Date(), nullable = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  bio = db.Column(db.Text)
  user_type = db.Column(db.Boolean)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  sent_mess = db.Relationship("DirectMessage", foreign_keys="DirectMessage.sender_id", back_populates="sender")
  received_mess = db.Relationship("DirectMessage", foreign_keys="DirectMessage.receiver_id", back_populates="receiver")


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "display_name": self.display_name,
      "email": self.email,
      "birthday": self.birthday,
      "bio": self.bio,
      "created_at": self.created_at
    }