from application import db

# Drive class of objects:
# Drive Name
# Company_id
# Company Name
# Description
# Salary 
# Location
# Application Deadline
# No of openings
# Eligibility branches
# Eligibility degree
# Eligibility batch
# status (active, inactive, completed)

class Drive(db.Model):
    # primary key, auto-incrementing integer
    drive_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # drive_name - string, not null
    drive_name = db.Column(db.String(100), nullable=False)

    # company_id - integer, not null (foreign key to Company table)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)

    # company_name - string, not null
    company_name = db.Column(db.String(100), nullable=False)

    # description - string, nullable
    description = db.Column(db.String(255), nullable=True)

    # salary - float, nullable
    salary = db.Column(db.Float, nullable=True)

    # location - string, nullable
    location = db.Column(db.String(100), nullable=True)

    # application_deadline - date, not null
    application_deadline = db.Column(db.Date, nullable=False)

    # no_of_openings - integer, not null
    no_of_openings = db.Column(db.Integer, nullable=False)

    # eligibility_branches - string, nullable (comma-separated values)
    eligibility_branches = db.Column(db.String(255), nullable=True)

    # eligibility_degree - string, nullable
    eligibility_degree = db.Column(db.String(50), nullable=True)

    # eligibility_batch - string, nullable
    eligibility_batch = db.Column(db.String(20), nullable=True)

    # status - string, not null - dropdown with options (active, inactive, completed)
    status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Drive {self.drive_name} at {self.company_name}>'
    
    def to_dict(self):
        return {
            'drive_id': self.drive_id,
            'drive_name': self.drive_name,
            'company_id': self.company_id,
            'company_name': self.company_name,
            'description': self.description,
            'salary': self.salary,
            'location': self.location,
            'application_deadline': self.application_deadline.isoformat(),
            'no_of_openings': self.no_of_openings,
            'eligibility_branches': self.eligibility_branches,
            'eligibility_degree': self.eligibility_degree,
            'eligibility_batch': self.eligibility_batch,
            'status': self.status
        }
