import csv
import os

from application.celery_worker import celery

from application.utils.helpers import rows_to_dict

import application.services.db_services as dbs

from application.utils.mail_utils import (
    send_email_with_attachment
)

@celery.task
def export_student_applications(student_id):

    print('task initiated')
    BASE_DIR = os.path.dirname(
        os.path.dirname(
            os.path.dirname(
                os.path.abspath(__file__)
            )
        )
    )

    EXPORT_DIR = os.path.join(
        BASE_DIR,
        "instance",
        "exports"
    )

    os.makedirs(
        EXPORT_DIR,
        exist_ok=True
    )

    applications = rows_to_dict(dbs.get_element('application', 'student_id', student_id))

    for application in applications:
        drive_id = application['drive_id']
        drive_details = rows_to_dict(dbs.get_element('drive', 'id', drive_id))[0]
        cols =['drive_name', 'company_name', 'salary', 'location', 'application_deadline']
        for col in cols:
            application[col] = drive_details[col]

    if not application:
        print('exiting cuz no application')
        return None

    filename = os.path.join(
        EXPORT_DIR, f"student_{student_id}.csv"
    )
    with open(
        filename,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.writer(file)

        writer.writerow([
            "Application ID",
            "Drive ID",
            "Status",
            "Date", 
            'drive_name', 
            'company_name', 
            'salary', 
            'location', 
            'application_deadline'
        ])

        for application in applications:

            writer.writerow([
                application["id"],
                application["drive_id"],
                application["status"],
                application["application_date"],
                application['drive_name'], 
                application['company_name'], 
                application['salary'], 
                application['location'], 
                application['application_deadline']
            ])

    # need to get student email
    student = rows_to_dict(dbs.get_element('student', 'id', student_id))[0]
    email = student['email']

    print('checkpoint - pre email')

    send_email_with_attachment(
        recipient=email,
        subject="Placement Portal Export",
        body="Your export is attached.",
        filepath=filename
    )

    print('checkpoint - post email')
    return {'success': 1,
            'filename': filename}