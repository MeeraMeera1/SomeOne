from werkzeug.security import generate_password_hash
from app.models import db, UserProfile

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = UserProfile(display_name='Demo', email='demo@aa.io', birthday='1998-10-09',
                password='password', bio='join the void', user_type=False)

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
