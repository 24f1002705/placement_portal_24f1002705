from application import db

# Company class
# Company Name
# Logo
# Description
# Website
# Email
# HR Contact (name and number)
# Status

class Company(db.Model):
    # primary key, auto-incrementing integer (company_id)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # foreign key to user_id in User table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # company_name - string, not null
    company_name = db.Column(db.String(100), unique=True, nullable=False)

    # logo - string, nullable (URL to the company's logo)
    logo = db.Column(db.String(255), nullable=True)

    # description - string, nullable
    description = db.Column(db.Text, nullable=True)

    # website - string, nullable (URL to the company's website)
    website = db.Column(db.String(255), nullable=True)

    # email - unique string, not null
    email = db.Column(db.String(120), unique=True, nullable=False)

    # hr_contact_name - string, nullable
    hr_contact_name = db.Column(db.String(100), nullable=True)

    # hr_contact_number - string, nullable
    hr_contact_number = db.Column(db.String(20), nullable=True)

    # status - string, not null - dropdown with options (active, inactive, etc.)
    status = db.Column(db.String(20), nullable=False)


    def __repr__(self):
        return f'<Company {self.company_name}>'
    
    def to_dict(self):
        return {
            'company_id': self.id,
            'company_name': self.company_name,
            'logo': self.logo,
            'description': self.description,
            'website': self.website,
            'email': self.email,
            'hr_contact_name': self.hr_contact_name,
            'hr_contact_number': self.hr_contact_number,
            'status': self.status
        }