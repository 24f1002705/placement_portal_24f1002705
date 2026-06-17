from application.utils.auth_utils import get_current_user
import application.services.db_services as dbs
from application.utils.helpers import rows_to_dict, orchestrate_JSON

# In: company details from cookie
# out: {success, message, data: {application: ,current: , past: }}
def dashboard():
    # get company id from get current user
    user = get_current_user()
    company_id = user['role_id']

    data = {}
    lengths = {}

    # need to add an updater here to make sure drives are closed, or some sort of background task
    
    # get two sets of drives
    # 1. Applied i.e. registered
    data['applied'] = rows_to_dict(dbs.get_elements_query('drive', 'company_id', company_id, 'status', 'registered'))
    
    # 2. current i.w. approved
    data['current'] = rows_to_dict(dbs.get_elements_query('drive', 'company_id', company_id, 'status', 'approved'))
    lengths['current'] = len(data['current'])

    # 3. past i,e. closed
    data['past'] = rows_to_dict(dbs.get_elements_query('drive', 'company_id', company_id, 'status', 'closed'))
    lengths['past'] = len(data['past'])

    data['length'] = lengths
    return(orchestrate_JSON(data))

# ==========================================================
# DRIVE MANAGEMENT
# ==========================================================

def get_drives():
    return

def view_drive(drive_id):
    return

def create_drive(drive_data):
    return

def modify_drive(edit_drive_data):
    return

def close_drive(drive_id):
    return

# ==========================================================
# APPLICATION MANAGEMENT
# ==========================================================

def get_application(application_id):
    return

def accept_application(application_id):
    return

def reject_application(application_id):
    return

def shortlist_application(application_id):
    return