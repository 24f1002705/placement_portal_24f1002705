from application.utils.auth_utils import get_current_user
import application.services.db_services as dbs
from application.utils.helpers import rows_to_dict, orchestrate_JSON, return_empty_JSON
from application.utils.constants import application_statuses

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
    lengths['awaiting'] = len(rows_to_dict(dbs.get_elements_query('drive', 'company_id', company_id, 'status', 'registered')))

    data['length'] = lengths

    print(get_drive(1))

    return(orchestrate_JSON(data))

# ==========================================================
# DRIVE MANAGEMENT
# ==========================================================

'''def get_drives():
    return'''

def get_drive(drive_id):
    # verify if the drive belongs to the user
    if not verify_drive(drive_id):
        out = return_empty_JSON()
        out['message'] = "Unauthorized access"
        return out
    
    drive = rows_to_dict(dbs.get_element('drive', 'id', drive_id))

    applications = {}

    for status in application_statuses:
        applications[status] = rows_to_dict(dbs.get_elements_query('application', 'drive_id', drive_id, 'status', status))

    for status_group in applications:
        for application in applications[status_group]:
            student = rows_to_dict(dbs.get_element('student', 'id', application['student_id']))
            application['student'] = student[0]

    data = {'drive': drive[0], 'applications': applications}

    print(data)

    return orchestrate_JSON(data)

def create_drive(drive_data):
    drive_data['company_name'] = rows_to_dict(dbs.get_element('company', 'id', drive_data['company_id']))[0]['company_name']
    last_id = dbs.add_row('drive', drive_data)
    return orchestrate_JSON(last_id)

def modify_drive(edit_drive_data, drive_id):
    out = return_empty_JSON()
    out['success'] = dbs.modify_element('drive', 'id', drive_id, edit_drive_data)

    if not out['success']:
        out['message'] = 'Error occured in modifying'

    return out

def close_drive(drive_id):
    return action_entity('drive', 'id', drive_id, {'status': 'closed'})

# ==========================================================
# APPLICATION MANAGEMENT
# ==========================================================

def get_application(application_id):
    out = rows_to_dict(dbs.get_element('application', 'id', application_id))[0]
    student = rows_to_dict(dbs.get_element('student', 'id', out['student_id']))[0]
    out['student'] = student
    application = {'application': out}
    return orchestrate_JSON(application)

def accept_application(application_id):
    return action_entity('application', 'id', application_id, {'status': 'offer'})

def reject_application(application_id):
    return action_entity('application', 'id', application_id, {'status': 'rejected'})

def shortlist_application(application_id):
    return action_entity('application', 'id', application_id, {'status': 'interviewed'})


# =======================
# auxilary functions

def verify_drive(drive_id):
    # TODO: implement actual verification logic
    in1 = rows_to_dict(dbs.get_element('drive', 'id', drive_id))
    drive_details = in1[0]

    user = get_current_user()
    if user['role_id'] == drive_details['company_id']:
        return True
    
    return False


def action_entity(entity, parameter, value, new_values):
    out = return_empty_JSON()

    out['success'] = dbs.modify_element(entity, parameter, value, new_values)

    if not out['success']:
        out['message'] = 'something went wrong'

    print(out)
    return out