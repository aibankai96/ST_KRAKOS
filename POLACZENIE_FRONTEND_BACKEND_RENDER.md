# 🔗 Instrukcja: Połączenie Frontend i Backend w Renderze

## 📋 Wymagane zmienne środowiskowe

### ✅ BACKEND (st-krakos-backend)

Musisz mieć ustawione następujące zmienne:

| Key | Value | Opis |
|-----|-------|------|
| `SECRET_KEY` | `b7c2c42865763e89e8945c85d8c00523e4cd8369c05233aba55eda94f86597f8` | Klucz szyfrowania (64 znaki) |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | **WAŻNE:** URL frontendu (bez końcowego slasha) |
| `FLASK_ENV` | `production` | Środowisko produkcyjne |
| `PORT` | `5000` | Port backendu |
| `AI_API_KEY` | `69c1ee6292ec1da3bae0f4a04f0746905dfa50e060694971460c7436eb22ca59` | Klucz API OpenAI |

### ✅ FRONTEND (st-krakos-frontend)

Musisz mieć ustawione następujące zmienne:

| Key | Value | Opis |
|-----|-------|------|
| `VITE_API_URL` | `https://st-krakos-backend.onrender.com/api` | **NAJWAŻNIEJSZE:** URL backendu + `/api` |
| `NODE_ENV` | `production` | Środowisko produkcyjne |
| `RENDER` | `true` | Flaga dla Render (używana w vite.config.js) |

---

## 🔧 Krok 1: Konfiguracja Backendu

### 1.1. Otwórz panel Render
1. Zaloguj się na https://render.com
2. Przejdź do Dashboard
3. Kliknij na serwis: **st-krakos-backend**

### 1.2. Sprawdź zmienne środowiskowe
1. W lewym menu kliknij: **Environment**
2. Sprawdź, czy masz wszystkie wymagane zmienne (patrz tabela powyżej)

### 1.3. Ustaw CORS_ORIGINS (NAJWAŻNIEJSZE!)
1. Znajdź zmienną: `CORS_ORIGINS`
2. **Wartość MUSI być:** `https://st-krakos-frontend.onrender.com`
   - ✅ **POPRAWNIE:** `https://st-krakos-frontend.onrender.com`
   - ❌ **BŁĘDNIE:** `https://st-krakos-frontend.onrender.com/` (z końcowym slashem)
   - ❌ **BŁĘDNIE:** `http://st-krakos-frontend.onrender.com` (bez https)
3. Jeśli nie ma tej zmiennej - dodaj ją:
   - Kliknij: **Add Environment Variable**
   - Key: `CORS_ORIGINS`
   - Value: `https://st-krakos-frontend.onrender.com`
   - Kliknij: **Save Changes**

---

## 🔧 Krok 2: Konfiguracja Frontendu

### 2.1. Otwórz panel Render
1. Zaloguj się na https://render.com
2. Przejdź do Dashboard
3. Kliknij na serwis: **st-krakos-frontend**

### 2.2. Dodaj zmienne środowiskowe
1. W lewym menu kliknij: **Environment**
2. Kliknij: **Add Environment Variable**

#### Zmienna 1: VITE_API_URL (NAJWAŻNIEJSZA!)
- **Key:** `VITE_API_URL`
- **Value:** `https://st-krakos-backend.onrender.com/api`
- **WAŻNE:** 
  - Musi być pełny URL backendu
  - Musi kończyć się na `/api`
  - Musi używać `https://` (nie `http://`)

#### Zmienna 2: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`

#### Zmienna 3: RENDER
- **Key:** `RENDER`
- **Value:** `true`

### 2.3. Zapisz zmiany
1. Kliknij: **Save Changes**
2. Render automatycznie zredeployuje frontend

---

## ✅ Krok 3: Weryfikacja połączenia

### 3.1. Sprawdź backend
Otwórz w przeglądarce:
```
https://st-krakos-backend.onrender.com/api/health
```

**Oczekiwany wynik:**
```json
{"status": "ok"}
```

### 3.2. Sprawdź frontend
Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Sprawdź:**
- ✅ Strona się ładuje
- ✅ W konsoli przeglądarki (F12) nie ma błędów CORS
- ✅ W konsoli nie ma błędów 404 dla API

### 3.3. Test połączenia Frontend → Backend
1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`
2. Otwórz DevTools (F12) → **Network**
3. Wykonaj akcję, która wywołuje API (np. generowanie strony)
4. Sprawdź, czy request idzie do: `https://st-krakos-backend.onrender.com/api/...`
5. Sprawdź, czy nie ma błędów CORS

---

## 🚨 Rozwiązywanie problemów

### Problem: CORS Error w przeglądarce

**Objawy:**
```
Access to fetch at 'https://st-krakos-backend.onrender.com/api/...' from origin 'https://st-krakos-frontend.onrender.com' has been blocked by CORS policy
```

**Rozwiązanie:**
1. Sprawdź, czy `CORS_ORIGINS` w backendzie ma dokładny URL frontendu:
   - ✅ `https://st-krakos-frontend.onrender.com`
   - ❌ `https://st-krakos-frontend.onrender.com/` (z końcowym slashem)
   - ❌ `http://st-krakos-frontend.onrender.com` (bez https)
2. Sprawdź logi backendu - zobaczysz requesty z błędami CORS
3. Po zmianie `CORS_ORIGINS` - Render automatycznie zredeployuje backend

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
3. Sprawdź, czy backend działa (test /api/health)
4. Po zmianie `VITE_API_URL` - Render automatycznie zredeployuje frontend

### Problem: Backend nie odpowiada

**Objawy:**
- Test `/api/health` zwraca błąd 404 lub timeout

**Rozwiązanie:**
1. Sprawdź logi backendu w Render
2. Sprawdź, czy wszystkie zmienne środowiskowe są ustawione:
   - `SECRET_KEY` ✅
   - `CORS_ORIGINS` ✅
   - `FLASK_ENV` ✅
   - `PORT` ✅
   - `AI_API_KEY` ✅
3. Sprawdź, czy backend się uruchomił (w logach powinno być: "Starting ST KRATOS Backend API")

---

## 📋 Checklista Finalna

### Backend ✅
- [ ] `SECRET_KEY` ustawiony (64 znaki)
- [ ] `CORS_ORIGINS` ustawiony (`https://st-krakos-frontend.onrender.com`)
- [ ] `FLASK_ENV` ustawiony (`production`)
- [ ] `PORT` ustawiony (`5000`)
- [ ] `AI_API_KEY` ustawiony
- [ ] Backend działa (test `/api/health`)

### Frontend ✅
- [ ] `VITE_API_URL` ustawiony (`https://st-krakos-backend.onrender.com/api`)
- [ ] `NODE_ENV` ustawiony (`production`)
- [ ] `RENDER` ustawiony (`true`)
- [ ] Frontend działa (strona się ładuje)
- [ ] Frontend łączy się z backendem (brak błędów CORS)

---

## 🔗 Ważne URL-e

- **Backend URL:** `https://st-krakos-backend.onrender.com`
- **Frontend URL:** `https://st-krakos-frontend.onrender.com`
- **API Endpoint:** `https://st-krakos-backend.onrender.com/api`
- **Health Check:** `https://st-krakos-backend.onrender.com/api/health`

---

## 📝 Notatki

1. **CORS_ORIGINS** w backendzie musi być dokładnie taki sam jak URL frontendu (bez końcowego slasha)
2. **VITE_API_URL** w frontendzie musi być pełny URL backendu + `/api`
3. Po zmianie zmiennych środowiskowych Render automatycznie redeployuje serwisy
4. Czas redeploy: 2-5 minut na serwis

---

**Status:** Po ustawieniu wszystkich zmiennych środowiskowych, frontend i backend powinny być połączone! 🎉

