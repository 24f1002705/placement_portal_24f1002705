# all  service utilities

def verify_credentials(credentials):
    '''
    verify credentials for login
    '''
    return

def register_user(registration_data):
    '''
    registration_data has structure {login: {email, username, passsword}, user_type: STRING, user: {}, company:{}, student: {}}
    '''
    return

def login_session(user):
    '''
    user has structure {user_id: INT, user_type: STRING}
    set session cookie to log in the user
    '''
    return

def logout():
    '''
    clear the session cookie to log out the user
    '''
    return

def verify_user():
    '''
    verify user_id from session cookie and return user details if valid, else return None
    '''
    return

def change_password(data):
    '''
    data has structure {user_id: INT, old_password: STRING, new_password: STRING}
    '''
    return

