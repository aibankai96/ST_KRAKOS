# ✅ Instrukcja Naprawy Render - Finalna Wersja

## 📊 Status Zmiennych Środowiskowych

### ✅ BACKEND (st-krakos-backend) - POPRAWIONE!

Wszystkie zmienne są teraz poprawne:

| Key | Value | Status |
|-----|-------|--------|
| `SECRET_KEY` | `b7c2c42865763e89e8945c85d8c00523e4cd8369c05233aba55eda94f86597f8` | ✅ OK |
| `CORS_ORIGINS` | `https://st-krakos-frontend.onrender.com` | ✅ OK |
| `FLASK_ENV` | `production` | ✅ OK |
| `PORT` | `5000` | ✅ OK |
| `AI_API_KEY` | `69c1ee6292ec1da3bae0f4a04f0746905dfa50e060694971460c7436eb22ca59` | ✅ OK |

**Backend powinien teraz się uruchomić!** 🎉

---

## ⚠️ FRONTEND (st-krakos-frontend) - DO SPRAWDZENIA!

Frontend **MUSI** mieć ustawione zmienne środowiskowe, żeby połączyć się z backendem.

### Wymagane zmienne dla frontendu:

1. **VITE_API_URL** (NAJWAŻNIEJSZE!)
   - Key: `VITE_API_URL`
   - Value: `https://st-krakos-backend.onrender.com/api`
   - **Bez tego frontend nie połączy się z backendem!**

2. **NODE_ENV** (opcjonalne, ale zalecane)
   - Key: `NODE_ENV`
   - Value: `production`

3. **RENDER** (używane w vite.config.js)
   - Key: `RENDER`
   - Value: `true`

---

## 🔧 Instrukcja: Dodanie zmiennych do frontendu

### Krok 1: Otwórz panel Render
1. Zaloguj się na https://render.com
2. Przejdź do Dashboard
3. Kliknij na serwis: **st-krakos-frontend**

### Krok 2: Dodaj zmienne środowiskowe
1. W lewym menu kliknij: **Environment**
2. Kliknij: **Add Environment Variable**

**Dodaj 3 zmienne:**

#### Zmienna 1: VITE_API_URL
- **Key:** `VITE_API_URL`
- **Value:** `https://st-krakos-backend.onrender.com/api`
- **WAŻNE:** To jest URL backendu + `/api` na końcu!

#### Zmienna 2: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`

#### Zmienna 3: RENDER
- **Key:** `RENDER`
- **Value:** `true`

### Krok 3: Zapisz i poczekaj na redeploy
1. Kliknij: **Save Changes**
2. Render automatycznie zredeployuje frontend
3. Poczekaj 2-5 minut

---

## ✅ Weryfikacja po naprawie

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
3. Wykonaj akcję, która wywołuje API
4. Sprawdź, czy request idzie do: `https://st-krakos-backend.onrender.com/api/...`
5. Sprawdź, czy nie ma błędów CORS

---

## 📋 Checklista Finalna

### Backend ✅
- [x] SECRET_KEY ustawiony (64 znaki)
- [x] CORS_ORIGINS ustawiony (URL frontendu)
- [x] PORT ustawiony (5000)
- [x] FLASK_ENV ustawiony (production)
- [x] AI_API_KEY ustawiony
- [ ] Backend działa (test /api/health)

### Frontend ⚠️
- [ ] VITE_API_URL ustawiony (URL backendu + /api)
- [ ] NODE_ENV ustawiony (production)
- [ ] RENDER ustawiony (true)
- [ ] Frontend działa (strona się ładuje)
- [ ] Frontend łączy się z backendem (brak błędów CORS)

---

## 🚨 Rozwiązywanie problemów

### Problem: Backend nadal "Failed deploy"
1. Sprawdź logi: **st-krakos-backend** → **Logs**
2. Najczęstsze błędy:
   - Brak SECRET_KEY (ale już masz ustawiony ✅)
   - Błąd importu modułów
   - Błąd w requirements.txt

### Problem: Frontend nie łączy się z backendem
1. Sprawdź, czy `VITE_API_URL` jest ustawione w frontendzie
2. Sprawdź, czy URL backendu jest poprawny (z `/api` na końcu)
3. Sprawdź, czy backend działa (test /api/health)
4. Sprawdź konsolę przeglądarki (F12) - zobaczysz dokładny błąd

### Problem: CORS Error
1. Sprawdź, czy `CORS_ORIGINS` w backendzie ma dokładny URL frontendu
2. URL frontendu: `https://st-krakos-frontend.onrender.com` (bez końcowego slasha)
3. Sprawdź logi backendu - zobaczysz requesty z błędami CORS

---

## 🎯 Następne kroki

1. **Dodaj zmienne do frontendu** (VITE_API_URL, NODE_ENV, RENDER)
2. **Poczekaj na redeploy** (2-5 minut)
3. **Przetestuj backend:** `https://st-krakos-backend.onrender.com/api/health`
4. **Przetestuj frontend:** `https://st-krakos-frontend.onrender.com`
5. **Sprawdź połączenie:** DevTools → Network → wykonaj akcję API

---

## 📝 Notatki

- **Backend URL:** `https://st-krakos-backend.onrender.com`
- **Frontend URL:** `https://st-krakos-frontend.onrender.com`
- **API Endpoint:** `https://st-krakos-backend.onrender.com/api`
- **Health Check:** `https://st-krakos-backend.onrender.com/api/health`

---

**Status:** Backend zmienne ✅ | Frontend zmienne ⚠️ (do dodania)

