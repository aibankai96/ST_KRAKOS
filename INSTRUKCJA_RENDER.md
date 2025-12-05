# 🚀 Instrukcja Wdrożenia na Render - ST KRAKOS

## ⚡ OPCJA 1: Automatyczna Konfiguracja (ZALECANA)

Render automatycznie wykryje plik `render.yaml` i skonfiguruje oba serwisy!

### Krok 1: Użyj Blueprint
1. W Render Dashboard kliknij **"New +"**
2. Wybierz **"Blueprint"** (nie "Web Service")
3. Połącz z repozytorium: `https://github.com/aibankai96/ST_KRAKOS`
4. Render automatycznie wykryje `render.yaml` i utworzy oba serwisy!

---

## 🔧 OPCJA 2: Ręczna Konfiguracja

Jeśli chcesz ręcznie skonfigurować serwisy:

### BACKEND (Web Service - Python)

**Wypełnij formularz:**

1. **Name:** `st-krakos-backend`

2. **Language:** Zmień z "Node" na **"Python 3"**

3. **Branch:** `cleanup/safe-2025` (lub `master` jeśli tam jest kod)

4. **Root Directory:** (zostaw puste)

5. **Build Command:**
   ```
   pip install -r backend/requirements.txt
   ```

6. **Start Command:**
   ```
   cd backend && python app.py
   ```

7. **Instance Type:** Wybierz **Free** (dla testów) lub **Starter** ($7/miesiąc)

8. **Environment Variables** - Dodaj:
   - `FLASK_ENV` = `production`
   - `PORT` = `5000`
   - `AI_API_KEY` = (Twój klucz OpenAI - sync: false)
   - `CORS_ORIGINS` = `https://st-krakos-frontend.onrender.com` (ustawisz później po wdrożeniu frontendu)

---

### FRONTEND (Static Site)

Po wdrożeniu backendu, utwórz **nowy Static Site**:

1. **New +** → **"Static Site"**

2. **Name:** `st-krakos-frontend`

3. **Branch:** `cleanup/safe-2025`

4. **Root Directory:** `frontend`

5. **Build Command:**
   ```
   npm install && RENDER=true npm run build
   ```

6. **Publish Directory:** `dist`

7. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `RENDER` = `true`

---

## ✅ Po Wdrożeniu

1. **Sprawdź URL backendu** (np. `https://st-krakos-backend.onrender.com`)
2. **Zaktualizuj CORS_ORIGINS** w backendzie na URL frontendu
3. **Zaktualizuj VITE_API_URL** w frontendzie na URL backendu

---

## 🎯 ZALECANA OPCJA

**Użyj Blueprint** - Render automatycznie wszystko skonfiguruje z `render.yaml`!

