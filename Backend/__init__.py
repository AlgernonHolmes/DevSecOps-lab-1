from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from werkzeug.security import check_password_hash
import re
import os

app = Flask(__name__)
CORS(app)


# Conexión a la base de datos
def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

# Crear tablas necesarias
def create_tables():
    conn = get_db_connection()
    # Tabla para usuarios
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)"
    )
    # Tabla para proyectos
    conn.execute(
        "CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT, technologies TEXT, description TEXT, supervisor TEXT)"
    )
    conn.commit()
    conn.close()

def generate_endpoints_file():
    # Ruta completa al archivo endpoints.txt
    file_path = os.path.join(os.path.dirname(__file__), "endpoints.txt")
    print(f"Generating endpoints.txt at {file_path}")
    
    # Crear el archivo en la ubicación esperada
    with open(file_path, "w") as file:
        seen = set()  # Evitar duplicados
        for rule in app.url_map.iter_rules():
            # Ignorar rutas de Flask internas (como /static/<path:filename>)
            if "static" in rule.rule:
                continue

            # Generar la URL completa del endpoint
            url = f"http://0.0.0.0:5000{rule.rule}"

            # Reemplazar parámetros dinámicos por valores de ejemplo usando regex
            url = re.sub(r"<.*?>", "1", url)  # Reemplazar cualquier parámetro por '1'

            # Agregar la URL al archivo si no es duplicada
            if url not in seen:
                file.write(f"{url}\n")
                seen.add(url)



# Endpoint para crear un nuevo usuario
@app.route("/create_user", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)", (email, password)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "User created successfully!"}), 201

# Endpoint para login de usuario
@app.route("/login", methods=["POST"])
def login():
    # Obtener datos del cuerpo de la solicitud
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    # Conectar a la base de datos y buscar usuario
    conn = get_db_connection()
    query = "SELECT * FROM users WHERE email = ?"
    user = conn.execute(query, (email,)).fetchone()
    conn.close()

    # Verificar si el usuario existe y la contraseña coincide
    if user and check_password_hash(user["password"], password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials."}), 401

# Endpoint para crear un nuevo proyecto
@app.route("/projects", methods=["POST"])
def create_project():
    data = request.json
    name = data.get("name")
    technologies = data.get("technologies")
    description = data.get("description")
    supervisor = data.get("supervisor")

    if not name or not technologies or not description or not supervisor:
        return jsonify({"message": "All fields are required"}), 400

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO projects (name, technologies, description, supervisor) VALUES (?, ?, ?, ?)",
        (name, technologies, description, supervisor)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Project created successfully!"}), 201

# Endpoint para listar todos los proyectos
@app.route("/projects", methods=["GET"])
def get_projects():
    conn = get_db_connection()
    projects = conn.execute("SELECT * FROM projects").fetchall()
    conn.close()
    
    projects_list = [dict(row) for row in projects]
    return jsonify(projects_list), 200

# Endpoint para actualizar un proyecto
@app.route("/projects/<int:project_id>", methods=["PUT"])
def update_project(project_id):
    data = request.json
    name = data.get("name")
    technologies = data.get("technologies")
    description = data.get("description")
    supervisor = data.get("supervisor")

    if not name or not technologies or not description or not supervisor:
        return jsonify({"message": "All fields are required"}), 400

    conn = get_db_connection()
    conn.execute(
        "UPDATE projects SET name = ?, technologies = ?, description = ?, supervisor = ? WHERE id = ?",
        (name, technologies, description, supervisor, project_id)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Project updated successfully!"}), 200

# Endpoint para eliminar un proyecto
@app.route("/projects/<int:project_id>", methods=["DELETE"])
def delete_project(project_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM projects WHERE id = ?", (project_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Project deleted successfully!"}), 200


create_tables()
generate_endpoints_file()


if __name__ == "__main__":
    app.run(debug=False)
