from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired 

class ChatRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired()])