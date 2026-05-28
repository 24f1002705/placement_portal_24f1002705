# Purpose: Serves as the starting point for Flask application
# It starts the server by getting an app from it's packages
from application import create_app
from flask import redirect, render_template

# defined in application/__init__.py
app = create_app()

@app.route('/')
def index():
    # If user is already logged in, redirect to their dashboard based on user type
    # else redirect to login page
    # done in the auth page only
    return redirect('/api/auth/')

# starts the app
if __name__ == '__main__':
    app.run(debug=True)