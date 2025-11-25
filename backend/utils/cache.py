from functools import wraps
from typing import Callable, Any
import hashlib
import json

_cache = {}
_cache_ttl = {}

def cache_result(ttl_seconds: int = 300):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            cache_key = _generate_cache_key(func.__name__, args, kwargs)
            
            if cache_key in _cache:
                if _is_cache_valid(cache_key, ttl_seconds):
                    return _cache[cache_key]
                else:
                    del _cache[cache_key]
                    del _cache_ttl[cache_key]
            
            result = func(*args, **kwargs)
            _cache[cache_key] = result
            _cache_ttl[cache_key] = _get_current_timestamp()
            
            return result
        return wrapper
    return decorator

def _generate_cache_key(func_name: str, args: tuple, kwargs: dict) -> str:
    key_data = {
        'func': func_name,
        'args': str(args),
        'kwargs': json.dumps(kwargs, sort_keys=True)
    }
    key_string = json.dumps(key_data, sort_keys=True)
    return hashlib.md5(key_string.encode()).hexdigest()

def _get_current_timestamp() -> float:
    import time
    return time.time()

def _is_cache_valid(cache_key: str, ttl_seconds: int) -> bool:
    if cache_key not in _cache_ttl:
        return False
    current_time = _get_current_timestamp()
    cache_time = _cache_ttl[cache_key]
    return (current_time - cache_time) < ttl_seconds

def clear_cache():
    global _cache, _cache_ttl
    _cache.clear()
    _cache_ttl.clear()

def get_cache_stats():
    return {
        'entries': len(_cache),
        'size_mb': 0
    }

