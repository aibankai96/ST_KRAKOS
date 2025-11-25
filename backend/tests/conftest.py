import pytest
import os
from backend.app import app

@pytest.fixture(scope='session')
def test_app():
    app.config['TESTING'] = True
    app.config['AI_API_KEY'] = 'test-key'
    app.config['SECRET_KEY'] = 'test-secret-key'
    return app

@pytest.fixture
def client(test_app):
    return test_app.test_client()

