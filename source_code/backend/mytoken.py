from models import *
from flask import request, jsonify, current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

SECRET_KEY = "xrxtest"
def create_token(username):
    s = Serializer(SECRET_KEY, expires_in=6000)
    token = s.dumps({"id": username})
    token = token.decode()
    return token


def verify_token(token):

    token1 = str(token)
    s = Serializer(SECRET_KEY)
    try:
        data = s.loads(token1)
    except Exception:
        return None
    user = User.query.get(data["id"])
    return user
