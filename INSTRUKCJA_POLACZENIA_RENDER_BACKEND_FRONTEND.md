# Instrukcja Wdrożenia na Render

## ❌ JEST BŁĄD - CO SPRAWDZIĆ:

### 1. GDZIE JEST BŁĄD?

**Sprawdź w Render Dashboard:**

1. **Kliknij na serwis który ma błąd** (st-krakos-backend lub st-krakos-frontend)
2. **Kliknij zakładkę "Logs"** (po lewej stronie)
3. **Sprawdź:**
   - Czy są błędy? (czerwone komunikaty)
   - Jaki jest dokładny komunikat błędu?

---

### 2. NAJCZĘSTSZE BŁĘDY I ROZWIĄZANIA:

#### BŁĄD 1: "SECRET_KEY must be set"

**Rozwiązanie:**
1. Backend → Environment
2. Dodaj zmienną:
   - Key: `SECRET_KEY`
   - Value: Otwórz `generate_key.html` w przeglądarce i skopiuj klucz
3. Zapisz

#### BŁĄD 2: "CORS_ORIGINS must be set"

**Rozwiązanie:**
1. Backend → Environment
2. Dodaj zmienną:
   - Key: `CORS_ORIGINS`
   - Value: `https://st-krakos-frontend.onrender.com`
3. Zapisz

#### BŁĄD 3: "ModuleNotFoundError: No module named 'backend'"

**Rozwiązanie:**
1. Backend → Settings → General
2. Sprawdź "Start Command"
3. Musi być: `python -m backend.app`
4. Jeśli jest inaczej - zmień i zapisz

#### BŁĄD 4: Build failed (Frontend)

**Rozwiązanie:**
1. Frontend → Settings → Build & Deploy
2. Sprawdź "Build Command"
3. Musi być: `cd frontend && npm install && RENDER=true npm run build`
4. Zapisz

---

### 3. WYŚLIJ MI:

**Potrzebuję:**
1. Który serwis ma błąd? (backend czy frontend)
2. Dokładny komunikat błędu z logów
3. Lub zrób screenshot błędu

**Gdzie znaleźć błąd:**
- Render Dashboard → Serwis → "Logs" (zakładka po lewej)

---

## CO TERAZ ZROBIĆ:

1. **Wejdź w Render Dashboard**
2. **Kliknij na serwis z błędem**
3. **Kliknij "Logs"**
4. **Skopiuj błąd i wyślij mi**

---

## SPRAWDŹ TEŻ:

**Backend - zmienne środowiskowe:**
- `FLASK_ENV` = `production`
- `PORT` = `5000`
- `SECRET_KEY` = (wygenerowany klucz - 64 znaki)
- `AI_API_KEY` = (twój klucz OpenAI)
- `CORS_ORIGINS` = `https://st-krakos-frontend.onrender.com`

**Frontend - zmienne środowiskowe:**
- `NODE_ENV` = `production`
- `RENDER` = `true`
- `VITE_API_URL` = `https://st-krakos-backend.onrender.com/api`

---

**Wyślij mi błąd a pomogę go naprawić!**
