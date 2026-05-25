# import necessary modules 
from flask import Blueprint, render_template

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
# Output: JSON {success: boolean, used_id: INT, user_type: STRING, message: STRING}
@admin_bp.route('/dashboard')
def login():
    return render_template('index.html')

# _____________________________________________________________________________________________
# 2. Student Management Functions
'''View students
Blacklist students
Deactivate students'''

# 2.1 - View students
# Input: None
# Output: Return a JSON of all students
@admin_bp.route('/students')
def view_students():
    return

# 2.2 - View single student more details
# Input: student_id
# Output: Return a JSON of all details of the student
@admin_bp.route('/students/view/<student_id>')
def view_student(student_id):
    return

# 2.3 - Blacklist students
# Input: student_id
# Output: JSON {success: boolean, message: STRING}
@admin_bp.route('/students/blacklist/<student_id>')
def blacklist_students():
    return

# 2.4 - Deactivate students
# Input: student_id
# Output: JSON {success: boolean, message: STRING}
@admin_bp.route('/students/deactivate/<student_id>')
def deactivate_students():
    return

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
def view_companies():
    return

# 3.2 - View single company for more details
# Input: company_id
# Output: Return a JSON of all details of the company
@admin_bp.route('/companies/view/<company_id>')
def view_company(company_id):
    return

# 3.3 - Approve companies
# Input: company_id
# Output: JSON {success: boolean, message: STRING} + company added to companies table
@admin_bp.route('/companies/approve/<company_id>')
def approve_companies(company_id):
    return

# 3.4 - Reject companies
# Input: company_id
# Output: JSON {success: boolean, message: STRING} + company added to companies table as rejected
@admin_bp.route('/companies/reject/<company_id>')
def reject_companies(company_id):
    return

# 3.5 - Blacklist companies
# Input: user_id, (company_id if exists)
# Output: JSON {success: boolean, message: STRING} + company added to companies table as blacklisted
@admin_bp.route('/companies/blacklist/<company_id>')
def blacklist_companies(company_id):
    return

# _____________________________________________________________________________________________
# 4. Drive Management Functions
'''View drives
Approve drives
Reject drives'''

# 4.1 - View drives
# Input: None
# Output: Return a JSON of all drives
@admin_bp.route('/drives')
def view_drives():
    return

# 4.2 - View single drive for more details
# Input: drive_id
# Output: Return a JSON of all details of the drive
@admin_bp.route('/drives/view/<drive_id>')
def view_drive_admin(drive_id):
    return

# 4.3 - Approve drives
# Input: drive_id
# Output: JSON {success: boolean, message: STRING} + drive added to drives table
@admin_bp.route('/drives/approve/<drive_id>')
def approve_drives(drive_id):
    return

# 4.4 - Reject drives
# Input: drive_id
# Output: JSON {success: boolean, message: STRING} + drive added to drives table as rejected
@admin_bp.route('/drives/reject/<drive_id>')
def reject_drives(drive_id):
    return


# _____________________________________________________________________________________________
# 5. Search Function
# Search for students, companies or drives based on a query string
# Input: query string
# Output: JSON {students: [], companies: [], drives: []}
@admin_bp.route('/search')
def search(query):
    return