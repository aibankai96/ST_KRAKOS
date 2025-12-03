# 🚀 Wdrożenie na Render - Kompletny Przewodnik

**Data:** 2025-01-27  
**Status:** Gotowe do wdrożenia

---

## 📋 Przegląd

Aplikacja ST KRAKOS składa się z:
1. **Frontend** - Static Site (Vite + Vanilla JS)
2. **Backend** - Python Flask API (opcjonalnie)

---

## ✅ Przed wdrożeniem

### 1. Sprawdzenie kodu
- [x] Brak błędów lintera
- [x] Wszystkie console.log są warunkowe
- [x] Kod gotowy do produkcji
- [x] Testy struktury przechodzą

### 2. Konfiguracja base path
**WAŻNE:** Dla Render musimy ustawić base path na `/` zamiast `/ST_KRAKOS/`

---

## 🎯 Wdrożenie Frontendu na Render

### Krok 1: Przygotowanie repozytorium

1. **Upewnij się, że wszystko jest commitowane:**
   ```bash
   git status
   git add .
   git commit -m "Przygotowanie do wdrożenia na Render"
   git push origin main
   ```

### Krok 2: Konfiguracja dla Render

#### Opcja A: Użycie render.yaml (zalecane)

Plik `render.yaml` w głównym folderze zawiera konfigurację:

```yaml
services:
  # Frontend - Static Site
  - type: web
    name: st-krakos-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist
    envVars:
      - key: NODE_ENV
        value: production
```

#### Opcja B: Konfiguracja przez panel Render

1. Przejdź do [Render Dashboard](https://dashboard.render.com)
2. Kliknij **"New +"** → **"Static Site"**
3. Połącz swoje repozytorium GitHub
4. Ustaw konfigurację:
   - **Name:** `st-krakos-frontend`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`
   - **Environment Variables:**
     - `NODE_ENV` = `production`

### Krok 3: Ważne ustawienia

**Base Path:**
- Dla Render ustaw base path na `/` w `vite.config.js`
- Render automatycznie obsługuje routing SPA

**Service Worker:**
- Service Worker działa automatycznie
- Nie wymaga dodatkowej konfiguracji

### Krok 4: Deploy

1. Render automatycznie wykryje `render.yaml` lub użyj konfiguracji z panelu
2. Render zbuduje aplikację automatycznie
3. Po zakończeniu build otrzymasz URL: `https://st-krakos-frontend.onrender.com`

---

## 🔧 Konfiguracja Vite dla Render

### Przed wdrożeniem: Zmiana base path

W `frontend/vite.config.js` zmień:
```javascript
base: '/ST_KRAKOS/',  // ❌ Dla GitHub Pages
```

Na:
```javascript
base: '/',  // ✅ Dla Render
```

**LUB** użyj warunkowej konfiguracji:
```javascript
base: process.env.RENDER ? '/' : '/ST_KRAKOS/',
```

---

## 🌐 Routing SPA na Render

Render automatycznie obsługuje routing SPA poprzez:
- Automatyczne przekierowania do `index.html` dla wszystkich ścieżek
- Brak potrzeby dodatkowej konfiguracji

---

## 📦 Backend (opcjonalnie)

Jeśli chcesz wdrożyć backend:

### Konfiguracja w render.yaml

```yaml
  # Backend - Web Service
  - type: web
    name: st-krakos-backend
    env: python
    buildCommand: pip install -r backend/requirements.txt
    startCommand: cd backend && python app.py
    envVars:
      - key: FLASK_ENV
        value: production
      - key: PORT
        value: 5000
      - key: AI_API_KEY
        sync: false  # Ustaw w panelu Render
      - key: CORS_ORIGINS
        value: https://st-krakos-frontend.onrender.com
```

### Zmienne środowiskowe dla backendu

W panelu Render ustaw:
- `AI_API_KEY` - Twój klucz OpenAI API
- `SECRET_KEY` - Losowy klucz szyfrowania
- `CORS_ORIGINS` - URL frontendu

---

## ✅ Checklista przed wdrożeniem

### Frontend
- [ ] Zmienić base path w `vite.config.js` na `/`
- [ ] Sprawdzić czy wszystkie ścieżki są względne
- [ ] Zbudować lokalnie: `npm run build`
- [ ] Sprawdzić folder `dist/` czy wszystko jest OK
- [ ] Sprawdzić czy Service Worker działa

### Repozytorium
- [ ] Wszystkie zmiany są commitowane
- [ ] Kod jest w repozytorium GitHub
- [ ] `render.yaml` jest w głównym folderze

### Testy
- [ ] Lokalny build działa: `cd frontend && npm run build`
- [ ] Preview działa: `npm run preview`
- [ ] Wszystkie linki działają
- [ ] Formularz kontaktowy działa (jeśli backend)

---

## 🚀 Proces wdrożenia

### 1. Przygotowanie

```bash
# Przejdź do folderu frontend
cd frontend

# Sprawdź czy wszystko działa
npm run build
npm run preview

# Jeśli wszystko OK, commit
cd ..
git add .
git commit -m "Przygotowanie do wdrożenia na Render"
git push origin main
```

### 2. Wdrożenie przez Render

1. **Przejdź do Render Dashboard**
2. **Kliknij "New +" → "Static Site"**
3. **Połącz repozytorium GitHub**
4. **Render automatycznie wykryje konfigurację z render.yaml**
5. **Lub skonfiguruj ręcznie:**
   - Name: `st-krakos-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
6. **Kliknij "Create Static Site"**

### 3. Czekanie na build

- Build trwa zwykle 2-5 minut
- Render pokazuje logi build w czasie rzeczywistym
- Po zakończeniu aplikacja będzie dostępna pod adresem Render

---

## 🔍 Testowanie po wdrożeniu

### Sprawdź:

1. **Strona główna:**
   - [ ] Ładuje się poprawnie
   - [ ] Wszystkie sekcje są widoczne
   - [ ] Animacje działają

2. **Nawigacja:**
   - [ ] Wszystkie linki działają
   - [ ] Smooth scrolling działa
   - [ ] Mobile menu działa

3. **Funkcjonalność:**
   - [ ] Przełącznik języka działa
   - [ ] Formularz kontaktowy działa (jeśli backend)
   - [ ] Service Worker działa (PWA)

4. **Responsywność:**
   - [ ] Mobile
   - [ ] Tablet
   - [ ] Desktop

5. **Performance:**
   - [ ] Lighthouse score > 90
   - [ ] Szybkie ładowanie
   - [ ] Płynne animacje

---

## 🔧 Rozwiązywanie problemów

### Problem: Strona nie ładuje się

**Rozwiązanie:**
- Sprawdź czy base path jest ustawiony na `/`
- Sprawdź logi build w Render
- Sprawdź czy wszystkie pliki są w `frontend/dist`

### Problem: Service Worker nie działa

**Rozwiązanie:**
- Sprawdź czy `sw.js` jest w `frontend/dist`
- Sprawdź czy Service Worker jest zarejestrowany w `index.html`
- Sprawdź konsole przeglądarki dla błędów

### Problem: Linki nie działają

**Rozwiązanie:**
- Sprawdź czy routing SPA jest skonfigurowany
- Render automatycznie obsługuje routing SPA
- Sprawdź czy wszystkie linki używają relative paths

### Problem: Obrazy nie ładują się

**Rozwiązanie:**
- Sprawdź czy obrazy są w `frontend/dist`
- Sprawdź ścieżki do obrazów (relative paths)
- Sprawdź czy obrazy są w `frontend/public`

---

## 📝 Zmienne środowiskowe

### Frontend (opcjonalnie)

W Render możesz ustawić:
- `NODE_ENV` = `production` (ustawione automatycznie)

### Backend (jeśli wdrażasz)

- `AI_API_KEY` - OpenAI API Key
- `SECRET_KEY` - Secret key dla Flask
- `CORS_ORIGINS` - URL frontendu
- `PORT` - Port (ustawiany automatycznie przez Render)

---

## 🌍 Custom Domain (opcjonalnie)

1. W panelu Render wybierz swoją aplikację
2. Przejdź do "Settings"
3. W sekcji "Custom Domain" dodaj swoją domenę
4. Skonfiguruj DNS według instrukcji Render

---

## 📊 Monitoring

### Render automatycznie zapewnia:

- **Health checks** - automatyczne sprawdzanie dostępności
- **Logs** - logi aplikacji w czasie rzeczywistym
- **Metrics** - metryki wydajności (w planach płatnych)

---

## 💰 Koszty

### Free Tier Render:

- **Static Sites:** DARMOWE
- **Web Services:** DARMOWE (z limitami)
- **Sleep after inactivity:** 15 minut (free tier)

### Pro Tier (opcjonalnie):

- Brak sleep po nieaktywności
- Większa wydajność
- Więcej zasobów

---

## ✅ Finalna checklista

- [ ] Base path zmieniony na `/`
- [ ] Lokalny build działa
- [ ] Wszystkie zmiany commitowane
- [ ] Repozytorium połączone z Render
- [ ] Static Site utworzony w Render
- [ ] Build zakończony sukcesem
- [ ] Aplikacja dostępna pod URL Render
- [ ] Wszystkie funkcje działają
- [ ] Testy responsywności przechodzą
- [ ] Performance jest zadowalający

---

## 🎉 Gotowe!

Po zakończeniu wdrożenia aplikacja będzie dostępna pod adresem:
`https://st-krakos-frontend.onrender.com`

**Powodzenia! 🚀**

