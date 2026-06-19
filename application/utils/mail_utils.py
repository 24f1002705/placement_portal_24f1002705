import smtplib
import os

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from application.utils.constants import email_id, email_app_password


def send_email_with_attachment(
    recipient,
    subject,
    body,
    filepath
):
    sender_email = email_id
    sender_password = email_app_password

    msg = MIMEMultipart()

    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = recipient

    msg.attach(
        MIMEText(body, "plain")
    )

    with open(filepath, "rb") as f:

        part = MIMEBase(
            "application",
            "octet-stream"
        )

        part.set_payload(
            f.read()
        )

    encoders.encode_base64(part)

    part.add_header(
        "Content-Disposition",
        f'attachment; filename="{os.path.basename(filepath)}"'
    )

    msg.attach(part)

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        sender_email,
        sender_password
    )

    server.sendmail(
        sender_email,
        recipient,
        msg.as_string()
    )

    server.quit()


def send_email(
    recipient,
    subject,
    body
):

    sender_email = email_id

    sender_password = email_app_password

    msg = MIMEText(body)

    msg["Subject"] = subject

    msg["From"] = sender_email

    msg["To"] = recipient

    try:

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            sender_email,
            sender_password
        )

        server.sendmail(
            sender_email,
            recipient,
            msg.as_string()
        )

        server.quit()

        print(
            f"Email sent to {recipient}"
        )

    except Exception as e:

        print(
            f"Email failed: {e}"
        )