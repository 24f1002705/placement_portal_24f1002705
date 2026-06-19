import redis
import json


cache = redis.Redis(
    host="localhost",
    port=6379,
    db=1,
    decode_responses=True
)


def get_cache(key):

    value = cache.get(key)

    if value:

        return json.loads(value)

    return None


def set_cache(
    key,
    value,
    expiry=300
):

    cache.set(

        key,

        json.dumps(value),

        ex=expiry
    )


def delete_cache(key):

    cache.delete(key)