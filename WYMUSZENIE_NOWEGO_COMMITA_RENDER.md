# 🔧 Wymuszenie użycia najnowszego commita w Render

## ❌ Problem

Render nadal używa starego commita (`a1efd8a`) zamiast najnowszego (`d0bc133`), gdzie `vite` jest w `dependencies`.

**Najnowszy commit:** `d0bc133` - "Fix: Move vite to dependencies for production build"

---

## ✅ Rozwiązanie - Krok po Kroku

### Krok 1: Otwórz panel Render
1. Zaloguj się na https://render.com
2. Przejdź do Dashboard
3. Kliknij na serwis: **st-krakos-frontend**

### Krok 2: Manual Deploy z najnowszego commita
1. W lewym menu kliknij: **Manual Deploy**
2. Wybierz: **Deploy latest commit**
3. Render powinien wykryć najnowszy commit (`d0bc133`)
4. Kliknij: **Deploy**

**Czas oczekiwania:** 2-5 minut

### Krok 3: Sprawdź czy używa najnowszego commita
1. W widoku serwisu sprawdź zakładkę: **Events** lub **Deploys**
2. Najnowszy deploy powinien pokazywać commit: `d0bc133`
3. W logach powinno być:
   - `Checking out commit d0bc133...`
   - `Installing vite` (jako dependency)
   - Build się powiódł

---

## 🔍 Alternatywne rozwiązania

### Opcja A: Sprawdź Auto-Deploy
1. Render Dashboard → st-krakos-frontend → **Settings**
2. Sprawdź sekcję: **Auto-Deploy**
3. Upewnij się, że jest włączone
4. Jeśli nie - włącz i zapisz

### Opcja B: Sprawdź Branch
1. Render Dashboard → st-krakos-frontend → **Settings**
2. Sprawdź: **Branch**
3. Powinno być: `cleanup/safe-2025`
4. Jeśli nie - zmień i zapisz

### Opcja C: Wyczyść cache (jeśli nadal nie działa)
1. Render Dashboard → st-krakos-frontend → **Settings**
2. Przewiń do sekcji: **Build & Deploy**
3. Sprawdź czy jest opcja: **Clear build cache**
4. Jeśli tak - kliknij i zapisz
5. Następnie uruchom: **Manual Deploy** → **Deploy latest commit**

---

## ✅ Weryfikacja po naprawie

### Sprawdź logi
1. Render Dashboard → st-krakos-frontend → **Logs**
2. Powinno być:
   - ✅ `Checking out commit d0bc133...` (najnowszy commit)
   - ✅ `Installing vite` (jako dependency, nie devDependency)
   - ✅ `npm run build:prod` działa
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
- ✅ API działa (połączenie z backendem)

---

## 📋 Checklista

- [ ] Manual Deploy uruchomiony
- [ ] Najnowszy commit (`d0bc133`) jest używany
- [ ] Vite jest instalowany jako dependency
- [ ] Build się powiódł
- [ ] Frontend działa

---

## 🚨 Jeśli nadal używa starego commita

### Problem: Render nie widzi nowego commita
**Rozwiązanie:**
1. Sprawdź w GitHub, czy commit `d0bc133` jest widoczny w branchu `cleanup/safe-2025`
2. Sprawdź w Render, czy branch jest ustawiony na `cleanup/safe-2025`
3. Spróbuj ręcznie wybrać commit w Manual Deploy

### Problem: Cache Render
**Rozwiązanie:**
1. Wyczyść build cache (jeśli dostępne)
2. Lub poczekaj 5-10 minut i spróbuj ponownie
3. Render czasami ma opóźnienie w wykrywaniu nowych commitów

---

**Po Manual Deploy z najnowszego commita, frontend powinien się zbudować bez błędów! 🎉**

