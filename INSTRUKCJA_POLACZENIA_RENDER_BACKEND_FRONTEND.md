# Instrukcja Wdrożenia na Render

## ❌ BACKEND MA BŁĄD - NAPRAWIAMY:

### KROK 1: Sprawdź błąd w logach

1. Kliknij na: **st-krakos-backend**
2. Kliknij: **"Logs"** (po lewej stronie)
3. Zobaczysz błąd - najczęściej to:
   - "SECRET_KEY must be set"
   - "CORS_ORIGINS must be set"
   - "ModuleNotFoundError"

---

### KROK 2: Dodaj zmienne środowiskowe (NAJWAŻNIEJSZE!)

1. Kliknij na: **st-krakos-backend**
2. Kliknij: **"Environment"** (po lewej stronie)
3. Kliknij: **"Add Environment Variable"**

**Dodaj 4 zmienne (WAŻNE - wszystkie!):**

**1. FLASK_ENV:**
- Key: `FLASK_ENV`
- Value: `production`

**2. PORT:**
- Key: `PORT`
- Value: `5000`

**3. SECRET_KEY (OBOWIĄZKOWE!):**
- Key: `SECRET_KEY`
- Value: Otwórz plik `generate_key.html` w przeglądarce i skopiuj wygenerowany klucz (64 znaki)
- **BEZ TEGO BACKEND NIE URUCHOMI SIĘ!**

**4. CORS_ORIGINS:**
- Key: `CORS_ORIGINS`
- Value: `https://st-krakos-frontend.onrender.com`

---

### KROK 3: Sprawdź Start Command

1. Kliknij na: **st-krakos-backend**
2. Kliknij: **"Settings"** (po lewej)
3. Kliknij: **"General"**
4. Sprawdź pole: **"Start Command"**
5. **Musi być:** `python -m backend.app`
6. Jeśli jest inaczej - zmień i zapisz

---

### KROK 4: Sprawdź czy SECRET_KEY jest ustawiony

**Jeśli nie masz klucza:**

1. Otwórz w przeglądarce plik: `generate_key.html` (z folderu projektu)
2. Zobaczysz wygenerowany klucz (64 znaki)
3. Skopiuj go (Ctrl+C)
4. Wklej jako wartość SECRET_KEY w Render

---

### KROK 5: Po dodaniu zmiennych

1. Render automatycznie zredeployuje backend
2. Poczekaj ~2-3 minuty
3. Sprawdź status - powinien zmienić się na "Live"

---

### KROK 6: Sprawdź czy działa

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

## ✅ Frontend już działa!

Frontend ma status "Deployed" - to dobrze! ✅

Tylko backend trzeba naprawić przez dodanie zmiennych środowiskowych.

---

**Najważniejsze: Dodaj SECRET_KEY w Environment backendu - bez tego backend nie uruchomi się!**
