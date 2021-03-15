from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.models import db, Comment, Post
from app.forms import CreateCommentForm
from app.s3_helper import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    if comments[0]:
        return jsonify({"comments": [comment.to_dict() for comment in comments]})
    else:
        return {'comments': []}

@comment_routes.route('/<int:comment_id>', methods=["PUT", "DELETE"])
def fix_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if request.method == "PUT":
        form = CreateCommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(comment)
            db.session.commit()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(comment)
        db.session.commit()
        return comment.to_dict()