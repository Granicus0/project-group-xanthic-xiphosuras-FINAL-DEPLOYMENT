import json
import sys

__params = dict()
__cache = dict()
__auto_send = True


def set_value(key, value):
    __cache[key] = value
    if __auto_send:
        __send_to_js()


def get_value(key, default_value=None):
    if contains_value(key):
        return __params[key]
    else:
        return default_value


def contains_value(key):
    return key in __params


def set_auto_send(value: bool):
    _auto_send = value
    if value:
        __send_to_js()

def get_auto_send()->bool:
    return __auto_send

def send():
    if not __auto_send:
        __send_to_js()


def __send_to_js():
    if len(__cache) > 0:
        __params.update(__cache)
        data = json.dumps(__cache)
        __cache.clear()
        print(f"<params_start>{data}<params_end>", end="")



