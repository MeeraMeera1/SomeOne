from flask_wtf import FlaskForm 
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired 

class CreatePostForm(FlaskForm):
    post = TextAreaField("post", validators=[DataRequired()])
    imgUrl = StringField("imgUrl")
    tag_id = IntegerField("tag_id")
    