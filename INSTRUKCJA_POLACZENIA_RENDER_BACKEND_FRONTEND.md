# 🚀 Kompletna Instrukcja - Połączenie Backend i Frontend na Renderze

**Data:** 2025-01-27  
**Aplikacja:** ST KRATOS  
**Status:** Gotowe do wdrożenia

---

## 📋 Przegląd

Aplikacja składa się z dwóch części:
1. **Backend** - Python Flask API (`backend/`)
2. **Frontend** - Static Site (Vite + Vanilla JS) (`frontend/`)

**Czas wdrożenia:** ~10-15 minut dla obu serwisów

---

## 🎯 OPCJA 1: Automatyczna Konfiguracja (ZALECANA) ⚡

Render automatycznie wykryje plik `render.yaml` i skonfiguruje oba serwisy!

### Krok 1: Użyj Blueprint

1. Przejdź do [Render Dashboard](https://dashboard.render.com)
2. Zaloguj się lub utwórz konto (możesz użyć konta GitHub)
3. Kliknij **"New +"** (w prawym górnym rogu)
4. Wybierz **"Blueprint"** (NIE "Web Service" lub "Static Site")
5. Połącz z repozytorium:
   - **Public Git Repository:** `https://github.com/aibankai96/ST_KRAKOS`
   - **Branch:** `cleanup/safe-2025`
6. Kliknij **"Apply"**
7. Render automatycznie wykryje `render.yaml` i utworzy oba serwisy!

### Krok 2: Konfiguracja Zmiennych Środowiskowych

Po utworzeniu serwisów przez Blueprint, musisz ustawić zmienne środowiskowe ręcznie.

#### 🔧 Backend - Zmienne Środowiskowe:

1. Przejdź do **Backend Service** (`st-krakos-backend`)
   - W Render Dashboard znajdziesz listę serwisów
   - Kliknij na `st-krakos-backend`

2. Kliknij **"Environment"** w menu bocznym (po lewej stronie)

3. Dodaj następujące zmienne (kliknij **"Add Environment Variable"** dla każdej):

| Key | Value | Jak Uzyskać |
|-----|-------|-------------|
| `FLASK_ENV` | `production` | Wpisz dokładnie: `production` |
| `PORT` | `5000` | Wpisz: `5000` |
| `SECRET_KEY` | `[WYGENERUJ]` | Zobacz poniżej ⬇️ |
| `AI_API_KEY` | `sk-proj-...` | Twój klucz z OpenAI (zaczyna się od `sk-`) |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | URL frontendu (ustawisz po wdrożeniu) |

**Jak wygenerować SECRET_KEY:**

Otwórz terminal/PowerShell i wykonaj:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Przykładowy wynik:**
```
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

**WAŻNE:** 
- Skopiuj **cały** wygenerowany klucz (bez cudzysłowów)
- Wklej jako wartość `SECRET_KEY` w Render
- `SECRET_KEY` jest **OBOWIĄZKOWY** - backend nie uruchomi się bez niego

#### 🎨 Frontend - Zmienne Środowiskowe:

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
   - W Render Dashboard kliknij na `st-krakos-frontend`

2. Kliknij **"Environment"** w menu bocznym

3. Dodaj następujące zmienne:

| Key | Value | Opis |
|-----|-------|------|
| `NODE_ENV` | `production` | Środowisko produkcyjne |
| `RENDER` | `true` | Włącz dynamiczny base path |
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | URL backendu (ustawisz po wdrożeniu backendu) |

**WAŻNE:**
- `VITE_API_URL` możesz zaktualizować po wdrożeniu backendu (krok 3 poniżej)

---

## 🔧 OPCJA 2: Ręczna Konfiguracja (Jeśli Blueprint nie działa)

Jeśli chcesz ręcznie skonfigurować serwisy:

### BACKEND - Web Service (Python)

#### Krok 1: Utwórz Web Service

1. W Render Dashboard kliknij **"New +"**
2. Wybierz **"Web Service"**

#### Krok 2: Połączenie z Repozytorium

1. **Connect account** (jeśli jeszcze nie połączone):
   - Wybierz **GitHub**
   - Kliknij **"Connect GitHub"**
   - Autoryzuj dostęp do repozytorium
   - Wybierz organizację/konto: `aibankai96`

2. **Select repository:**
   - Wyszukaj: `ST_KRAKOS`
   - Kliknij na repozytorium: `aibankai96 / ST_KRAKOS`
   - Lub użyj URL: `https://github.com/aibankai96/ST_KRAKOS`

#### Krok 3: Konfiguracja Backendu

Wypełnij formularz dokładnie tak:

| Pole | Wartość | Opis |
|------|---------|------|
| **Name** | `st-krakos-backend` | Nazwa serwisu (dowolna, ale użyj tej dla zgodności) |
| **Language** | Zmień z "Node" na **"Python 3"** | ⚠️ WAŻNE! Kliknij dropdown i wybierz Python 3 |
| **Branch** | `cleanup/safe-2025` | Branch z kodem |
| **Root Directory** | *(zostaw puste)* | Nie wpisuj nic - zostaw puste pole |
| **Build Command** | `pip install -r backend/requirements.txt` | Instalacja zależności Python |
| **Start Command** | `python -m backend.app` | ⚠️ WAŻNE: użyj modułu Python |
| **Instance Type** | Wybierz **Free** (dla testów) lub **Starter** ($7/miesiąc) | |

**⚠️ WAŻNE - Start Command:**

✅ **POPRAWNIE:** `python -m backend.app`
- Uruchamia aplikację jako moduł Python z katalogu głównego
- Działa z importami typu `from backend.config import Config`

❌ **BŁĘDNIE:** `cd backend && python app.py`
- Spowoduje błąd: `ModuleNotFoundError: No module named 'backend'`

❌ **BŁĘDNIE:** `python backend/app.py`
- Spowoduje błędy importów

**Wyjaśnienie:** Aplikacja używa importów typu `from backend.config import Config`, które wymagają uruchomienia z katalogu głównego projektu jako modułu Python.

#### Krok 4: Environment Variables dla Backendu

Przed kliknięciem "Create Web Service", dodaj zmienne środowiskowe:

Kliknij **"Add Environment Variable"** i dodaj każdą zmienną:

| Key | Value | Instrukcja |
|-----|-------|------------|
| `FLASK_ENV` | `production` | Wpisz: `production` |
| `PORT` | `5000` | Wpisz: `5000` |
| `SECRET_KEY` | `[WYGENERUJ]` | **WYMAGANY!** Zobacz poniżej ⬇️ |
| `AI_API_KEY` | `sk-proj-...` | Wklej swój klucz OpenAI API |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | URL frontendu (ustawisz później) |

**Generowanie SECRET_KEY:**

Uruchom w terminalu/PowerShell:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Skopiuj cały wynik (np. `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`) i wklej jako wartość `SECRET_KEY`.

**UWAGA o SECRET_KEY:**
- Jest **OBOWIĄZKOWY** w produkcji
- Render NIE uruchomi backendu bez tego klucza
- Backend wyświetli błąd: `ValueError: SECRET_KEY must be set in production environment!`
- Wartość musi być długa (64 znaki hex)

#### Krok 5: Utwórz Web Service

1. Sprawdź wszystkie ustawienia
2. Kliknij **"Create Web Service"** na dole formularza
3. Poczekaj na wdrożenie (~3-5 minut)
4. Render pokaże postęp build i deploy

**Po wdrożeniu:**
- Render wygeneruje URL: `https://st-krakos-backend.onrender.com`
- Zapisz ten URL - będzie potrzebny do konfiguracji frontendu

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

Wypełnij formularz dokładnie tak:

| Pole | Wartość | Opis |
|------|---------|------|
| **Name** | `st-krakos-frontend` | Nazwa serwisu |
| **Branch** | `cleanup/safe-2025` | Branch z kodem |
| **Root Directory** | *(zostaw puste)* | Nie wpisuj nic - zostaw puste |
| **Build Command** | `cd frontend && npm install && RENDER=true npm run build` | Budowanie aplikacji |
| **Publish Directory** | `frontend/dist` | Katalog z zbudowanymi plikami |

**Alternatywny Build Command** (jeśli powyższy nie działa):
```bash
cd frontend && npm install && RENDER=true vite build
```

**Wyjaśnienie Build Command:**
- `cd frontend` - przejście do katalogu frontend
- `npm install` - instalacja zależności Node.js
- `RENDER=true` - ustawia zmienną środowiskową (wymagana dla base path)
- `npm run build` - buduje aplikację produkcyjną

#### Krok 4: Environment Variables dla Frontendu

Kliknij **"Add Environment Variable"** i dodaj:

| Key | Value | Opis |
|-----|-------|------|
| `NODE_ENV` | `production` | Środowisko produkcyjne |
| `RENDER` | `true` | Włącz dynamiczny base path (`/` zamiast `/ST_KRAKOS/`) |
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | URL backendu (ustawisz po wdrożeniu backendu) |

**WAŻNE:**
- `VITE_API_URL` możesz zaktualizować po wdrożeniu backendu (zobacz Krok 3 poniżej)
- Jeśli backend jeszcze nie jest wdrożony, możesz dodać tę zmienną później

#### Krok 5: Utwórz Static Site

1. Sprawdź wszystkie ustawienia
2. Kliknij **"Create Static Site"** na dole formularza
3. Poczekaj na wdrożenie (~3-7 minut)
4. Render pokaże postęp build i deploy

**Po wdrożeniu:**
- Render wygeneruje URL: `https://st-krakos-frontend.onrender.com`
- Zapisz ten URL - będzie potrzebny do konfiguracji backendu

---

## 🔗 Połączenie Backend ↔ Frontend (WAŻNE!)

Po wdrożeniu obu serwisów, musisz je ze sobą połączyć.

### Krok 1: Sprawdź URLe obu serwisów

Po wdrożeniu obu serwisów, Render wygeneruje URLe:

- **Backend:** `https://st-krakos-backend.onrender.com`
- **Frontend:** `https://st-krakos-frontend.onrender.com`

Zapisz te URLe - będą potrzebne w następnych krokach.

### Krok 2: Zaktualizuj CORS_ORIGINS w Backendzie

Frontend musi mieć pozwolenie na komunikację z backendem (CORS).

1. Przejdź do **Backend Service** (`st-krakos-backend`)
   - W Render Dashboard kliknij na `st-krakos-backend`

2. Kliknij **"Environment"** w menu bocznym

3. Znajdź zmienną `CORS_ORIGINS` (lub dodaj, jeśli nie ma)

4. Kliknij **"Edit"** (ikona ołówka) obok `CORS_ORIGINS`

5. Zmień wartość na dokładnie:
   ```
   https://st-krakos-frontend.onrender.com
   ```
   (bez końcowego slasha `/`)

6. Kliknij **"Save Changes"**

7. Render automatycznie zredeployuje backend (~1-2 minuty)

**WAŻNE:**
- URL musi być **dokładnie** taki sam jak URL frontendu
- Z `https://` (nie `http://`)
- Bez końcowego slasha `/`
- Jeśli używasz własnej domeny, użyj dokładnie tego URL

### Krok 3: Zaktualizuj VITE_API_URL w Frontendzie

Frontend musi wiedzieć, gdzie znajduje się backend.

1. Przejdź do **Frontend Service** (`st-krakos-frontend`)
   - W Render Dashboard kliknij na `st-krakos-frontend`

2. Kliknij **"Environment"** w menu bocznym

3. Znajdź zmienną `VITE_API_URL` (lub dodaj, jeśli nie ma)

4. Kliknij **"Edit"** (lub **"Add Environment Variable"** jeśli nie ma)

5. Ustaw wartość na dokładnie:
   ```
   https://st-krakos-backend.onrender.com/api
   ```
   (z końcowym `/api`)

6. Kliknij **"Save Changes"**

7. Render automatycznie zredeployuje frontend (~2-3 minuty)

**WAŻNE:**
- URL musi kończyć się na `/api`
- Z `https://` (nie `http://`)
- Jeśli używasz własnej domeny dla backendu, użyj dokładnie tego URL + `/api`

---

## ✅ Weryfikacja Połączenia

Po wykonaniu wszystkich kroków, sprawdź czy wszystko działa:

### Test 1: Backend Health Check

1. Otwórz w przeglądarce:
   ```
   https://st-krakos-backend.onrender.com/api/health
   ```

2. Oczekiwana odpowiedź (JSON):
   ```json
   {
     "status": "ok",
     "service": "ST KRATOS Backend",
     "version": "1.0.0"
   }
   ```

3. Jeśli widzisz ten JSON - **backend działa! ✅**

### Test 2: Frontend API Connection

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`

2. Otwórz **Developer Tools** (naciśnij `F12`)

3. Przejdź do zakładki **Console**

4. Sprawdź czy nie ma błędów związanych z API (czerwone komunikaty)

5. Przejdź do zakładki **Network**

6. Odśwież stronę (F5)

7. Sprawdź czy requesty do `/api/*` idą na prawidłowy URL backendu:
   - Powinny być wysyłane na: `https://st-krakos-backend.onrender.com/api/...`

### Test 3: CORS (Cross-Origin Resource Sharing)

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`

2. Otwórz **Developer Tools** (F12) → **Console**

3. Wklej i wykonaj testowy request:
   ```javascript
   fetch('https://st-krakos-backend.onrender.com/api/health')
     .then(r => r.json())
     .then(console.log)
   ```

4. Jeśli widzisz odpowiedź JSON (bez błędów) - **CORS działa! ✅**

5. Jeśli widzisz błąd CORS - sprawdź `CORS_ORIGINS` w backendzie

---

## 🔍 Rozwiązywanie Problemów

### Problem: Backend nie uruchamia się

**Błąd:** `ValueError: SECRET_KEY must be set in production environment!`

**Rozwiązanie:**
1. Przejdź do Backend Service → Environment
2. Sprawdź czy `SECRET_KEY` jest ustawione
3. Jeśli nie ma - dodaj i wklej wygenerowany klucz
4. Upewnij się, że wartość nie zawiera cudzysłowów
5. Zapisz zmiany i poczekaj na redeploy

**Błąd:** `ModuleNotFoundError: No module named 'backend'`

**Rozwiązanie:**
1. Przejdź do Backend Service → Settings → General
2. Sprawdź **Start Command**
3. Musi być: `python -m backend.app`
4. Jeśli jest inny - zmień i zapisz
5. Render automatycznie zredeployuje

**Błąd:** Backend się buduje, ale nie odpowiada

**Rozwiązanie:**
1. Sprawdź logi w Backend Service → **Logs**
2. Sprawdź czy `CORS_ORIGINS` jest ustawione
3. Sprawdź czy `PORT` jest ustawione na `5000`
4. Render automatycznie ustawia PORT, ale warto mieć tę zmienną

### Problem: Frontend nie buduje się

**Błąd:** Build failed

**Rozwiązanie:**
1. Przejdź do Frontend Service → **Logs**
2. Sprawdź błędy w logach build
3. Najczęstsze problemy:
   - Brak `RENDER=true` w Build Command
   - Błędy składni w kodzie
   - Brakujące zależności w `package.json`

**Sprawdź Build Command:**
- Musi zawierać: `RENDER=true`
- Musi zawierać: `cd frontend`
- Musi zawierać: `npm install`
- Musi zawierać: `npm run build` lub `vite build`

### Problem: CORS Error w przeglądarce

**Błąd:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Rozwiązanie:**
1. Sprawdź `CORS_ORIGINS` w backendzie
2. Musi zawierać dokładnie URL frontendu:
   ```
   https://st-krakos-frontend.onrender.com
   ```
3. Upewnij się, że URL jest dokładnie taki sam (z `https://`, bez końcowego `/`)
4. Po zmianie `CORS_ORIGINS`, poczekaj na redeploy backendu (~1-2 min)
5. Odśwież frontend i sprawdź ponownie

### Problem: Frontend nie łączy się z backendem

**Błąd:** `Failed to fetch` lub `Network error`

**Rozwiązanie:**
1. Sprawdź `VITE_API_URL` w frontendzie
2. Musi kończyć się na `/api`:
   ```
   https://st-krakos-backend.onrender.com/api
   ```
3. Sprawdź czy backend działa (Test 1 powyżej)
4. Po zmianie `VITE_API_URL`, poczekaj na redeploy frontendu (~2-3 min)
5. Wyczyść cache przeglądarki (Ctrl+Shift+Delete)

### Problem: Frontend pokazuje białą stronę

**Rozwiązanie:**
1. Sprawdź logi frontendu w Render Dashboard
2. Sprawdź Console w Developer Tools (F12)
3. Sprawdź czy `RENDER=true` jest ustawione w zmiennych środowiskowych
4. Sprawdź czy Build Command zawiera `RENDER=true`

---

## 📋 Checklista Wdrożenia

Użyj tej checklisty, aby upewnić się, że wszystko jest skonfigurowane:

### Przed Wdrożeniem

- [ ] Repozytorium jest **publiczne** (lub Render ma dostęp do prywatnego)
- [ ] Wszystkie zmiany są commitowane i wypushowane do branch `cleanup/safe-2025`
- [ ] Masz klucz OpenAI API (zaczyna się od `sk-`)
- [ ] Wygenerowałeś `SECRET_KEY` (komenda: `python -c "import secrets; print(secrets.token_hex(32))"`)

### Backend

- [ ] Web Service utworzony (lub przez Blueprint)
- [ ] Start Command: `python -m backend.app` (nie `cd backend && python app.py`)
- [ ] `SECRET_KEY` ustawiony (WYMAGANY! - 64 znaki hex)
- [ ] `AI_API_KEY` ustawiony (klucz OpenAI)
- [ ] `CORS_ORIGINS` ustawiony na URL frontendu
- [ ] Backend wdrożony i działa (`/api/health` odpowiada)
- [ ] URL backendu zapisany: `https://st-krakos-backend.onrender.com`

### Frontend

- [ ] Static Site utworzony (lub przez Blueprint)
- [ ] Build Command zawiera `RENDER=true`
- [ ] `VITE_API_URL` ustawiony na URL backendu + `/api`
- [ ] Frontend wdrożony i działa
- [ ] URL frontendu zapisany: `https://st-krakos-frontend.onrender.com`

### Połączenie

- [ ] `CORS_ORIGINS` w backendzie ustawiony na URL frontendu
- [ ] `VITE_API_URL` w frontendzie ustawiony na URL backendu + `/api`
- [ ] Test Health Check działa (Test 1)
- [ ] Test CORS działa (Test 3)
- [ ] Brak błędów w Console przeglądarki
- [ ] Aplikacja działa poprawnie

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
- `VITE_API_URL` w frontendzie na nowy URL backendu + `/api`

---

## 📞 Wsparcie i Dodatkowe Zasoby

Jeśli napotkasz problemy:

1. **Sprawdź logi** w Render Dashboard:
   - Backend Service → **Logs**
   - Frontend Service → **Logs**

2. **Sprawdź Events** w Render Dashboard:
   - Backend Service → **Events**
   - Frontend Service → **Events**
   - Pokaże szczegółowe informacje o błędach

3. **Sprawdź konfigurację** w pliku `render.yaml` w repozytorium

4. **Sprawdź zmienne środowiskowe** w obu serwisach:
   - Backend Service → **Environment**
   - Frontend Service → **Environment**

5. **Dokumentacja Render:**
   - [Render Documentation](https://render.com/docs)
   - [Python Web Services](https://render.com/docs/python-version)
   - [Static Sites](https://render.com/docs/static-sites)

---

## 🎉 Gratulacje!

Jeśli wszystko działa, masz:
- ✅ Backend wdrożony i działający
- ✅ Frontend wdrożony i działający
- ✅ Połączenie między backendem a frontendem
- ✅ Aplikację dostępną online!

**Następne kroki:**
- Dodaj własną domenę (opcjonalnie)
- Skonfiguruj monitoring i alerty
- Dodaj backup i disaster recovery plan

---

**Instrukcja wygenerowana automatycznie**  
**Data aktualizacji:** 2025-01-27  
**Wersja:** 2.0
