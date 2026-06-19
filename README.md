# Placement Portal Application

## Prerequisites

Install the following software before running the project:

* Python 3.12+ (or version used during development)
* Redis Server
* Git

Verify installation:

```bash
python --version
redis-server --version
git --version
```

---

## Clone Repository

```bash
git clone <repository-url>
cd placement_portal_24f1002705
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv .venv
```

Activate:

```bash
.venv\Scripts\activate
```

### Linux / WSL

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Email

Open:

```text
application/utils/constants.py
```

Update:

```python
email_id = "your_email@gmail.com"

email_app_password = "your_gmail_app_password"
```

Note:

For Gmail, generate an App Password from Google Account Settings and use that password instead of your normal Gmail password.

---

## Start Redis Server

### Windows (Redis Installed)

```bash
redis-server
```

### WSL

```bash
redis-server
```

Expected output:

```text
Ready to accept connections
```

Leave this terminal running.

---

## Start Flask Application

Open a new terminal.

Activate the virtual environment.

### Windows

```bash
.venv\Scripts\activate
```

### Linux / WSL

```bash
source .venv/bin/activate
```

Run:

```bash
python app.py
```

Leave this terminal running.

---

## Start Celery Worker

Open another terminal.

Activate the virtual environment.

Run:

```bash
celery -A application.celery_worker.celery worker --pool=solo --loglevel=info
```

Expected output:

```text
celery@<hostname> ready.
```

Leave this terminal running.

---

## Start Celery Beat Scheduler

Open another terminal.

Activate the virtual environment.

Run:

```bash
celery -A application.celery_worker.celery beat --loglevel=info
```

Expected output:

```text
beat: Starting...
```

Leave this terminal running.

---

## Open Application

Navigate to:

```text
http://localhost:5000
```

---

## Default Admin Login

```text
Email: <admin email>

Password: <admin password>
```

(Replace with actual credentials created during database initialization.)

---

## Background Jobs Implemented

### Daily Reminder Job

Runs periodically using Celery Beat.

Function:

* Identifies eligible students.
* Checks application deadlines.
* Sends reminder emails.

---

### Monthly Activity Report

Runs periodically using Celery Beat.

Function:

* Generates placement statistics.
* Sends report to administrator email.

---

### CSV Export Job

Triggered by student.

Function:

* Generates application history CSV.
* Exports data asynchronously using Celery.
* Sends generated CSV to student email.

---

## Redis Usage

### Celery Queue

Redis Database 0

Used for:

* Task queue
* Result backend

### Caching

Redis Database 1

Used for:

* Dashboard caching
* Performance optimization
* Cache expiry and invalidation

---

## Stopping Application

Press:

```text
CTRL + C
```

in:

1. Flask terminal
2. Celery Worker terminal
3. Celery Beat terminal
4. Redis terminal

to stop all services.
