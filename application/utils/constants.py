entities = ['user', 'student', 'company', 'drive', 'application']

search_entities = ['student', 'company', 'drive']

student_statuses = ['registered','active', 'blacklisted', 'deactivated', 'placed']

company_statuses = ['registered', 'approved', 'rejected', 'blacklisted']

drive_statuses = ['registered', 'approved', ]

corresponding_names = {
    'student': 'name',
    'company': 'company_name',
    'drive': 'drive_name'
}

session_variables = ['user_id', 'user_type', 'role_id']
