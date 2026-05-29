# ADMIN SERVICES
# __________________________________________________________________________________________________________________
# 1. Dashboard
def get_dashboard():
    '''
    # Process
    if (verify_admin()):
        data = admin_services.get_dashboard()
        return JSON {success: true, message: "Dashboard data fetched successfully", data: data}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# ________________________________________________________________________________________________
# 2. Student Management Functions
'''View students
View single student
Blacklist students
Deactivate students'''

# 2.1 - View students
def get_students():
    '''
    
    '''
    return

# 2.2 - View single student more details
def get_student_data(student_id):
    '''
    # Process
    if (verify_admin()):
        data = admin_services.get_student_data(student_id)
        return JSON {success: true, message: "Student data fetched successfully", data: data}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 2.3 - Blacklist students
def blacklist_student(student_id):
    '''
    # Process
    if (verify_admin()):
        result = admin_services.blacklist_student(student_id)
        return JSON {success: result.success, message: result.message, data: null}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 2.4 - Deactivate students
def deactivate_student(student_id):
    '''
    # Process
    if (verify_admin()):
        result = admin_services.deactivate_student(student_id)
        return JSON {success: result.success, message: result.message, data: null}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
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
    '''
    # Process
    if (verify_admin()):
        data = admin_services.get_companies()
        return JSON {success: true, message: "Companies data fetched successfully", data: data}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 3.2 - View single company for more details
def get_company_data(company_id):
    '''
    # Process
    if (verify_admin()):
        data = admin_services.get_company_data(company_id)
        return JSON {success: true, message: "Company data fetched successfully", data: data}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 3.3 - Approve companies
def approve_company(company_id):
    '''
    # Process
    if (verify_admin()):
        result = admin_services.approve_company(company_id)
        return JSON {success: result.success, message: result.message, data: null}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 3.4 - Reject companies
def reject_company(company_id):
    '''
    # Process
    if (verify_admin()):
        result = admin_services.reject_company(company_id)
        return JSON {success: result.success, message: result.message, data: null}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 3.5 - Blacklist companies
def blacklist_company(company_id):
    '''
    # Process
    if (verify_admin()):
        result = admin_services.blacklist_company(company_id)
        return JSON {success: result.success, message: result.message, data: null}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# _____________________________________________________________________________________________
# 4. Drive Management Functions
'''View drives
Approve drives
Reject drives'''

# 4.1 - View drives
def get_drives():
    '''
    # Process
    if (verify_admin()):
        data = admin_services.get_drives()
        return JSON {success: true, message: "Drives data fetched successfully", data: data}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 4.2 - View single drive for more details
def get_drive_data(drive_id):
    '''
    # Process
    if (verify_admin()):
        data = admin_services.get_drive_data(drive_id)
        return JSON {success: true, message: "Drive data fetched successfully", data: data}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

# 4.3 - Approve drives
def approve_drive(drive_id):
    '''
    # Process
    if (verify_admin()):
        result = admin_services.approve_drive(drive_id)
        return JSON {success: result.success, message: result.message, data: null}
    else:
        return JSON {success: false, message: "Unauthorized", data: null}
    '''
    return

