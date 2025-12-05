# Instrukcja Wdrożenia na Render - ST KRATOS

## KROK 1: Utwórz Blueprint w Render

1. Idź na: https://dashboard.render.com
2. Kliknij **"New +"** (prawy górny róg)
3. Wybierz **"Blueprint"**
4. W polu "Public Git Repository" wpisz:
   ```
   https://github.com/aibankai96/ST_KRAKOS
   ```
5. Branch: `cleanup/safe-2025`
6. Kliknij **"Apply"**
7. Render automatycznie utworzy backend i frontend

---

## KROK 2: Ustaw zmienne środowiskowe dla BACKENDU

1. W Render Dashboard kliknij na serwis: **st-krakos-backend**
2. Kliknij **"Environment"** (w menu po lewej)
3. Dodaj te zmienne (kliknij "Add Environment Variable" dla każdej):

| Key | Value |
|-----|-------|
| `FLASK_ENV` | `production` |
| `PORT` | `5000` |
| `SECRET_KEY` | Wygeneruj: `python -c "import secrets; print(secrets.token_hex(32))"` |
| `AI_API_KEY` | Twój klucz OpenAI (zaczyna się od `sk-`) |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` |

**Jak wygenerować SECRET_KEY:**
- Otwórz PowerShell
- Wykonaj: `python -c "import secrets; print(secrets.token_hex(32))"`
- Skopiuj cały wynik (64 znaki) i wklej jako wartość SECRET_KEY

---

## KROK 3: Ustaw zmienne środowiskowe dla FRONTENDU

1. W Render Dashboard kliknij na serwis: **st-krakos-frontend**
2. Kliknij **"Environment"** (w menu po lewej)
3. Dodaj te zmienne:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `RENDER` | `true` |
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` |

---

## KROK 4: Sprawdź czy backend działa

1. Po wdrożeniu backendu, wejdź na:
   ```
   https://st-krakos-backend.onrender.com/api/health
   ```
2. Jeśli widzisz JSON z `"status": "ok"` - działa!

---

## KROK 5: Połącz backend z frontendem

### 5.1: Zaktualizuj CORS_ORIGINS w backendzie

1. Backend Service → Environment
2. Znajdź `CORS_ORIGINS`
3. Kliknij "Edit"
4. Wpisz: `https://st-krakos-frontend.onrender.com`
5. Zapisz

### 5.2: Zaktualizuj VITE_API_URL w frontendzie

1. Frontend Service → Environment
2. Znajdź `VITE_API_URL`
3. Kliknij "Edit"
4. Wpisz: `https://st-krakos-backend.onrender.com/api`
5. Zapisz

---

## KROK 6: Sprawdź czy frontend działa

1. Wejdź na: `https://st-krakos-frontend.onrender.com`
2. Strona powinna się załadować
3. Otwórz konsolę przeglądarki (F12)
4. Nie powinno być błędów CORS

---

## WAŻNE: Jeśli backend nie działa

**Problem:** `ModuleNotFoundError: No module named 'backend'`

**Rozwiązanie:**
1. Backend Service → Settings → General
2. Sprawdź **Start Command**
3. Musi być: `python -m backend.app`
4. Jeśli jest inny - zmień i zapisz

---

## WAŻNE: Jeśli backend wyświetla błąd SECRET_KEY

**Rozwiązanie:**
1. Backend Service → Environment
2. Dodaj `SECRET_KEY` (wygeneruj jak w Kroku 2)
3. Zapisz

---

## Gotowe!

Jeśli wszystko działa:
- Backend: `https://st-krakos-backend.onrender.com/api/health` - pokazuje JSON
- Frontend: `https://st-krakos-frontend.onrender.com` - strona się ładuje
