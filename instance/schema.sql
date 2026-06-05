PRAGMA foreign_keys = ON;

-- =====================================================
-- USER TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS user
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT,

    email           TEXT NOT NULL UNIQUE,

    username        TEXT NOT NULL UNIQUE,

    password_hash   TEXT NOT NULL,

    role            TEXT NOT NULL,

    role_id         INTEGER
);

-- =====================================================
-- STUDENT TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS student
(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id             INTEGER NOT NULL,

    name                TEXT NOT NULL,

    email               TEXT NOT NULL UNIQUE,

    degree              TEXT NOT NULL,

    department          TEXT NOT NULL,

    year                INTEGER NOT NULL,

    graduation_batch    TEXT NOT NULL,

    gpa                 REAL,

    resume_link         TEXT,

    status              TEXT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);

-- =====================================================
-- COMPANY TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS company
(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id             INTEGER NOT NULL,

    company_name        TEXT NOT NULL UNIQUE,

    logo                TEXT,

    description         TEXT,

    website             TEXT,

    email               TEXT NOT NULL UNIQUE,

    hr_contact_name     TEXT,

    hr_contact_number   TEXT,

    status              TEXT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);

-- =====================================================
-- DRIVE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS drive
(
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,

    drive_name              TEXT NOT NULL,

    company_id              INTEGER NOT NULL,

    company_name            TEXT NOT NULL,

    description             TEXT,

    salary                  REAL,

    location                TEXT,

    application_deadline    DATE NOT NULL,

    no_of_openings          INTEGER NOT NULL,

    eligibility_branches    TEXT,

    eligibility_degree      TEXT,

    eligibility_batch       TEXT,

    status                  TEXT NOT NULL,

    FOREIGN KEY (company_id)
        REFERENCES company(id)
        ON DELETE CASCADE
);

-- =====================================================
-- APPLICATION TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS application
(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,

    student_id          INTEGER NOT NULL,

    drive_id            INTEGER NOT NULL,

    application_date    DATE NOT NULL,

    status              TEXT NOT NULL,

    FOREIGN KEY (student_id)
        REFERENCES student(id)
        ON DELETE CASCADE,

    FOREIGN KEY (drive_id)
        REFERENCES drive(id)
        ON DELETE CASCADE
);