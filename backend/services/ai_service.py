from openai import OpenAI
from backend.config import Config
from backend.utils.cache import cache_result

class AIService:
    def __init__(self):
        self.client = OpenAI(api_key=Config.AI_API_KEY) if Config.AI_API_KEY else None
        self._cache_enabled = True
    
    def generate_page_content(self, prompt: str, page_type: str = 'landing') -> dict:
        """Generuje zawartość strony przez AI"""
        if not self.client:
            return {"success": False, "error": "AI_API_KEY nie jest skonfigurowany"}
        system_prompt = f"Jesteś ekspertem od tworzenia stron internetowych. Tworzysz {page_type} dla firmy ST KRAKOS."
        try:
            response = self.client.chat.completions.create(
                model=Config.AI_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.7
            )
            return {
                "success": True,
                "content": response.choices[0].message.content,
                "model": Config.AI_MODEL
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def generate_html_structure(self, content: dict) -> str:
        """Generuje strukturę HTML na podstawie zawartości"""
        html = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{content.get('title', 'ST KRAKOS')}</title>
</head>
<body>
    {content.get('content', '')}
</body>
</html>"""
        return html

