from flask import Blueprint, jsonify
from app.models import db, DisplayName
from app.forms import DisplayNameForm

display_name_routes = Blueprint("displaynames", __name__)

@display_name_routes.route("")
def get_displaynames():
    """
    Get all display names
    """
    display_names = DisplayName.query.all()
    return {"displaynames": [display_name.to_dict() for display_name in display_names]}
    
