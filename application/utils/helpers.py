def return_empty_JSON():
    return {
        "success": 0,
        "message": None,
        "data": None
    }


def orchestrate_JSON(data):
    # take in multiple JSONs as input
    # check if all are successful, if not return failure with message of the one that failed
    # if all are successful, combine data into one JSON and return
    out = return_empty_JSON()
    if data:
        out['success'] = 1
        out['data'] = data
    return out


def db_to_dict(db_output):
    # convert db output (list of tuples) to list of dictionaries
    out = {}
    keys = db_output.keys()
    for key in keys:
        out[key] = [ dict(row) for row in db_output[key] ]
    return out

def rows_to_dict(rows):
    return [dict(row) for row in rows]
