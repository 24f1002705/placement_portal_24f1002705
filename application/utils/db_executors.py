import sqlite3
import os

from click import Path

def SQL_fetch(query):
    # execute the query and fetch results
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results

def SQL_modify(query):
    # execute the query to modify the database (UPDATE, DELETE)
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()
    conn.close()
    return

def SQL_insert(query):
    # execute the query to insert into the database and return the inserted id
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()
    inserted_id = cursor.lastrowid
    conn.close()
    return inserted_id

def get_conn():
    print(get_db_url())
    print(os.path.exists(get_db_url()))
    conn = sqlite3.connect(get_db_url())
    conn.row_factory = sqlite3.Row
    return conn

def get_db_url():
    grandparent_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    string = os.path.join(grandparent_dir, "instance", 'application.db')
    print(string)
    return string