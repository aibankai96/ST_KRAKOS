import pytest
from backend.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

class TestHealthEndpoint:
    def test_health_endpoint(self, client):
        response = client.get('/api/health')
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'ok'
    
    def test_metrics_endpoint(self, client):
        response = client.get('/api/metrics')
        assert response.status_code == 200
        data = response.get_json()
        assert 'metrics' in data

class TestGeneratePageEndpoint:
    def test_generate_page_missing_prompt(self, client):
        response = client.post('/api/generate-page', json={})
        assert response.status_code == 400
    
    def test_generate_page_invalid_prompt(self, client):
        response = client.post('/api/generate-page', json={
            'prompt': 'ab',
            'page_type': 'landing'
        })
        assert response.status_code == 400
    
    def test_generate_page_invalid_type(self, client):
        response = client.post('/api/generate-page', json={
            'prompt': 'Stwórz stronę o AI',
            'page_type': 'invalid'
        })
        assert response.status_code == 400

class TestGenerateContentEndpoint:
    def test_generate_content_missing_prompt(self, client):
        response = client.post('/api/generate-content', json={})
        assert response.status_code == 400
    
    def test_generate_content_invalid_prompt(self, client):
        response = client.post('/api/generate-content', json={
            'prompt': 'ab'
        })
        assert response.status_code == 400

