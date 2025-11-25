# ST KRAKOS - Strona Firmowa z AI

Strona firmowa ST KRAKOS wykorzystująca sztuczną inteligencję do generowania treści i stron internetowych.

## 🚀 Funkcjonalności

- **Generowanie Stron przez AI** - Panel administracyjny do tworzenia stron przez AI
- **Blog z AI** - Automatyczne generowanie artykułów blogowych
- **CMS** - System zarządzania treścią
- **SEO Optimization** - Meta tagi, structured data, Open Graph
- **Social Media Integration** - Udostępnianie na Facebook, Twitter, LinkedIn
- **Responsive Design** - Mobile-first, działa na wszystkich urządzeniach

## 🛠️ Technologie

### Backend
- Python 3.11+
- Flask
- OpenAI API
- Flask-Limiter (rate limiting)
- Pytest (testy)

### Frontend
- JavaScript (ES6+)
- Vite (build tool)
- Axios (HTTP client)
- Vanilla JS (bez frameworków)

## 📦 Instalacja

### Wymagania
- Python 3.11+
- Node.js 18+
- OpenAI API Key

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
# Utwórz .env z AI_API_KEY
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testy

```bash
# Backend
cd backend
pytest

# Z coverage
pytest --cov=backend --cov-report=html
```

## 📖 Dokumentacja

- [PLAN.md](PLAN.md) - Plan działania projektu
- [DEPLOYMENT.md](DEPLOYMENT.md) - Instrukcje deploymentu
- [STATUS.md](STATUS.md) - Status projektu

## 🔒 Bezpieczeństwo

- Rate limiting (200/dzień, 50/godzinę)
- Walidacja danych wejściowych
- Sanityzacja inputów
- Error handling
- Logowanie operacji

## 📝 API Endpoints

- `GET /api/health` - Status serwisu
- `GET /api/metrics` - Metryki wydajności
- `POST /api/generate-page` - Generowanie strony przez AI
- `POST /api/generate-content` - Generowanie treści przez AI

## 🎯 Struktura Projektu

```
.
├── backend/          # Backend Flask
│   ├── api/         # Endpointy API
│   ├── services/    # Serwisy (AI)
│   ├── middleware/  # Rate limiting, error handling
│   ├── utils/       # Narzędzia (validators, logger, monitoring)
│   └── tests/       # Testy
├── frontend/        # Frontend
│   ├── src/
│   │   ├── pages/   # Strony
│   │   ├── components/ # Komponenty
│   │   ├── api/     # API client
│   │   └── utils/   # Narzędzia (SEO, social)
│   └── tests/       # Testy
└── docs/            # Dokumentacja
```

## 📄 Licencja

Projekt ST KRAKOS - Wszystkie prawa zastrzeżone

## 👥 Autor

ST KRAKOS Team

---

**Status:** ✅ Gotowe do deploymentu
