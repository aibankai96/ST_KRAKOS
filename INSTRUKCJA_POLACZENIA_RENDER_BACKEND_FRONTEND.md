# 🚀 Kompletna Instrukcja - Połączenie Backend i Frontend na Renderze

**Data:** 2025-01-27  
**Aplikacja:** ST KRATOS  
**Status:** Gotowe do wdrożenia

---

## 📋 Przegląd

Aplikacja składa się z dwóch części:
1. **Backend** - Python Flask API (`backend/`)
2. **Frontend** - Static Site (Vite + Vanilla JS) (`frontend/`)

---

## 🎯 OPCJA 1: Automatyczna Konfiguracja (ZALECANA)

Render automatycznie wykryje plik `render.yaml` i skonfiguruje oba serwisy!

### Krok 1: Użyj Blueprint

1. Przejdź do [Render Dashboard](https://dashboard.render.com)
2. Kliknij **"New +"** (w prawym górnym rogu)
3. Wybierz **"Blueprint"** (NIE "Web Service" lub "Static Site")
4. Połącz z repozytorium:
   - **Public Git Repository:** `https://github.com/aibankai96/ST_KRAKOS`
   - **Branch:** `cleanup/safe-2025`
5. Render automatycznie wykryje `render.yaml` i utworzy oba serwisy!

### Krok 2: Konfiguracja Zmiennych Środowiskowych

Po utworzeniu serwisów przez Blueprint, musisz ustawić zmienne środowiskowe:

#### Backend - Zmienne Środowiskowe:

1. Przejdź do **Backend Service** (`st-krakos-backend`)
2. Kliknij **"Environment"** w menu bocznym
3. Dodaj następujące zmienne:

| Key | Value | Opis |
|-----|-------|------|
| `FLASK_ENV` | `production` | Środowisko produkcyjne |
| `PORT` | `5000` | Port aplikacji (Render automatycznie ustawia) |
| `SECRET_KEY` | `[WYGENERUJ LOSOWY KLUCZ]` | Klucz szyfrowania (np. użyj: `python -c "import secrets; print(secrets.token_hex(32))"`) |
| `AI_API_KEY` | `[TWÓJ KLUCZ OPENAI]` | Klucz API OpenAI (sync: false) |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | URL frontendu (ustawisz po wdrożeniu frontendu) |

**WAŻNE:** 
- `SECRET_KEY` jest **wymagany** w produkcji - Render nie pozwoli na uruchomienie bez niego
- `CORS_ORIGINS` możesz zaktualizować po wdrożeniu frontendu

#### Frontend - Zmienne Środowiskowe:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij **"Environment"** w menu bocznym
3. Dodaj następujące zmienne:

| Key | Value | Opis |
|-----|-------|------|
| `NODE_ENV` | `production` | Środowisko produkcyjne |
| `RENDER` | `true` | Włącz dynamiczny base path |
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | URL backendu (ustawisz po wdrożeniu backendu) |

**WAŻNE:**
- `VITE_API_URL` możesz zaktualizować po wdrożeniu backendu

---

## 🔧 OPCJA 2: Ręczna Konfiguracja

Jeśli chcesz ręcznie skonfigurować serwisy lub Blueprint nie działa:

### BACKEND - Web Service (Python)

#### Krok 1: Utwórz Web Service

1. W Render Dashboard kliknij **"New +"**
2. Wybierz **"Web Service"**

#### Krok 2: Połączenie z Repozytorium

1. **Connect account** (jeśli jeszcze nie połączone):
   - Wybierz **GitHub**
   - Autoryzuj dostęp do repozytorium

2. **Select repository:**
   - Wybierz: `aibankai96 / ST_KRAKOS`
   - Lub użyj: `https://github.com/aibankai96/ST_KRAKOS`

#### Krok 3: Konfiguracja Backendu

Wypełnij formularz:

| Pole | Wartość | Opis |
|------|---------|------|
| **Name** | `st-krakos-backend` | Nazwa serwisu |
| **Language** | Zmień z "Node" na **"Python 3"** | ⚠️ WAŻNE! |
| **Branch** | `cleanup/safe-2025` | Branch z kodem |
| **Root Directory** | *(zostaw puste)* | Render będzie w katalogu głównym |
| **Build Command** | `pip install -r backend/requirements.txt` | Instalacja zależności |
| **Start Command** | `python -m backend.app` | ⚠️ WAŻNE: użyj modułu Python, NIE `cd backend && python app.py` |
| **Instance Type** | Wybierz **Free** (dla testów) lub **Starter** ($7/miesiąc) | |

**WAŻNE - Start Command:**
- ✅ **POPRAWNIE:** `python -m backend.app` (uruchamia z katalogu głównego jako moduł)
- ❌ **BŁĘDNIE:** `cd backend && python app.py` (błąd: ModuleNotFoundError)
- ❌ **BŁĘDNIE:** `python backend/app.py` (błąd: ścieżki importów)

**Wyjaśnienie:** Aplikacja używa importów typu `from backend.config import Config`, które wymagają uruchomienia z katalogu głównego projektu jako modułu Python.

#### Krok 4: Environment Variables dla Backendu

Kliknij **"Add Environment Variable"** i dodaj:

| Key | Value | Opis |
|-----|-------|------|
| `FLASK_ENV` | `production` | Środowisko produkcyjne |
| `PORT` | `5000` | Port (Render automatycznie ustawia, ale warto mieć) |
| `SECRET_KEY` | `[WYGENERUJ]` | **WYMAGANY!** Zobacz instrukcję generowania poniżej |
| `AI_API_KEY` | `sk-proj-...` | Klucz OpenAI API (zaczyna się od `sk-`) |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | URL frontendu (ustawisz później, po wdrożeniu frontendu) |

**UWAGA o SECRET_KEY:**
- Jest **OBOWIĄZKOWY** w produkcji
- Render NIE uruchomi backendu bez tego klucza
- Backend wyświetli błąd: `ValueError: SECRET_KEY must be set in production environment!`

**Generowanie SECRET_KEY:**

Uruchom w terminalu/PowerShell:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Przykładowy wynik:**
```
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

**Ważne:** Skopiuj cały wygenerowany klucz (bez cudzysłowów) i wklej jako wartość `SECRET_KEY` w Render.

#### Krok 5: Utwórz Web Service

Kliknij **"Create Web Service"** i poczekaj na wdrożenie (~3-5 minut).

---

### FRONTEND - Static Site

#### Krok 1: Utwórz Static Site

1. W Render Dashboard kliknij **"New +"**
2. Wybierz **"Static Site"** (NIE "Web Service"!)

#### Krok 2: Połączenie z Repozytorium

1. **Select repository:**
   - Wybierz: `aibankai96 / ST_KRAKOS`
   - Lub użyj: `https://github.com/aibankai96/ST_KRAKOS`

#### Krok 3: Konfiguracja Frontendu

Wypełnij formularz:

| Pole | Wartość | Opis |
|------|---------|------|
| **Name** | `st-krakos-frontend` | Nazwa serwisu |
| **Branch** | `cleanup/safe-2025` | Branch z kodem |
| **Root Directory** | *(zostaw puste)* | Render będzie w katalogu głównym |
| **Build Command** | `cd frontend && npm install && RENDER=true npm run build` | Budowanie aplikacji |
| **Publish Directory** | `frontend/dist` | Katalog z zbudowanymi plikami |

**Alternatywny Build Command** (jeśli powyższy nie działa):
```bash
cd frontend && npm install && RENDER=true vite build
```

#### Krok 4: Environment Variables dla Frontendu

Kliknij **"Add Environment Variable"** i dodaj:

| Key | Value | Opis |
|-----|-------|------|
| `NODE_ENV` | `production` | Środowisko produkcyjne |
| `RENDER` | `true` | Włącz dynamiczny base path |
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | URL backendu (ustawisz po wdrożeniu backendu) |

#### Krok 5: Utwórz Static Site

Kliknij **"Create Static Site"** i poczekaj na wdrożenie (~3-7 minut).

---

## 🔗 Połączenie Backend ↔ Frontend

### Krok 1: Sprawdź URLe obu serwisów

Po wdrożeniu obu serwisów, Render wygeneruje URLe:

- **Backend:** `https://st-krakos-backend.onrender.com`
- **Frontend:** `https://st-krakos-frontend.onrender.com`

### Krok 2: Zaktualizuj CORS_ORIGINS w Backendzie

1. Przejdź do **Backend Service** (`st-krakos-backend`)
2. Kliknij **"Environment"** w menu bocznym
3. Znajdź `CORS_ORIGINS`
4. Kliknij **"Edit"** (ikona ołówka)
5. Zmień wartość na:
   ```
   https://st-krakos-frontend.onrender.com
   ```
6. Kliknij **"Save Changes"**
7. Render automatycznie zredeployuje backend

### Krok 3: Zaktualizuj VITE_API_URL w Frontendzie

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
2. Kliknij **"Environment"** w menu bocznym
3. Znajdź `VITE_API_URL` (lub dodaj, jeśli nie ma)
4. Kliknij **"Edit"** (lub **"Add Environment Variable"**)
5. Ustaw wartość na:
   ```
   https://st-krakos-backend.onrender.com/api
   ```
6. Kliknij **"Save Changes"**
7. Render automatycznie zredeployuje frontend

---

## ✅ Weryfikacja Połączenia

### Test 1: Backend Health Check

Otwórz w przeglądarce:
```
https://st-krakos-backend.onrender.com/api/health
```

Oczekiwana odpowiedź:
```json
{
  "status": "ok",
  "service": "ST KRATOS Backend",
  "version": "1.0.0"
}
```

### Test 2: Frontend API Connection

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`
2. Otwórz **Developer Tools** (F12)
3. Przejdź do zakładki **Console**
4. Sprawdź czy nie ma błędów związanych z API
5. Przejdź do zakładki **Network**
6. Sprawdź czy requesty do `/api/*` idą na prawidłowy URL backendu

### Test 3: CORS

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`
2. Otwórz **Developer Tools** (F12) → **Console**
3. Wykonaj testowy request:
   ```javascript
   fetch('https://st-krakos-backend.onrender.com/api/health')
     .then(r => r.json())
     .then(console.log)
   ```
4. Jeśli nie ma błędów CORS, wszystko działa!

---

## 🔍 Rozwiązywanie Problemów

### Problem: Backend nie uruchamia się

**Błąd:** `ValueError: SECRET_KEY must be set in production environment!`

**Rozwiązanie:**
1. Przejdź do Backend Service → Environment
2. Dodaj `SECRET_KEY` z wygenerowaną wartością
3. Upewnij się, że wartość nie zawiera cudzysłowów

**Błąd:** `ModuleNotFoundError: No module named 'backend'`

**Rozwiązanie:**
- Upewnij się, że **Start Command** to: `python -m backend.app`
- NIE używaj: `cd backend && python app.py`

### Problem: Frontend nie buduje się

**Błąd:** Build failed

**Rozwiązanie:**
1. Sprawdź logi build w Render Dashboard
2. Upewnij się, że `RENDER=true` jest w Build Command
3. Sprawdź czy `frontend/package.json` zawiera poprawny script `build`

### Problem: CORS Error w przeglądarce

**Błąd:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Rozwiązanie:**
1. Sprawdź czy `CORS_ORIGINS` w backendzie zawiera URL frontendu
2. Upewnij się, że URL jest dokładnie taki sam (z/bez `www`, `https://`, etc.)
3. Po zmianie `CORS_ORIGINS`, poczekaj na redeploy backendu

### Problem: Frontend nie łączy się z backendem

**Rozwiązanie:**
1. Sprawdź czy `VITE_API_URL` jest ustawione w frontendzie
2. Upewnij się, że URL kończy się na `/api`
3. Po zmianie `VITE_API_URL`, poczekaj na redeploy frontendu

---

## 📋 Checklista Wdrożenia

### Przed Wdrożeniem

- [ ] Repozytorium jest **publiczne** (lub Render ma dostęp do prywatnego)
- [ ] Wszystkie zmiany są commitowane i wypushowane do branch `cleanup/safe-2025`
- [ ] Masz klucz OpenAI API (zaczyna się od `sk-`)
- [ ] Wygenerowałeś `SECRET_KEY` (komenda: `python -c "import secrets; print(secrets.token_hex(32))"`)

### Backend

- [ ] Web Service utworzony
- [ ] Start Command: `python -m backend.app`
- [ ] `SECRET_KEY` ustawiony (WYMAGANY!)
- [ ] `AI_API_KEY` ustawiony
- [ ] Backend wdrożony i działa (`/api/health` odpowiada)

### Frontend

- [ ] Static Site utworzony
- [ ] Build Command zawiera `RENDER=true`
- [ ] `VITE_API_URL` ustawiony na URL backendu
- [ ] Frontend wdrożony i działa

### Połączenie

- [ ] `CORS_ORIGINS` w backendzie ustawiony na URL frontendu
- [ ] `VITE_API_URL` w frontendzie ustawiony na URL backendu
- [ ] Test Health Check działa
- [ ] Brak błędów CORS w konsoli przeglądarki

---

## 🌐 Podłączenie Domeny (Opcjonalnie)

Jeśli chcesz podłączyć własną domenę (np. `stkratos.com`):

### Dla Frontendu:

1. Przejdź do Frontend Service → **Settings** → **Custom Domains**
2. Kliknij **"Add Custom Domain"**
3. Wpisz domenę (np. `stkratos.com` i `www.stkratos.com`)
4. Render wygeneruje instrukcje DNS

### Dla Backendu:

1. Przejdź do Backend Service → **Settings** → **Custom Domains**
2. Kliknij **"Add Custom Domain"**
3. Wpisz subdomenę (np. `api.stkratos.com`)
4. Render wygeneruje instrukcje DNS

**WAŻNE:** Po podłączeniu domeny, zaktualizuj:
- `CORS_ORIGINS` w backendzie na nowy URL frontendu
- `VITE_API_URL` w frontendzie na nowy URL backendu

---

## 📞 Wsparcie

Jeśli napotkasz problemy:

1. Sprawdź logi w Render Dashboard
2. Sprawdź **Events** w Render Dashboard dla szczegółowych błędów
3. Sprawdź konfigurację w pliku `render.yaml`
4. Sprawdź zmienne środowiskowe w obu serwisach

---

**Instrukcja wygenerowana automatycznie**  
**Data aktualizacji:** 2025-01-27

