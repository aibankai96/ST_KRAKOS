# Instrukcja Wdrożenia na Render

## CO ROBIĆ KROK PO KROKU:

---

## 1. Utwórz Blueprint

1. Otwórz: https://dashboard.render.com
2. Kliknij przycisk **"New +"** (prawy górny róg)
3. Kliknij **"Blueprint"**
4. W pole "Public Git Repository" wklej: `https://github.com/aibankai96/ST_KRAKOS`
5. W pole "Branch" wpisz: `cleanup/safe-2025`
6. Kliknij **"Apply"**
7. Poczekaj aż Render utworzy 2 serwisy (backend i frontend)

---

## 2. Backend - Dodaj zmienne środowiskowe

1. W liście serwisów kliknij na: **st-krakos-backend**
2. Po lewej stronie kliknij: **"Environment"**
3. Kliknij: **"Add Environment Variable"**

**Dodaj 5 zmiennych (dla każdej kliknij "Add Environment Variable"):**

Zmienna 1:
- Key: `FLASK_ENV`
- Value: `production`

Zmienna 2:
- Key: `PORT`
- Value: `5000`

Zmienna 3:
- Key: `SECRET_KEY`
- Value: (otwórz PowerShell, wykonaj: `python -c "import secrets; print(secrets.token_hex(32))"`, skopiuj wynik i wklej tutaj)

Zmienna 4:
- Key: `AI_API_KEY`
- Value: (twój klucz OpenAI - zaczyna się od `sk-`)

Zmienna 5:
- Key: `CORS_ORIGINS`
- Value: `https://st-krakos-frontend.onrender.com`

---

## 3. Frontend - Dodaj zmienne środowiskowe

1. W liście serwisów kliknij na: **st-krakos-frontend**
2. Po lewej stronie kliknij: **"Environment"**
3. Kliknij: **"Add Environment Variable"**

**Dodaj 3 zmienne:**

Zmienna 1:
- Key: `NODE_ENV`
- Value: `production`

Zmienna 2:
- Key: `RENDER`
- Value: `true`

Zmienna 3:
- Key: `VITE_API_URL`
- Value: `https://st-krakos-backend.onrender.com/api`

---

## 4. Sprawdź czy działa

1. Backend: otwórz w przeglądarce: `https://st-krakos-backend.onrender.com/api/health`
   - Jeśli widzisz JSON - działa

2. Frontend: otwórz w przeglądarce: `https://st-krakos-frontend.onrender.com`
   - Jeśli strona się ładuje - działa

---

## 5. Jeśli backend nie działa

**Sprawdź Start Command:**
1. Backend → Settings → General
2. Sprawdź pole "Start Command"
3. Musi być: `python -m backend.app`
4. Jeśli jest inaczej - zmień i zapisz

**Sprawdź SECRET_KEY:**
1. Backend → Environment
2. Sprawdź czy jest zmienna `SECRET_KEY`
3. Jeśli nie ma - dodaj (jak w kroku 2)

---

KONIEC - to wszystko co trzeba zrobić.
