# import db_services
import application.services.db_services as dbs
from application.utils.helpers import return_empty_JSON, orchestrate_JSON, db_to_dict, rows_to_dict
from application.utils.constants import company_statuses, student_statuses, drive_statuses, entities, application_statuses, search_entities
from application.utils.auth_utils import get_current_user
import application.utils.student_utils as su
from application.utils.cache_utils import get_cache, set_cache, delete_cache
# STUDENT SERVICES
# ___________________________________________________________________________________________________________________
# 1. Dashboard
# In: 
# Out: {success, message, data: {
#                                   stats: {
#                                       applied, 
#                                       rejected, 
#                                       interview, 
#                                       offers
#                                   }, 
#                                   list: {
#                                       eligible_drives, 
#                                       recent_applications
#                                   }
#                               }
#       }
def get_dashboard():
    # steps: get user, get user_id, retrieve the correct data
    out = return_empty_JSON()

    user = get_current_user()

    if user['user_type'] != 'student':
        out['message'] = "Unauthorized"
        return out
    
    cache_key = f"student_dashboard_{user['role_id']}"

    cached = get_cache(cache_key)

    if cached:
        print("CACHE HIT")
        return(orchestrate_JSON(cached))
    
    print("CACHE MISS")
    
    userdata = dbs.get_element('student', 'id', user['role_id'])
    userdata = rows_to_dict(userdata)

    data, stats, list = {}, {}, {}

    # fetching stats
    # stats to get: applied, rejected, interview, offers
    get_statuses = ['applied', 'rejected', 'interview', 'offer']
    get_entity = 'application'

    stats = dbs.get_groups_query('count(*)', get_entity, get_statuses, 'student_id', user['role_id'])

    # getting lists
    # list of eligible drives, recent applications
    in1 = rows_to_dict(dbs.get_element('drive', 'status', 'approved'))
    user = get_current_user()
    out1 = []
    for row in in1:
        try: 
            app = dbs.get_element_query('id', 'application', 'drive_id', row['id'], 'student_id', user['role_id'])
        except:
            out1.append(row)
    userdata = dbs.get_element('student', 'id', user['role_id'])
    userdata = rows_to_dict(userdata)
    drive_eligibility = su.eligibility_check_drives(out1, userdata)
    print("drive_eligibility: ", drive_eligibility)
    eligible_drives = []
    for drive in drive_eligibility:
        if drive['eligibility']:
            eligible_drives.append(drive)

    list['eligible_drives'] = eligible_drives



    applications = rows_to_dict(dbs.get_element('application', 'student_id', user['role_id']))
    applications = su.sort_applications(applications)

    for application in applications:
        drive_id = application['drive_id']
        drive_data = rows_to_dict(dbs.get_element('drive', 'id', drive_id))[0]
        application['drive_name'] = drive_data['drive_name']
        application['company_name'] = drive_data['company_name']

    list['recent_applications'] = applications

    placed = {}

    if userdata[0]['status'] == 'placed':
        accepted_drive_id = dbs.get_element_query('drive_id', 'application', 'student_id', userdata[0]['id'], 'status', 'accepted')
        accepted_drive_data = rows_to_dict(dbs.get_element('drive', 'id', accepted_drive_id))[0]
        placed['drive'] = accepted_drive_data
        accepted_company_id = accepted_drive_data['company_id']
        accepted_company_data = rows_to_dict(dbs.get_element('company', 'id', accepted_company_id))[0]
        placed['company'] = accepted_company_data
    
    data = {'status': userdata[0]['status'], 'stats': stats, 'list': list, 'placed': placed}

    set_cache(
        cache_key,
        data,
        expiry=300
    )

    return(orchestrate_JSON(data))

def get_companies():
    data = rows_to_dict(dbs.get_element('company', 'status', 'approved'))
    return(orchestrate_JSON(data))

def get_company(company_id):
    company = rows_to_dict(dbs.get_element('company', 'id', company_id))
    user = get_current_user()
    userdata = rows_to_dict(dbs.get_element('student', 'id', user['role_id']))
    drives = su.eligibility_check_drives(
        rows_to_dict(dbs.get_element('drive', 'company_id', company[0]['id'])),
        userdata
    )
    data = {'company': company, 'drives': drives}
    return(orchestrate_JSON(data))

def get_drives():
    data = rows_to_dict(dbs.get_element('drive', 'status', 'approved'))
    user = get_current_user()
    out1 = []
    for row in data:
        try: 
            app = dbs.get_element_query('id', 'application', 'drive_id', row['id'], 'student_id', user['role_id'])
        except:
            print("application not found")
            out1.append(row)
    userdata = dbs.get_element('student', 'id', user['role_id'])
    userdata = rows_to_dict(userdata)
    drive_eligibility = su.eligibility_check_drives(out1, userdata)

    return(orchestrate_JSON(drive_eligibility))

def get_drive(drive_id):
    rows = rows_to_dict(dbs.get_element('drive', 'id', drive_id))
    user = get_current_user()
    userdata = rows_to_dict(dbs.get_element('student', 'id', user['role_id']))
    data = su.eligibility_check_drives(rows, userdata)
    return(orchestrate_JSON(data))

def apply_to_drive(drive_id):
    # need to create a new application entry with status applied
    user = get_current_user()
    userdata = rows_to_dict(dbs.get_element('student', 'id', user['role_id']))
    check = su.eligibility_check_drives(
        rows_to_dict(dbs.get_element('drive', 'id', drive_id)),
        userdata
    )[0]['eligibility']
    if check:
        data = dbs.add_row('application', {'student_id': user['role_id'], 'drive_id': drive_id, 'status': 'applied', 'application_date': 'CURRENT_DATE'})
        delete_cache(f"student_dashboard_{user['role_id']}")
        return(orchestrate_JSON(data))
    else:
        out = return_empty_JSON()
        out['message'] = "Unauthorized access"

def get_applications():
    user = get_current_user()
    rows = rows_to_dict(dbs.get_element('application', 'student_id', user['role_id']))
    for row in rows:
        drive = rows_to_dict(dbs.get_element('drive', 'id', row['drive_id']))[0]
        row['drive_name'] = drive['drive_name']
        row['company_name'] = drive['company_name']

    return(orchestrate_JSON(rows))

def get_application(app_id):
    data = rows_to_dict(dbs.get_element('application', 'id', app_id))[0]
    drive_data = rows_to_dict(dbs.get_element('drive', 'id', data['drive_id']))[0]
    drive_data['application date'] = data['application_date']
    drive_data['application_status'] = data['status']
    print("checkpoint 107:", drive_data)
    return(orchestrate_JSON(drive_data))

def accept_application(app_id):
    app_id = int(app_id)
    user = get_current_user()
    # modify student as placed
    student = dbs.modify_element('student', 'id', user['role_id'], {'status':'placed'})

    if student == 0:
        out = return_empty_JSON
        out['message'] = 'could not update student status'

    # make all applications rejected EXCEPT FOR THE ACCEPTED ONE
    out_ids = rows_to_dict(dbs.get_element('application', 'student_id', user['role_id']))
    for out_id in out_ids:
        id_value = int(out_id['id'])
        if id_value == app_id:
            out = dbs.modify_element('application', 'id', id_value, {'status': 'accepted'})
        else:
            out = dbs.modify_element('application', 'id', id_value, {'status': 'withdrawn'})

        ## fallback, reset past statuses if failure at any one point
        if out == 0:
            student = dbs.modify_element('student', 'id', user['role_id'], {'status':'approved'})
            for row in out_ids:
                out_2 = dbs.modify_element('application', 'id', row['id'], {'status': row['status']})
                if out_2 == 0:
                    out_3 = return_empty_JSON()
                    out_3['message'] = "error modifying applications, error rolling back, please contact admin@portal.com"
                    return out_3
            out_3 = return_empty_JSON()
            out_3['message'] = "error modifying applications, successfully rolled back"
            return out_3
    
    out = return_empty_JSON()
    out['message'] = 'Succesfully accepted'
    out['success'] = 1
    delete_cache(f"student_dashboard_{user['role_id']}")
    return out

def reject_application(app_id):
    out = return_empty_JSON()
    user = get_current_user()
    out['success'] = dbs.modify_element('application', 'id', app_id, {'status': 'rejected'})
    delete_cache(f"student_dashboard_{user['role_id']}")
    return out

def search(query):
    out = rows_to_dict(dbs.get_search('company', query))
    print(out)
    return(orchestrate_JSON(out))

def get_eligible_students(drive_id):
    drive = rows_to_dict(dbs.get_element('drive', 'id', drive_id))[0]
    students = rows_to_dict(dbs.get_element('student', 'status', 'approved'))
    #return(su.eligibility_check_students(drive, students))
    print("eligible students triggered", students)
    return(students)