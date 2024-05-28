from flask_sqlalchemy import SQLAlchemy
from flask_login import *
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  username = db.Column(db.String(), nullable=False, unique=True)
  email = db.Column(db.String(), nullable=False, unique=True)
  firstname = db.Column(db.String(), nullable=False)
  lastname = db.Column(db.String(), nullable=False)
  whatsapp_no = db.Column(db.Integer)
  password = db.Column(db.String(), nullable=False)

class Test(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String, unique=True, nullable=False)
  prescripcine = db.relationship("Prescripcine", backref="test")

class Medicine(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String, unique=True, nullable=False)
  prescripcine = db.relationship("Prescripcine", backref="medicine")

class Prescripcine(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
  medicine_id = db.Column(db.Integer,db.ForeignKey("medicine.id"))
  test_id = db.Column(db.Integer,db.ForeignKey("test.id"))
  frequency = db.Column(db.String)
  dosage = db.Column(db.String)
  duration = db.Column(db.String)
  date = db.Column(db.Date, default=datetime.today)
  timestamp = db.Column(db.DateTime(),nullable=False)