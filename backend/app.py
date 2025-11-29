from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from backend.config import Config
from backend.api.routes import api_bp
from backend.middleware.rate_limit import init_rate_limiter
from backend.middleware.error_handler import register_error_handlers
from backend.utils.logger import setup_logger

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=Config.CORS_ORIGINS)

logger = setup_logger()
limiter = init_rate_limiter(app)
register_error_handlers(app)

app.register_blueprint(api_bp, url_prefix='/api')

@app.before_request
def set_request_id():
    request.request_id = str(uuid.uuid4())[:8]

from functools import wraps
from flask_limiter.util import get_remote_address

def rate_limit_decorator(limit_str):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if limiter:
                limiter.limit(limit_str, key_func=get_remote_address)(f)(*args, **kwargs)
            return f(*args, **kwargs)
        return wrapper
    return decorator

@app.route('/')
def index():
    return jsonify({
        "message": "ST KRAKOS Backend API",
        "version": "1.0.0",
        "status": "operational"
    })

@app.route('/api/status')
def status():
    return jsonify({
        "status": "ok",
        "service": "ST KRAKOS Backend",
        "version": "1.0.0",
        "uptime": "operational"
    })

if __name__ == '__main__':
    logger.info("Starting ST KRAKOS Backend API")
    app.run(host='0.0.0.0', port=Config.PORT, debug=Config.DEBUG)

