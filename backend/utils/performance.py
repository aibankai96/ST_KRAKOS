from functools import wraps
from typing import Callable, Any
import hashlib
import json
import time
from backend.utils.logger import setup_logger

logger = setup_logger()

# Cache functionality
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
    return time.time()

def _is_cache_valid(cache_key: str, ttl_seconds: int) -> bool:
    if cache_key not in _cache_ttl:
        return False
    current_time = _get_current_timestamp()
    cache_time = _cache_ttl[cache_key]
    return (current_time - cache_time) < ttl_seconds

# Monitoring functionality
class Metrics:
    def __init__(self):
        self.request_count = 0
        self.error_count = 0
        self.total_response_time = 0
        self.start_time = time.time()
    
    def record_request(self, response_time: float):
        self.request_count += 1
        self.total_response_time += response_time
    
    def record_error(self):
        self.error_count += 1
    
    def get_stats(self):
        avg_response_time = (
            self.total_response_time / self.request_count
            if self.request_count > 0 else 0
        )
        uptime = time.time() - self.start_time
        
        return {
            'request_count': self.request_count,
            'error_count': self.error_count,
            'avg_response_time_ms': round(avg_response_time * 1000, 2),
            'uptime_seconds': round(uptime, 2),
            'error_rate': round(
                (self.error_count / self.request_count * 100)
                if self.request_count > 0 else 0, 2
            )
        }

metrics = Metrics()

def monitor_performance(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            response_time = time.time() - start_time
            metrics.record_request(response_time)
            
            if response_time > 1.0:
                logger.warning(f"Slow request: {func.__name__} took {response_time:.2f}s")
            
            return result
        except Exception as e:
            metrics.record_error()
            logger.error(f"Error in {func.__name__}: {str(e)}")
            raise
    return wrapper

def get_metrics():
    return metrics.get_stats()

