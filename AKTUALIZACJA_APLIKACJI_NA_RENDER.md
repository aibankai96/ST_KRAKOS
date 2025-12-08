# 🔄 Aktualizacja Aplikacji na Renderze - Najnowsza Wersja

## ❌ Problem

Lokalna wersja aplikacji (`http://localhost:3000/ST_KRAKOS/`) wygląda dobrze, ale na Renderze jest starsza wersja.

---

## ✅ Rozwiązanie - Wymuszenie Redeploy

### Krok 1: Sprawdź najnowszy commit

Najnowszy commit w repozytorium: `d0bc133`

### Krok 2: Wymuś redeploy na Renderze

#### Frontend (st-krakos-frontend):

1. Otwórz Render Dashboard → **st-krakos-frontend**
2. Kliknij: **Manual Deploy**
3. Wybierz: **Deploy latest commit**
4. Render powinien wykryć najnowszy commit (`d0bc133`)
5. Kliknij: **Deploy**

**Czas oczekiwania:** 2-5 minut

#### Backend (st-krakos-backend):

1. Otwórz Render Dashboard → **st-krakos-backend**
2. Kliknij: **Manual Deploy**
3. Wybierz: **Deploy latest commit**
4. Render powinien wykryć najnowszy commit
5. Kliknij: **Deploy**

**Czas oczekiwania:** 2-5 minut

---

## 🔍 Alternatywne rozwiązania

### Opcja A: Wyczyść Build Cache

1. Render Dashboard → **st-krakos-frontend** → **Settings**
2. Przewiń do sekcji: **Build & Deploy**
3. Sprawdź, czy jest opcja: **Clear build cache**
4. Jeśli tak - kliknij i zapisz
5. Następnie uruchom: **Manual Deploy** → **Deploy latest commit**

### Opcja B: Sprawdź Auto-Deploy

1. Render Dashboard → **st-krakos-frontend** → **Settings**
2. Sprawdź sekcję: **Auto-Deploy**
3. Upewnij się, że jest włączone
4. Jeśli nie - włącz i zapisz

### Opcja C: Sprawdź Branch

1. Render Dashboard → **st-krakos-frontend** → **Settings**
2. Sprawdź: **Branch**
3. Powinno być: `cleanup/safe-2025`
4. Jeśli nie - zmień i zapisz

---

## ✅ Weryfikacja po redeploy

### Sprawdź logi
1. Render Dashboard → **st-krakos-frontend** → **Logs**
2. Powinno być:
   - ✅ `Checking out commit d0bc133...` (lub najnowszy commit)
   - ✅ Build się powiódł
   - ✅ Frontend został wdrożony

### Test frontendu
Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com
```

**Sprawdź:**
- ✅ Strona wygląda tak samo jak lokalnie
- ✅ Wszystkie funkcjonalności działają
- ✅ W konsoli przeglądarki (F12) nie ma błędów

---

## 🚨 Jeśli nadal jest starsza wersja

### Problem: Render używa starego commita
**Rozwiązanie:**
1. Sprawdź w Render, jaki commit jest używany (w Events/Deploys)
2. Jeśli to nie najnowszy commit - wybierz ręcznie najnowszy w Manual Deploy

### Problem: Cache przeglądarki
**Rozwiązanie:**
1. Wyczyść cache przeglądarki (Ctrl+Shift+Delete)
2. Lub otwórz w trybie incognito
3. Lub dodaj `?v=2` na końcu URL: `https://st-krakos-frontend.onrender.com?v=2`

### Problem: Service Worker cache
**Rozwiązanie:**
1. Otwórz DevTools (F12) → **Application** → **Service Workers**
2. Kliknij: **Unregister** (jeśli jest zarejestrowany)
3. Odśwież stronę (Ctrl+F5)

---

## 📋 Checklista

- [ ] Manual Deploy uruchomiony dla frontendu
- [ ] Manual Deploy uruchomiony dla backendu (jeśli potrzebne)
- [ ] Najnowszy commit (`d0bc133`) jest używany
- [ ] Build się powiódł
- [ ] Frontend działa i wygląda tak samo jak lokalnie

---

**Po Manual Deploy z najnowszego commita, aplikacja na Renderze powinna wyglądać tak samo jak lokalnie! 🎉**

