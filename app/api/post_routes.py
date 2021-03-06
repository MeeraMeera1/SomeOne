from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.config import Config
from app.forms import CreatePostForm, CreateCommentForm 
from app.s3_helper import (upload_file_to_s3, allowed_file, 
                            validation_errors_to_error_messages, 
                            get_unique_filename)
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

@post_routes.route('/create-post', methods=['POST'])
def create_post():
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post()
        form.populate_obj(post)
        db.session.add(post)
        db.session.commit()

        if 'images' in request.files:
            images = request.files.getlist('images')
            for image in images:
                if allowed_file(image.filename):
                    image.filename = get_unique_filename(image.filename)
                    image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                    image = Post(post_id=post.id, image_url=imgUrl)
                    db.session.add(image)
            db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@post_routes.route('/<int:post_id>', methods=["GET", "PUT", "DELETE"])
def specific_post(post_id):
    post = Post.query.get(post_id)
    if request.method == "GET":
        return post.to_dict()
    elif request.method == "PUT":
        form = CreatePostForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(post)
            db.session.commit()

            if 'images' in request.files:
                images = request.files.getlist('images')
                for image in images:
                    if allowed_file(image.filename):
                        image.filename = get_unique_filename(image.filename)
                        image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                        image = Post(post_id=post.id, image_url=imgUrl)
                        db.session.add(image)
                db.session.commit()
            return post.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(post)
        db.session.commit()
        return post.to_dict()
    return post.to_dict()

@post_routes.route('/<int:post_id>/comments', methods=["POST"])
def create_comment(post_id):
    post = Post.query.get(post_id)
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

