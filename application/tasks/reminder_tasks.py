from datetime import date
from datetime import datetime

from application.celery_worker import celery

import application.services.db_services as dbs

from application.utils.mail_utils import send_email

from application.utils.helpers import rows_to_dict

from application.services.student_services import get_eligible_students

@celery.task
def send_reminders():

    print("sending reminders...")

    today = date.today()

    print('date: ', today)

    drives = rows_to_dict(
            dbs.get_element(
            "drive",
            "status",
            "approved"
        )
    )

    print("drives:", drives)

    for drive in drives:

        print("drive:", drive)

        deadline = datetime.strptime(
            drive["application_deadline"],
            "%Y-%m-%d"
        ).date()

        days_remaining = (
            deadline - today
        ).days

        '''if days_remaining:
            continue'''

        eligible_students = get_eligible_students(drive['id'])
        print("students:", eligible_students)

        for student in eligible_students:

            send_email(

                student["email"],

                "Drive Closing Soon",

                f"""
                Drive:
                {drive['drive_name']}

                closes in
                {days_remaining}
                day(s).
                """

            )
        
    return(drives)