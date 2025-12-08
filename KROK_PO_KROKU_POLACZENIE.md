# 🔗 Krok po Kroku: Połączenie Frontend i Backend w Renderze

## 📋 Co musisz zrobić

Ustawić 2 zmienne środowiskowe - jedną w backendzie, jedną we frontendzie.

---

## 🔧 KROK 1: Backend - Ustaw CORS_ORIGINS

### 1.1. Otwórz panel Render
1. Zaloguj się na https://render.com
2. Przejdź do Dashboard
3. Kliknij na serwis: **st-krakos-backend**

### 1.2. Otwórz Environment Variables
1. W lewym menu kliknij: **Environment**
2. Zobaczysz listę zmiennych środowiskowych

### 1.3. Sprawdź czy jest CORS_ORIGINS
- **Jeśli JEST** - kliknij ikonę ołówka (Edit) obok wartości
- **Jeśli NIE MA** - kliknij: **Add Environment Variable**

### 1.4. Ustaw wartość
- **Key:** `CORS_ORIGINS`
- **Value:** `https://st-krakos-frontend.onrender.com`
  - ⚠️ **WAŻNE:** Bez końcowego slasha!
  - ⚠️ **WAŻNE:** Z `https://` (nie `http://`)

### 1.5. Zapisz
1. Kliknij: **Save Changes**
2. Render automatycznie zredeployuje backend (2-5 minut)

---

## 🔧 KROK 2: Frontend - Ustaw VITE_API_URL

### 2.1. Otwórz panel Render
1. W Render Dashboard kliknij na serwis: **st-krakos-frontend**

### 2.2. Otwórz Environment Variables
1. W lewym menu kliknij: **Environment**
2. Zobaczysz listę zmiennych środowiskowych

### 2.3. Sprawdź czy jest VITE_API_URL
- **Jeśli JEST** - kliknij ikonę ołówka (Edit) obok wartości
- **Jeśli NIE MA** - kliknij: **Add Environment Variable**

### 2.4. Ustaw wartość
- **Key:** `VITE_API_URL`
- **Value:** `https://st-krakos-backend.onrender.com/api`
  - ⚠️ **WAŻNE:** Z `/api` na końcu!
  - ⚠️ **WAŻNE:** Z `https://` (nie `http://`)

### 2.5. Zapisz
1. Kliknij: **Save Changes**
2. Render automatycznie zredeployuje frontend (2-5 minut)

---

## ✅ KROK 3: Sprawdź czy działa

### Test 1: Backend
Otwórz w przeglądarce:
```
https://st-krakos-backend.onrender.com/api/health
```

**Powinno zwrócić:**
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
- ✅ Otwórz konsolę przeglądarki (F12)
- ✅ Nie powinno być błędów CORS

### Test 3: Połączenie
1. Na stronie frontendu wykonaj akcję, która wywołuje API
2. Otwórz DevTools (F12) → zakładka **Network**
3. Sprawdź, czy request idzie do: `https://st-krakos-backend.onrender.com/api/...`
4. Sprawdź, czy nie ma błędów CORS

---

## 📸 Wizualna pomoc

### Backend - Environment Variables:
```
Key: CORS_ORIGINS
Value: https://st-krakos-frontend.onrender.com
```

### Frontend - Environment Variables:
```
Key: VITE_API_URL
Value: https://st-krakos-backend.onrender.com/api
```

---

## 🚨 Jeśli coś nie działa

### Problem: CORS Error
**Objawy:** W konsoli przeglądarki błąd o CORS

**Rozwiązanie:**
1. Sprawdź, czy `CORS_ORIGINS` w backendzie ma dokładnie: `https://st-krakos-frontend.onrender.com`
2. Sprawdź, czy nie ma końcowego slasha
3. Po zmianie - poczekaj na redeploy backendu (2-5 minut)

### Problem: Frontend nie łączy się z backendem
**Objawy:** W konsoli przeglądarki "Failed to fetch"

**Rozwiązanie:**
1. Sprawdź, czy `VITE_API_URL` w frontendzie ma dokładnie: `https://st-krakos-backend.onrender.com/api`
2. Sprawdź, czy jest `/api` na końcu
3. Po zmianie - poczekaj na redeploy frontendu (2-5 minut)

---

## 📋 Checklista

- [ ] Backend: `CORS_ORIGINS` = `https://st-krakos-frontend.onrender.com`
- [ ] Frontend: `VITE_API_URL` = `https://st-krakos-backend.onrender.com/api`
- [ ] Backend zredeployowany (poczekaj 2-5 minut)
- [ ] Frontend zredeployowany (poczekaj 2-5 minut)
- [ ] Test backendu: `/api/health` działa
- [ ] Test frontendu: strona się ładuje
- [ ] Test połączenia: API działa bez błędów CORS

---

**To wszystko! Po ustawieniu tych 2 zmiennych, frontend i backend będą połączone! 🎉**

