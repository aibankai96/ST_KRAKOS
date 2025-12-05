from openai import OpenAI
from backend.config import Config
from backend.utils.performance import cache_result
from backend.utils.validators import Validator
import socket

class AIService:
    def __init__(self):
        self.client = OpenAI(api_key=Config.AI_API_KEY) if Config.AI_API_KEY else None
        self._cache_enabled = True
    
    @cache_result(ttl_seconds=3600)
    def generate_page_content(self, prompt: str, page_type: str = 'landing') -> dict:
        """Generuje zawartość strony przez AI"""
        if not self.client:
            return {"success": False, "error": "AI_API_KEY nie jest skonfigurowany"}
        system_prompt = f"Jesteś ekspertem od tworzenia stron internetowych. Tworzysz {page_type} dla firmy ST KRATOS."
        
        try:
            # OpenAI client w wersji 1.3.0 może mieć timeout w konfiguracji klienta
            # Używamy domyślnego timeoutu HTTP lub obsługujemy w exception
            response = self.client.chat.completions.create(
                model=Config.AI_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.7
            )
            
            # Sanityzacja odpowiedzi AI
            raw_content = response.choices[0].message.content
            sanitized_content = Validator.sanitize_html(raw_content, max_length=100000)
            
            return {
                "success": True,
                "content": sanitized_content,
                "model": Config.AI_MODEL
            }
        except (socket.timeout, TimeoutError) as e:
            return {"success": False, "error": "Request timeout - OpenAI API did not respond in time (30s limit)"}
        except Exception as e:
            error_msg = str(e).lower()
            # Sprawdzenie różnych wariantów błędów timeout
            timeout_keywords = ["timeout", "timed out", "connection timed out", "read timeout"]
            if any(keyword in error_msg for keyword in timeout_keywords):
                return {"success": False, "error": "Request timeout - OpenAI API did not respond in time (30s limit)"}
            return {"success": False, "error": f"OpenAI API error: {str(e)}"}
    
    def generate_html_structure(self, content: dict) -> str:
        """Generuje strukturę HTML na podstawie zawartości"""
        html = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{content.get('title', 'ST KRATOS')}</title>
</head>
<body>
    {content.get('content', '')}
</body>
</html>"""
        return html

