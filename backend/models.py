from flask_sqlalchemy import SQLAlchemy
from flask_login import *

db = SQLAlchemy()

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  username = db.Column(db.String(), nullable=False, unique=True)
  email = db.Column(db.String(), nullable=False, unique=True)
  firstname = db.Column(db.String(), nullable=False)
  lastname = db.Column(db.String(), nullable=False)
  password = db.Column(db.String(), nullable=False)
  #scan = db.relationship("Scan", backref="user", cascade="all,delete")

