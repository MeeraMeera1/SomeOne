from flask import Blueprint, jsonify, request

from app.models import db, ChatRoom
from app.forms import ChatRoomForm
from app.api.auth_routes import validation_errors_to_error_messages

chat_room_routes = Blueprint("chatrooms", __name__)


@chat_room_routes.route("")
def get_chat_rooms():
    """
    Get all chat rooms 
    """
    chat_rooms = ChatRoom.query.all()
    return {"chatrooms": [chat_room.to_dict() for chat_room in chat_rooms]}


@chat_room_routes.route("", methods=["POST"])
def create_chatroom():
    """
    Create new chat room
    """
    form = ChatRoomForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_chatroom = ChatRoom(
            room_name=form.data["room_name"],
            room_topic=form.data["room_topic"],
            display_name_id=form.data["display_name_id"],
        )
        db.session.add(new_chatroom)
        db.session.commit()
        return new_chatroom.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    return {"errors": errors}


@chat_room_routes.route("/<roomId>", methods=["DELETE"])
def delete_chatroom(roomId):
    """
    Delete chat room
    """
    room_to_delete = ChatRoom.query.get(roomId)
    if room_to_delete:
        db.session.delete(room_to_delete)
        db.session.commit()
        return "Deleted"
    else:
        print(f"-------- no room found with id {roomId} -------- ")
        return {"errors": "No room found with given id"}