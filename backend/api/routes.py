from flask import Blueprint, request, jsonify
from backend.services.ai_service import AIService
from backend.utils.validators import Validator
from backend.utils.logger import setup_logger
from backend.utils.performance import monitor_performance, get_metrics

api_bp = Blueprint('api', __name__)
ai_service = AIService()
validator = Validator()
logger = setup_logger()

ERROR_CODES = {
    'VALIDATION': 'ERR_VALIDATION',
    'AI_TIMEOUT': 'ERR_AI_TIMEOUT',
    'AI_ERROR': 'ERR_AI_ERROR',
    'INTERNAL': 'ERR_INTERNAL'
}

def validate_request_data():
    data = request.get_json()
    if not data:
        return None, jsonify({"error": "Brak danych w żądaniu", "error_code": ERROR_CODES['VALIDATION']}), 400
    return data, None, None

def validate_and_log(field_name, validation_result, field_value=''):
    if not validation_result['valid']:
        logger.warning(f"Invalid {field_name}: {validation_result['error']}")
        return jsonify({"error": validation_result['error'], "error_code": ERROR_CODES['VALIDATION']}), 400
    return None

def handle_ai_error(result):
    error_msg = result.get('error', 'Błąd generowania')
    error_code = ERROR_CODES['AI_TIMEOUT'] if 'timeout' in error_msg.lower() else ERROR_CODES['AI_ERROR']
    logger.error(f"AI error: {error_msg}")
    return error_msg, error_code

@api_bp.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "ST KRAKOS Backend",
        "version": "1.0.0"
    })

@api_bp.route('/metrics', methods=['GET'])
def metrics():
    stats = get_metrics()
    return jsonify({
        "status": "ok",
        "metrics": stats
    })

@api_bp.route('/generate-page', methods=['POST'])
@monitor_performance
def generate_page():
    try:
        data, error_response, status_code = validate_request_data()
        if error_response:
            return error_response, status_code
        
        prompt = data.get('prompt', '')
        page_type = data.get('page_type', 'landing')
        title = data.get('title', 'ST KRAKOS')
        
        error_response = validate_and_log('prompt', validator.validate_prompt(prompt))
        if error_response:
            return error_response
        
        error_response = validate_and_log('page type', validator.validate_page_type(page_type))
        if error_response:
            return error_response
        
        error_response = validate_and_log('title', validator.validate_title(title))
        if error_response:
            return error_response
        
        sanitized_prompt = validator.sanitize_input(prompt)
        sanitized_title = validator.sanitize_input(title)
        
        logger.info(f"Generating page: type={page_type}, title={sanitized_title}")
        result = ai_service.generate_page_content(sanitized_prompt, page_type)
        
        if result['success']:
            html = ai_service.generate_html_structure({
                'title': sanitized_title,
                'content': result['content']
            })
            logger.info("Page generated successfully")
            return jsonify({"html": html, "content": result['content']})
        
        error_msg, error_code = handle_ai_error(result)
        return jsonify({"error": error_msg, "error_code": error_code}), 500
        
    except Exception as e:
        logger.error(f"Exception in generate_page: {str(e)}", exc_info=True)
        return jsonify({"error": "Wystąpił błąd podczas generowania strony", "error_code": ERROR_CODES['INTERNAL']}), 500

@api_bp.route('/generate-content', methods=['POST'])
@monitor_performance
def generate_content():
    try:
        data, error_response, status_code = validate_request_data()
        if error_response:
            return error_response, status_code
        
        prompt = data.get('prompt', '')
        
        error_response = validate_and_log('prompt', validator.validate_prompt(prompt))
        if error_response:
            return error_response
        
        sanitized_prompt = validator.sanitize_input(prompt)
        
        logger.info("Generating content")
        result = ai_service.generate_page_content(sanitized_prompt)
        
        if result['success']:
            logger.info("Content generated successfully")
        else:
            error_msg, error_code = handle_ai_error(result)
            result['error_code'] = error_code
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Exception in generate_content: {str(e)}", exc_info=True)
        return jsonify({"error": "Wystąpił błąd podczas generowania treści", "error_code": ERROR_CODES['INTERNAL']}), 500

