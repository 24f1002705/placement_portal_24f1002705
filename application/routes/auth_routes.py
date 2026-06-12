# import necessary modules 
from unittest import result

from flask import Blueprint, redirect, render_template, jsonify
import application.services.auth_services as a_s
import application.utils.auth_utils as a_u
from flask import request
from application.utils.helpers import return_empty_JSON, orchestrate_JSON 

# initialiationa blueprint object for auth routes
auth_bp = Blueprint('auth', __name__)

# 1. login processes
# _____________________________________________________________________________________________
# 1.1 - entry point for the login process
# redirected from root '/'
# Input: JSON
@auth_bp.route('/')
def auth_index():
    return redirect('/')

# 1.2 - for verification of credentials for login.
# Input: Credentials from login page
# Output: JSON {success: boolean, used_id: INT, user_type: STRING, message: STRING}
@auth_bp.route('/login', methods=['POST'])
def login():
    credentials = a_u.get_credentials(request) 
    user = a_s.verify_credentials(credentials) 
    result = return_empty_JSON()
    if user['exists']: 
        result = a_u.login_session(user)
    else:
        result['message'] = "Invalid email or password"
    return jsonify(result)

# 1.3 - for verification in case if user is already logged in and tries to access the login page again.
# Input:
# Output: JSON {success: boolean, user_id: INT, user_type: STRING, role_id: INT, message: STRING}
@auth_bp.route('/auth-verify', methods=["GET"])
def auth_verify():
    session_data = a_u.get_session_data()
    if not session_data['user_id']:
        result = return_empty_JSON()
        result['message'] = "No active session"
        return jsonify(result)
    result = a_s.verify_user(session_data)
    print(result)
    return jsonify(result)

# 2. Registration Processes
# _____________________________________________________________________________________________
# One function for registration for each kind: student, company
'''Receive registration credentials
Verify credentials do not clash with existing credentials
If credentials are valid, create new user in database and return success
else return failure with appropriate message
Input: Registration JSON 
Output: JSON {success: boolean, message: STRING} + redirect to login page if success'''

# 2.1 - registration
@auth_bp.route('/register/')
def register():
    # Process
    # 1. receive registration credentials from registration page
    # 2. Look up credentials in 'users' table in database to check for clashes
    # 3. If credentials are valid, create new user in database, else return failure
    # 4. Update the respective role table (student/company) with the details of the user
    # 5. return success with message "registration successful, please login"

    # request will have JSON as {login: {email, username, passsword}, user_type: STRING, user: {}, company:{}, student: {}}
    registration_data = a_u.get_registration_data(request)
    # returns JSON with structure {user_type: , user_details: {}}
    result = a_s.register_user(registration_data)
    # result has structure {success: boolean, message: STRING}
    return jsonify(result)

'''
# 2.2 - company registration
@auth_bp.route('/register/company')
def register_company():
    return 

# function moved to services
# verify credentials
@auth_bp.route('/register/verify')
def register_verify():
    return
'''

# _____________________________________________________________________________________________
# 3. logout
# clear the session cookie
@auth_bp.route('/logout')
def logout():
    return(a_u.logout())

# ____________________________________________________________________________________________
# 4. change password
# Input JSON {user_id: (from session cookie), old_password: STRING, new_password: STRING}
@auth_bp.route('/change-password', methods=['POST'])
def change_password():
    # Process
    # 1. receive user_id from session cookie and old_password, new_password from request JSON
    # 2. verify old_password is correct for the user_id
    # 3. if correct, update password to new_password and return success with message "password changed successfully"
    # 4. else return failure with message "incorrect old password"
    data = a_u.get_passwords(request)
    # data has structure {user_id: INT, old_password: STRING, new_password: STRING}
    session_data = a_u.get_current_user()
    result = return_empty_JSON()
    if not session_data['user_id']:
        result['message'] = "No active session"
        return jsonify(result)
    
    verified = a_s.verify_password(session_data['user_id'], data['old_password'])
    if verified:
        result = a_s.change_password(data, session_data)
    else:
        result['message'] = "Incorrect old password"
    # result has structure {success: boolean, message: STRING}
    return jsonify(result)

