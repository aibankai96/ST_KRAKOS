# 🔧 Naprawa Auto-Deploy - Problem z Branch

## ❌ Problem

**Auto-Deploy jest włączone**, ale **nie działa**, bo:
- Render nasłuchuje na branch: `cleanup/safe-2025`
- Ty pushujesz do brancha: `master`
- Render nie widzi zmian w `master`, więc nie uruchamia deploy

---

## ✅ Rozwiązanie - Zmień Branch w Render na `master`

### KROK 1: Zmień Branch dla Frontendu

1. Otwórz: **https://dashboard.render.com**
2. Kliknij na serwis: **st-krakos-frontend**
3. Kliknij: **Settings** (lewe menu)
4. Przewiń do sekcji: **Build & Deploy**
5. Znajdź pole: **Branch**
6. **Kliknij: Edit** (obok Branch)
7. **Zmień z:** `cleanup/safe-2025`
8. **Na:** `master`
9. **Kliknij: Save Changes**

### KROK 2: Zmień Branch dla Backendu (jeśli potrzebne)

1. **Render Dashboard** → **st-krakos-backend** → **Settings**
2. Przewiń do sekcji: **Build & Deploy**
3. Znajdź pole: **Branch**
4. **Kliknij: Edit**
5. **Zmień na:** `master`
6. **Kliknij: Save Changes**

---

## 🔍 Weryfikacja

### Po zmianie brancha:

1. **Sprawdź ustawienia:**
   - ✅ **Branch:** `master`
   - ✅ **Auto-Deploy:** `On Commit`

2. **Wymuś deploy (opcjonalnie):**
   - Render Dashboard → **st-krakos-frontend** → **Manual Deploy**
   - Wybierz: **Deploy latest commit**
   - Render powinien wykryć commit: `401ce66` (lub najnowszy)

3. **Sprawdź Events:**
   - Render Dashboard → **st-krakos-frontend** → **Events**
   - Powinieneś zobaczyć deploy z najnowszego commita

---

## 🚀 Od teraz

**Po zmianie brancha na `master`:**
- Każdy push do `master` automatycznie uruchomi deploy
- Auto-Deploy będzie działać poprawnie
- Render wykryje zmiany w ciągu 1-2 minut

---

## 📋 Obecne ustawienia (do zmiany):

❌ **Branch:** `cleanup/safe-2025` → **Zmień na:** `master` ✅  
✅ **Auto-Deploy:** `On Commit` (już poprawne)  
✅ **Repository:** https://github.com/aibankai96/ST_KRAKOS  

---

**ZMIEŃ Branch w Render na `master` i zapisz zmiany! 🎉**

