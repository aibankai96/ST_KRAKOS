# 🔧 Naprawa: Nie widzę zmian na stronie Render

## ❌ Problem

Render przeszedł (deploy się udał), ale na stronie nie widzisz zmian.

**Przyczyna:** Cache przeglądarki lub Service Worker przechowuje starą wersję.

---

## ✅ Rozwiązanie - Krok po Kroku

### Krok 1: Wyczyść cache przeglądarki

#### Chrome/Edge:
1. Otwórz DevTools (F12)
2. Kliknij prawym przyciskiem na ikonę odświeżania (obok paska adresu)
3. Wybierz: **"Wyczyść cache i wymuś przeładowanie"** (Empty Cache and Hard Reload)
4. Lub: Ctrl+Shift+Delete → Wyczyść cache → Odśwież stronę

#### Firefox:
1. Otwórz DevTools (F12)
2. Kliknij prawym przyciskiem na ikonę odświeżania
3. Wybierz: **"Wyczyść cache i przeładuj"**
4. Lub: Ctrl+Shift+Delete → Wyczyść cache → Odśwież stronę

#### Safari:
1. Cmd+Option+E (wyczyść cache)
2. Cmd+Shift+R (wymuś przeładowanie)

### Krok 2: Wyłącz Service Worker

1. Otwórz DevTools (F12)
2. Przejdź do zakładki: **Application** (lub **Aplikacja**)
3. W lewym menu znajdź: **Service Workers**
4. Jeśli widzisz zarejestrowany Service Worker:
   - Kliknij: **Unregister** (lub **Wyrejestruj**)
   - Odśwież stronę (Ctrl+F5 lub Cmd+Shift+R)

### Krok 3: Otwórz w trybie incognito

1. Otwórz nowe okno w trybie incognito/prywatnym:
   - Chrome/Edge: Ctrl+Shift+N
   - Firefox: Ctrl+Shift+P
   - Safari: Cmd+Shift+N
2. Otwórz: `https://st-krakos-frontend.onrender.com`
3. Sprawdź, czy widzisz zmiany

### Krok 4: Dodaj parametr do URL (wymuś nową wersję)

Otwórz w przeglądarce:
```
https://st-krakos-frontend.onrender.com?v=2
```

Lub:
```
https://st-krakos-frontend.onrender.com?v=3
```

To wymusi pobranie nowej wersji.

---

## 🔍 Sprawdź czy zmiany są wdrożone

### Test 1: Sprawdź wersję w kodzie źródłowym

1. Otwórz: `https://st-krakos-frontend.onrender.com`
2. Otwórz DevTools (F12) → zakładka **Network**
3. Odśwież stronę (Ctrl+F5)
4. Znajdź plik `index.html` lub główny plik JS
5. Kliknij na niego i sprawdź zawartość
6. Sprawdź, czy kod jest aktualny

### Test 2: Sprawdź commit w Render

1. Render Dashboard → **st-krakos-frontend** → **Events** lub **Deploys**
2. Sprawdź najnowszy deploy
3. Powinien pokazywać commit: `f48eff9` (lub najnowszy)
4. Sprawdź, czy deploy się powiódł

### Test 3: Sprawdź logi builda

1. Render Dashboard → **st-krakos-frontend** → **Logs**
2. Sprawdź najnowszy build
3. Powinno być:
   - ✅ `Checking out commit f48eff9...` (lub najnowszy)
   - ✅ Build się powiódł
   - ✅ Frontend został wdrożony

---

## 🚨 Jeśli nadal nie widzisz zmian

### Problem: Render używa starego commita
**Rozwiązanie:**
1. Sprawdź w Render, jaki commit jest używany
2. Jeśli to nie najnowszy - wybierz ręcznie najnowszy w Manual Deploy

### Problem: Cache Render
**Rozwiązanie:**
1. Render Dashboard → **st-krakos-frontend** → **Settings**
2. Przewiń do sekcji: **Build & Deploy**
3. Sprawdź, czy jest opcja: **Clear build cache**
4. Jeśli tak - kliknij i zapisz
5. Następnie uruchom: **Manual Deploy** → **Deploy latest commit**

### Problem: Zmiany nie są w repozytorium
**Rozwiązanie:**
1. Sprawdź lokalnie: `git log --oneline -1`
2. Sprawdź na GitHub: czy najnowszy commit jest widoczny
3. Jeśli nie - wykonaj commit i push

---

## 📋 Checklista

- [ ] Cache przeglądarki wyczyszczony
- [ ] Service Worker wyrejestrowany
- [ ] Strona otwarta w trybie incognito
- [ ] Sprawdzony commit w Render (najnowszy)
- [ ] Sprawdzony build w logach (sukces)
- [ ] Zmiany widoczne na stronie

---

## 💡 Szybkie rozwiązanie (TL;DR)

1. **Otwórz DevTools (F12)**
2. **Application → Service Workers → Unregister**
3. **Ctrl+Shift+Delete → Wyczyść cache**
4. **Ctrl+F5** (wymuś przeładowanie)
5. **Lub otwórz w trybie incognito**

---

**Po wyczyszczeniu cache i wyrejestrowaniu Service Worker, powinieneś zobaczyć najnowsze zmiany! 🎉**

