from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import Flask

limiter = None

def init_rate_limiter(app: Flask):
    global limiter
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        default_limits=["200 per day", "50 per hour"],
        storage_uri="memory://"
    )
    return limiter

def get_limiter():
    return limiter

