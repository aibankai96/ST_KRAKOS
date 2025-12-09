"""
KOMPLEKSOWE TESTY BACKEND
Testy jednostkowe, integracyjne, systemowe, wydajnościowe, bezpieczeństwa, itp.
"""

import pytest
import time
import json
from backend.app import app
from backend.utils.validators import Validator
from backend.services.ai_service import AIService


@pytest.fixture
def client():
    """Fixture dla testowego klienta Flask"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def validator():
    """Fixture dla walidatora"""
    return Validator()


@pytest.fixture
def ai_service():
    """Fixture dla serwisu AI"""
    return AIService()


# ============================================
# 1. TESTY JEDNOSTKOWE (Unit Tests)
# ============================================
class TestUnitTests:
    """Testy jednostkowe"""
    
    def test_validator_exists(self, validator):
        """Test czy walidator istnieje"""
        assert validator is not None
        assert isinstance(validator, Validator)
    
    def test_validate_prompt(self, validator):
        """Test walidacji promptu"""
        assert validator.validate_prompt("Test prompt")['valid'] is True
        assert validator.validate_prompt("ab")['valid'] is False
    
    def test_validate_email_pattern(self, validator):
        """Test wzorca email"""
        # Walidator nie ma metody email, ale możemy przetestować prompt
        result = validator.validate_prompt("test@example.com")
        assert result['valid'] is True
    
    def test_validate_page_type(self, validator):
        """Test walidacji typu strony"""
        valid_types = ['landing', 'about', 'product', 'blog', 'contact']
        for page_type in valid_types:
            result = validator.validate_page_type(page_type)
            assert result['valid'] is True
        
        result = validator.validate_page_type('invalid')
        assert result['valid'] is False
    
    def test_sanitize_input(self, validator):
        """Test sanityzacji inputu"""
        malicious = "<script>alert('XSS')</script>"
        sanitized = validator.sanitize_input(malicious)
        assert '<script>' not in sanitized
        assert 'alert' not in sanitized


# ============================================
# 2. TESTY INTEGRACYJNE (Integration Tests)
# ============================================
class TestIntegrationTests:
    """Testy integracyjne"""
    
    def test_health_endpoint_integration(self, client):
        """Test integracji endpointu health"""
        response = client.get('/api/health')
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'ok'
        assert 'service' in data
    
    def test_metrics_endpoint_integration(self, client):
        """Test integracji endpointu metrics"""
        response = client.get('/api/metrics')
        assert response.status_code == 200
        data = response.get_json()
        assert 'metrics' in data
    
    def test_validator_and_routes_integration(self, client, validator):
        """Test integracji walidatora z routami"""
        # Test z nieprawidłowym promptem
        response = client.post('/api/generate-page', json={
            'prompt': 'ab',
            'page_type': 'landing'
        })
        assert response.status_code == 400


# ============================================
# 3. TESTY SYSTEMOWE (System Tests)
# ============================================
class TestSystemTests:
    """Testy systemowe"""
    
    def test_full_system_flow(self, client):
        """Test pełnego przepływu systemu"""
        # Health check
        health = client.get('/api/health')
        assert health.status_code == 200
        
        # Metrics
        metrics = client.get('/api/metrics')
        assert metrics.status_code == 200
    
    def test_error_handling_system(self, client):
        """Test systemu obsługi błędów"""
        # Nieprawidłowy endpoint
        response = client.get('/api/nonexistent')
        assert response.status_code == 404
        
        # Nieprawidłowe dane
        response = client.post('/api/generate-page', json={})
        assert response.status_code == 400


# ============================================
# 4. TESTY WYDAJNOŚCIOWE (Performance Tests)
# ============================================
class TestPerformanceTests:
    """Testy wydajnościowe"""
    
    def test_health_endpoint_performance(self, client):
        """Test wydajności endpointu health"""
        start = time.time()
        response = client.get('/api/health')
        end = time.time()
        
        assert response.status_code == 200
        assert (end - start) < 0.1  # Powinno być szybkie
    
    def test_metrics_endpoint_performance(self, client):
        """Test wydajności endpointu metrics"""
        start = time.time()
        response = client.get('/api/metrics')
        end = time.time()
        
        assert response.status_code == 200
        assert (end - start) < 0.2
    
    def test_validator_performance(self, validator):
        """Test wydajności walidatora"""
        start = time.time()
        for _ in range(100):
            validator.validate_prompt("Test prompt")
        end = time.time()
        
        assert (end - start) < 1.0  # 100 walidacji w < 1s


# ============================================
# 5. TESTY OBCIĄŻENIOWE (Load Tests)
# ============================================
class TestLoadTests:
    """Testy obciążeniowe"""
    
    def test_multiple_health_requests(self, client):
        """Test wielu requestów health"""
        for _ in range(50):
            response = client.get('/api/health')
            assert response.status_code == 200
    
    def test_multiple_validation_requests(self, validator):
        """Test wielu requestów walidacji"""
        for _ in range(1000):
            result = validator.validate_prompt("Test prompt")
            assert result['valid'] is True


# ============================================
# 6. TESTY BEZPIECZEŃSTWA (Security Tests)
# ============================================
class TestSecurityTests:
    """Testy bezpieczeństwa"""
    
    def test_xss_protection(self, validator):
        """Test ochrony przed XSS"""
        xss_attempts = [
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert('XSS')>",
            "javascript:alert('XSS')"
        ]
        
        for attempt in xss_attempts:
            sanitized = validator.sanitize_input(attempt)
            assert '<script>' not in sanitized.lower()
            assert 'javascript:' not in sanitized.lower()
    
    def test_sql_injection_protection(self, validator):
        """Test ochrony przed SQL injection"""
        sql_attempts = [
            "'; DROP TABLE users; --",
            "' OR '1'='1",
            "'; INSERT INTO users VALUES ('admin', 'password'); --"
        ]
        
        for attempt in sql_attempts:
            sanitized = validator.sanitize_input(attempt)
            # Sprawdź czy niebezpieczne znaki są usunięte lub escapowane
            assert "DROP" not in sanitized.upper()
    
    def test_input_length_limits(self, validator):
        """Test limitów długości inputu"""
        # Zbyt długi prompt
        long_prompt = "a" * 10001
        result = validator.validate_prompt(long_prompt)
        assert result['valid'] is False
    
    def test_special_characters_handling(self, validator):
        """Test obsługi znaków specjalnych"""
        special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
        sanitized = validator.sanitize_input(special_chars)
        # Powinno być bezpiecznie przetworzone
        assert isinstance(sanitized, str)


# ============================================
# 7. TESTY ODPORNOŚCIOWE (Resilience Tests)
# ============================================
class TestResilienceTests:
    """Testy odpornościowe"""
    
    def test_missing_data_handling(self, client):
        """Test obsługi brakujących danych"""
        response = client.post('/api/generate-page', json={})
        assert response.status_code == 400
    
    def test_invalid_json_handling(self, client):
        """Test obsługi nieprawidłowego JSON"""
        response = client.post('/api/generate-page', 
                              data='invalid json',
                              content_type='application/json')
        assert response.status_code == 400
    
    def test_empty_string_handling(self, validator):
        """Test obsługi pustych stringów"""
        result = validator.validate_prompt("")
        assert result['valid'] is False
        
        result = validator.validate_prompt("   ")
        assert result['valid'] is False


# ============================================
# 8. TESTY REGRESYJNE (Regression Tests)
# ============================================
class TestRegressionTests:
    """Testy regresyjne"""
    
    def test_health_endpoint_stability(self, client):
        """Test stabilności endpointu health"""
        # Wykonaj wiele razy - powinno działać identycznie
        results = []
        for _ in range(10):
            response = client.get('/api/health')
            results.append(response.get_json())
        
        # Wszystkie odpowiedzi powinny być identyczne
        first_result = results[0]
        for result in results[1:]:
            assert result == first_result
    
    def test_validator_consistency(self, validator):
        """Test spójności walidatora"""
        test_cases = [
            ("Valid prompt", True),
            ("ab", False),
            ("a" * 100, True),
            ("a" * 10001, False)
        ]
        
        for prompt, expected_valid in test_cases:
            result = validator.validate_prompt(prompt)
            assert (result['valid'] == expected_valid) or (len(prompt) > 10000 and not result['valid'])


# ============================================
# 9. TESTY SMOKE (Smoke Tests)
# ============================================
class TestSmokeTests:
    """Testy smoke"""
    
    def test_app_starts(self, client):
        """Test czy aplikacja się uruchamia"""
        response = client.get('/api/health')
        assert response.status_code == 200
    
    def test_basic_endpoints_work(self, client):
        """Test czy podstawowe endpointy działają"""
        health = client.get('/api/health')
        assert health.status_code == 200
        
        metrics = client.get('/api/metrics')
        assert metrics.status_code == 200


# ============================================
# 10. TESTY SANITY (Sanity Tests)
# ============================================
class TestSanityTests:
    """Testy sanity"""
    
    def test_health_returns_ok(self, client):
        """Test czy health zwraca OK"""
        response = client.get('/api/health')
        data = response.get_json()
        assert data['status'] == 'ok'
    
    def test_validator_basic_functionality(self, validator):
        """Test podstawowej funkcjonalności walidatora"""
        assert validator.validate_prompt("Test")['valid'] is True
        assert validator.validate_prompt("a")['valid'] is False


# ============================================
# 11. TESTY CZARNEJ SKRZYNKI (Black Box Tests)
# ============================================
class TestBlackBoxTests:
    """Testy czarnej skrzynki"""
    
    def test_health_input_output(self, client):
        """Test: wejście GET /api/health, wyjście: status ok"""
        response = client.get('/api/health')
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'ok'
    
    def test_generate_page_invalid_input(self, client):
        """Test: wejście nieprawidłowe, wyjście: błąd 400"""
        response = client.post('/api/generate-page', json={'prompt': 'ab'})
        assert response.status_code == 400


# ============================================
# 12. TESTY BIAŁEJ SKRZYNKI (White Box Tests)
# ============================================
class TestWhiteBoxTests:
    """Testy białej skrzynki"""
    
    def test_all_validation_paths(self, validator):
        """Test wszystkich ścieżek walidacji"""
        # Prawidłowy prompt
        assert validator.validate_prompt("Valid prompt")['valid'] is True
        
        # Zbyt krótki
        assert validator.validate_prompt("ab")['valid'] is False
        
        # Zbyt długi (jeśli jest limit)
        long_prompt = "a" * 10001
        result = validator.validate_prompt(long_prompt)
        assert result['valid'] is False
    
    def test_all_page_types(self, validator):
        """Test wszystkich typów stron"""
        valid_types = ['landing', 'about', 'product', 'blog', 'contact']
        for page_type in valid_types:
            assert validator.validate_page_type(page_type)['valid'] is True
        
        assert validator.validate_page_type('invalid')['valid'] is False


# ============================================
# 13. TESTY STRUKTURY
# ============================================
class TestStructureTests:
    """Testy struktury"""
    
    def test_app_structure(self):
        """Test struktury aplikacji"""
        assert hasattr(app, 'config')
        assert hasattr(app, 'register_blueprint')
    
    def test_validator_structure(self, validator):
        """Test struktury walidatora"""
        assert hasattr(validator, 'validate_prompt')
        assert hasattr(validator, 'validate_page_type')
        assert hasattr(validator, 'sanitize_input')
    
    def test_response_structure(self, client):
        """Test struktury odpowiedzi"""
        response = client.get('/api/health')
        data = response.get_json()
        assert isinstance(data, dict)
        assert 'status' in data


# ============================================
# 14. TESTY KODU
# ============================================
class TestCodeTests:
    """Testy kodu"""
    
    def test_imports_work(self):
        """Test czy importy działają"""
        from backend.app import app
        from backend.utils.validators import Validator
        from backend.services.ai_service import AIService
        
        assert app is not None
        assert Validator is not None
        assert AIService is not None
    
    def test_functions_exist(self, validator):
        """Test czy funkcje istnieją"""
        assert callable(validator.validate_prompt)
        assert callable(validator.validate_page_type)
        assert callable(validator.sanitize_input)


# ============================================
# 15. TESTY PROCESÓW
# ============================================
class TestProcessTests:
    """Testy procesów"""
    
    def test_request_process(self, client):
        """Test procesu requestu"""
        # Request -> Validation -> Response
        response = client.get('/api/health')
        assert response.status_code == 200
    
    def test_validation_process(self, validator):
        """Test procesu walidacji"""
        result = validator.validate_prompt("Test")
        assert 'valid' in result
        assert isinstance(result['valid'], bool)

