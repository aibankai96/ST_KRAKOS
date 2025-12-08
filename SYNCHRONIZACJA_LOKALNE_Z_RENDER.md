# 🔄 Synchronizacja: Lokalne zmiany z Renderem

## ✅ Status

**Lokalnie:** `http://localhost:3000/ST_KRAKOS/` - wygląda dobrze (ciemnozielone karty, nazwa ST KRATOS)
**Na Renderze:** `https://st-krakos-frontend.onrender.com` - starsza wersja

---

## 🔍 Diagnoza

### Sprawdzenie 1: Czy zmiany są w repozytorium?

**Status:** ✅ Wszystkie pliki są commitowane
- Brak niecommitowanych zmian w `frontend/`
- Nazwa "ST KRATOS" jest w kodzie
- CSS ma ciemne tła (ale nie widzę ciemnozielonych kolorów w kodzie)

### Sprawdzenie 2: Czy Render używa najnowszego commita?

**Najnowszy commit:** `f48eff9` - "Add deployment documentation and connection guides"

**Sprawdź w Render:**
1. Render Dashboard → **st-krakos-frontend** → **Events** lub **Deploys**
2. Sprawdź, jaki commit jest używany w najnowszym deploy
3. Jeśli to nie `f48eff9` - wymuś redeploy z najnowszego commita

---

## ✅ Rozwiązanie - Krok po Kroku

### Krok 1: Sprawdź, czy ciemnozielone karty są w kodzie

**Otwórz w edytorze:**
```
frontend/src/styles/main.css
```

**Wyszukaj:** `green` lub `zielon` lub ciemnozielony kolor (np. `#1a5f1a`, `#0d4d0d`)

**Jeśli znajdziesz:**
- Sprawdź, czy są commitowane: `git status frontend/src/styles/main.css`
- Jeśli nie - commit i push

**Jeśli NIE znajdziesz:**
- Może zmiany są tylko w przeglądarce (DevTools override)
- Albo może chodzi o inne elementy

### Krok 2: Sprawdź w DevTools (lokalnie)

1. Otwórz lokalnie: `http://localhost:3000/ST_KRAKOS/`
2. Otwórz DevTools (F12) → **Elements**
3. Znajdź kartę z ciemnozielonym kolorem
4. Sprawdź w zakładce **Styles**:
   - Skąd pochodzi ten kolor?
   - Czy to jest w pliku CSS?
   - Czy to jest override w DevTools?
   - Czy to jest w `<style>` w `<head>`?

### Krok 3: Jeśli zmiany są tylko lokalne

**Jeśli ciemnozielone karty są tylko w przeglądarce (DevTools override):**

1. Skopiuj dokładny kolor z DevTools
2. Zaktualizuj CSS z tym kolorem
3. Commit i push

**Jeśli ciemnozielone karty są w kodzie, ale nie są commitowane:**

1. Sprawdź: `git status frontend/src/styles/main.css`
2. Jeśli są zmiany - dodaj do commita:
   ```bash
   git add frontend/src/styles/main.css
   git commit -m "Add dark green cards styling"
   git push origin cleanup/safe-2025
   ```

### Krok 4: Wymuś redeploy na Renderze

1. Render Dashboard → **st-krakos-frontend**
2. Kliknij: **Manual Deploy**
3. Wybierz: **Deploy latest commit**
4. Render użyje najnowszego commita
5. Kliknij: **Deploy**

**Czas oczekiwania:** 2-5 minut

---

## 🔍 Jak znaleźć dokładny kolor ciemnozielonych kart

### Metoda 1: DevTools (lokalnie)

1. Otwórz lokalnie: `http://localhost:3000/ST_KRAKOS/`
2. Otwórz DevTools (F12) → **Elements**
3. Znajdź kartę z ciemnozielonym kolorem
4. Kliknij na nią
5. W zakładce **Styles** znajdź właściwość `background` lub `background-color`
6. Skopiuj dokładny kolor (np. `#1a5f1a` lub `rgb(26, 95, 26)`)

### Metoda 2: Color Picker

1. Otwórz lokalnie: `http://localhost:3000/ST_KRAKOS/`
2. Otwórz DevTools (F12) → **Elements**
3. Znajdź kartę z ciemnozielonym kolorem
4. Kliknij na ikonę pipety (color picker) w DevTools
5. Kliknij na kartę
6. Skopiuj kolor

---

## 📋 Checklista

- [ ] Sprawdzono kod CSS - czy są ciemnozielone kolory?
- [ ] Sprawdzono DevTools - skąd pochodzi ciemnozielony kolor?
- [ ] Jeśli zmiany są w kodzie - commit i push
- [ ] Jeśli zmiany są tylko lokalne - dodaj do kodu, commit i push
- [ ] Wymuś redeploy na Renderze z najnowszego commita
- [ ] Sprawdź na Renderze - czy zmiany są widoczne?

---

## 💡 Szybkie rozwiązanie

**Jeśli ciemnozielone karty są tylko lokalnie:**

1. **Znajdź dokładny kolor** z DevTools (jak wyżej)
2. **Zaktualizuj CSS** z tym kolorem
3. **Commit i push:**
   ```bash
   git add frontend/src/styles/main.css
   git commit -m "Add dark green cards styling"
   git push origin cleanup/safe-2025
   ```
4. **Wymuś redeploy na Renderze** (Manual Deploy → Deploy latest commit)

---

**Najpierw sprawdź w DevTools, skąd pochodzi ciemnozielony kolor - czy to jest w kodzie, czy tylko lokalnie w przeglądarce! 🔍**

