'''
Stores configuration.

Example:

database path
Redis URL
secret keys
mail config
'''
import os
from application.utils.constants import email_app_password, email_id

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Database configuration
    DATABASE_PATH = 'sqlite:///' + os.path.join(BASE_DIR, "instance", 'application.db')

    # flask config
    SECRET_KEY = 'secret_key'

    # Redis configuration
    REDIS_URL = 'redis://localhost:6379/0'

    # Celery
    CELERY_BROKER_URL = REDIS_URL

    CELERY_RESULT_BACKEND = REDIS_URL

    # Email
    MAIL_SERVER = "smtp.gmail.com"

    MAIL_PORT = 587

    MAIL_USE_TLS = True

    MAIL_USE_SSL = False

    MAIL_USERNAME = email_id

    MAIL_PASSWORD = email_app_password

    MAIL_DEFAULT_SENDER = email_id

    # REPORTS
    REPORT_FOLDER = os.path.join(
        BASE_DIR,
        "instance",
        "reports"
    )
    '''
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key for session management
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')

    # Mail configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.example.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    '''
