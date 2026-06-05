from application import db

# Student Class
# Parameters
# Name
# Email
# Department
# Degree
# Year
# Graduation Batch
# Resume Link 
# Status
class Student(db.Model):
    # primary key, auto-incrementing integer (student_id)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    # foreign key to user_id in User table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # name - string, not null
    name = db.Column(db.String(100), nullable=False)

    # email - unique string, not null
    email = db.Column(db.String(120), unique=True, nullable=False)

    # degree - string, not null - dropdown with options (B.Tech, M.Tech, PhD, etc.)
    degree = db.Column(db.String(50), nullable=False)

    # department - string, not null - dropdown with options (CSE, ECE, ME, CE, etc.)
    department = db.Column(db.String(50), nullable=False)

    # year - integer, not null - dropdown with options (1, 2, 3, 4, etc.)
    year = db.Column(db.Integer, nullable=False)

    # graduation_batch - string, not null - dropdown with options (2024, 2025, 2026, etc.)
    graduation_batch = db.Column(db.String(20), nullable=False)

    # GPA - float, nullable
    gpa = db.Column(db.Float, nullable=True)

    # resume_link - string, nullable (URL to the student's resume)
    resume_link = db.Column(db.String(255), nullable=True)

    # status - string, not null - dropdown with options (active, inactive, placed, etc.)
    # modified by student actions or admin actions
    status = db.Column(db.String(20), nullable=False)


    def __repr__(self):
        return f'<Student {self.name}>'
    
    def to_dict(self):
        return {
            'student_id': self.id,
            'name': self.name,
            'email': self.email,
            'department': self.department,
            'degree': self.degree,
            'year': self.year,
            'graduation_batch': self.graduation_batch,
            'gpa': self.gpa,
            'resume_link': self.resume_link,
            'status': self.status
        }