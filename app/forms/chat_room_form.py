from flask_wtf import FlaskForm 
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired 

class ChatRoomForm(FlaskForm):
    room_name = StringField('room_name', validators=[DataRequired()])
    room_topic = TextAreaField('room_topic', validators=[DataRequired()])
    display_name_id = IntegerField("displayname", validators=[DataRequired()])