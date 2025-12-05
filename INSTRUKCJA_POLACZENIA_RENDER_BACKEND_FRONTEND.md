# Instrukcja Wdrożenia na Render

## KROK 1: Utwórz/Edytuj Blueprint - CO WYBRAĆ W FORMUŁARZU

**Jeśli widzisz formularz z opcjami do wyboru:**

### 1. Branch (Ważne!)
- **Zmień z "master" na:** `cleanup/safe-2025`
- Kliknij na pole "Branch" i wpisz: `cleanup/safe-2025`

### 2. Wybór serwisów
**Jeśli widzisz opcję:**
- **"Associate existing services"** (Skojarz istniejące serwisy)
- **"Create all as new services"** (Utwórz wszystkie jako nowe)

**Wybierz:** **"Associate existing services"** (jeśli serwisy już istnieją)

**LUB** wybierz: **"Create all as new services"** (jeśli chcesz stworzyć nowe)

### 3. Zmienne środowiskowe w formularzu
**Jeśli widzisz:**
- Key: `AI_API_KEY`
- Value: Enter value

**Wpisz tutaj:**
- W pole "Value" wpisz swój klucz OpenAI (zaczyna się od `sk-`)

### 4. Na końcu
- Sprawdź czy wszystko jest zaznaczone
- Kliknij przycisk **"Create"** (na dole formularza)

---

## CO DALEJ PO KLIKNIĘCIU "CREATE":

### 1. Backend - Sprawdź i ustaw zmienne środowiskowe

1. W Render Dashboard kliknij na: **st-krakos-backend**

2. Po lewej stronie kliknij: **"Environment"**

3. **Sprawdź czy są te zmienne (jeśli nie ma - dodaj):**

   Kliknij **"Add Environment Variable"** i dodaj:

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
   - Otwórz PowerShell
   - Wpisz: `python -c "import secrets; print(secrets.token_hex(32))"`
   - Naciśnij Enter
   - Skopiuj cały wynik i wklej jako wartość SECRET_KEY

### 2. Frontend - Sprawdź i ustaw zmienne środowiskowe

1. W Render Dashboard kliknij na: **st-krakos-frontend**

2. Po lewej stronie kliknij: **"Environment"**

3. **Sprawdź czy są te zmienne (jeśli nie ma - dodaj):**

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
2. Kliknij **"Settings"** (po lewej)
3. Kliknij **"General"**
4. Sprawdź pole **"Start Command"**
5. **Musi być:** `python -m backend.app`
6. Jeśli jest inaczej - zmień i zapisz

---

## Sprawdź czy działa:

1. **Backend:** otwórz: `https://st-krakos-backend.onrender.com/api/health`
   - Jeśli widzisz JSON z `"status": "ok"` - działa! ✅

2. **Frontend:** otwórz: `https://st-krakos-frontend.onrender.com`
   - Jeśli strona się ładuje - działa! ✅

---

**WAŻNE:** Branch musi być `cleanup/safe-2025` (nie `master`)!
