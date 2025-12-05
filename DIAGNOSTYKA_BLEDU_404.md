# 🔍 Szczegółowa Diagnostyka Błędu 404

**Błąd:** `{"error":"Endpoint nie został znaleziony"}`

---

## 🔍 KROK 1: Sprawdź Konsolę Przeglądarki

1. Otwórz frontend w przeglądarce
2. Naciśnij **F12** (lub prawy przycisk → "Zbadaj element")
3. Przejdź do zakładki **"Console"**
4. Sprawdź czy widzisz błędy

**Szukaj:**
- Błędy typu `404`, `Failed to fetch`, `CORS`
- URL-e które są wywoływane (np. `http://localhost:5000/api/...`)

**Skopiuj dokładny błąd i URL który jest wywoływany**

---

## 🔍 KROK 2: Sprawdź Network Tab

1. W konsoli przeglądarki przejdź do zakładki **"Network"**
2. Odśwież stronę (F5)
3. Sprawdź wszystkie requesty do `/api/...`

**Szukaj:**
- Jaki dokładnie URL jest wywoływany?
- Jaki status code (404, 500, CORS error)?
- Jaka jest odpowiedź z serwera?

**Przykład:**
- ❌ `http://localhost:5000/api/health` - zły URL (localhost)
- ✅ `https://st-krakos.onrender.com/api/health` - dobry URL

---

## 🔍 KROK 3: Sprawdź Environment Variables w Render

### Frontend Service:

1. Render Dashboard → Frontend Service (`st-krakos-frontend`)
2. Settings → Environment Variables
3. Sprawdź czy masz:

| Key | Value | Status |
|-----|-------|--------|
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` | ✅/❌ |
| `NODE_ENV` | `production` | ✅/❌ |
| `RENDER` | `true` | ✅/❌ |

**WAŻNE:** 
- `VITE_API_URL` musi być ustawione!
- URL musi kończyć się na `/api` (nie `/api/`)
- Zastąp `st-krakos.onrender.com` swoim rzeczywistym URL backendu

---

## 🔍 KROK 4: Sprawdź URL Backendu

1. Render Dashboard → Backend Service
2. Znajdź **URL** (np. `https://st-krakos.onrender.com`)
3. Sprawdź czy backend działa:
   - Otwórz w przeglądarce: `https://st-krakos.onrender.com/api/health`
   - Powinieneś zobaczyć: `{"status":"ok","service":"ST KRAKOS Backend","version":"1.0.0"}`

---

## 🔍 KROK 5: Sprawdź CORS w Backendzie

1. Render Dashboard → Backend Service
2. Settings → Environment Variables
3. Znajdź `CORS_ORIGINS`
4. Sprawdź czy zawiera URL frontendu:

**Przykład:**
```
https://st-krakos-frontend.onrender.com
```

Lub oba URL-e:
```
https://st-krakos-frontend.onrender.com,https://st-krakos.onrender.com
```

---

## 🔍 KROK 6: Sprawdź Logi Backendu

1. Render Dashboard → Backend Service
2. Kliknij zakładkę **"Logs"**
3. Sprawdź ostatnie logi

**Szukaj:**
- Requesty do `/api/...` - czy są?
- Błędy 404 - jaki dokładnie endpoint?
- CORS errors?

---

## 🚨 NAJCZĘSTSZE PROBLEMY

### Problem 1: `VITE_API_URL` nie jest ustawione
**Objaw:** Frontend próbuje połączyć się z `http://localhost:5000/api`
**Rozwiązanie:** Dodaj `VITE_API_URL` w Environment Variables frontendu

### Problem 2: Nieprawidłowy URL w `VITE_API_URL`
**Objaw:** Frontend próbuje połączyć się z nieprawidłowym URL
**Rozwiązanie:** Sprawdź czy URL jest poprawny i kończy się na `/api`

### Problem 3: CORS Error
**Objaw:** Błąd w konsoli: `CORS policy: No 'Access-Control-Allow-Origin'`
**Rozwiązanie:** Zaktualizuj `CORS_ORIGINS` w backendzie

### Problem 4: Frontend nie został zredeployowany
**Objaw:** Zmiany w Environment Variables nie działają
**Rozwiązanie:** Wymuś redeploy frontendu (Manual Deploy)

### Problem 5: Podwójny `/api` w URL
**Objaw:** Frontend próbuje wywołać `/api/api/health`
**Rozwiązanie:** `VITE_API_URL` powinno być `https://st-krakos.onrender.com/api` (z `/api`)

---

## 📋 CHECKLISTA DIAGNOSTYCZNA

Odpowiedz na te pytania:

1. **Jaki dokładnie URL jest wywoływany?** (z konsoli przeglądarki)
   - [ ] `http://localhost:5000/api/...` ❌
   - [ ] `https://st-krakos.onrender.com/api/...` ✅
   - [ ] Inny URL: _______________

2. **Czy `VITE_API_URL` jest ustawione w Render?**
   - [ ] TAK
   - [ ] NIE

3. **Jaki jest dokładny błąd w konsoli?**
   - [ ] 404 Not Found
   - [ ] CORS Error
   - [ ] Failed to fetch
   - [ ] Inny: _______________

4. **Czy backend odpowiada na `/api/health`?**
   - [ ] TAK - widzę `{"status":"ok"...}`
   - [ ] NIE - błąd

5. **Czy frontend został zredeployowany po zmianie Environment Variables?**
   - [ ] TAK
   - [ ] NIE
   - [ ] NIE WIEM

---

## 💡 SZYBKIE ROZWIĄZANIE

Jeśli nie jesteś pewien:

1. **Sprawdź konsolę przeglądarki (F12)**
2. **Skopiuj dokładny błąd i URL**
3. **Wyślij mi te informacje**

---

**Po otrzymaniu tych informacji będę mógł dokładnie zdiagnozować problem! 🔍**

