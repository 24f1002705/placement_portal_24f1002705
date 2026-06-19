from flask_mail import Message

def send_export_email(email, filepath):
    
    from application import create_app

    app = create_app()

    with app.app_context():

        from application import mail

        print("EMAIL:", email)
        print("FILE:", filepath)

        msg = Message(
            subject="Placement Portal Export",
            recipients=[email]
        )

        msg.body = """
    Your placement application export is ready.

    Please find the attached CSV.
    """

        with open(filepath, "rb") as f:

            msg.attach(
                filename=filepath.split("/")[-1],
                content_type="text/csv",
                data=f.read()
            )

        print("Attempting send...")

        mail.send(msg)

        print("Email sent.")