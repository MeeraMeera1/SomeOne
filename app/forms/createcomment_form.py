from flask_wtf import FlaskForm 
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired 

class CreateCommentForm(FlaskForm):
    comment = TextAreaField("comment", validators=[DataRequired()])
    display_name_id = IntegerField("displayname", validators=[DataRequired()])
    post_id = IntegerField("postId", validators=[DataRequired()])
    comment_id = IntegerField("commentId", validators=[DataRequired()])