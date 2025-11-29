# INSTRUKCJA CZYSZCZENIA CACHE I SERVICE WORKER

**Data:** 2025-01-27  
**Problem:** Niebieski ekran w aplikacji  
**Status:** 🔴 **KRYTYCZNY**

---

## 🔴 PROBLEM

Aplikacja wyświetla niebieski ekran z powodu:
1. Service Worker cachuje stary CSS z niebieskimi kolorami
2. Cache przeglądarki blokuje nowy CSS
3. Stary CSS jest w pamięci cache

---

## ✅ SZYBKA NAPRAWA

### **Metoda 1: Wyłącz Service Worker w DevTools (NAJSZYBSZE)**

1. Otwórz aplikację w przeglądarce
2. Naciśnij `F12` (lub `Ctrl+Shift+I`) - otwórz DevTools
3. Przejdź do zakładki **"Application"** (lub **"Aplikacja"**)
4. W lewym menu znajdź **"Service Workers"**
5. Dla każdego zarejestrowanego Service Workera:
   - Kliknij **"Unregister"** (lub **"Wyrejestruj"**)
   - Jeśli jest opcja **"Update"**, kliknij ją
6. Odśwież stronę: `Ctrl+Shift+R` (hard refresh)

---

### **Metoda 2: Wyczyść Cache w DevTools**

1. Otwórz aplikację w przeglądarce
2. Naciśnij `F12` (lub `Ctrl+Shift+I`) - otwórz DevTools
3. Przejdź do zakładki **"Application"** (lub **"Aplikacja"**)
4. W lewym menu znajdź **"Storage"** (lub **"Magazyn"**)
5. Kliknij **"Clear site data"** (lub **"Wyczyść dane witryny"**)
6. Zaznacz:
   - ✅ Cache storage
   - ✅ Service Workers
   - ✅ Local Storage
   - ✅ Session Storage
7. Kliknij **"Clear site data"**
8. Odśwież stronę: `Ctrl+Shift+R` (hard refresh)

---

### **Metoda 3: Hard Refresh (NAJSZYBSZE)**

1. Otwórz aplikację w przeglądarce
2. Naciśnij:
   - **Windows/Linux:** `Ctrl+Shift+R`
   - **Mac:** `Cmd+Shift+R`
3. Jeśli problem nadal występuje, użyj Metody 1 lub 2

---

### **Metoda 4: Wyczyść całą historię przeglądarki**

1. Otwórz ustawienia przeglądarki (`Ctrl+,` lub `Cmd+,`)
2. Przejdź do **"Historia"** lub **"History"**
3. Kliknij **"Wyczyść dane przeglądania"** lub **"Clear browsing data"**
4. Wybierz zakres czasu: **"Cały czas"** lub **"All time"**
5. Zaznacz:
   - ✅ Wyczyść pliki cookie i dane innych witryn
   - ✅ Wyczyść obrazy i pliki w pamięci cache
6. Kliknij **"Wyczyść dane"** lub **"Clear data"**
7. Odśwież stronę: `Ctrl+Shift+R`

---

## 🔧 TRYB DEWELOPERSKI

Aplikacja teraz automatycznie wyłącza Service Worker w trybie deweloperskim (localhost).

Jeśli uruchamiasz aplikację lokalnie:
- Service Worker będzie automatycznie wyłączony
- Cache nie będzie blokować zmian w CSS
- Zmiany będą widoczne od razu po odświeżeniu

---

## 📋 CHECKLISTA NAPRAWY

- [ ] Wyłączony Service Worker w DevTools
- [ ] Wyczyszczony cache w DevTools
- [ ] Wykonany hard refresh (`Ctrl+Shift+R`)
- [ ] Sprawdzony Network tab - czy `main.css` się ładuje (status 200)
- [ ] Sprawdzony Elements tab - czy CSS jest załadowany

---

## 🔍 DIAGNOZA (JEŚLI PROBLEM NADAL WYSTĘPUJE)

### **Sprawdź w DevTools:**

1. **Network tab:**
   - Otwórz DevTools (`F12`)
   - Przejdź do zakładki **"Network"**
   - Odśwież stronę (`Ctrl+Shift+R`)
   - Znajdź `main.css`
   - Sprawdź:
     - Status: powinien być `200` (OK)
     - Type: `text/css`
     - Size: powinien być większy niż 0
     - Time: powinien być szybki (< 100ms)

2. **Console tab:**
   - Otwórz DevTools (`F12`)
   - Przejdź do zakładki **"Console"**
   - Sprawdź czy są błędy (czerwone komunikaty)
   - Najczęstsze błędy:
     - `404 Not Found` - plik CSS nie istnieje
     - `Failed to load resource` - problem z ładowaniem CSS
     - `CORS error` - problem z dostępem do pliku

3. **Elements tab:**
   - Otwórz DevTools (`F12`)
   - Przejdź do zakładki **"Elements"**
   - Znajdź element `<head>` w HTML
   - Sprawdź czy jest link do CSS:
     ```html
     <link rel="stylesheet" href="/src/styles/main.css">
     ```
   - Kliknij prawym przyciskiem na link → **"Open in Sources"** lub **"Edit as HTML"**
   - Sprawdź czy plik się otwiera

4. **Application tab:**
   - Otwórz DevTools (`F12`)
   - Przejdź do zakładki **"Application"**
   - Sprawdź **"Service Workers"**:
     - Czy jest zarejestrowany?
     - Jaki jest status?
     - Jeśli jest aktywny, wyłącz go (patrz Metoda 1)
   - Sprawdź **"Cache Storage"**:
     - Czy są zapisane pliki?
     - Jeśli tak, usuń cache (patrz Metoda 2)

---

## 🎯 PODSUMOWANIE

### **Wykonane naprawy:**
1. ✅ Usunięto wszystkie niebieskie kolory z CSS
2. ✅ Zaktualizowano wersję Service Worker cache (`v1.0.0` → `v1.0.1`)
3. ✅ Wyłączono Service Worker w trybie deweloperskim
4. ✅ Naprawiono niebieski gradient w `.project-badge.client`

### **Następne kroki:**
1. Wyczyść cache przeglądarki (Metoda 1 lub 2)
2. Wykonaj hard refresh (`Ctrl+Shift+R`)
3. Sprawdź Network tab - czy CSS się ładuje
4. Jeśli problem nadal występuje, sprawdź Console tab

---

**Data raportu:** 2025-01-27  
**Status:** ✅ **NAPRAWIONE** - wymaga czyszczenia cache

