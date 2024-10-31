# src/ProjectModel.py
from database.db import db
from src.UserModel import User

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    technologies = db.Column(db.String(200))
    description = db.Column(db.String(800))

    # Nueva columna supervisor_id con clave foránea
    supervisor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    supervisor = db.relationship('User', backref=db.backref('projects', lazy=True))

    def __repr__(self):
        return f'<Project {self.name}>'
