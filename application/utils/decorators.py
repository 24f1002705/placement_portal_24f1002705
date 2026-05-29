from functools import wraps
from flask import jsonify, session


def admin_required(f):

    @wraps(f)
    def wrapper(*args, **kwargs):

        if session.get("user_type") != "admin":

            return jsonify({
                "success": False,
                "message": "Unauthorized",
                "data": None
            }), 403

        return f(*args, **kwargs)

    return wrapper