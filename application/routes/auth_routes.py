# import necessary modules 
from flask import Blueprint, render_template
import application.services.auth_services as a_s
import application.utils.auth_utils as a_u
from jsonify import jsonify
from flask import request

# initialiationa blueprint object for auth routes
auth_bp = Blueprint('auth', __name__)

# 1. login processes
# _____________________________________________________________________________________________
# 1.1 - entry point for the login process
# redirected from root '/'
# Input: JSON
@auth_bp.route('/')
def auth_index():
    return render_template('index.html')

# 1.2 - for verification of credentials for login.
# Input: Credentials from login page
# Output: JSON {success: boolean, used_id: INT, user_type: STRING, message: STRING}
@auth_bp.route('/login')
def login():
    # Process
    # 1. receive credentials from login page 
    # 2. Look up credentials in 'users' table in database
    # 3. If credentials are valid, return success with user_id, user_type and role_id
    # 4. else return failue with "invalid email or password"
    # 5. Then put the user_id, user_type and role_id in the session cookie
    # 6. redirect to dashboard page based on user_type (done by frontend)
    # 7. Output of this API will be what? 
    # JSON {success: boolean, user_id: INT, user_type: STRING, message: STRING}
    credentials = a_u.get_credentials(request) 
    result = a_s.verify_credentials(credentials) 
    # result has structure: {success: boolean, user: {user_id, user_type, role_id, message}, message: STRING}
    if result['success']: 
        a_u.login_session(result['user']) 
    
    return jsonify(result)

# 1.3 - for verification in case if user is already logged in and tries to access the login page again.
# Input:
# Output: JSON {success: boolean, user_id: INT, user_type: STRING, role_id: INT, message: STRING}
@auth_bp.route('/auth-verify')
def auth_verify():
    
    # Process
    # 1. Check if session cookie has user_id, user_type and role_id
    # 2. If session cookie is valid, return success with user_id, user_type and role_id
    # 3. else return failure with "user not logged in"
    session_data = a_u.get_session_data()
    # session_data has structure {user_id: INT, user_type: STRING, role_id: INT}
    result = a_s.verify_user(session_data)
    # result has structure: {success: boolean, message: STRING, user: {user_id: INT, user_type: STRING, role_id: INT}}
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
    return(a_s.logout_session())

# ____________________________________________________________________________________________
# 4. change password
# Input JSON {user_id: (from session cookie), old_password: STRING, new_password: STRING}
@auth_bp.route('/change-password')
def change_password():
    # Process
    # 1. receive user_id from session cookie and old_password, new_password from request JSON
    # 2. verify old_password is correct for the user_id
    # 3. if correct, update password to new_password and return success with message "password changed successfully"
    # 4. else return failure with message "incorrect old password"
    data = a_u.get_password_data(request)
    # data has structure {user_id: INT, old_password: STRING, new_password: STRING}
    result = a_s.change_user_password(data)
    # result has structure {success: boolean, message: STRING}
    return jsonify(result)

