# Instrukcja Wdrożenia na Render

## ✅ BLUEPRINT DZIAŁA!

Jeśli widzisz status "running" - to znaczy że Render wdraża aplikację. 

---

## CO TERAZ ZROBIĆ:

### 1. POCZEKAJ NA ZAKOŃCZENIE WDROŻENIA

- Status "running" oznacza że trwa wdrażanie
- Poczekaj ~5-10 minut
- Odśwież stronę Render po kilku minutach
- Gdy status zmieni się na "Live" - wdrożenie zakończone

---

### 2. DODAJ ZMIENNE ŚRODOWISKOWE DO BACKENDU

**Gdy backend będzie wdrożony:**

1. Kliknij na: **st-krakos-backend**
2. Kliknij: **"Environment"** (po lewej)
3. Kliknij: **"Add Environment Variable"**

**Dodaj 4 zmienne:**

**1.**
- Key: `FLASK_ENV`
- Value: `production`

**2.**
- Key: `PORT`
- Value: `5000`

**3.**
- Key: `SECRET_KEY`
- Value: Otwórz plik `generate_key.html` w przeglądarce i skopiuj wygenerowany klucz (64 znaki)

**4.**
- Key: `CORS_ORIGINS`
- Value: `https://st-krakos-frontend.onrender.com`

---

### 3. SPRAWDŹ CZY FRONTEND MA ZMIENNE

1. Kliknij na: **st-krakos-frontend**
2. Kliknij: **"Environment"** (po lewej)
3. Sprawdź czy są:
   - `NODE_ENV` = `production`
   - `RENDER` = `true`
   - Jeśli brakuje `VITE_API_URL` - dodaj:
     - Key: `VITE_API_URL`
     - Value: `https://st-krakos-backend.onrender.com/api`

---

### 4. SPRAWDŹ START COMMAND W BACKENDZIE

1. Kliknij na: **st-krakos-backend**
2. Kliknij: **"Settings"**
3. Kliknij: **"General"**
4. Sprawdź pole: **"Start Command"**
5. Musi być: `python -m backend.app`
6. Jeśli jest inaczej - zmień na: `python -m backend.app`
7. Zapisz

---

### 5. SPRAWDŹ CZY DZIAŁA

**Backend:**
```
https://st-krakos-backend.onrender.com/api/health
```
Jeśli widzisz JSON z `"status": "ok"` - działa! ✅

**Frontend:**
```
https://st-krakos-frontend.onrender.com
```
Jeśli strona się ładuje - działa! ✅

---

## WAŻNE:

- Jeśli backend nie działa - sprawdź czy SECRET_KEY jest ustawiony
- Jeśli frontend nie działa - sprawdź logi (Logs w Render Dashboard)
- Po dodaniu zmiennych środowiskowych - Render automatycznie zredeployuje

---

**Gotowe!**
