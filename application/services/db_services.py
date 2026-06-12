import application.executors.db_executors as dbe
from application.utils.constants import search_entities, corresponding_names
from application.utils.helpers import db_to_dict

# 6.1 - Get count of entities with a certain status
def get_count(entity, status):
    return dbe.SQL_fetch(f"SELECT COUNT(*) FROM {entity} WHERE status='{status}'")[0][0]

# 6.2 - Get counts of entities with certain statuses
def get_counts(entities, status):
    out = {}
    for entity in entities:
        out[entity] = get_count(entity, status)
    return out

# 6.5 - Get single element
def get_element(entity, parameter, value):
    return dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE {parameter}='{value}'")

def modify_element(entity, parameter, value, new_values):
    # new_values is a dictionary of column names and their new values
    set_string = ", ".join([f"{col}='{val}'" for col, val in new_values.items()])
    out = dbe.SQL_modify(f"UPDATE {entity} SET {set_string} WHERE {parameter}='{value}'")
    return out

def get_elements(entities, status, limit):
    out = {}
    for entity in entities:
        out[entity] = get_elements_loop(entity, status, limit)
    return out

# 6.3 - Get elements of entities with certain statuses with a limit
def get_elements_loop(entity, status, limit):
    if limit != "all":
        if status != None:
            # print(f"SELECT * FROM {entity} WHERE status='{status}' ORDER BY id DESC LIMIT {limit}")
            return dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE status='{status}' ORDER BY id DESC LIMIT {limit}")
        else:
            # print(f"SELECT * FROM {entity} ORDER BY id DESC LIMIT {limit}")
            return dbe.SQL_fetch(f"SELECT * FROM {entity} ORDER BY id DESC LIMIT {limit}")
    else:
        if status != None:
            return dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE status='{status}' ORDER BY id DESC")
        else:
            return dbe.SQL_fetch(f"SELECT * FROM {entity} ORDER BY id DESC")

def get_column_elements_loop(columns, entity, status, limit):
    # way to compose a string from columns list.
    if limit != "all":
        if status != None:
            # print(f"SELECT * FROM {entity} WHERE status='{status}' ORDER BY id DESC LIMIT {limit}")
            return dbe.SQL_fetch(f"SELECT {columns} FROM {entity} WHERE status='{status}' ORDER BY id DESC LIMIT {limit}")
        else:
            # print(f"SELECT * FROM {entity} ORDER BY id DESC LIMIT {limit}")
            return dbe.SQL_fetch(f"SELECT {columns} FROM {entity} ORDER BY id DESC LIMIT {limit}")
    else:
        if status != None:
            return dbe.SQL_fetch(f"SELECT {columns} FROM {entity} WHERE status='{status}' ORDER BY id DESC")
        else:
            return dbe.SQL_fetch(f"SELECT {columns} FROM {entity} ORDER BY id DESC")

# 6.4 - Get groups of entities with certain statuses
def get_groups(entity, statuses):
    out = {}
    for status in statuses:
        out[status] = get_element(entity, 'status', status)
    return out

def get_search(entity, query):
    name = corresponding_names[entity]
    print(f"SELECT * FROM {entity} WHERE {name} LIKE '%{query}%'")
    out = dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE {name} LIKE '%{query}%'")
    print(out)
    return out

def add_row(table, data):

    columns = ", ".join(data.keys())

    values = []

    for value in data.values():

        if value is None:
            values.append("NULL")

        elif isinstance(value, str):
            values.append(f"'{value}'")

        else:
            values.append(str(value))

    values = ", ".join(values)

    query = f"""
    INSERT INTO {table}
    ({columns})
    VALUES
    ({values})
    """

    return dbe.SQL_insert(query)