import logging
import os
import json
from datetime import datetime
from flask import has_request_context, request
from backend.config import Config

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName
        }
        if has_request_context() and hasattr(request, 'request_id'):
            log_entry['request_id'] = request.request_id
        if record.exc_info:
            log_entry['exception'] = self.formatException(record.exc_info)
        return json.dumps(log_entry)

def setup_logger(name: str = "ST_KRAKOS") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, Config.LOG_LEVEL, logging.INFO))
    
    if not logger.handlers:
        use_json = os.getenv('LOG_JSON', 'False').lower() == 'true'
        if use_json:
            formatter = JSONFormatter()
        else:
            class RequestFormatter(logging.Formatter):
                def format(self, record):
                    msg = super().format(record)
                    if has_request_context() and hasattr(request, 'request_id'):
                        return f"[{request.request_id}] {msg}"
                    return msg
            formatter = RequestFormatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                datefmt='%Y-%m-%d %H:%M:%S'
            )
        
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
        
        if not os.path.exists('logs'):
            os.makedirs('logs')
        
        file_handler = logging.FileHandler(f'logs/app_{datetime.now().strftime("%Y%m%d")}.log')
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    
    return logger

