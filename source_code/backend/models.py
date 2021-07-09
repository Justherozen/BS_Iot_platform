from sqlalchemy import Integer
from mycreate import db
from sqlalchemy.dialects.mysql import INTEGER

UnsignedInt = Integer()
UnsignedInt = UnsignedInt.with_variant(INTEGER(unsigned=True), 'mysql')


class User(db.Model):
    __tablename__ = 'user_info'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    password = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(256), nullable=False)
    gender = db.Column(db.String(256), nullable=False)
    birthday = db.Column(db.String(256), nullable=False)

class Device(db.Model):
    __tablename__ = 'my_device'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    cid = db.Column(db.String(256), default='', nullable=False)
    name = db.Column(db.String(256), default='', nullable=False)
    cdes = db.Column(db.UnicodeText)
    create_time = db.Column(db.DateTime, nullable=False)
    user = db.Column(db.String(256), default='', nullable=False)


class Message(db.Model):
    __tablename__ = 'my_message'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    alert = db.Column(db.Integer, default=0, nullable=False)
    cid = db.Column(db.String(256), default='', nullable=False)
    info = db.Column(db.String(256), default='', nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    value = db.Column(db.Integer, default=0, nullable=False)
