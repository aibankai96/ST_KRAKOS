# 🔄 WYMUSZENIE AKTUALIZACJI NA RENDERZE

## Problem
- ✅ Lokalnie (`http://localhost:3001/ST_KRAKOS/`) - wszystko działa poprawnie
- ❌ Na Renderze (`stkratos.com`) - nie ma najnowszych zmian

## Przyczyna
Render może używać starego commita lub cache przeglądarki blokuje nową wersję.

---

## ✅ ROZWIĄZANIE - Krok po kroku

### KROK 1: Zaktualizuj Service Worker (JUŻ ZROBIONE)
- ✅ Wersja cache zaktualizowana z `v1.0.1` → `v1.0.2`
- To wymusi aktualizację cache w przeglądarce

### KROK 2: Commit i Push zmian

```bash
git add frontend/public/sw.js
git commit -m "Update Service Worker cache version to v1.0.2 - force cache refresh"
git push origin cleanup/safe-2025
```

### KROK 3: Wymuś redeploy na Renderze

#### A) Frontend (st-krakos-frontend)

1. **Otwórz Render Dashboard**
   - Wejdź na: https://dashboard.render.com
   - Zaloguj się

2. **Znajdź serwis `st-krakos-frontend`**
   - Kliknij na nazwę serwisu

3. **Manual Deploy**
   - Kliknij przycisk **"Manual Deploy"** (w prawym górnym rogu)
   - Wybierz **"Deploy latest commit"**
   - Potwierdź deploy

4. **Poczekaj na zakończenie builda**
   - Build może trwać 2-5 minut
   - Sprawdź logi, czy build się powiódł

#### B) Backend (st-krakos-backend) - jeśli potrzebny

1. **Otwórz serwis `st-krakos-backend`**
2. **Manual Deploy** → **"Deploy latest commit"**
3. **Poczekaj na zakończenie**

---

## 🔍 WERYFIKACJA

### 1. Sprawdź commit na Renderze

Po deploy, w logach Render powinno być:
```
==> Checking out commit f48eff9...
```

Jeśli widzisz inny commit (np. `624f6b9`), Render używa starego commita!

### 2. Wyczyść cache przeglądarki

#### Chrome/Edge:
1. Otwórz DevTools (F12)
2. Kliknij prawym na przycisk odświeżania
3. Wybierz **"Empty Cache and Hard Reload"**

#### Lub:
1. DevTools (F12) → **Application** → **Storage**
2. Kliknij **"Clear site data"**
3. Odśwież stronę (Ctrl+Shift+R)

### 3. Sprawdź Service Worker

1. DevTools (F12) → **Application** → **Service Workers**
2. Sprawdź, czy wersja to `v1.0.2`
3. Jeśli nie, kliknij **"Unregister"** i odśwież stronę

### 4. Sprawdź, czy zmiany są widoczne

- ✅ Nazwa: **"ST KRATOS"** (w headerze i footerze)
- ✅ Kolory kart: ciemne tło z złotymi akcentami
- ✅ Wszystkie sekcje działają poprawnie

---

## 🚨 Jeśli nadal nie działa

### Opcja A: Sprawdź, czy Render używa najnowszego commita

1. Render Dashboard → `st-krakos-frontend` → **Events**
2. Sprawdź najnowszy deploy
3. Sprawdź commit hash (powinien być `f48eff9`)

### Opcja B: Wymuś nowy commit

Utwórz pusty commit, aby wymusić nowy deploy:

```bash
git commit --allow-empty -m "Force Render redeploy - update cache version"
git push origin cleanup/safe-2025
```

Następnie wykonaj **Manual Deploy** na Renderze.

### Opcja C: Sprawdź domenę

- Sprawdź, czy `stkratos.com` wskazuje na `st-krakos-frontend.onrender.com`
- Sprawdź DNS w panelu domeny

---

## 📝 Notatki

- **Service Worker cache**: Wersja `v1.0.2` wymusi aktualizację cache
- **Render commit**: Powinien używać `f48eff9` (najnowszy)
- **Cache przeglądarki**: Może blokować nową wersję - wyczyść cache!

---

## ✅ Po wykonaniu wszystkich kroków

1. ✅ Commit i push wykonany
2. ✅ Manual Deploy na Renderze wykonany
3. ✅ Cache przeglądarki wyczyszczony
4. ✅ Service Worker zaktualizowany do `v1.0.2`
5. ✅ Zmiany widoczne na `stkratos.com`

---

**Data utworzenia**: 2025-01-XX
**Ostatnia aktualizacja**: 2025-01-XX

