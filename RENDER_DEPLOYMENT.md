# Instrukcja Deployment na Render

## 📋 Wymagania

1. Konto na [Render.com](https://render.com)
2. Repozytorium Git (GitHub) z aplikacją
3. API Key dla AI (OpenAI)

---

## 🚀 Krok 1: Frontend (Static Site)

1. Zaloguj się do [Render Dashboard](https://dashboard.render.com)
2. Kliknij **"New +"** → **"Static Site"**
3. Połącz repozytorium GitHub: `aibankai96/ST_KRAKOS`
4. Ustawienia:
   - **Name:** `st-krakos-frontend`
   - **Branch:** `master`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Kliknij **"Create Static Site"**

**URL aplikacji:** `https://st-krakos-frontend.onrender.com`

---

## 🔧 Krok 2: Backend (Web Service)

1. W Render Dashboard kliknij **"New +"** → **"Web Service"**
2. Połącz repozytorium GitHub: `aibankai96/ST_KRAKOS`
3. Ustawienia:
   - **Name:** `st-krakos-backend`
   - **Environment:** `Python 3`
   - **Branch:** `master`
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
4. **Environment Variables:**
   - `FLASK_ENV` = `production`
   - `PORT` = `5000` (Render automatycznie ustawi)
   - `AI_API_KEY` = `[Twój klucz OpenAI]`
   - `CORS_ORIGINS` = `https://st-krakos-frontend.onrender.com`
5. Kliknij **"Create Web Service"**

**URL API:** `https://st-krakos-backend.onrender.com`

---

## 🔗 Krok 3: Aktualizacja CORS

Po wdrożeniu frontendu, zaktualizuj `CORS_ORIGINS` w backendzie:
- W Render Dashboard → Backend Service → Environment
- Zmień `CORS_ORIGINS` na rzeczywisty URL frontendu

---

## ✅ Weryfikacja

1. **Frontend:** Otwórz `https://st-krakos-frontend.onrender.com`
2. **Backend:** Otwórz `https://st-krakos-backend.onrender.com/api/status`

---

## 📝 Uwagi

- Render automatycznie wdraża przy każdym push do `master`
- Pierwsze wdrożenie może trwać 5-10 minut
- Darmowy plan Render ma limity (może być wolniejszy)
- Wszystkie zmiany w Git automatycznie aktualizują aplikację

---

## 🔄 Aktualizacja Aplikacji

Wszystkie zmiany zapisane w Git automatycznie wdrażają się na Render:
1. Zrób zmiany w kodzie
2. `git add .`
3. `git commit -m "Opis zmian"`
4. `git push origin master`
5. Render automatycznie zbuduje i wdroży nową wersję

---

**Status:** Gotowe do wdrożenia! 🚀

