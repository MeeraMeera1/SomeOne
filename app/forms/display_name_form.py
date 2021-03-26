from flask_wtf import FlaskForm 
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired 

class DisplayNameForm(FlaskForm):
    nameId = IntegerField('nameId')
    display_name = StringField('display_name', validators=[DataRequired()])