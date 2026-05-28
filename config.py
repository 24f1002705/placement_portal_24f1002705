# file to store configuration variables for the application
'''
Stores configuration.

Example:

database path
Redis URL
secret keys
mail config
'''
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, "instance", 'app.db')

    SECRET_KEY = 'secret_key'
    '''
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key for session management
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')
    # Redis configuration
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
    # Mail configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.example.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    '''
