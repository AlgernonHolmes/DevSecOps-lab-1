import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import psycopg2

load_dotenv()

db = SQLAlchemy()

def init_db(app):
    # CREDENTIALS IMPORTATION

    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_name = os.getenv('DB_NAME')

    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    with app.app_context():  
        db.create_all()

def get_db_connection():
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_name = os.getenv('DB_NAME')
    return psycopg2.connect(database=db_name, user=db_user, password=db_password, host=db_host)