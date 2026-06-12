# all  service utilities
import application.services.db_services as dbs
from werkzeug.security import generate_password_hash, check_password_hash
from application.utils.helpers import return_empty_JSON
from application.utils.constants import session_variables
from application.utils.auth_utils import get_session_data


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
    out = return_empty_JSON()
    email = registration_data["email"]
    username = registration_data["username"]
    existing_email = dbs.get_element("user", "email", email)
    
    if existing_email:
        out["message"] = "Email already exists"
        return out

    existing_username = dbs.get_element("user", "username", username)

    if existing_username:
        out["message"] = "Username already exists"
        return out

    user_id = dbs.add_row(
        "user",
        {
            "email": email,
            "username": username,
            "password_hash": registration_data["password"],
            "role": registration_data["role"],
            "role_id": None
        }
    )

    if not user_id:
        out["message"] = "Failed to create user"
        return out

    role_id = None

    if registration_data["role"] == "student":
        student = registration_data["student"]
        role_id = dbs.add_row(
            "student",
            {
                "user_id": user_id,
                "name": student["name"],
                "email": email,
                "degree": student["degree"],
                "department": student["department"],
                "year": student["year"],
                "graduation_batch": student["graduation_batch"],
                "gpa": student["gpa"],
                "resume_link": student["resume_link"],
                "status": "approved"
            }

        )

    elif registration_data["role"] == "company":
        company = registration_data["company"]
        role_id = dbs.add_row(
            "company",
            {
                "user_id": user_id,
                "company_name":company["company_name"],
                "logo": company["logo"],
                "description": company["description"],
                "website": company["website"],
                "email": email,
                "hr_contact_name": company["hr_contact_name"],
                "hr_contact_number": company["hr_contact_number"],
                "status": "registered"
            }
        )

    if not role_id:
        out["message"] = "Failed to create role record"
        return out

    dbs.modify_element('user', 'id', user_id, {'role_id': role_id})

    out["success"] = 1

    out["message"] = "Registration successful. Please login."

    return out

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

def change_password(data, session_data):
    '''
    data has structure {user_id: INT, old_password: STRING, new_password: STRING}
    '''
    out = return_empty_JSON()
    try:
        dbs.modify_element('user', 'id', session_data['user_id'], {'password_hash': data['new_password']})
        out['success'] = 1
        out['message'] = "Password changed successfully"
        out['data'] = {'user_id': session_data['user_id'], 'user_type': session_data['user_type']}
    except Exception as e:
        out['message'] = f"Error changing password, {str(e)}"
    return out

