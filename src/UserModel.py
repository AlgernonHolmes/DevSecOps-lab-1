# src/UserModel.py
from database.db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(50))  # e.g., 'Manager', 'Developer'
    department = db.Column(db.String(50))  # e.g., 'Engineering', 'Marketing'
    status = db.Column(db.String(20), default="Active")  # e.g., 'Active', 'Inactive'

    def __repr__(self):
        return f'<User {self.name}>'
