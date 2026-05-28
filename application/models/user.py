from application import db

# User is the ability for the process of the login, to verify the login credentials
# User logs in -> results in a user_id, user_type
# {user_type} -> redirect to respective route
# {user_id} -> corresponding entity identity
# company_id/student_id -> corresponding foreign key

class User(db.Model):
    # user_id - primary key, auto-incrementing integer
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # email - unique string, not null
    email = db.Column(db.String(120), unique=True, nullable=False)

    # username - unique string, not null
    username = db.Column(db.String(80), unique=True, nullable=False)

    # password_hash - string, not null
    password_hash = db.Column(db.String(128), nullable=False)
    
    # role - string, not null (e.g., 'admin', 'company', 'student')
    role = db.Column(db.String(20), nullable=False)

    # role_id - integer, foreign key to respective role table (e.g., company_id, student_id)
    role_id = db.Column(db.Integer, db.ForeignKey('company.company_id'), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'email': self.email,
            'username': self.username,
            'role': self.role,
            'role_id': self.role_id
        }
    