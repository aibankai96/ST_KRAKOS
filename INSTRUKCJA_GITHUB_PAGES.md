# 📋 Instrukcja: Jak Włączyć GitHub Pages

## Krok po kroku:

### 1. **Kliknij "Settings"** (Ustawienia)
   - W górnym menu repozytorium (obok Code, Issues, Pull requests)
   - Lub bezpośredni link: `https://github.com/aibankai96/ST_KRAKOS/settings`

### 2. **Przejdź do sekcji "Pages"**
   - W lewym menu (sidebar) znajdź **"Pages"**
   - Kliknij na **"Pages"**

### 3. **Wybierz Source**
   - W sekcji **"Source"** wybierz:
     - **Source:** `GitHub Actions` (z listy rozwijanej)
   - **Branch:** zostaw domyślnie (nie trzeba zmieniać)

### 4. **Zapisz**
   - Kliknij **"Save"** (jeśli jest przycisk)

### 5. **Gotowe!**
   - GitHub automatycznie uruchomi workflow
   - Po 2-5 minutach aplikacja będzie dostępna pod:
     ```
     https://aibankai96.github.io/ST_KRAKOS/
     ```

---

## 🔍 Gdzie dokładnie?

**Ścieżka w GitHub:**
```
Repozytorium → Settings → Pages → Source: GitHub Actions
```

**Bezpośredni link:**
```
https://github.com/aibankai96/ST_KRAKOS/settings/pages
```

---

## ✅ Sprawdź Status

1. **Actions** (w menu repozytorium)
   - Zobacz workflow "Deploy to GitHub Pages"
   - Zielony znaczek = sukces ✅
   - Czerwony = błąd (sprawdź logi)

2. **Pages** (Settings → Pages)
   - Zobacz URL aplikacji
   - Status deploymentu

---

## 🎯 Po Włączeniu

Aplikacja automatycznie:
- ✅ Buduje się przy każdym push do `master`
- ✅ Deployuje na GitHub Pages
- ✅ Jest dostępna online

**Zero plików na komputerze!** Wszystko w chmurze GitHub! 🚀

