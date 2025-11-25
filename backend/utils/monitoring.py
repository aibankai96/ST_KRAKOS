import time
from functools import wraps
from typing import Callable
from backend.utils.logger import setup_logger

logger = setup_logger()

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

