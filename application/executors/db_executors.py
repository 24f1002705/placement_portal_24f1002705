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
    success = 1
    try:
        cursor.execute(query)
        conn.commit()
    except Exception as e:
        print(f"Error occurred while modifying database: {e}")
        success = 0
    finally:
        conn.close()    
    return success
    

def SQL_insert(query):
    # execute the query to insert into the database and return the inserted id
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()
        print(cursor.lastrowid)
        return cursor.lastrowid
    except Exception as e:
        conn.rollback()
        print(f"Insertion failed: {e}")
        return None
    finally:
        conn.close() 

def get_conn():
    conn = sqlite3.connect(get_db_url())
    conn.row_factory = sqlite3.Row
    return conn

def get_db_url():
    grandparent_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    string = os.path.join(grandparent_dir, "instance", 'application.db')
    return string