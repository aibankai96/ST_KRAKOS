# 🔧 Rozwiązanie Błędu "Endpoint nie został znaleziony"

**Problem:** `{"error":"Endpoint nie został znaleziony"}`

## 🔍 Analiza Problemu

Błąd pochodzi z backendu (404) - frontend próbuje połączyć się z backendem, ale używa nieprawidłowego URL.

### Przyczyna:
Frontend używa domyślnego URL: `http://localhost:5000/api` zamiast URL backendu na Render.

---

## ✅ ROZWIĄZANIE

### Krok 1: Ustaw Environment Variable w Frontendzie

W Render Dashboard → Frontend Service (`st-krakos-frontend`) → Settings → Environment Variables:

**Dodaj nową zmienną:**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` |

⚠️ **WAŻNE:** 
- Zastąp `st-krakos.onrender.com` swoim rzeczywistym URL backendu
- URL musi kończyć się na `/api` (nie `/api/`)

### Krok 2: Zapisz i Poczekaj na Redeploy

1. Kliknij **"Save Changes"**
2. Render automatycznie uruchomi nowy deploy
3. Poczekaj ~2-5 minut na zakończenie builda

### Krok 3: Sprawdź czy Działa

1. Otwórz URL frontendu
2. Sprawdź konsolę przeglądarki (F12)
3. Sprawdź czy nie ma błędów CORS lub 404

---

## 🔍 Jak Sprawdzić URL Backendu

1. W Render Dashboard → Backend Service
2. Znajdź **URL** (np. `https://st-krakos.onrender.com`)
3. Dodaj `/api` na końcu: `https://st-krakos.onrender.com/api`
4. To jest wartość dla `VITE_API_URL`

---

## 📋 Pełna Konfiguracja Environment Variables dla Frontendu

| Key | Value | Opis |
|-----|-------|------|
| `NODE_ENV` | `production` | Środowisko produkcyjne |
| `RENDER` | `true` | Flaga dla Render |
| `VITE_API_URL` | `https://st-krakos.onrender.com/api` | URL backendu API |

⚠️ **WAŻNE:** `VITE_API_URL` musi być ustawione, inaczej frontend będzie próbował połączyć się z `localhost`!

---

## 🚨 Jeśli Nadal Nie Działa

### Sprawdź CORS w Backendzie

W Render Dashboard → Backend Service → Environment Variables:

**Sprawdź `CORS_ORIGINS`:**

Powinno zawierać URL frontendu, np.:
```
https://st-krakos-frontend.onrender.com
```

Lub oba URL-e oddzielone przecinkiem:
```
https://st-krakos-frontend.onrender.com,https://st-krakos.onrender.com
```

### Sprawdź Logi

1. W Render Dashboard → Frontend Service → Logs
2. Sprawdź **Build Logs** - czy build się powiódł?
3. Sprawdź konsolę przeglądarki (F12) - jakie są błędy?

---

## ✅ Checklista

- [ ] `VITE_API_URL` ustawione w Environment Variables frontendu
- [ ] URL backendu jest poprawny (kończy się na `/api`)
- [ ] `CORS_ORIGINS` w backendzie zawiera URL frontendu
- [ ] Frontend został zredeployowany po zmianie Environment Variables
- [ ] Sprawdzono konsolę przeglądarki (F12) - brak błędów

---

**Po wykonaniu tych kroków błąd powinien zniknąć! 🚀**

