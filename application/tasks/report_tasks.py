from application.celery_worker import celery

import application.services.db_services as dbs

from application.utils.mail_utils import send_email


@celery.task
def generate_monthly_report():

    print('sending report....')

    # TODO:
    # write proper SQL
    total_students = 0

    total_companies = 0

    total_drives = 0

    total_applications = 0

    total_offers = 0

    total_placed = 0

    report = f"""

    Monthly Placement Report

    Students:
    {total_students}

    Companies:
    {total_companies}

    Drives:
    {total_drives}

    Applications:
    {total_applications}

    Offers:
    {total_offers}

    Placed:
    {total_placed}

    """

    send_email(

        "a24f1002705@ds.study.iitm.ac.in",

        "Monthly Placement Report",

        report

    )

    return report