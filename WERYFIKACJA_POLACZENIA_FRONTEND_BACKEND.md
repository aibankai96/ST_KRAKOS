# ✅ Weryfikacja Połączenia Frontend i Backend w Renderze

## 🎉 Status
- ✅ **Backend:** Działa (świeci na zielono)
- ✅ **Frontend:** Działa (deploy się udał)

Teraz musimy upewnić się, że są połączone!

---

## 📋 Sprawdzenie Konfiguracji

### ✅ Backend (st-krakos-backend)

**Sprawdź zmienne środowiskowe w Render:**

1. Render Dashboard → **st-krakos-backend** → **Environment**
2. Sprawdź, czy masz:

| Key | Value | Status |
|-----|-------|--------|
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | ⚠️ SPRAWDŹ |
| `SECRET_KEY` | `b7c2c42865763e89e8945c85d8c00523e4cd8369c05233aba55eda94f86597f8` | ✅ |
| `FLASK_ENV` | `production` | ✅ |
| `PORT` | `5000` | ✅ |
| `AI_API_KEY` | `69c1ee6292ec1da3bae0f4a04f0746905dfa50e060694971460c7436eb22ca59` | ✅ |

**WAŻNE:** `CORS_ORIGINS` musi być dokładnie:
```
https://st-krakos-frontend.onrender.com
```
- ✅ Z `https://` (nie `http://`)
- ✅ Bez końcowego slasha
- ✅ Dokładny URL frontendu

### ✅ Frontend (st-krakos-frontend)

**Sprawdź zmienne środowiskowe w Render:**

1. Render Dashboard → **st-krakos-frontend** → **Environment**
2. Sprawdź, czy masz:

| Key | Value | Status |
|-----|-------|--------|
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | ⚠️ SPRAWDŹ |
| `NODE_ENV` | `production` | ✅ |
| `RENDER` | `true` | ✅ |

**WAŻNE:** `VITE_API_URL` musi być dokładnie:
```
https://st-krakos-backend.onrender.com/api
```
- ✅ Z `https://` (nie `http://`)
- ✅ Z `/api` na końcu
- ✅ Dokładny URL backendu + `/api`

---

## 🔧 Jeśli zmienne nie są ustawione

### Backend - Dodaj CORS_ORIGINS

1. Render Dashboard → **st-krakos-backend** → **Environment**
2. Kliknij: **Add Environment Variable**
3. Key: `CORS_ORIGINS`
4. Value: `https://st-krakos-frontend.onrender.com`
5. Kliknij: **Save Changes**

### Frontend - Dodaj VITE_API_URL

1. Render Dashboard → **st-krakos-frontend** → **Environment**
2. Kliknij: **Add Environment Variable**
3. Key: `VITE_API_URL`
4. Value: `https://st-krakos-backend.onrender.com/api`
5. Kliknij: **Save Changes**

**UWAGA:** Po dodaniu `VITE_API_URL` w frontendzie, Render automatycznie zredeployuje frontend (2-5 minut).

---

## ✅ Test Połączenia

### Test 1: Backend Health Check

Otwórz w przeglądarce:
```
https://st-krakos-backend.onrender.com/api/health
```

**Oczekiwany wynik:**
```json
{"status": "ok"}
```

### Test 2: Frontend

Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Sprawdź:**
- ✅ Strona się ładuje
- ✅ W konsoli przeglądarki (F12) nie ma błędów CORS
- ✅ W konsoli nie ma błędów 404 dla API

### Test 3: Połączenie Frontend → Backend

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`
2. Otwórz DevTools (F12) → **Network**
3. Wykonaj akcję, która wywołuje API (np. generowanie strony)
4. Sprawdź, czy request idzie do: `https://st-krakos-backend.onrender.com/api/...`
5. Sprawdź, czy nie ma błędów CORS

---

## 🚨 Rozwiązywanie problemów

### Problem: CORS Error

**Objawy:**
```
Access to fetch at 'https://st-krakos-backend.onrender.com/api/...' from origin 'https://st-krakos-frontend.onrender.com' has been blocked by CORS policy
```

**Rozwiązanie:**
1. Sprawdź, czy `CORS_ORIGINS` w backendzie ma dokładny URL frontendu:
   - ✅ `https://st-krakos-frontend.onrender.com`
   - ❌ `https://st-krakos-frontend.onrender.com/` (z końcowym slashem)
   - ❌ `http://st-krakos-frontend.onrender.com` (bez https)
2. Po zmianie `CORS_ORIGINS` - Render automatycznie zredeployuje backend

### Problem: Frontend nie łączy się z backendem

**Objawy:**
- W konsoli przeglądarki: `Failed to fetch`
- W Network: requesty do `http://localhost:5000/api` zamiast do Render

**Rozwiązanie:**
1. Sprawdź, czy `VITE_API_URL` jest ustawione w frontendzie
2. Sprawdź, czy URL backendu jest poprawny:
   - ✅ `https://st-krakos-backend.onrender.com/api`
   - ❌ `http://st-krakos-backend.onrender.com/api` (bez https)
   - ❌ `https://st-krakos-backend.onrender.com` (bez /api)
3. Po zmianie `VITE_API_URL` - Render automatycznie zredeployuje frontend

---

## 📋 Checklista Finalna

### Backend ✅
- [ ] `CORS_ORIGINS` = `https://st-krakos-frontend.onrender.com`
- [ ] `SECRET_KEY` ustawiony
- [ ] `FLASK_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `AI_API_KEY` ustawiony
- [ ] Backend działa (test `/api/health`)

### Frontend ✅
- [ ] `VITE_API_URL` = `https://st-krakos-backend.onrender.com/api`
- [ ] `NODE_ENV` = `production`
- [ ] `RENDER` = `true`
- [ ] Frontend działa (strona się ładuje)
- [ ] Frontend łączy się z backendem (brak błędów CORS)

---

## 🔗 Ważne URL-e

- **Backend URL:** `https://st-krakos-backend.onrender.com`
- **Frontend URL:** `https://st-krakos-frontend.onrender.com`
- **API Endpoint:** `https://st-krakos-backend.onrender.com/api`
- **Health Check:** `https://st-krakos-backend.onrender.com/api/health`

---

**Po ustawieniu wszystkich zmiennych środowiskowych, frontend i backend powinny być połączone! 🎉**

