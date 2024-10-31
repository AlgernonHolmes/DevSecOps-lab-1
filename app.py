from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate  # Importa Migrate
from database.db import init_db, db  # Asegúrate de importar `db`
from src.ProjectRoutes import init_app  
from src.UserRoutes import init_user_routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Inicializar la base de datos y las migraciones
init_db(app)
migrate = Migrate(app, db)  # Configura Flask-Migrate

# Registra las rutas
init_app(app)
init_user_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
