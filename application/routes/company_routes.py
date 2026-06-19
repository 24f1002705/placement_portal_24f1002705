# import necessary modules 
from flask import Blueprint, jsonify, request
import application.services.company_services as cs
import application.utils.company_utils as cu
from application.utils.decorators import company_required



# Initialization of blueprint object
company_bp = Blueprint('company', __name__)

# 0. root for company page
# empty for now
@company_bp.route('/', methods=['GET', 'POST'])
def company_index():
    if request.method == 'GET':
        return jsonify(cs.get_profile())
    
    else:
        return jsonify(cs.update_profile(request))

# 1. dashboard for company
# Input: company_id from session cookie
# Output: JSON {present_drives: [], past_drives: []} only 5 most recent drives in each category
@company_bp.route('/dashboard')
@company_required
def dashboard():
    return jsonify(cs.dashboard())

# _____________________________________________________________________________________________
# 2. Drives Management

# 2.1 - View all drives posted by the company
# Input: company_id from session cookie
# Output: JSON {drive_applications: [], present_drives: [], past_drives: []}
@company_bp.route('/drives/')
@company_required
def view_drives():
    return jsonify(cs.get_drives())

# 2.2 - View drive (singular)
# returns the details of a drive posted by the company
# Input: drive_id
# Output: drive details in JSON {drive: {details}, applications: {}}
@company_bp.route('/drives/<drive_id>')
@company_required
def view_drive(drive_id):
    print("checkpoint 100: ",  cs.get_drive(drive_id))
    return jsonify(cs.get_drive(drive_id))

# 2.3 - Create drive
# Make sure drive is valid and add to the db
@company_bp.route('/drives/create',methods=['POST'])
@company_required
def create_drive():
    drive_data = cu.get_drive_data(request)
    return jsonify(cs.create_drive(drive_data))

# 2.4 - Edit drive
# Input: drive id and edited details
@company_bp.route('/drives/edit/<drive_id>', methods=['POST'])
@company_required
def edit_drive(drive_id):
    edit_drive_data = cu.get_drive_data(request)
    return jsonify(cs.modify_drive(edit_drive_data, drive_id))

# 2.5 - End drive
# Input: drive_id
@company_bp.route('/drives/close/<drive_id>')
@company_required
def end_drive(drive_id):
    return jsonify(cs.close_drive(drive_id))

# ____________________________________________________________________________________________
# 3. Application Management

"""# 3.1 - View applications for a drive
# Input: drive_id
# Output: list of applications for that drive split into selected, shortlisted, rejected and pending
@company_bp.route('/applications/view/<drive_id>')
def view_applications(drive_id):
    return
"""
# 3.2 - View specific application
@company_bp.route('/applications/<application_id>')
@company_required
def view_application(application_id):
    return jsonify(cs.get_application(application_id))

# 3.3 - Update application status
# Input: application_id, new status (selected, shortlisted, rejected)
# Output: JSON {success: boolean, message: STRING} + application status updated in db
@company_bp.route('/applications/offer/<application_id>/')
@company_required
def accept_application(application_id):
    return jsonify(cs.accept_application(application_id))

@company_bp.route('/applications/reject/<application_id>/')
@company_required
def reject_application(application_id):
    return jsonify(cs.reject_application(application_id))

@company_bp.route('/applications/interview/<application_id>/')
@company_required
def shortlist_application(application_id):
    return jsonify(cs.shortlist_application(application_id))