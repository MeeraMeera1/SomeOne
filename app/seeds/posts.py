import json 
from app.models import db, Post

def seed_posts():
    new_posts = []
    with open('./app/seeds/posts.json') as seeds:
        data = json.load(seeds)
        for post in data:
            new_seed = Post(**posts)
            new_posts.append(new_post)

    db.session.add_all(new_posts)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
