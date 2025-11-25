# CHECKLIST TESTÓW - ST KRAKOS

## ✅ Testy Struktury

### Backend
- [x] Struktura folderów poprawna
- [x] Wszystkie pliki __init__.py obecne
- [x] app.py - główna aplikacja Flask
- [x] config.py - konfiguracja
- [x] routes.py - endpointy API
- [x] ai_service.py - serwis AI
- [x] requirements.txt - zależności

### Frontend
- [x] Struktura folderów poprawna
- [x] index.html - główny plik HTML
- [x] main.js - punkt wejścia
- [x] router.js - routing SPA
- [x] layout.js - layout główny
- [x] Wszystkie strony (home, about, services, contact)
- [x] api/client.js - klient API
- [x] styles/main.css - style
- [x] package.json - zależności Node
- [x] vite.config.js - konfiguracja Vite

## ✅ Testy Składni

### Backend
- [x] app.py - poprawne importy, użycie jsonify
- [x] config.py - poprawne użycie os.getenv
- [x] routes.py - poprawne endpointy
- [x] ai_service.py - poprawne użycie OpenAI API

### Frontend
- [x] Wszystkie pliki JS - poprawne importy ES6
- [x] Router - poprawna logika nawigacji
- [x] Layout - poprawne renderowanie
- [x] API Client - poprawne użycie axios

## ✅ Testy Funkcjonalne (Do wykonania po uruchomieniu)

### Backend
- [ ] Endpoint /api/health zwraca status
- [ ] Endpoint /api/generate-page działa z promptem
- [ ] Endpoint /api/generate-content działa z promptem
- [ ] CORS działa poprawnie
- [ ] Obsługa błędów działa

### Frontend
- [ ] Aplikacja uruchamia się bez błędów
- [ ] Routing działa poprawnie
- [ ] Wszystkie strony renderują się
- [ ] API client łączy się z backendem
- [ ] Responsywność działa

## ⚠️ Wymagane do uruchomienia

### Backend
1. Python 3.11+ zainstalowany
2. Utworzenie środowiska wirtualnego: `python -m venv venv`
3. Aktywacja: `venv\Scripts\activate` (Windows)
4. Instalacja zależności: `pip install -r backend/requirements.txt`
5. Utworzenie pliku `.env` w folderze `backend/`:
   ```
   SECRET_KEY=your-secret-key
   AI_API_KEY=your-openai-api-key
   AI_MODEL=gpt-4
   PORT=5000
   DEBUG=False
   CORS_ORIGINS=http://localhost:3000
   ```
6. Uruchomienie: `python backend/app.py`

### Frontend
1. Node.js zainstalowany
2. Instalacja zależności: `npm install` (w folderze frontend)
3. Uruchomienie: `npm run dev`

## 📝 Notatki
- Wszystkie pliki mają poprawną składnię
- Importy są poprawne
- Struktura projektu jest zgodna z planem
- Gotowe do uruchomienia po konfiguracji środowiska

