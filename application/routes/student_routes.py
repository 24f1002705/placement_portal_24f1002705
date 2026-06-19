# import necessary modules 
from flask import Blueprint, jsonify
from application.utils.decorators import student_required
from application.services import student_services as ss
from application.tasks.export_tasks import export_student_applications
from application.utils.auth_utils import get_current_user

# Initialization of blueprint object
student_bp = Blueprint('student', __name__)

# root for student page
# empty for now
@student_bp.route('/')
def student_index():
    return

# _____________________________________________________________________________________________
# 1. routing towards student dashboard
# Input: student_id from session cookie
# Output: JSON {}

@student_bp.route('/dashboard')
@student_required
def dashboard():
    return jsonify(ss.get_dashboard())

# _____________________________________________________________________________________________
# 2. Profile Management Functions
'''View profile
Edit profile'''
# Profile functions moved to auth section
'''# 2.1 - View profile
# Input: student_id from session cookie
# Output: JSON {student details}
@student_bp.route('/profile/')
@student_required
def view_profile(student_id):
    return jsonify(ss.get_profile())

# 2.2 - Edit profile
# Input: student_id from session cookie + edited details
# Output: JSON {success: boolean, message: STRING} + updated details in database
@student_bp.route('/profile/edit/')
def edit_profile(student_id, new_data):
    return jsonify(ss.edit_profile())
'''
# _____________________________________________________________________________________________
# 3. Organization Management Functions

# 3.1 - View organizations
# organizations with drives that the student has applied to or is eligible for
# Input: student_id from session cookie
# Output: JSON {}
@student_bp.route('/companies')
@student_required
def view_organizations():
    return jsonify(ss.get_companies())

# 3.2 - View single organization and eligible drives
# Input: organization_id
# Output: JSON {organization details + drives details}
@student_bp.route('/companies/<org_id>')
@student_required
def view_organization(org_id):
    return jsonify(ss.get_company(org_id))

# ____________________________________________________________________________________________
# 4. Drive Management Functions

# 4.1 - View drives
# drives that the student has applied to or is eligible for
# Input: student_id from session cookie
# Output: JSON {drives: []}
@student_bp.route('/drives')
@student_required
def view_drives():
    return jsonify(ss.get_drives())

# 4.2 - View single drive and applications
# Input: drive_id
# Output: JSON {drive details + applications details}
@student_bp.route('/drives/<drive_id>')
@student_required   
def view_drive(drive_id):
    return jsonify(ss.get_drive(drive_id))

@student_bp.route('/drives/apply/<drive_id>')
@student_required
def apply_to_drive(drive_id):
    return jsonify(ss.apply_to_drive(drive_id))

# ____________________________________________________________________________________________
# 5. Application Management Functions
'''
Firstly create an application for a drive

Say student accepts a job, 
    then all the other applications are automatically withdrawn 
    and the student is marked as placed. 
If student rejects a job, 
    then the application is marked as rejected 
    and the student can apply to other jobs.

Be able to view all applications and their status in a separate page.

Be able to see each application and its details in a separate page.

Be able to update the status of each application (accept or reject offer) in the single application page.
'''
# 5.1 - Create application
# Input: student_id from session cookie + drive_id + application details
# Output: JSON {success: boolean, message: STRING} + application added to applications table
'''@student_bp.route('/applications/apply/<drive_id>')
@student_required
def apply_application(application_id):
    return jsonify()'''

# 5.2 - View applications
# Input: student_id from session cookie
# Output: JSON {applications: []}
@student_bp.route('/applications')
@student_required
def view_applications():
    return jsonify(ss.get_applications())

# 5.3 - View single application
@student_bp.route('/applications/<application_id>')
@student_required
def view_application(application_id):
    return jsonify(ss.get_application(application_id))


# 5.4 - Accept Offer
# Input: application_id + new details (eg. resume)
# Output: JSON {success: boolean, message: STRING} + application details updated in applications table
@student_bp.route('/applications/accept/<application_id>')
@student_required
def accept_offer(application_id):
    return jsonify(ss.accept_application(application_id))

# 5.5 - Reject Offer
# Input: application id
@student_bp.route('/applications/reject/<application_id>')
@student_required
def reject_offer(application_id):
    return jsonify(ss.reject_application(application_id))



'''# 5.5 - Update application status (accept or reject offer)
# Input: application_id + new status (accepted or rejected)
# Output: JSON {success: boolean, message: STRING} + application status updated in applications table
@student_bp.route('/applications/update-status/<application_id>')
def update_application_status(application_id):
    return'''

# _________________________________________________________________________________________
@student_bp.route('/search/<query>')
@student_required
def search(query):
    return jsonify(ss.search(query))


# __________________________________________________________________________
@student_bp.route('/export')
@student_required
def export():
    user = get_current_user()

    task = (
        export_student_applications.delay(
            user['role_id']
        )
    )

    return jsonify({
        "success": 1,
        "message": "export started",
        'task_id': task.id
    })