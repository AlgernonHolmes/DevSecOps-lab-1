from database.db import db

class Project(db.Model):

    # definition of the table name
    __tablename__ = 'projects'  

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    technologies = db.Column(db.String(200))
    supervisor = db.Column(db.String(100))
    description = db.Column(db.String(800))

    def __repr__(self):
        return f'<Project {self.name}>'