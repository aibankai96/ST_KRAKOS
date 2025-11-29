import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # DEBUG - sprawdzamy najpierw, bo jest używane w innych miejscach
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    
    # SECRET_KEY - wymagany w produkcji
    _secret_key = os.getenv('SECRET_KEY')
    if not _secret_key:
        if DEBUG:
            SECRET_KEY = 'dev-secret-key-change-in-production'
        else:
            raise ValueError("SECRET_KEY must be set in production environment! Set it in .env file.")
    else:
        SECRET_KEY = _secret_key
    
    AI_API_KEY = os.getenv('AI_API_KEY', '')
    AI_MODEL = os.getenv('AI_MODEL', 'gpt-4')
    PORT = int(os.getenv('PORT', 5000))
    
    # CORS_ORIGINS - nie pozwalamy na * w produkcji
    _cors_origins_str = os.getenv('CORS_ORIGINS', '')
    if not _cors_origins_str:
        if DEBUG:
            CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:5173']
        else:
            raise ValueError("CORS_ORIGINS must be set in production environment! Set it in .env file.")
    else:
        CORS_ORIGINS = _cors_origins_str.split(',')
    RATE_LIMIT_ENABLED = os.getenv('RATE_LIMIT_ENABLED', 'True').lower() == 'true'
    MAX_PROMPT_LENGTH = int(os.getenv('MAX_PROMPT_LENGTH', 5000))
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

