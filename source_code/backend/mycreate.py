from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask import Blueprint
db = SQLAlchemy()
mail = Mail()
def create_app():
    app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:xrx683448@localhost:3306/myapp'
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.init_app(app)
    mail.init_app(app)
    return app
