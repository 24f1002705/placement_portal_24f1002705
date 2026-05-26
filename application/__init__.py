# Agglomerate all resources and packages to return an app instance to app.py to start the server
from flask import Flask
from application.routes.auth_routes import auth_bp
from application.routes.admin_routes import admin_bp
from application.routes.company_routes import company_bp
from application.routes.student_routes import student_bp

# creates a configured flask app instance
def create_app():
    # Create flask app instance
    app = Flask(__name__)

    # load config

    # register routes
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(company_bp, url_prefix='/api/company')
    app.register_blueprint(student_bp, url_prefix='/api/student')

    # initialize Cache 

    # return app
    return app
