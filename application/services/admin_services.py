# import db_services
import application.services.db_services as dbs
from application.utils.helpers import return_empty_JSON, orchestrate_JSON, db_to_dict
from application.utils.constants import company_statuses, student_statuses, drive_statuses, entities, application_statuses


# ADMIN SERVICES
# __________________________________________________________________________________________________________________
# 1. Dashboard
'''
# giving each of these a separate JSON format to know what is the one that failed among all of these,
# or just show complete failure if one failed, but this is more useful for debugging
# Output JSON: {success: boolean, message: STRING, data: {
#                                           active_companies: INT, 
#                                           active_drives: INT, 
#                                           active_students: INT, 
#                                           active_applications: INT, 
#                                           pending_company_approvals: [{company_id, company_name, ...}, {...}, ...], # limited to 5 most recent
#                                           pending_drive_approvals: [{drive_id, drive_name, ...}, {...}, ...],} # limited to 5 most recent
#                   }
                }
'''
def get_dashboard():
    '''       
    Statistics part:
        1. No of active companies
        2. No of active Drives
        3. No of active students
        4. No of active applications
    To-do part:
        1. Pending company approvals
        2. Pending drive approvals
    '''
    data = {}
    
    get_status = 'approved'
    get_entities = entities[1:] # excluding user entity
    active = dbs.get_counts(get_entities, get_status)
    # print(active)

    get_entities = ['company', 'drive']
    get_status = 'registered'
    pending = db_to_dict(dbs.get_elements(get_entities, get_status, 5))


    data['active'] = active
    data['pending'] = pending

    #print(orchestrate_JSON(data))
    return(orchestrate_JSON(data))

# ________________________________________________________________________________________________
# 2. Student Management Functions
'''View students
View single student
Blacklist students
Deactivate students'''

# 2.1 - View students
def get_students():
    groups = db_to_dict(dbs.get_groups('student', student_statuses))
    # return(orchestrate_JSON())
    return(orchestrate_JSON(groups))

# 2.2 - View single student more details

def get_student_data(student_id):
    student_from_db = {'student': dbs.get_element('student', 'id', student_id)}
    student = db_to_dict(student_from_db)
    print(orchestrate_JSON(student))
    return(orchestrate_JSON(student))

# 2.3 - Blacklist students
def blacklist_student(student_id):
    # check if student exists
    if not dbs.get_element('student', 'id', student_id):
        out = return_empty_JSON()
        out['message'] = "Student not found"
        return out
    dbs.modify_element('student', 'id', student_id, {'status': 'blacklisted'})
    return

# 2.4 - Deactivate students
def deactivate_student(student_id):
    dbs.modify_element('student', 'id', student_id, {'status': 'deactivated'})
    return

# _____________________________________________________________________________________________
# 3. Company Management Functions
'''View companies
View single company for more details
Approve companies
Reject Companies
Blacklist companies'''

# 3.1 - View companies
def get_companies():
    companies = db_to_dict(dbs.get_groups('company', company_statuses))
    return(orchestrate_JSON(companies))

# 3.2 - View single company for more details
def get_company_data(company_id):
    company_from_db = {'company': dbs.get_element('company', 'id', company_id)}
    company = db_to_dict(company_from_db)
    return(orchestrate_JSON(company))

# 3.3 - Approve companies
def approve_company(company_id):
    out = return_empty_JSON()
    success = dbs.modify_element('company', 'id', company_id, {'status': 'approved'})
    out['success'] = success
    return out

# 3.4 - Reject companies
def reject_company(company_id):
    return modify_company(company_id, 'rejected')

# 3.5 - Blacklist companies
def blacklist_company(company_id):
    return modify_company(company_id, 'blacklisted')

# _____________________________________________________________________________________________
# 4. Drive Management Functions
'''View drives
Approve drives
Reject drives'''

# 4.1 - View drives
def get_drives():
    drives = db_to_dict(dbs.get_groups('drive', drive_statuses))
    return(orchestrate_JSON(drives))

# 4.2 - View single drive for more details
def get_drive_data(drive_id):
    drive_from_db = {'drive': dbs.get_element('drive', 'id', drive_id)}
    drive = db_to_dict(drive_from_db)
    return(orchestrate_JSON(drive))

# 4.3 - Approve drives
def approve_drive(drive_id):
    return modify_drive(drive_id, 'approved')

# 4.4 - Reject drives
def reject_drive(drive_id):
    return modify_drive(drive_id, 'rejected')

# _____________________________________________________________________________________________
# 5. Application Functions
def get_applications():
    applications = db_to_dict(dbs.get_groups('application', application_statuses))
    return(orchestrate_JSON(applications))
# _____________________________________________________________________________________________
# 6. Search Function
def search(query):
    search = dbs.get_search(query)
    return(orchestrate_JSON(search))

# _____________________________________________________________________________________________
# 7. Auxilary functions for services
def company_verify(drive_id):
    out = return_empty_JSON()
    drive_from_db = dbs.get_element('drive', 'id', drive_id)
    if not drive_from_db:
        out['message'] = "Drive not found"
        return out
    drive_from_db = drive_from_db[0]
    company_from_db = dbs.get_element('company', 'id', drive_from_db['company_id'])
    if not company_from_db:
        out['message'] = "Company not found"
        return out
    company_from_db = company_from_db[0]
    if company_from_db['status'] != 'approved':
        out['message'] = "Company not approved"
        return out
    out['success'] = 1
    return out

def modify_company(company_id, status):
    out = return_empty_JSON()
    get = dbs.get_element('company', 'id', company_id)
    if not get:
        out['message'] = "Company not found"
        return out
    success = dbs.modify_element('company', 'id', company_id, {'status': status})
    if not success:
        out['message'] = f"Failure to {status.capitalize()} Company"
        return out
    success = dbs.modify_element('drive', 'company_id', company_id, {'status': status})
    if success:
        out['message'] = f"Company and its drives {status} successfully"
    else:
        out['message'] = f"Company {status} successfully, but failed to {status} its drives"
    out['success'] = success
    return out

def modify_drive(drive_id, status):
    out = return_empty_JSON()
    company_check = company_verify(drive_id)
    if not company_check['success']:
        return company_check
    success = dbs.modify_element('drive', 'id', drive_id, {'status': status})
    if success:
        out['message'] = f"Drive {status} successfully"
    else:
        out['message'] = f"Failed to {status} drive"
    out['success'] = success
    return out