from flask import Flask
#from flask_cors import CORS
from database.db import init_db, db  # Asegúrate de importar `db`
from src.ProjectRoutes import init_app  
from src.UserRoutes import init_user_routes

# App initialization
app = Flask(__name__)
#CORS(app)

# Database initialization
init_db(app)

# Routes registration
init_app(app)
init_user_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
