# import necessary modules 
from flask import Blueprint

# Initialization of blueprint object
company_bp = Blueprint('company', __name__)

# 0. root for company page
# empty for now
@company_bp.route('/')
def company_index():
    return

# 1. dashboard for company
# Input: company_id from session cookie
# Output: JSON {present_drives: [], past_drives: []} only 5 most recent drives in each category
@company_bp.route('/dashboard')
def dashboard():
    return

# _____________________________________________________________________________________________
# 2. Drives Management

# 2.1 - View all drives posted by the company
# Input: company_id from session cookie
# Output: JSON {drive_applications: [], present_drives: [], past_drives: []}
@company_bp.route('/drives/<company_id>')
def view_drives(company_id):
    return

# 2.2 - View drive (singular)
# returns the details of a drive posted by the company
# Input: drive_id
# Output: drive details in JSON
@company_bp.route('/drives/view/<drive_id>')
def view_drive(drive_id):
    return

# 2.3 - Create drive
# Make sure drive is valid and add to the db
@company_bp.route('/drives/create')
def create_drive():
    return

# 2.4 - Edit drive
# Input: drive id and edited details
@company_bp.route('/drives/edit/<drive_id>')
def edit_drive():
    return

# 2.5 - End drive
# Input: drive_id
@company_bp.route('/drives/end/<drive_id>')
def end_drive():
    return

# ____________________________________________________________________________________________
# 3. Application Management

# 3.1 - View applications for a drive
# Input: drive_id
# Output: list of applications for that drive split into selected, shortlisted, rejected and pending
@company_bp.route('/applications/view/<drive_id>')
def view_applications(drive_id):
    return

# 3.2 - View specific application
@company_bp.route('/applications/view/<application_id>')
def view_application(application_id):
    return

# 3.3 - Update application status
# Input: application_id, new status (selected, shortlisted, rejected)
# Output: JSON {success: boolean, message: STRING} + application status updated in db
@company_bp.route('/applications/update/<application_id>')
def update_application(application_id):
    return


