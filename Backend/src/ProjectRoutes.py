from flask import Blueprint, jsonify, request
from src.ProjectModel import Project, db

bp = Blueprint('projects', __name__)

# CRUD OPERATION ENDPOINTS

#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////GET OPERATIONS///////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'technologies': p.technologies,
        'supervisor_id': p.supervisor_id,
        'description': p.description
    } for p in projects])

#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////POST OPERATIONS//////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    new_project = Project(
        name=data['name'],
        technologies=data.get('technologies', ''),
        supervisor_id=data.get('supervisor_id'),  
        description=data.get('description', '')
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({'id': new_project.id}), 201


#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////UPDATE OPERATIONS////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.get_json()
    project = Project.query.get_or_404(project_id)

    project.name = data.get('name', project.name)
    project.technologies = data.get('technologies', project.technologies)
    project.supervisor_id = data.get('supervisor_id', project.supervisor_id)
    project.description = data.get('description', project.description)

    db.session.commit()
    return jsonify({
        'id': project.id,
        'name': project.name,
        'technologies': project.technologies,
        'supervisor_id': project.supervisor_id,
        'description': project.description
    })

#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////DELETE OPERATIONS////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Project deleted successfully'}), 204


def init_app(app):
    app.register_blueprint(bp)
