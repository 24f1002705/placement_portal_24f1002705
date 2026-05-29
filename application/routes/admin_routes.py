# import necessary modules 
from flask import Blueprint, render_template, jsonify
from application.utils.decorators import admin_required
from application.services import admin_services

# initialization blueprint object for admin routes
admin_bp = Blueprint('admin', __name__)

# root for admin page
# 0. empty page
@admin_bp.route('/')
def admin_index():
    return

# ______________________________________________________________________________________________
# 1. routing towards admin dashboard
# Input: None
# Output: JSON {success, message, data}
@admin_bp.route('/dashboard')
@admin_required
def admin_dash():
    return jsonify(admin_services.get_dashboard())

# _____________________________________________________________________________________________
# 2. Student Management Functions
'''View students
Blacklist students
Deactivate students'''

# 2.1 - View students
# Input: None
# Output: Return a JSON of all students
@admin_bp.route('/students')
@admin_required
def view_students():
    return jsonify(admin_services.get_students())

# 2.2 - View single student more details
# Input: student_id
# Output: Return a JSON of all details of the student
@admin_bp.route('/students/<student_id>')
@admin_required
def view_student_data(student_id):
    return jsonify(admin_services.get_student_data(student_id))

# 2.3 - Blacklist students
# Input: student_id
# Output: JSON {success: boolean, message: STRING}
@admin_bp.route('/students/<student_id>/blacklist/')
@admin_required
def blacklist_student(student_id):
    return jsonify(admin_services.blacklist_student(student_id))

# 2.4 - Deactivate students
# Input: student_id
# Output: JSON {success: boolean, message: STRING}
@admin_bp.route('/students/<student_id>/deactivate/')
@admin_required
def deactivate_student(student_id):
    return jsonify(admin_services.deactivate_student(student_id))

# _____________________________________________________________________________________________
# 3. Company Management Functions
'''View companies
Approve companies
Reject Companies
Blacklist companies'''

# 3.1 - View companies
# Input: None
# Output: Return a JSON of all companies
@admin_bp.route('/companies')
@admin_required
def view_companies():
    return jsonify(admin_services.get_companies())


# 3.2 - View single company for more details
# Input: company_id
# Output: Return a JSON of all details of the company
@admin_bp.route('/companies/view/<company_id>')
@admin_required
def view_company(company_id):
    return jsonify(admin_services.get_company_data(company_id))


# 3.3 - Approve companies
# Input: company_id
# Output: JSON {success: boolean, message: STRING} + company added to companies table
@admin_bp.route('/companies/approve/<company_id>')
@admin_required
def approve_companies(company_id):
    return jsonify(admin_services.approve_company(company_id))

# 3.4 - Reject companies
# Input: company_id
# Output: JSON {success: boolean, message: STRING} + company added to companies table as rejected
@admin_bp.route('/companies/reject/<company_id>')
@admin_required
def reject_companies(company_id):
    return jsonify(admin_services.reject_company(company_id))

# 3.5 - Blacklist companies
# Input: user_id, (company_id if exists)
# Output: JSON {success: boolean, message: STRING} + company added to companies table as blacklisted
@admin_bp.route('/companies/blacklist/<company_id>')
@admin_required
def blacklist_companies(company_id):
    return jsonify(admin_services.blacklist_company(company_id))


# _____________________________________________________________________________________________
# 4. Drive Management Functions
'''View drives
Approve drives
Reject drives'''

# 4.1 - View drives
# Input: None
# Output: Return a JSON of all drives
@admin_bp.route('/drives')
@admin_required
def view_drives():
    return jsonify(admin_services.get_drives())

# 4.2 - View single drive for more details
# Input: drive_id
# Output: Return a JSON of all details of the drive
@admin_bp.route('/drives/view/<drive_id>')
@admin_required
def view_drive_admin(drive_id):
    return jsonify(admin_services.get_drive_data(drive_id))

# 4.3 - Approve drives
# Input: drive_id
# Output: JSON {success: boolean, message: STRING} + drive added to drives table
@admin_bp.route('/drives/approve/<drive_id>')
@admin_required
def approve_drives(drive_id):
    return jsonify(admin_services.approve_drive(drive_id))

# 4.4 - Reject drives
# Input: drive_id
# Output: JSON {success: boolean, message: STRING} + drive added to drives table as rejected
@admin_bp.route('/drives/reject/<drive_id>')
@admin_required
def reject_drives(drive_id):
    return jsonify(admin_services.reject_drive(drive_id))

# _____________________________________________________________________________________________
# 5. Search Function
# Search for students, companies or drives based on a query string
# Input: query string
# Output: JSON {students: [], companies: [], drives: []}
@admin_bp.route('/search/<query>')
@admin_required
def search(query):
    return jsonify(admin_services.search(query))