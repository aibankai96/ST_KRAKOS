# Instrukcja Wdrożenia na Render

## WYPEŁNIJ FORMUŁARZ - KONKRETNIE:

### 1. Blueprint Name (pole wymagane)
**Wpisz dowolną nazwę, np:**
```
ST-KRATOS-App
```
lub
```
st-kratos-blueprint
```

### 2. Branch
**Jest już ustawione:** `cleanup/safe-2025` ✅
**Nie zmieniaj tego!**

### 3. Choose an option (wybierz opcję)

**Zaznacz:** 
- ✅ **"Associate existing services"** (Skojarz istniejące serwisy)

**LUB jeśli serwisy nie istnieją:**
- ✅ **"Create all as new services"** (Utwórz wszystkie jako nowe)

### 4. AI_API_KEY (ważne!)

**W pole "Value" wpisz:**
- Twój klucz OpenAI API (zaczyna się od `sk-`)
- Np. `sk-proj-abc123...` (cały klucz)

### 5. Na końcu

**Sprawdź:**
- ✅ Wszystko jest zaznaczone
- ✅ AI_API_KEY jest wpisany

**Kliknij przycisk:** **"Create"** (na dole formularza)

---

## PO KLIKNIĘCIU "CREATE":

### 1. Backend - Dodaj zmienne środowiskowe

1. W Render Dashboard kliknij na: **st-krakos-backend**
2. Po lewej kliknij: **"Environment"**
3. Kliknij: **"Add Environment Variable"**

**Dodaj 4 zmienne:**

**Zmienna 1:**
- Key: `FLASK_ENV`
- Value: `production`

**Zmienna 2:**
- Key: `PORT`
- Value: `5000`

**Zmienna 3:**
- Key: `SECRET_KEY`
- Value: (wygeneruj w PowerShell - patrz poniżej)

**Zmienna 4:**
- Key: `CORS_ORIGINS`
- Value: `https://st-krakos-frontend.onrender.com`

**Jak wygenerować SECRET_KEY:**
1. Otwórz PowerShell
2. Wpisz: `python -c "import secrets; print(secrets.token_hex(32))"`
3. Naciśnij Enter
4. Skopiuj cały wynik (64 znaki)
5. Wklej jako wartość SECRET_KEY

### 2. Frontend - Sprawdź zmienne środowiskowe

1. Kliknij na: **st-krakos-frontend**
2. Kliknij: **"Environment"**
3. Sprawdź czy są te zmienne (jeśli nie - dodaj):

**Zmienna 1:**
- Key: `NODE_ENV`
- Value: `production`

**Zmienna 2:**
- Key: `RENDER`
- Value: `true`

**Zmienna 3:**
- Key: `VITE_API_URL`
- Value: `https://st-krakos-backend.onrender.com/api`

### 3. Sprawdź Start Command w Backendzie

1. Kliknij na **st-krakos-backend**
2. Kliknij **"Settings"** → **"General"**
3. Sprawdź pole **"Start Command"**
4. **Musi być:** `python -m backend.app`
5. Jeśli jest inaczej - zmień i zapisz

---

## Sprawdź czy działa:

1. **Backend:** `https://st-krakos-backend.onrender.com/api/health`
   - Jeśli widzisz JSON - działa! ✅

2. **Frontend:** `https://st-krakos-frontend.onrender.com`
   - Jeśli strona się ładuje - działa! ✅

---

**Gotowe!**
