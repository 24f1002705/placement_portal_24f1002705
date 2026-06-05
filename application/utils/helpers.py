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
    return