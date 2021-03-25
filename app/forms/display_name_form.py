from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired 

class DisplayNameForm(FlaskForm):
    display_name = StringField('display_name', validators=[DataRequired()])