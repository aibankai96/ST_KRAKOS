import re
from typing import Dict, Optional

class Validator:
    @staticmethod
    def validate_prompt(prompt: str, max_length: int = 5000) -> Dict[str, any]:
        if not prompt or not isinstance(prompt, str):
            return {"valid": False, "error": "Prompt musi być niepustym stringiem"}
        
        prompt = prompt.strip()
        
        if len(prompt) < 10:
            return {"valid": False, "error": "Prompt musi mieć minimum 10 znaków"}
        
        if len(prompt) > max_length:
            return {"valid": False, "error": f"Prompt nie może przekraczać {max_length} znaków"}
        
        if re.search(r'<script|javascript:|onerror=', prompt, re.IGNORECASE):
            return {"valid": False, "error": "Prompt zawiera niebezpieczne znaki"}
        
        return {"valid": True}
    
    @staticmethod
    def validate_page_type(page_type: str) -> Dict[str, any]:
        allowed_types = ['landing', 'about', 'product', 'blog', 'contact']
        if page_type not in allowed_types:
            return {"valid": False, "error": f"Typ strony musi być jednym z: {', '.join(allowed_types)}"}
        return {"valid": True}
    
    @staticmethod
    def validate_title(title: str, max_length: int = 200) -> Dict[str, any]:
        if not title or not isinstance(title, str):
            return {"valid": False, "error": "Tytuł jest wymagany"}
        
        title = title.strip()
        
        if len(title) < 3:
            return {"valid": False, "error": "Tytuł musi mieć minimum 3 znaki"}
        
        if len(title) > max_length:
            return {"valid": False, "error": f"Tytuł nie może przekraczać {max_length} znaków"}
        
        return {"valid": True}
    
    @staticmethod
    def sanitize_input(text: str) -> str:
        if not text:
            return ""
        text = text.strip()
        text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)
        text = re.sub(r'javascript:', '', text, flags=re.IGNORECASE)
        return text

