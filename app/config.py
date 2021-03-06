import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True

  S3_BUCKET = os.environ.get("S3_BUCKET")
  S3_KEY = os.environ.get("S3_ACCESS_KEY")
  S3_SECRET = os.environ.get("S3_SECRET_ACCESS_KEY")
  S3_LOCATION = f"http://{S3_BUCKET}.s3.amazonaws.com/"

  TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
  TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
  TWILIO_API_KEY_SID = os.environ.get("TWILIO_API_KEY_SID")
  TWILIO_API_KEY_SECRET = os.environ.get("TWILIO_API_KEY_SECRET")
