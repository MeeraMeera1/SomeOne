import json 
from app.models import db, DisplayName

def seed_display_names():
    new_names = []
    with open('./app/seeds/displaynames.json') as seeds:
        data = json.load(seeds)
        for name in data:
            new_seed = Post(**name)
            new_names.append(new_seed)

    db.session.add_all(new_names)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE displaynames RESTART IDENTITY CASCADE;')
    db.session.commit()
