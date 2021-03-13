from flask_wtf import FlaskForm
from wtforms import StringField, DateField, PasswordField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import UserProfile


def user_exists(form, field):
    print("Checking if user exits", field.data)
    display_name = field.data
    user = UserProfile.query.filter(UserProfile.display_name == display_name).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    display_name = StringField('displayname', validators=[DataRequired(), user_exists])
    email = StringField('email', validators=[DataRequired()])
    birthday = DateField('birthday', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    bio = TextAreaField('bio', validators=[DataRequired()])
    user_type = BooleanField('userType', validators=[DataRequired()])
