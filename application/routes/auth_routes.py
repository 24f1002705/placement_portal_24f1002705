# import necessary modules 
from flask import Blueprint, render_template

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
    return 

# 1.3 - for verification in case if user is already logged in and tries to access the login page again.
# Input: Parent session cookie
# Output: JSON {success: boolean, used_id: INT, user_type: STRING, message: STRING}
@auth_bp.route('/auth-verify')
def auth_verify():
    return 

# 2. Registration Processes
# _____________________________________________________________________________________________
# One function for registration for each kind: student, company
'''Receive registration credentials
Verify credentials do not clash with existing credentials
If credentials are valid, create new user in database and return success
else return failure with appropriate message
Input: Registration JSON 
Output: JSON {success: boolean, message: STRING} + redirect to login page if success'''

# 2.1 - student registration
@auth_bp.route('/register/student')
def register_student():
    return 

# 2.2 - company registration
@auth_bp.route('/register/company')
def register_company():
    return 
'''
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
    return

# ____________________________________________________________________________________________
# 4. change password
# Input JSON {user_id: (from session cookie), old_password: STRING, new_password: STRING}
@auth_bp.route('/change-password')
def change_password():
    return

