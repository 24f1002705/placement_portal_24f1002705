from celery import Celery
from celery.schedules import crontab

celery = Celery(
    "placement_portal",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

celery.conf.beat_schedule = {

    "daily-reminders": {

        "task":
            "application.tasks.reminder_tasks.send_reminders",

        "schedule": 
            crontab(
                    hour=8,
                    minute=0
                )
    },

    "monthly-report": {

        "task":
            "application.tasks.report_tasks.generate_monthly_report",

        "schedule":
            crontab(
                day_of_month=1,
                hour=8,
                minute=0
            )
            
    }
}

celery.conf.timezone = "Asia/Kolkata"

celery.conf.imports = (
    "application.tasks.export_tasks",
    "application.tasks.reminder_tasks",
    "application.tasks.report_tasks",
)