from flask import Blueprint, request, jsonify
from backend.services.ai_service import AIService
from backend.utils.validators import Validator
from backend.utils.logger import setup_logger
from backend.utils.monitoring import monitor_performance, get_metrics

api_bp = Blueprint('api', __name__)
ai_service = AIService()
validator = Validator()
logger = setup_logger()

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
        data = request.get_json()
        if not data:
            return jsonify({"error": "Brak danych w żądaniu"}), 400
        
        prompt = data.get('prompt', '')
        page_type = data.get('page_type', 'landing')
        title = data.get('title', 'ST KRAKOS')
        
        prompt_validation = validator.validate_prompt(prompt)
        if not prompt_validation['valid']:
            logger.warning(f"Invalid prompt: {prompt_validation['error']}")
            return jsonify({"error": prompt_validation['error']}), 400
        
        page_type_validation = validator.validate_page_type(page_type)
        if not page_type_validation['valid']:
            logger.warning(f"Invalid page type: {page_type_validation['error']}")
            return jsonify({"error": page_type_validation['error']}), 400
        
        title_validation = validator.validate_title(title)
        if not title_validation['valid']:
            logger.warning(f"Invalid title: {title_validation['error']}")
            return jsonify({"error": title_validation['error']}), 400
        
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
        
        logger.error(f"Page generation failed: {result.get('error')}")
        return jsonify({"error": result.get('error', 'Błąd generowania')}), 500
        
    except Exception as e:
        logger.error(f"Exception in generate_page: {str(e)}", exc_info=True)
        return jsonify({"error": "Wystąpił błąd podczas generowania strony"}), 500

@api_bp.route('/generate-content', methods=['POST'])
@monitor_performance
def generate_content():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Brak danych w żądaniu"}), 400
        
        prompt = data.get('prompt', '')
        
        prompt_validation = validator.validate_prompt(prompt)
        if not prompt_validation['valid']:
            logger.warning(f"Invalid prompt: {prompt_validation['error']}")
            return jsonify({"error": prompt_validation['error']}), 400
        
        sanitized_prompt = validator.sanitize_input(prompt)
        
        logger.info("Generating content")
        result = ai_service.generate_page_content(sanitized_prompt)
        
        if result['success']:
            logger.info("Content generated successfully")
        else:
            logger.error(f"Content generation failed: {result.get('error')}")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Exception in generate_content: {str(e)}", exc_info=True)
        return jsonify({"error": "Wystąpił błąd podczas generowania treści"}), 500

