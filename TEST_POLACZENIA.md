# ✅ Test Połączenia Frontend i Backend

## 📋 Sprawdzenie Konfiguracji

Jeśli wszystkie zmienne środowiskowe są ustawione, połączenie powinno działać automatycznie!

---

## ✅ Test 1: Backend Health Check

Otwórz w przeglądarce:
```
https://st-krakos-backend.onrender.com/api/health
```

**Oczekiwany wynik:**
```json
{"status": "ok"}
```

**Jeśli działa:** ✅ Backend jest gotowy!

---

## ✅ Test 2: Frontend

Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Sprawdź:**
- ✅ Strona się ładuje
- ✅ Otwórz konsolę przeglądarki (F12)
- ✅ Sprawdź, czy nie ma błędów CORS

**Jeśli działa:** ✅ Frontend jest gotowy!

---

## ✅ Test 3: Połączenie Frontend → Backend

1. Otwórz frontend: `https://st-krakos-frontend.onrender.com`
2. Otwórz DevTools (F12) → zakładka **Network**
3. Wykonaj akcję, która wywołuje API (np. generowanie strony)
4. Sprawdź w zakładce Network:
   - ✅ Czy request idzie do: `https://st-krakos-backend.onrender.com/api/...`
   - ✅ Czy status odpowiedzi to `200 OK` (lub inny sukces)
   - ✅ Czy nie ma błędów CORS

**Jeśli działa:** ✅ Połączenie działa!

---

## 🚨 Jeśli coś nie działa

### Problem: CORS Error

**Objawy w konsoli przeglądarki:**
```
Access to fetch at 'https://st-krakos-backend.onrender.com/api/...' from origin 'https://st-krakos-frontend.onrender.com' has been blocked by CORS policy
```

**Rozwiązanie:**
1. Sprawdź w Render → st-krakos-backend → Environment
2. Sprawdź, czy `CORS_ORIGINS` = `https://st-krakos-frontend.onrender.com`
3. Jeśli nie - popraw i zapisz
4. Poczekaj na redeploy backendu (2-5 minut)

### Problem: Failed to fetch

**Objawy w konsoli przeglądarki:**
```
Failed to fetch
```

**Rozwiązanie:**
1. Sprawdź w Render → st-krakos-frontend → Environment
2. Sprawdź, czy `VITE_API_URL` = `https://st-krakos-backend.onrender.com/api`
3. Jeśli nie - popraw i zapisz
4. Poczekaj na redeploy frontendu (2-5 minut)

### Problem: Backend nie odpowiada

**Objawy:** Requesty do API zwracają błąd 404 lub timeout

**Rozwiązanie:**
1. Sprawdź, czy backend działa: `https://st-krakos-backend.onrender.com/api/health`
2. Sprawdź logi backendu w Render
3. Sprawdź, czy wszystkie zmienne środowiskowe są ustawione

---

## 📋 Checklista Weryfikacji

- [ ] Backend działa: `/api/health` zwraca `{"status": "ok"}`
- [ ] Frontend działa: strona się ładuje
- [ ] Brak błędów CORS w konsoli przeglądarki
- [ ] Requesty z frontendu idą do backendu
- [ ] API działa poprawnie

---

**Jeśli wszystkie testy przechodzą - frontend i backend są połączone! 🎉**

