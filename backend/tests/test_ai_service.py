import pytest
from unittest.mock import Mock, patch
from backend.services.ai_service import AIService
from backend.config import Config

class TestAIService:
    def setup_method(self):
        self.service = AIService()
    
    def test_init_without_api_key(self):
        with patch.dict('os.environ', {'AI_API_KEY': ''}):
            service = AIService()
            assert service.client is None
    
    def test_generate_page_content_no_client(self):
        self.service.client = None
        result = self.service.generate_page_content("test prompt")
        assert result['success'] == False
        assert 'AI_API_KEY' in result['error']
    
    @patch('backend.services.ai_service.OpenAI')
    def test_generate_page_content_success(self, mock_openai):
        mock_client = Mock()
        mock_response = Mock()
        mock_response.choices = [Mock()]
        mock_response.choices[0].message.content = "Generated content"
        mock_client.chat.completions.create.return_value = mock_response
        self.service.client = mock_client
        
        result = self.service.generate_page_content("test prompt")
        assert result['success'] == True
        assert result['content'] == "Generated content"
    
    def test_generate_html_structure(self):
        content = {
            'title': 'Test Title',
            'content': '<p>Test content</p>'
        }
        html = self.service.generate_html_structure(content)
        assert 'Test Title' in html
        assert '<p>Test content</p>' in html
        assert '<!DOCTYPE html>' in html

