import pytest
from backend.utils.validators import Validator

class TestValidator:
    def setup_method(self):
        self.validator = Validator()
    
    def test_validate_prompt_valid(self):
        result = self.validator.validate_prompt("Stwórz stronę o AI")
        assert result['valid'] == True
    
    def test_validate_prompt_too_short(self):
        result = self.validator.validate_prompt("AI")
        assert result['valid'] == False
        assert 'minimum' in result['error'].lower()
    
    def test_validate_prompt_too_long(self):
        long_prompt = "a" * 6000
        result = self.validator.validate_prompt(long_prompt)
        assert result['valid'] == False
    
    def test_validate_prompt_dangerous_script(self):
        result = self.validator.validate_prompt("<script>alert('xss')</script>")
        assert result['valid'] == False
    
    def test_validate_page_type_valid(self):
        result = self.validator.validate_page_type("landing")
        assert result['valid'] == True
    
    def test_validate_page_type_invalid(self):
        result = self.validator.validate_page_type("invalid_type")
        assert result['valid'] == False
    
    def test_validate_title_valid(self):
        result = self.validator.validate_title("Test Title")
        assert result['valid'] == True
    
    def test_validate_title_too_short(self):
        result = self.validator.validate_title("AB")
        assert result['valid'] == False
    
    def test_sanitize_input(self):
        dangerous = "<script>alert('xss')</script>Test"
        sanitized = self.validator.sanitize_input(dangerous)
        assert "<script>" not in sanitized
        assert "Test" in sanitized

