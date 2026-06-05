# What is happening here?
# Basically creating a link between the student profile and the drive
# basically just a connecting table

from application import db

# Application class of objects:
# application_id (primary key, auto-incrementing integer)
# student_id (integer, not null, foreign key to Student table)
# drive_id (integer, not null, foreign key to Drive table)
# application date (date, not null)
# status (string, not null) - dropdown with options (applied, shortlisted, rejected, accepted)

class Application(db.Model):
    # primary key, auto-incrementing integer (application_id)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # student_id - integer, not null (foreign key to Student table)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)

    # drive_id - integer, not null (foreign key to Drive table)
    drive_id = db.Column(db.Integer, db.ForeignKey('drive.id'), nullable=False)

    # application_date - date, not null
    application_date = db.Column(db.Date, nullable=False)

    # status - string, not null - dropdown with options (applied, shortlisted, rejected, accepted)
    status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Application {self.id} - Student {self.student_id} for Drive {self.drive_id}>'
    
    def to_dict(self):
        return {
            'application_id': self.id,
            'student_id': self.student_id,
            'drive_id': self.drive_id,
            'application_date': self.application_date.isoformat(),
            'status': self.status
        }
    
    