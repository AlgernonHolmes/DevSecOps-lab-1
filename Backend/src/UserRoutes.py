from flask import Blueprint, jsonify, request
from src.UserModel import User, db

bp = Blueprint('users', __name__)

# CRUD OPERATION ENDPOINTS

#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////GET OPERATIONS///////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'name': u.name,
        'email': u.email,
        'role': u.role,
        'department': u.department,
        'status': u.status
    } for u in users])

#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////POST OPERATIONS//////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        name=data['name'],
        email=data['email'],
        role=data.get('role', 'Employee'),
        department=data.get('department', 'General'),
        status=data.get('status', 'Active')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'id': new_user.id}), 201


#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////UPDATE OPERATIONS////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.role = data.get('role', user.role)
    user.department = data.get('department', user.department)
    user.status = data.get('status', user.status)

    db.session.commit()
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'department': user.department,
        'status': user.status
    })

#////////////////////////////////////////////////////
#////////////////////////////////////////////////////
#///////////////////DELETE OPERATIONS////////////////
#////////////////////////////////////////////////////
#////////////////////////////////////////////////////

@bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 204

def init_user_routes(app):
    app.register_blueprint(bp)
