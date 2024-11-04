from database.db import db


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    technologies = db.Column(db.String(200))
    description = db.Column(db.String(800))
    # Supervisor_id foreign key value
    supervisor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    def __repr__(self):
        return f'<Project {self.name}>'
