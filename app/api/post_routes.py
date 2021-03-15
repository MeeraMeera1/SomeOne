from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.config import Config
from app.forms import CreatePostForm, CreateCommentForm 
from app.s3_helper import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.models import db, Post, Comment

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def get_posts():
    posts = Post.query.all()
    if posts[0]:
        return jsonify({"posts": [post.to_dict() for post in posts]})
    else:
        return {'posts': []}

