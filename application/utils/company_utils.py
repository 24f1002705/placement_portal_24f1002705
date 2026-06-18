from flask import session
from application.utils.auth_utils import get_current_user

def get_drive_data(request):
    data = request.json
    user = get_current_user()
    data['company_id'] = user['role_id']
    data['status'] = 'registered'
    return data

