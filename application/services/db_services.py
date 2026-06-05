import application.utils.db_executors as dbe
from application.utils.constants import search_entities, corresponding_names

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
    dbe.SQL_modify(f"UPDATE {entity} SET {set_string} WHERE {parameter}='{value}'")
    return

# 6.3 - Get elements of entities with certain statuses with a limit
def get_elements(entity, status, limit):
    if limit != "all":
        if status != None:
            return dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE status='{status}' ORDER BY created_at DESC LIMIT {limit}")
        else:
            return dbe.SQL_fetch(f"SELECT * FROM {entity} ORDER BY created_at DESC LIMIT {limit}")
    else:
        if status != None:
            return dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE status='{status}' ORDER BY created_at DESC")
        else:
            return dbe.SQL_fetch(f"SELECT * FROM {entity} ORDER BY created_at DESC")

# 6.4 - Get groups of entities with certain statuses
def get_groups(entity, statuses):
    out = {}
    for status in statuses:
        out[status] = get_elements(entity, status, "all")
    return out

def get_search(query):
    out  = {}
    for entity in search_entities:
        name = corresponding_names['entity']
        out[entity] = dbe.SQL_fetch(f"SELECT * FROM {entity} WHERE {name} LIKE {query}")
        
    return out
