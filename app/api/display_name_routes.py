from flask import Blueprint, jsonify
from app.models import db, DisplayName
from app.forms import DisplayNameForm
from app.api.auth_routes import validation_errors_to_error_messages

display_name_routes = Blueprint("displaynames", __name__)

@display_name_routes.route("")
def get_displaynames():
    """
    Get all display names
    """
    display_names = DisplayName.query.all()
    return {"displaynames": [display_name.to_dict() for display_name in display_names]}

@display_name_routes.route("", methods=["POST"])
def create_display_name():
    """
    Create display name
    """
    form = DisplayNameForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_display_name = DisplayName(
            display_name = form.data["display_name"], 
        )
        db.session.add(new_display_name)
        db.session.commit()
        return new_display_name.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    return {"errors": errors}




