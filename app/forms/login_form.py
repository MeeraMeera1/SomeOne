from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import UserProfile


def user_exists(form, field):
    print("Checking if user exists", field.data)
    display_name = field.data
    user = UserProfile.query.filter(UserProfile.display_name == display_name).first()
    if not user:
        raise ValidationError("Email provided not found.")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    display_name = form.data['displayname']
    user = UserProfile.query.filter(UserProfile.display_name == display_name).first()
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    display_name = StringField('displayname', validators=[DataRequired(), user_exists])
    password = PasswordField('password', validators=[
                           DataRequired(), password_matches])
