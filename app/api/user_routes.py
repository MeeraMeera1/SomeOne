from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import UserProfile

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    users = UserProfile.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = UserProfile.query.get(id)
    return user.to_dict()
