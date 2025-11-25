# DEPLOYMENT GUIDE - ST KRAKOS

## Wymagania

### Backend
- Python 3.11+
- pip
- Virtual environment (venv)

### Frontend
- Node.js 18+
- npm lub yarn

---

## Instalacja i Uruchomienie

### 1. Backend

```bash
# Przejdź do folderu backend
cd backend

# Utwórz środowisko wirtualne
python -m venv venv

# Aktywuj środowisko
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Zainstaluj zależności
pip install -r requirements.txt

# Utwórz plik .env
# Skopiuj .env.example i uzupełnij:
SECRET_KEY=your-secret-key-here
AI_API_KEY=your-openai-api-key-here
AI_MODEL=gpt-4
PORT=5000
DEBUG=False
CORS_ORIGINS=http://localhost:3000,http://localhost:8080

# Uruchom serwer
python app.py
```

Backend będzie dostępny na: `http://localhost:5000`

### 2. Frontend

```bash
# Przejdź do folderu frontend
cd frontend

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Frontend będzie dostępny na: `http://localhost:3000`

### 3. Build produkcyjny

```bash
# Frontend - build
cd frontend
npm run build

# Pliki produkcyjne będą w folderze dist/
```

---

## Testy

### Backend

```bash
cd backend

# Uruchom wszystkie testy
pytest

# Z coverage
pytest --cov=backend --cov-report=html

# Tylko konkretny plik
pytest tests/test_validators.py
```

### Frontend

```bash
cd frontend

# Testy (jeśli dodane)
npm test
```

---

## Deployment na Produkcję

### Backend (Python/Flask)

#### Opcja 1: Gunicorn (Linux/Mac)

```bash
pip install gunicorn

# Uruchomienie
gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
```

#### Opcja 2: Docker

```dockerfile
# Dockerfile (utwórz w głównym folderze)
FROM python:3.11-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .
ENV FLASK_APP=app.py

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

```bash
# Build
docker build -t st-krakos-backend .

# Run
docker run -p 5000:5000 --env-file backend/.env st-krakos-backend
```

### Frontend

#### Opcja 1: Nginx

```nginx
# /etc/nginx/sites-available/st-krakos
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/st-krakos/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Opcja 2: Vercel/Netlify

```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm install -g netlify-cli
netlify deploy --prod
```

---

## Zmienne Środowiskowe

### Backend (.env)

```env
SECRET_KEY=your-secret-key-change-in-production
AI_API_KEY=sk-...
AI_MODEL=gpt-4
PORT=5000
DEBUG=False
CORS_ORIGINS=https://yourdomain.com
RATE_LIMIT_ENABLED=True
MAX_PROMPT_LENGTH=5000
LOG_LEVEL=INFO
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## Monitoring

### Health Checks

```bash
# Sprawdź status
curl http://localhost:5000/api/health

# Sprawdź metryki
curl http://localhost:5000/api/metrics
```

### Logi

Logi backendu znajdują się w: `backend/logs/app_YYYYMMDD.log`

---

## Bezpieczeństwo

1. **Zmień SECRET_KEY** w produkcji
2. **Wyłącz DEBUG** w produkcji
3. **Skonfiguruj CORS** dla konkretnych domen
4. **Użyj HTTPS** w produkcji
5. **Rate limiting** jest włączony domyślnie
6. **Walidacja danych** jest aktywna

---

## Troubleshooting

### Backend nie startuje
- Sprawdź czy Python 3.11+ jest zainstalowany
- Sprawdź czy wszystkie zależności są zainstalowane
- Sprawdź czy plik .env istnieje i ma poprawne wartości

### Frontend nie łączy się z backendem
- Sprawdź czy backend działa na porcie 5000
- Sprawdź CORS_ORIGINS w .env backendu
- Sprawdź proxy w vite.config.js

### Błędy AI API
- Sprawdź czy AI_API_KEY jest poprawny
- Sprawdź czy masz dostęp do modelu gpt-4
- Sprawdź limity API OpenAI

---

## Backup

### Dane w localStorage (Frontend)
- Artykuły blogowe
- Wygenerowane strony
- Treść CMS

**Uwaga:** W produkcji rozważ użycie bazy danych zamiast localStorage.

---

## Wsparcie

W razie problemów sprawdź:
- Logi w `backend/logs/`
- Console w przeglądarce (F12)
- Network tab w DevTools

