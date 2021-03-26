import os
import click
from flask import Flask, render_template, request, session, redirect, abort
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask.cli import AppGroup
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

from .models import db, UserProfile
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.post_routes import post_routes

from .seeds import seed_commands

from .config import Config

twilio_client = Client()

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return UserProfile.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(display_name_routes, url_prefix='/api/displaynames')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any 
# request made over http is redirected to https.
# Well.........

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

chatrooms_cli = AppGroup('chatrooms', help='Manage your chat rooms.')
app.cli.add_command(chatrooms_cli)


@chatrooms_cli.command('list', help='list all chat rooms')
def list():
    conversations = twilio_client.conversations.conversations.list()
    for conversation in conversations:
        print(f'{conversation.friendly_name} ({conversation.sid})')

@chatrooms_cli.command('create', help='create a chat room')
@click.argument('name')
def create(name):
    conversation = None
    for conv in twilio_client.conversations.conversations.list():
        if conv.friendly_name == name:
            conversation = conv
            break
    if conversation is not None:
        print('Chat room already exists')
    else:
        twilio_client.conversations.conversations.create(friendly_name=name)

@chatrooms_cli.command('delete', help='delete a chat room')
@click.argument('name')
def delete(name):
    conversation = None
    for conv in twilio_client.conversations.conversations.list():
        if conv.friendly_name == name:
            conversation = conv
            break
    if conversation is None:
        print('Chat room not found')
    else:
        conversation.delete()

@app.route('/chatlogin', methods=['POST'])
def login():
    payload = request.get_json(force=True)
    display_name = payload.get('display_name')
    if not username:
        abort(401)

    # create the user (if it does not exist yet)
    participant_role_sid = None
    for role in twilio_client.conversations.roles.list():
        if role.friendly_name == 'participant':
            participant_role_sid = role.sid
    try:
        twilio_client.conversations.users.create(identity=display_name,
                                                 role_sid=participant_role_sid)
    except TwilioRestException as exc:
        if exc.status != 409:
            raise

    # add the user to all the conversations
    conversations = twilio_client.conversations.conversations.list()
    for conversation in conversations:
        try:
            conversation.participants.create(identity=username)
        except TwilioRestException as exc:
            if exc.status != 409:
                raise

    # generate an access token
    twilio_account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    twilio_api_key_sid = os.environ.get('TWILIO_API_KEY_SID')
    twilio_api_key_secret = os.environ.get('TWILIO_API_KEY_SECRET')
    service_sid = conversations[0].chat_service_sid
    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(ChatGrant(service_sid=service_sid))

    # send a response
    return {
        'chatrooms': [[conversation.friendly_name, conversation.sid]
                      for conversation in conversations],
        'token': token.to_jwt().decode(),
    }