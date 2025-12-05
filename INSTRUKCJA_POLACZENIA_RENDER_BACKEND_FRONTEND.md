# Instrukcja Wdrożenia na Render

## ✅ BLUEPRINT DZIAŁA - CO DALEJ:

### KROK 1: Sprawdź czy serwisy są wdrożone

1. W Render Dashboard zobaczysz listę serwisów
2. Sprawdź status:
   - **st-krakos-backend** - jaki status? (Live / Running / Failed)
   - **st-krakos-frontend** - jaki status? (Live / Running / Failed)

---

### KROK 2: Dodaj zmienne środowiskowe do BACKENDU

1. **Kliknij na:** `st-krakos-backend`
2. **Kliknij:** `Environment` (po lewej stronie)
3. **Kliknij:** `Add Environment Variable`

**Dodaj 4 zmienne:**

**Zmienna 1:**
- Key: `FLASK_ENV`
- Value: `production`

**Zmienna 2:**
- Key: `PORT`
- Value: `5000`

**Zmienna 3:**
- Key: `SECRET_KEY`
- Value: Otwórz plik `generate_key.html` w przeglądarce, skopiuj klucz (64 znaki) i wklej tutaj

**Zmienna 4:**
- Key: `CORS_ORIGINS`
- Value: `https://st-krakos-frontend.onrender.com`

---

### KROK 3: Sprawdź zmienne środowiskowe w FRONTENDZIE

1. **Kliknij na:** `st-krakos-frontend`
2. **Kliknij:** `Environment` (po lewej stronie)
3. **Sprawdź czy są:**
   - `NODE_ENV` = `production` (powinno być automatycznie)
   - `RENDER` = `true` (powinno być automatycznie)
   - `VITE_API_URL` - jeśli nie ma, dodaj:
     - Key: `VITE_API_URL`
     - Value: `https://st-krakos-backend.onrender.com/api`

---

### KROK 4: Sprawdź Start Command w BACKENDZIE

1. **Kliknij na:** `st-krakos-backend`
2. **Kliknij:** `Settings` (po lewej)
3. **Kliknij:** `General`
4. **Sprawdź pole:** `Start Command`
5. **Musi być:** `python -m backend.app`
6. **Jeśli jest inaczej** - zmień i zapisz

---

### KROK 5: Sprawdź czy działa

**Backend:**
```
https://st-krakos-backend.onrender.com/api/health
```
- Jeśli widzisz JSON z `"status": "ok"` - działa! ✅

**Frontend:**
```
https://st-krakos-frontend.onrender.com
```
- Jeśli strona się ładuje - działa! ✅

---

## Jeśli backend nie działa:

1. Sprawdź logi: Backend → `Logs`
2. Najczęstsze błędy:
   - Brak SECRET_KEY - dodaj w Environment
   - Brak CORS_ORIGINS - dodaj w Environment
   - Zły Start Command - sprawdź Settings → General

---

## Jeśli frontend nie działa:

1. Sprawdź logi: Frontend → `Logs`
2. Sprawdź czy build się powiódł
3. Sprawdź zmienne środowiskowe

---

**Gotowe!**
