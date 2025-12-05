# Instrukcja Wdrożenia na Render

## Krok 1: Utwórz Blueprint - SZCZEGÓŁOWA INSTRUKCJA

### Co zobaczysz na ekranie:

1. **Otwórz przeglądarkę i idź na:** 
   ```
   https://dashboard.render.com
   ```

2. **Jeśli nie jesteś zalogowany:**
   - Kliknij "Log In" lub "Sign Up"
   - Możesz zalogować się przez GitHub (najłatwiej)
   - Kliknij "Sign in with GitHub"
   - Autoryzuj dostęp do Render

3. **Gdy jesteś w Dashboard (głównym panelu):**
   - Zobaczysz listę swoich serwisów (może być pusta)
   - W prawym górnym rogu jest przycisk **"New +"** (niebieski/przycisk)
   - **KLIKNIJ na przycisk "New +"**

4. **Pojawi się menu z opcjami:**
   - Web Service
   - Background Worker
   - Static Site
   - Private Service
   - PostgreSQL
   - Redis
   - **Blueprint** ← TO WYBIERZ
   - Kliknij na **"Blueprint"**

5. **Zobaczysz formularz "New Blueprint":**
   - **Public Git Repository** - to jest pole do wpisania
   - W to pole wpisz/wklej dokładnie:
     ```
     https://github.com/aibankai96/ST_KRAKOS
     ```
   - **LUB** kliknij na "Search" i wpisz: `ST_KRAKOS`
   - Wybierz z listy: `aibankai96 / ST_KRAKOS`

6. **Sprawdź pole "Branch":**
   - Może być puste lub pokazywać "main"
   - Wpisz lub zmień na: `cleanup/safe-2025`
   - To jest ważne!

7. **Na dole formularza:**
   - Jest przycisk **"Apply"** lub **"Connect"**
   - **KLIKNIJ "Apply"**

8. **Render zacznie przetwarzać:**
   - Zobaczysz komunikat "Creating services..."
   - Render automatycznie wykryje plik `render.yaml`
   - Utworzy 2 serwisy:
     - st-krakos-backend (Web Service)
     - st-krakos-frontend (Static Site)

9. **Gdy zobaczysz 2 nowe serwisy na liście:**
   - Krok 1 zakończony! ✅
   - Przejdź do Kroku 2

---

## KROK 2: Backend - Dodaj zmienne środowiskowe

1. W liście serwisów kliknij na: **st-krakos-backend**

2. Po lewej stronie jest menu - kliknij: **"Environment"**

3. Zobaczysz listę zmiennych środowiskowych (może być pusta)

4. Kliknij przycisk: **"Add Environment Variable"**

5. **Dodaj pierwszą zmienną:**
   - W polu "Key" wpisz: `FLASK_ENV`
   - W polu "Value" wpisz: `production`
   - Kliknij "Save" lub "Add"

6. **Kliknij "Add Environment Variable" ponownie i dodaj:**
   - Key: `PORT`
   - Value: `5000`

7. **Dodaj trzecią zmienną:**
   - Key: `SECRET_KEY`
   - Value: (wygeneruj w PowerShell - patrz poniżej)

8. **Jak wygenerować SECRET_KEY:**
   - Otwórz PowerShell (Windows)
   - Wpisz dokładnie:
     ```
     python -c "import secrets; print(secrets.token_hex(32))"
     ```
   - Naciśnij Enter
   - Zobaczysz długi ciąg znaków (np. `a1b2c3d4e5f6...`)
   - Skopiuj cały ten tekst (Ctrl+C)
   - Wklej w pole "Value" dla SECRET_KEY

9. **Dodaj czwartą zmienną:**
   - Key: `AI_API_KEY`
   - Value: (twój klucz OpenAI - zaczyna się od `sk-`)

10. **Dodaj piątą zmienną:**
    - Key: `CORS_ORIGINS`
    - Value: `https://st-krakos-frontend.onrender.com`

---

## KROK 3: Frontend - Dodaj zmienne środowiskowe

1. Wróć do listy serwisów (kliknij logo Render lub "Dashboard")

2. Kliknij na: **st-krakos-frontend**

3. Po lewej stronie kliknij: **"Environment"**

4. Kliknij: **"Add Environment Variable"**

5. **Dodaj pierwszą zmienną:**
   - Key: `NODE_ENV`
   - Value: `production`

6. **Dodaj drugą zmienną:**
   - Key: `RENDER`
   - Value: `true`

7. **Dodaj trzecią zmienną:**
   - Key: `VITE_API_URL`
   - Value: `https://st-krakos-backend.onrender.com/api`

---

## KROK 4: Sprawdź czy działa

1. **Sprawdź backend:**
   - Otwórz nową kartę w przeglądarce
   - Wpisz adres: `https://st-krakos-backend.onrender.com/api/health`
   - Jeśli widzisz tekst z `"status": "ok"` - działa! ✅

2. **Sprawdź frontend:**
   - Otwórz: `https://st-krakos-frontend.onrender.com`
   - Jeśli strona się ładuje - działa! ✅

---

## Jeśli backend nie działa:

1. Kliknij na **st-krakos-backend**
2. Kliknij **"Settings"** (po lewej)
3. Kliknij **"General"**
4. Sprawdź pole **"Start Command"**
5. Musi być: `python -m backend.app`
6. Jeśli jest inaczej - zmień i zapisz

---

KONIEC - to wszystko!
