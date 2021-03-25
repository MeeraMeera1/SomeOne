"""empty message

Revision ID: 828c7b3d08f4
Revises: 424630761d67
Create Date: 2021-03-25 15:22:15.165325

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '828c7b3d08f4'
down_revision = '424630761d67'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chat_rooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_name', sa.String(length=50), nullable=False),
    sa.Column('chat_topic', sa.Text(), nullable=False),
    sa.Column('display_name_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['display_name_id'], ['display_names.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('tags')
    op.drop_constraint('posts_tag_id_fkey', 'posts', type_='foreignkey')
    op.drop_column('posts', 'tag_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('tag_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('posts_tag_id_fkey', 'posts', 'tags', ['tag_id'], ['id'])
    op.create_table('tags',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('tag', sa.VARCHAR(length=65), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='tags_pkey')
    )
    op.drop_table('chat_rooms')
    # ### end Alembic commands ###
