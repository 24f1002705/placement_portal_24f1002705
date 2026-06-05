# all  service utilities
import application.services.db_services as dbs
from werkzeug.security import generate_password_hash, check_password_hash
from application.utils.helpers import return_empty_JSON
from application.utils.constants import session_variables


def verify_credentials(credentials):
    '''
    verify credentials for login
    '''
    user = {'exists': 0}

    user_from_db = dbs.get_element('user', 'email', credentials['email'])
    user_from_db = dict(user_from_db[0]) if user_from_db else None
    print(user_from_db)

    if user_from_db and (user_from_db['password_hash'] == credentials['password']):
        user['exists'] = 1
        user['user_id'] = user_from_db['id']
        user['user_type'] = user_from_db['role']
        user['role_id'] = user_from_db['role_id']
    
    return user

def verify_password(user_id, old_password):
    '''
    verify old password for password change
    '''
    user_from_db = dbs.get_element('user', 'id', user_id)
    user_from_db = user_from_db[0]

    if (user_from_db['password_hash'] == old_password):
        return True
    return False

def register_user(registration_data):
    '''
    registration_data has structure {login: {email, username, passsword}, user_type: STRING, user: {}, company:{}, student: {}}
    '''
    return

def verify_user(session_data):
    '''
    verify user_id from session cookie and return user details if valid, else return None
    '''
    result = return_empty_JSON()
    user = {}
    user_from_db = dbs.get_element('user', 'id', session_data['user_id'])
    user_from_db = user_from_db[0]
    if user_from_db:
        result['success'] = 1
        user['user_id'] = user_from_db['id']
        user['user_type'] = user_from_db['role']
        user['role_id'] = user_from_db['role_id']
        result['data'] = user
    return result

def change_password(data):
    '''
    data has structure {user_id: INT, old_password: STRING, new_password: STRING}
    '''
    return

