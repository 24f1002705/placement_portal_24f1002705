PRAGMA foreign_keys = ON;

-- =====================================================
-- USERS
-- =====================================================

INSERT INTO user
(email, username, password_hash, role, role_id)
VALUES
('[admin@portal.com](mailto:admin@portal.com)', 'admin', 'admin123', 'admin', NULL),

('[rahul@iitm.ac.in](mailto:rahul@iitm.ac.in)', 'rahul', 'password', 'student', NULL),

('[ananya@iitm.ac.in](mailto:ananya@iitm.ac.in)', 'ananya', 'password', 'student', NULL),

('[vikram@iitm.ac.in](mailto:vikram@iitm.ac.in)', 'vikram', 'password', 'student', NULL),

('[careers@tesla.com](mailto:careers@tesla.com)', 'tesla_hr', 'password', 'company', NULL),

('[recruiting@google.com](mailto:recruiting@google.com)', 'google_hr', 'password', 'company', NULL),

('[hr@drdo.gov.in](mailto:hr@drdo.gov.in)', 'drdo_hr', 'password', 'company', NULL);

-- =====================================================
-- STUDENTS
-- =====================================================

INSERT INTO student
(
id,
user_id,
name,
email,
degree,
department,
year,
graduation_batch,
gpa,
resume_link,
status
)
VALUES

(
1,
2,
'Rahul Sharma',
'[rahul@iitm.ac.in](mailto:rahul@iitm.ac.in)',
'B.Tech',
'CSE',
4,
'2026',
8.7,
'/resumes/rahul.pdf',
'active'
),

(
2,
3,
'Ananya Reddy',
'[ananya@iitm.ac.in](mailto:ananya@iitm.ac.in)',
'B.Tech',
'ECE',
4,
'2026',
9.1,
'/resumes/ananya.pdf',
'active'
),

(
3,
4,
'Vikram Iyer',
'[vikram@iitm.ac.in](mailto:vikram@iitm.ac.in)',
'B.Tech',
'Mechanical',
4,
'2026',
7.8,
'/resumes/vikram.pdf',
'active'
);

-- =====================================================
-- COMPANIES
-- =====================================================

INSERT INTO company
(
id,
user_id,
company_name,
logo,
description,
website,
email,
hr_contact_name,
hr_contact_number,
status
)
VALUES

(
1,
5,
'Tesla India',
NULL,
'EV and autonomy company',
'https://tesla.com',
'[careers@tesla.com](mailto:careers@tesla.com)',
'Priya Nair',
'9876543210',
'active'
),

(
2,
6,
'Google India',
NULL,
'Software and cloud services',
'https://google.com',
'[recruiting@google.com](mailto:recruiting@google.com)',
'Arjun Kapoor',
'9123456780',
'active'
),

(
3,
7,
'DRDO Labs',
NULL,
'Defense research organization',
'https://drdo.gov.in',
'[hr@drdo.gov.in](mailto:hr@drdo.gov.in)',
'Rajesh Verma',
'9988776655',
'inactive'
);

-- =====================================================
-- UPDATE ROLE IDS
-- =====================================================

UPDATE user
SET role_id = 1
WHERE id = 2;

UPDATE user
SET role_id = 2
WHERE id = 3;

UPDATE user
SET role_id = 3
WHERE id = 4;

UPDATE user
SET role_id = 1
WHERE id = 5;

UPDATE user
SET role_id = 2
WHERE id = 6;

UPDATE user
SET role_id = 3
WHERE id = 7;

-- =====================================================
-- DRIVES
-- =====================================================

INSERT INTO drive
(
id,
drive_name,
company_id,
company_name,
description,
salary,
location,
application_deadline,
no_of_openings,
eligibility_branches,
eligibility_degree,
eligibility_batch,
status
)
VALUES

(
1,
'Software Engineer',
2,
'Google India',
'Backend and distributed systems',
2500000,
'Bangalore',
'2026-08-15',
15,
'CSE,ECE',
'B.Tech',
'2026',
'active'
),

(
2,
'Controls Engineer',
1,
'Tesla India',
'Vehicle control systems',
1800000,
'Pune',
'2026-08-20',
8,
'CSE,ECE,Mechanical',
'B.Tech',
'2026',
'active'
),

(
3,
'Research Engineer',
3,
'DRDO Labs',
'Defense systems research',
1200000,
'Hyderabad',
'2026-09-01',
10,
'CSE,ECE,Mechanical',
'B.Tech',
'2026',
'inactive'
);

-- =====================================================
-- APPLICATIONS
-- =====================================================

INSERT INTO application
(
id,
student_id,
drive_id,
application_date,
status
)
VALUES

(
1,
1,
1,
'2026-07-01',
'applied'
),

(
2,
1,
2,
'2026-07-02',
'shortlisted'
),

(
3,
2,
1,
'2026-07-03',
'accepted'
),

(
4,
3,
2,
'2026-07-04',
'rejected'
);
