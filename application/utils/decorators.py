from functools import wraps
from flask import jsonify, session
from application.utils.auth_utils import get_current_user


def admin_required(f):

    @wraps(f)
    def wrapper(*args, **kwargs):
        user = get_current_user()
        if user["user_type"] != "admin":

            return jsonify({
                "success": False,
                "message": "Unauthorized",
                "data": None
            }), 403

        return f(*args, **kwargs)

    return wrapper

def company_required(f):

    @wraps(f)
    def wrapper(*args, **kwargs):
        user = get_current_user()
        if user['user_type'] != 'company':
            return jsonify({
                "success": False,
                "message": "Unauthorized",
                "data": None
            }), 403

        return f(*args, **kwargs)

    return wrapper


def student_required(f):

    @wraps(f)
    def wrapper(*args, **kwargs):
        user = get_current_user()
        if  user['user_type'] != 'student':
            return jsonify({
                "success": False,
                "message": "Unauthorized",
                "data": None
            }), 403

        return f(*args, **kwargs)

    return wrapper