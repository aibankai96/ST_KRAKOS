from flask import jsonify
from backend.utils.logger import setup_logger

logger = setup_logger()

def register_error_handlers(app):
    @app.errorhandler(400)
    def bad_request(error):
        logger.warning(f"Bad request: {error.description}")
        return jsonify({"error": "Nieprawidłowe żądanie", "message": str(error)}), 400
    
    @app.errorhandler(404)
    def not_found(error):
        logger.warning(f"Not found: {error.description}")
        return jsonify({"error": "Endpoint nie został znaleziony"}), 404
    
    @app.errorhandler(429)
    def rate_limit_exceeded(error):
        logger.warning(f"Rate limit exceeded: {error.description}")
        return jsonify({
            "error": "Przekroczono limit żądań",
            "message": "Spróbuj ponownie za chwilę"
        }), 429
    
    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f"Internal error: {error.description}")
        return jsonify({
            "error": "Błąd serwera",
            "message": "Wystąpił błąd wewnętrzny. Spróbuj ponownie później."
        }), 500
    
    @app.errorhandler(Exception)
    def handle_exception(e):
        logger.error(f"Unhandled exception: {str(e)}", exc_info=True)
        return jsonify({
            "error": "Nieoczekiwany błąd",
            "message": "Wystąpił nieoczekiwany błąd. Skontaktuj się z administratorem."
        }), 500

