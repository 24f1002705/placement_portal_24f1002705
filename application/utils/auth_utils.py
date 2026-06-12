# import get_json from flask
from flask import request, session
from application.utils.constants import session_variables
from application.utils.helpers import return_empty_JSON

def get_credentials(request):
    # extract credentials from request JSON
    # return credentials as a dictionary
    data = request.get_json()
    credentials = {}
    credentials['email'] = data.get('email')
    credentials['password'] = data.get('password')
    return credentials

def login_session(user):
    '''
    Input:
    user['exists'] = 1
    user['user_id'] = user_from_db['id']
    user['user_type'] = user_from_db['role']
    user['role_id'] = user_from_db['role_id']
    
    Output:
    result['success'] = 1
    result["message"] = "Login Successful"
    result['data'] = {'user_id': user['user_id'], 'user_type': user['user_type']}'''
    user_out = {}
    
    for var in session_variables:
        session[var] = user[var]
        user_out[var] = user[var]

    result = return_empty_JSON()
    result['success'] = 1
    result["message"] = "Login Successful"
    result['data'] = user_out
    return result

def logout():
    '''
    clear the session cookie to log out the user
    '''
    session.clear()

    result = return_empty_JSON()
    result['success'] = 1
    result['message'] = "Logout Successful"
    return result

def get_registration_data(request):

    data = request.get_json()

    return {
        "role": data.get("role"),
        "email": data.get("email"),
        "username": data.get("username"),
        "password": data.get("password"),
        "student": data.get("student"),
        "company": data.get("company")
    }

def get_passwords(request):
    # extract password change data from request JSON
    # return password change data as a dictionary
    request.get_json()
    data = {}
    data['old_password'] = request.json.get('old_password')
    data['new_password'] = request.json.get('new_password')
    return data

def get_session_data():
    # extract user_id and user_type from session cookie
    # return session data as a dictionary
    session_data = {}
    for var in session_variables:
        session_data[var] = session.get(var)
    return session_data

def hash_password(password):
    # hash the password using a secure hashing algorithm
    # return the hashed password
    return

def get_current_user():
    # extract user_id and user_type from session cookie
    # return current user data as a dictionary
    user = {}
    session_data = get_session_data()
    if session_data['user_id'] and session_data['user_type']:
        user['user_id'] = session_data['user_id']
        user['user_type'] = session_data['user_type']
        user['role_id'] = session_data['role_id']
    else:
        user = None
    return user

