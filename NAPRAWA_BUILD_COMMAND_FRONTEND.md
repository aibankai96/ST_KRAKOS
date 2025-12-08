# 🔧 Naprawa Build Command Frontendu w Render

## ❌ Problem

Render nadal używa starego build command:
```
cd frontend && npm install && RENDER=true npm run build
```

To powoduje błąd: `eslint: not found`, bo `npm run build` próbuje uruchomić lint.

## ✅ Rozwiązanie

Musisz zaktualizować build command **bezpośrednio w panelu Render**, bo Render nie używa pliku `render.yaml` dla istniejących serwisów.

---

## 🔧 Krok po kroku

### Krok 1: Otwórz panel Render
1. Zaloguj się na https://render.com
2. Przejdź do Dashboard
3. Kliknij na serwis: **st-krakos-frontend**

### Krok 2: Otwórz Settings
1. W lewym menu kliknij: **Settings**
2. Przewiń do sekcji: **Build & Deploy**

### Krok 3: Znajdź Build Command
1. Znajdź pole: **Build Command**
2. Obecna wartość to prawdopodobnie:
   ```
   cd frontend && npm install && RENDER=true npm run build
   ```

### Krok 4: Zmień Build Command
**Zmień na:**
```
cd frontend && npm install && RENDER=true npm run build:prod
```

**LUB jeszcze prostsze (jeśli build:prod nie działa):**
```
cd frontend && npm install && RENDER=true vite build
```

### Krok 5: Zapisz zmiany
1. Kliknij: **Save Changes**
2. Render automatycznie zredeployuje frontend

**Czas oczekiwania:** 2-5 minut

---

## 📋 Pełna konfiguracja Frontendu w Render

### Build Command:
```
cd frontend && npm install && RENDER=true npm run build:prod
```

### Root Directory:
```
frontend
```
(lub puste, jeśli repo jest w root)

### Publish Directory:
```
frontend/dist
```
(lub `dist`, jeśli Root Directory = `frontend`)

### Environment Variables:
- `NODE_ENV` = `production`
- `RENDER` = `true`
- `VITE_API_URL` = `https://st-krakos-backend.onrender.com/api`

---

## ✅ Weryfikacja po naprawie

### Sprawdź logi
1. Render Dashboard → st-krakos-frontend → **Logs**
2. Powinno być:
   - ✅ `npm run build:prod` (bez błędów eslint)
   - ✅ Build się powiódł
   - ✅ Frontend został wdrożony

### Test frontendu
Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Sprawdź:**
- ✅ Strona się ładuje
- ✅ W konsoli przeglądarki (F12) nie ma błędów
- ✅ API działa (jeśli backend jest połączony)

---

## 🚨 Jeśli nadal występuje błąd

### Problem: build:prod nie istnieje
**Rozwiązanie:** Użyj prostszego build command:
```
cd frontend && npm install && RENDER=true vite build
```

### Problem: Błąd w package.json
**Rozwiązanie:** Sprawdź, czy w `frontend/package.json` jest:
```json
"build:prod": "vite build"
```

Jeśli nie ma, dodaj to do `package.json` i zrób commit + push.

---

## 📝 Różnica między build a build:prod

### `npm run build`:
```json
"build": "npm run lint && npm run validate-sw && vite build"
```
- Uruchamia lint (wymaga eslint)
- Uruchamia validate-sw
- Potem buduje aplikację

### `npm run build:prod`:
```json
"build:prod": "vite build"
```
- Tylko buduje aplikację
- Pomija lint i validate-sw
- Idealne dla produkcji

---

**Po zmianie Build Command w panelu Render, frontend powinien się zbudować bez błędów! 🎉**

