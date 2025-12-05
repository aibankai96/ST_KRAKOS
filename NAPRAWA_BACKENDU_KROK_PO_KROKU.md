# Naprawa Backendu - Krok po Kroku

## CO WIDZISZ W LOGACH BACKENDU?

**Wejdź w:**
1. Render Dashboard
2. Kliknij na: **st-krakos-backend**
3. Kliknij: **"Logs"**

**Jakie błędy widzisz? Skopiuj mi pierwszy błąd (czerwony tekst).**

---

## NAJCZĘSTSZE BŁĘDY I SZYBKIE NAPRAWY:

### BŁĄD 1: "SECRET_KEY must be set"

**NAPRAWA (2 minuty):**
1. Backend → Environment
2. Kliknij "Add Environment Variable"
3. Key: `SECRET_KEY`
4. Value: Otwórz `generate_key.html` w przeglądarce, skopiuj klucz, wklej
5. Zapisz

### BŁĄD 2: "CORS_ORIGINS must be set"

**NAPRAWA (1 minuta):**
1. Backend → Environment
2. Key: `CORS_ORIGINS`
3. Value: `https://st-krakos-frontend.onrender.com`
4. Zapisz

### BŁĄD 3: "ModuleNotFoundError"

**NAPRAWA (1 minuta):**
1. Backend → Settings → General
2. Start Command: `python -m backend.app`
3. Zapisz

---

## WYŚLIJ MI BŁĄD Z LOGÓW A NAPRAWIĘ GO OD RAZU!

**Lub zrób screenshot logów i wyślij.**

