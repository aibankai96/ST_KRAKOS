# 🚀 Instrukcja Wdrożenia na Render - ST KRATOS

**Data:** 2025-01-27  
**Aplikacja:** ST KRATOS  
**Status:** Gotowe do wdrożenia

---

## 📋 Przegląd

Aplikacja składa się z dwóch części:
1. **Backend** - Python Flask API (`backend/`)
2. **Frontend** - Static Site (Vite + Vanilla JS) (`frontend/`)

**Czas wdrożenia:** ~10-15 minut

---

## 🎯 Automatyczna Konfiguracja przez Blueprint (ZALECANA) ⚡

Render automatycznie wykryje plik `render.yaml` i skonfiguruje oba serwisy za Ciebie!

---

## Krok 1: Utworzenie Blueprint w Render

1. Przejdź do [Render Dashboard](https://dashboard.render.com)
2. Zaloguj się lub utwórz konto (możesz użyć konta GitHub)
3. Kliknij **"New +"** (w prawym górnym rogu)
4. Wybierz **"Blueprint"** (NIE "Web Service" lub "Static Site")
5. Połącz z repozytorium:
   - W polu **"Public Git Repository"** wpisz:
     ```
     https://github.com/aibankai96/ST_KRAKOS
     ```
   - Lub użyj wyszukiwarki, aby znaleźć repozytorium
6. Upewnij się, że **Branch** jest ustawiony na: `cleanup/safe-2025`
7. Kliknij **"Apply"** (lub **"Connect"**)
8. Render automatycznie wykryje plik `render.yaml` i utworzy oba serwisy!

**Co się stanie:**
- Render automatycznie utworzy:
  - Backend Web Service (`st-krakos-backend`)
  - Frontend Static Site (`st-krakos-frontend`)
- Obie usługi będą widoczne na liście serwisów
- Render rozpocznie automatyczny build obu serwisów

---

## Krok 2: Konfiguracja Zmiennych Środowiskowych

Po utworzeniu serwisów przez Blueprint, musisz ustawić zmienne środowiskowe ręcznie (nie są automatycznie wdrażane z `render.yaml` ze względów bezpieczeństwa).

### 🔧 Backend - Zmienne Środowiskowe

1. **Przejdź do Backend Service:**
   - W Render Dashboard znajdziesz listę serwisów
   - Kliknij na **`st-krakos-backend`**

2. **Otwórz sekcję Environment:**
   - W menu bocznym (po lewej stronie) kliknij **"Environment"**

3. **Dodaj zmienne środowiskowe:**

   Kliknij **"Add Environment Variable"** dla każdej zmiennej:

   | Key | Value | Instrukcja |
   |-----|-------|------------|
   | `FLASK_ENV` | `production` | Wpisz dokładnie: `production` |
   | `PORT` | `5000` | Wpisz: `5000` |
   | `SECRET_KEY` | `[WYGENERUJ]` | ⚠️ **WYMAGANY!** Zobacz poniżej ⬇️ |
   | `AI_API_KEY` | `sk-proj-...` | Wklej swój klucz OpenAI API |
   | `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | URL frontendu (ustawisz później) |

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
   - Backend wyświetli błąd: `ValueError: SECRET_KEY must be set in production environment!`

4. **Zapisz zmiany:**
   - Po dodaniu wszystkich zmiennych, kliknij **"Save Changes"** (jeśli dostępne)
   - Render automatycznie zredeployuje backend

### 🎨 Frontend - Zmienne Środowiskowe

1. **Przejdź do Frontend Service:**
   - W Render Dashboard kliknij na **`st-krakos-frontend`**

2. **Otwórz sekcję Environment:**
   - W menu bocznym kliknij **"Environment"**

3. **Dodaj zmienne środowiskowe:**

   Kliknij **"Add Environment Variable"** dla każdej zmiennej:

   | Key | Value | Opis |
   |-----|-------|------|
   | `NODE_ENV` | `production` | Środowisko produkcyjne |
   | `RENDER` | `true` | Włącz dynamiczny base path (`/` zamiast `/ST_KRAKOS/`) |
   | `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | URL backendu (ustawisz po wdrożeniu backendu) |

4. **Zapisz zmiany:**
   - Render automatycznie zredeployuje frontend po zmianach

**WAŻNE:**
- `VITE_API_URL` możesz zaktualizować po wdrożeniu backendu (Krok 3 poniżej)
- Jeśli backend jeszcze nie jest wdrożony, możesz dodać tę zmienną później

---

## Krok 3: Połączenie Backend ↔ Frontend

Po wdrożeniu obu serwisów, musisz je ze sobą połączyć.

### 3.1: Sprawdź URLe obu serwisów

Po wdrożeniu obu serwisów, Render wygeneruje URLe:

- **Backend:** `https://st-krakos-backend.onrender.com`
- **Frontend:** `https://st-krakos-frontend.onrender.com`

**Gdzie znaleźć URL:**
- W Render Dashboard kliknij na serwis
- URL znajduje się na górze strony (np. `https://st-krakos-backend.onrender.com`)
- Możesz też kliknąć na link, aby otworzyć w przeglądarce

### 3.2: Zaktualizuj CORS_ORIGINS w Backendzie

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

6. Kliknij **"Save Changes"** (lub zamknij okno - zmiany zapisują się automatycznie)

7. Render automatycznie zredeployuje backend (~1-2 minuty)

**WAŻNE:**
- URL musi być **dokładnie** taki sam jak URL frontendu
- Z `https://` (nie `http://`)
- Bez końcowego slasha `/`
- Jeśli używasz własnej domeny, użyj dokładnie tego URL

### 3.3: Zaktualizuj VITE_API_URL w Frontendzie

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

6. Kliknij **"Save Changes"** (lub zamknij okno)

7. Render automatycznie zredeployuje frontend (~2-3 minuty)

**WAŻNE:**
- URL musi kończyć się na `/api`
- Z `https://` (nie `http://`)
- Jeśli używasz własnej domeny dla backendu, użyj dokładnie tego URL + `/api`

---

## ✅ Weryfikacja - Czy wszystko działa?

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

### Test 2: Frontend działa

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`

2. Strona powinna się załadować bez błędów

3. Otwórz **Developer Tools** (naciśnij `F12`)

4. Przejdź do zakładki **Console**

5. Sprawdź czy nie ma błędów (czerwone komunikaty)

### Test 3: CORS (Połączenie Frontend-Backend)

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
3. Jeśli nie ma - dodaj i wklej wygenerowany klucz (64 znaki hex)
4. Upewnij się, że wartość nie zawiera cudzysłowów
5. Zapisz zmiany i poczekaj na redeploy (~1-2 min)

**Błąd:** `ModuleNotFoundError: No module named 'backend'`

**Rozwiązanie:**
1. Przejdź do Backend Service → Settings → General
2. Sprawdź **Start Command**
3. Musi być: `python -m backend.app`
4. Jeśli jest inny - zmień i zapisz
5. Render automatycznie zredeployuje

**Backend się buduje, ale nie odpowiada**

**Rozwiązanie:**
1. Sprawdź logi w Backend Service → **Logs**
2. Sprawdź czy `CORS_ORIGINS` jest ustawione
3. Sprawdź czy `PORT` jest ustawione na `5000`

### Problem: Frontend nie buduje się

**Błąd:** Build failed

**Rozwiązanie:**
1. Przejdź do Frontend Service → **Logs**
2. Sprawdź błędy w logach build
3. Najczęstsze problemy:
   - Brak `RENDER=true` w zmiennych środowiskowych
   - Błędy składni w kodzie
   - Brakujące zależności

**Sprawdź zmienne środowiskowe:**
- Musi być: `RENDER=true`
- Musi być: `NODE_ENV=production`

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
4. Sprawdź czy build się udał (Frontend Service → Logs)

---

## 📋 Checklista Wdrożenia

Użyj tej checklisty, aby upewnić się, że wszystko jest skonfigurowane:

### Przed Wdrożeniem

- [ ] Repozytorium jest **publiczne** (lub Render ma dostęp)
- [ ] Wszystkie zmiany są commitowane i wypushowane do branch `cleanup/safe-2025`
- [ ] Masz klucz OpenAI API (zaczyna się od `sk-`)
- [ ] Wygenerowałeś `SECRET_KEY` (komenda: `python -c "import secrets; print(secrets.token_hex(32))"`)

### Blueprint

- [ ] Blueprint utworzony w Render Dashboard
- [ ] Oba serwisy (backend i frontend) zostały automatycznie utworzone
- [ ] Build obu serwisów rozpoczął się automatycznie

### Backend

- [ ] `SECRET_KEY` ustawiony (WYMAGANY! - 64 znaki hex)
- [ ] `AI_API_KEY` ustawiony (klucz OpenAI)
- [ ] `CORS_ORIGINS` ustawiony na URL frontendu
- [ ] Backend wdrożony i działa (`/api/health` odpowiada)
- [ ] URL backendu zapisany: `https://st-krakos-backend.onrender.com`

### Frontend

- [ ] `RENDER=true` ustawione w zmiennych środowiskowych
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

## 📞 Wsparcie

Jeśli napotkasz problemy:

1. **Sprawdź logi** w Render Dashboard:
   - Backend Service → **Logs**
   - Frontend Service → **Logs**

2. **Sprawdź Events** w Render Dashboard:
   - Backend Service → **Events**
   - Frontend Service → **Events**
   - Pokaże szczegółowe informacje o błędach

3. **Sprawdź konfigurację** w pliku `render.yaml` w repozytorium

4. **Dokumentacja Render:**
   - [Render Documentation](https://render.com/docs)
   - [Blueprints](https://render.com/docs/blueprint-spec)

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
**Wersja:** 3.0 - Uproszczona (tylko Opcja 1)
