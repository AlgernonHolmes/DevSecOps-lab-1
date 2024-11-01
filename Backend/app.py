from flask import Flask
from database.db import init_db   
from src.ProjectRoutes import init_app  

# app initialization
app = Flask(__name__)

# database initialization
init_db(app)

# routes register
init_app(app)

if __name__ == '__main__':
    app.run(debug=True)
