# import db_services
import application.services.db_services as dbs
from application.utils.helpers import orchestrate_JSON
from application.utils.constants import company_statuses, student_statuses, drive_statuses, entities


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
    
    get_status = 'active'
    active = dbs.get_counts(entities, get_status)

    get_status = 'pending'
    pending = dbs.get_elements(entities, get_status, 5)

    data['active'] = active
    data['pending'] = pending

    return(orchestrate_JSON(data))

# ________________________________________________________________________________________________
# 2. Student Management Functions
'''View students
View single student
Blacklist students
Deactivate students'''

# 2.1 - View students
def get_students():
    students = dbs.get_groups('student', student_statuses)

    return(orchestrate_JSON(students))

# 2.2 - View single student more details

def get_student_data(student_id):
    student = dbs.get_element('student', 'id', student_id)

    return(orchestrate_JSON(student))

# 2.3 - Blacklist students
def blacklist_student(student_id):
    # check if student exists
    
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
    companies = dbs.get_groups('company', company_statuses)
    return(orchestrate_JSON(companies))

# 3.2 - View single company for more details
def get_company_data(company_id):
    company = dbs.get_element('company', 'id', company_id)
    return(orchestrate_JSON(company))

# 3.3 - Approve companies
def approve_company(company_id):
    dbs.modify_element('company', 'id', company_id, {'status': 'approved'})
    return

# 3.4 - Reject companies
def reject_company(company_id):
    dbs.modify_element('company', 'id', company_id, {'status': 'rejected'})
    return

# 3.5 - Blacklist companies
def blacklist_company(company_id):
    dbs.modify_element('company', 'id', company_id, {'status': 'blacklisted'})
    return

# _____________________________________________________________________________________________
# 4. Drive Management Functions
'''View drives
Approve drives
Reject drives'''

# 4.1 - View drives
def get_drives():
    drives = dbs.get_groups('drive', drive_statuses)
    return(orchestrate_JSON(drives))

# 4.2 - View single drive for more details
def get_drive_data(drive_id):
    drive = dbs.get_element('drive', 'id', drive_id)
    return(orchestrate_JSON(drive))

# 4.3 - Approve drives
def approve_drive(drive_id):
    dbs.modify_element('drive', 'id', drive_id, {'status': 'approved'})
    return

# 4.4 - Reject drives
def reject_drive(drive_id):
    dbs.modify_element('drive', 'id', drive_id, 'rejected')
    return

# _____________________________________________________________________________________________
# 5. Search Function
def search(query):
    search = dbs.get_search(query)
    return(orchestrate_JSON(search))

# _____________________________________________________________________________________________