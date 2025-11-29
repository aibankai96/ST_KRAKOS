# Szczegółowy Plan Bezpiecznej Redukcji Kodu

**Data utworzenia:** 2025-01-27  
**Cel:** Redukcja ~111-171 linii kodu (~8-12%) bez uszkodzenia aplikacji  
**Aktualny stan:** ~1457 linii (CSS: 1073, JS: 370, HTML: 14)  
**Cel końcowy:** ~1279-1346 linii

---

## 📋 ZASADY BEZPIECZEŃSTWA

### ⚠️ ZERO BACKUPÓW LOKALNYCH - TYLKO GIT

**Zasada:** Wszystkie backupy tylko przez Git. Brak lokalnych kopii plików.

### Przed każdym krokiem:
1. ✅ **Commit do Git** - zapisanie aktualnego stanu przed zmianą
2. ✅ **Test** - weryfikacja wizualna i funkcjonalna po każdej zmianie
3. ✅ **Małe kroki** - jedna zmiana na raz
4. ✅ **Weryfikacja** - sprawdzenie, czy selektor/funkcja jest używana

### Po każdym kroku:
1. ✅ **Test wizualny** - sprawdzenie wyglądu strony
2. ✅ **Test funkcjonalny** - sprawdzenie działania funkcji
3. ✅ **Commit do Git** - zapisanie zmian do Git (to jest backup)
4. ✅ **Dokumentacja** - zapisanie wykonanych zmian

### Jeśli coś pójdzie nie tak:
- **Cofnij commit:** `git reset --hard HEAD~1` (przywraca poprzedni stan)
- **Sprawdź różnice:** `git diff`
- **Zobacz historię:** `git log --oneline`
- **Przywróć konkretny commit:** `git checkout <commit-hash> -- <file>`

---

## 🎯 ETAP 1: PRZYGOTOWANIE (5 min)

### Krok 1.1: Weryfikacja stanu i przygotowanie Git
**Czas:** 2 min  
**Działanie:**
```bash
# Sprawdź aktualny stan
git status
git log --oneline -1

# Upewnij się, że wszystkie zmiany są zapisane
git add .
git commit -m "Przed rozpoczęciem redukcji - stan początkowy"

# Utwórz branch dla redukcji (opcjonalnie, dla bezpieczeństwa)
git checkout -b reduction/safe-optimization

# Sprawdź liczbę linii
# CSS
(Get-Content frontend/src/styles/main.css).Count
# JavaScript
Get-ChildItem -Path frontend/src -Filter *.js -Recurse | Get-Content | Measure-Object -Line
```

**Oczekiwany wynik:**
- CSS: ~1073 linie
- JavaScript: ~370 linii
- HTML: 14 linii

**Weryfikacja:**
- [ ] Wszystkie zmiany zapisane w Git (commit wykonany)
- [ ] Branch utworzony (opcjonalnie)
- [ ] Wszystkie pliki są w repozytorium
- [ ] Aplikacja działa poprawnie

---

### Krok 1.2: Uruchomienie aplikacji testowej
**Czas:** 3 min  
**Działanie:**
```bash
# Frontend
cd frontend
npm run dev

# Sprawdź w przeglądarce: http://localhost:5173
```

**Weryfikacja:**
- [ ] Aplikacja uruchomiona
- [ ] Wszystkie sekcje widoczne
- [ ] Wszystkie funkcje działają
- [ ] Responsywność działa

---

## 🎯 ETAP 2: REDUKCJA CSS - HEADER/NAVIGATION (10 min)

### Krok 2.1: Minifikacja prostych selektorów w Header
**Czas:** 5 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~74-155

**Zmiany:**
1. Zminifikuj `nav ul` (linie 116-120) - do jednej linii
2. Zminifikuj `nav a` (linie 122-131) - do jednej linii
3. Zminifikuj `nav a::after` (linie 133-143) - do jednej linii
4. Zminifikuj `nav a:hover` (linie 145-149) - do jednej linii
5. Zminifikuj `nav a:hover::after` (linie 151-154) - do jednej linii

**Przed:**
```css
nav ul {
    display: flex;
    list-style: none;
    gap: var(--spacing-md);
}
```

**Po:**
```css
nav ul { display: flex; list-style: none; gap: var(--spacing-md); }
```

**Szacowana redukcja:** ~5-8 linii

**Test:**
- [ ] Nawigacja działa
- [ ] Hover działa
- [ ] Wygląd nie zmienił się

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 2.1: Minifikacja selektorów Header/Navigation (redukcja ~5-8 linii)"
```

---

### Krok 2.2: Uproszczenie logo
**Czas:** 5 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~94-114

**Zmiany:**
1. Zminifikuj `.logo` (linie 94-101) - do jednej linii
2. Zminifikuj `.logo::after` (linie 103-114) - do jednej linii

**Szacowana redukcja:** ~2-3 linie

**Test:**
- [ ] Logo wyświetla się poprawnie
- [ ] Animacja underline działa

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 2.2: Minifikacja logo (redukcja ~2-3 linie)"
```

---

## 🎯 ETAP 3: REDUKCJA CSS - HERO SECTION (20 min)

### Krok 3.1: Minifikacja prostych selektorów Hero
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~162-392

**Zmiany:**
1. Zminifikuj `.hero-content` (linia 280) - do jednej linii
2. Zminifikuj `.hero h1` (linie 341-357) - do jednej linii (zachowaj ważne właściwości)
3. Zminifikuj `.hero-subtitle` (linie 372-385) - do jednej linii (zachowaj ważne właściwości)
4. Zminifikuj `.hero-buttons` (linie 387-392) - do jednej linii

**Szacowana redukcja:** ~8-12 linii

**Test:**
- [ ] Hero section wyświetla się poprawnie
- [ ] Tytuł i podtytuł są czytelne
- [ ] Przyciski działają

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 3.1: Minifikacja selektorów Hero (redukcja ~8-12 linii)"
```

---

### Krok 3.2: Minifikacja AI Badge Circle
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~281-340

**Zmiany:**
1. Zminifikuj `.ai-badge-circle` (linie 281-305) - do jednej linii (zachowaj ważne właściwości)
2. Zminifikuj `.ai-badge-circle:hover` (linie 307-311) - do jednej linii
3. Zminifikuj `.ai-badge-circle .badge-icon` (linie 313-318) - do jednej linii
4. Zminifikuj `.ai-badge-circle .badge-text` (linie 320-329) - do jednej linii

**Szacowana redukcja:** ~7-10 linii

**Test:**
- [ ] Badge wyświetla się poprawnie
- [ ] Hover działa
- [ ] Animacja działa

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 3.2: Minifikacja AI Badge Circle (redukcja ~7-10 linii)"
```

---

## 🎯 ETAP 4: REDUKCJA CSS - SERVICES SECTION (25 min)

### Krok 4.1: Minifikacja selektorów Services
**Czas:** 15 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~448-552

**Zmiany:**
1. Zminifikuj `.services-category` (linie 476-480) - do jednej linii
2. Zminifikuj `.services-category::before` (linie 482-491) - do jednej linii
3. Zminifikuj `.category-header` (linie 493-497) - do jednej linii
4. Zminifikuj `.category-badge` (linie 499-510) - do jednej linii
5. Zminifikuj `.category-header h3` (linie 521-526) - do jednej linii
6. Zminifikuj `.category-description` (linie 528-537) - do jednej linii
7. Zminifikuj `.service-for` (linie 539-546) - do jednej linii
8. Zminifikuj `.service-for strong` (linie 548-552) - do jednej linii

**Szacowana redukcja:** ~12-16 linii

**Test:**
- [ ] Sekcja Services wyświetla się poprawnie
- [ ] Kategorie są widoczne
- [ ] Karty usług są widoczne

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 4.1: Minifikacja selektorów Services (redukcja ~12-16 linii)"
```

---

### Krok 4.2: Minifikacja Service Cards
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~630-667

**Zmiany:**
1. Zminifikuj `.service-card` (linie 630-639) - do jednej linii (zachowaj ważne właściwości)
2. Zminifikuj `.service-icon` (linie 642-647) - do jednej linii
3. Zminifikuj `.service-card h3` (linie 650-657) - do jednej linii
4. Zminifikuj `.service-card p` (linie 659-667) - do jednej linii

**Szacowana redukcja:** ~8-12 linii

**Test:**
- [ ] Karty usług wyświetlają się poprawnie
- [ ] Ikony są widoczne
- [ ] Tekst jest czytelny

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 4.2: Minifikacja Service Cards (redukcja ~8-12 linii)"
```

---

## 🎯 ETAP 5: REDUKCJA CSS - PORTFOLIO SECTION (20 min)

### Krok 5.1: Minifikacja selektorów Portfolio
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~668-686

**Zmiany:**
1. Zminifikuj `.portfolio-grid` (linie 668-672) - do jednej linii
2. Zminifikuj `.portfolio-image` (linia 673) - do jednej linii
3. Zminifikuj `.portfolio-item h3` (linie 674-678) - do jednej linii
4. Zminifikuj `.portfolio-item p` (linie 680-686) - do jednej linii

**Szacowana redukcja:** ~5-8 linii

**Test:**
- [ ] Sekcja Portfolio wyświetla się poprawnie
- [ ] Karty portfolio są widoczne

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 5.1: Minifikacja selektorów Portfolio (redukcja ~5-8 linii)"
```

---

### Krok 5.2: Minifikacja Project Cards
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~897-967

**Zmiany:**
1. Zminifikuj `.portfolio-projects` (linie 897-903) - do jednej linii
2. Zminifikuj `.project-header` (linie 904-911) - do jednej linii
3. Zminifikuj `.project-header h3` (linie 913-919) - do jednej linii
4. Zminifikuj `.project-badge` (linie 921-929) - do jednej linii
5. Zminifikuj `.project-description` (linie 933-941) - do jednej linii
6. Zminifikuj `.project-description strong` (linie 943-947) - do jednej linii
7. Zminifikuj `.project-link` (linia 949) - do jednej linii
8. Zminifikuj `.project-btn` (linie 950-960) - do jednej linii
9. Zminifikuj `.project-btn:hover` (linie 962-967) - do jednej linii

**Szacowana redukcja:** ~10-15 linii

**Test:**
- [ ] Karty projektów wyświetlają się poprawnie
- [ ] Przyciski działają
- [ ] Hover działa

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 5.2: Minifikacja Project Cards (redukcja ~10-15 linii)"
```

---

## 🎯 ETAP 6: REDUKCJA CSS - ABOUT SECTION (15 min)

### Krok 6.1: Minifikacja selektorów About
**Czas:** 15 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~1009-1072

**Zmiany:**
1. Zminifikuj `.about-content` (linia 1009) - do jednej linii
2. Zminifikuj `.about-section` (linie 1010-1021) - do jednej linii (zachowaj ważne właściwości)
3. Zminifikuj `.about-section:hover` (linie 1023-1027) - do jednej linii
4. Zminifikuj `.about-section h2` (linie 1029-1035) - do jednej linii
5. Zminifikuj `.about-section p` (linie 1037-1044) - do jednej linii
6. Zminifikuj `.features-list` (linia 1046) - do jednej linii
7. Zminifikuj `.features-list li` (linie 1047-1059) - do jednej linii (zachowaj ważne właściwości)
8. Zminifikuj `.features-list li:hover` (linie 1061-1066) - do jednej linii
9. Zminifikuj `.features-list li strong` (linie 1068-1072) - do jednej linii

**Szacowana redukcja:** ~15-20 linii

**Test:**
- [ ] Sekcja About wyświetla się poprawnie
- [ ] Lista funkcji jest widoczna
- [ ] Hover działa

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 6.1: Minifikacja selektorów About (redukcja ~15-20 linii)"
```

---

## 🎯 ETAP 7: REDUKCJA CSS - CONTACT SECTION (15 min)

### Krok 7.1: Minifikacja selektorów Contact
**Czas:** 15 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~763-829

**Zmiany:**
1. Zminifikuj `.contact-page` (linie 763-765) - do jednej linii
2. Zminifikuj `.technologies-cta` (linia 767) - do jednej linii
3. Zminifikuj `.technologies-cta-text` (linie 768-777) - do jednej linii
4. Zminifikuj `.contact-wrapper` (linie 777-783) - do jednej linii
5. Zminifikuj `.contact-info-wrapper` (linie 785-790) - do jednej linii
6. Zminifikuj `.contact-info` (linie 790-800) - do jednej linii (zachowaj ważne właściwości)
7. Zminifikuj `.contact-info h2` (linie 802-806) - do jednej linii
8. Zminifikuj `.info-item` (linia 808) - do jednej linii
9. Zminifikuj `.info-item strong` (linie 809-814) - do jednej linii
10. Zminifikuj `.info-item p` (linia 816) - do jednej linii
11. Zminifikuj `.info-item a` (linie 817-823) - do jednej linii
12. Zminifikuj `.info-item a:hover` (linie 825-829) - do jednej linii

**Szacowana redukcja:** ~10-15 linii

**Test:**
- [ ] Sekcja Contact wyświetla się poprawnie
- [ ] Informacje kontaktowe są widoczne
- [ ] Linki działają

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 7.1: Minifikacja selektorów Contact (redukcja ~10-15 linii)"
```

---

## 🎯 ETAP 8: REDUKCJA CSS - AI STATS SECTION (10 min)

### Krok 8.1: Minifikacja selektorów AI Stats
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~855-896

**Zmiany:**
1. Zminifikuj `.ai-stats-section` (linie 855-858) - do jednej linii
2. Zminifikuj `.stats-grid` (linie 859-865) - do jednej linii
3. Zminifikuj `.stat-card` (linia 640) - do jednej linii (jeśli jeszcze nie zminifikowane)
4. Zminifikuj `.stat-number` (linie 873-882) - do jednej linii (zachowaj ważne właściwości)
5. Zminifikuj `.stat-label` (linie 884-890) - do jednej linii
6. Zminifikuj `.stat-source` (linie 892-896) - do jednej linii

**Szacowana redukcja:** ~8-10 linii

**Test:**
- [ ] Sekcja AI Stats wyświetla się poprawnie
- [ ] Statystyki są widoczne
- [ ] Animacja działa

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 8.1: Minifikacja selektorów AI Stats (redukcja ~8-10 linii)"
```

---

## 🎯 ETAP 9: REDUKCJA CSS - MISC STYLES (15 min)

### Krok 9.1: Konsolidacja intro selektorów
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~970-983

**Zmiany:**
1. Sprawdź, czy `.section-intro`, `.services-intro`, `.contact-intro` są już skonsolidowane
2. Jeśli nie, użyj `:is(.section-intro, .services-intro, .contact-intro)` zamiast osobnych selektorów

**Szacowana redukcja:** ~5-8 linii

**Test:**
- [ ] Wszystkie intro teksty wyświetlają się poprawnie

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 9.1: Konsolidacja intro selektorów (redukcja ~5-8 linii)"
```

---

### Krok 9.2: Minifikacja Certificate Info
**Czas:** 5 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~985-1007

**Zmiany:**
1. Zminifikuj `.certificate-info` (linie 985-998) - do jednej linii (zachowaj ważne właściwości)
2. Zminifikuj `.certificate-icon` (linia 1000) - do jednej linii
3. Zminifikuj `.certificate-text` (linie 1001-1007) - do jednej linii

**Szacowana redukcja:** ~3-5 linii

**Test:**
- [ ] Certificate info wyświetla się poprawnie

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 9.2: Minifikacja Certificate Info (redukcja ~3-5 linii)"
```

---

## 🎯 ETAP 10: REDUKCJA CSS - MEDIA QUERIES (10 min)

### Krok 10.1: Minifikacja Media Queries
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`  
**Linie:** ~719-849

**Zmiany:**
1. Zminifikuj selektory w `@media (max-width: 768px)` (linie 719-761) - do jednej linii gdzie możliwe
2. Zminifikuj selektory w `@media (max-width: 480px)` (linie 829-849) - do jednej linii gdzie możliwe

**Szacowana redukcja:** ~5-10 linii

**Test:**
- [ ] Responsywność działa na mobile
- [ ] Responsywność działa na tablet
- [ ] Wszystkie elementy są widoczne

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 10.1: Minifikacja Media Queries (redukcja ~5-10 linii)"
```

---

## 🎯 ETAP 11: REDUKCJA CSS - USUNIĘCIE PUSTYCH LINII (10 min)

### Krok 11.1: Usunięcie nadmiarowych pustych linii
**Czas:** 10 min  
**Plik:** `frontend/src/styles/main.css`

**Zmiany:**
1. Usuń podwójne puste linie (zostaw pojedyncze)
2. Usuń puste linie na końcu pliku
3. Zostaw 1 pustą linię między sekcjami

**Szacowana redukcja:** ~10-20 linii

**Test:**
- [ ] CSS działa poprawnie
- [ ] Formatowanie jest czytelne

**Commit:**
```bash
git add frontend/src/styles/main.css
git commit -m "ETAP 11.1: Usunięcie nadmiarowych pustych linii (redukcja ~10-20 linii)"
```

---

## 🎯 ETAP 12: REDUKCJA JAVASCRIPT (5 min)

### Krok 12.1: Usunięcie pustych linii w home.js
**Czas:** 5 min  
**Plik:** `frontend/src/pages/home.js`

**Zmiany:**
1. Usuń puste linie w template string (zachowaj czytelność)
2. Usuń puste linie na końcu pliku

**Szacowana redukcja:** ~3-5 linii

**Test:**
- [ ] Strona wyświetla się poprawnie
- [ ] Wszystkie funkcje działają

**Commit:**
```bash
git add frontend/src/pages/home.js
git commit -m "ETAP 12.1: Usunięcie pustych linii w home.js (redukcja ~3-5 linii)"
```

---

## 🎯 ETAP 13: WERYFIKACJA KOŃCOWA (15 min)

### Krok 13.1: Testy funkcjonalne
**Czas:** 10 min

**Testy:**
- [ ] Strona główna wyświetla się poprawnie
- [ ] Wszystkie sekcje są widoczne
- [ ] Nawigacja działa
- [ ] Scroll do sekcji działa
- [ ] Animacje działają
- [ ] Hover efekty działają
- [ ] Responsywność działa (mobile, tablet, desktop)
- [ ] Wszystkie linki działają
- [ ] Wszystkie przyciski działają

---

### Krok 13.2: Sprawdzenie liczby linii
**Czas:** 5 min

**Działanie:**
```bash
# CSS
(Get-Content frontend/src/styles/main.css).Count

# JavaScript
Get-ChildItem -Path frontend/src -Filter *.js -Recurse | Get-Content | Measure-Object -Line
```

**Oczekiwany wynik:**
- CSS: ~900-965 linii (z 1073) - redukcja ~108-173 linii
- JavaScript: ~365-367 linii (z 370) - redukcja ~3-5 linii
- **Łączna redukcja:** ~111-178 linii

---

### Krok 13.3: Finalny commit
**Czas:** 2 min

**Działanie:**
```bash
git add .
git commit -m "ETAP 13: Finalna weryfikacja - redukcja ~111-178 linii kodu (~8-12%)"
git log --oneline --graph -20
```

---

## 📊 PODSUMOWANIE PLANU

### Czas realizacji:
- **Przygotowanie:** 5 min
- **Redukcja CSS:** ~140 min (2h 20min)
- **Redukcja JavaScript:** 5 min
- **Weryfikacja:** 15 min
- **Łącznie:** ~165 min (~2h 45min)

### Redukcja:
- **CSS:** ~108-173 linii (~10-16%)
- **JavaScript:** ~3-5 linii (~1%)
- **Łącznie:** ~111-178 linii (~8-12%)

### Etapy:
1. ✅ Przygotowanie (1 etap)
2. ✅ Redukcja CSS (10 etapów)
3. ✅ Redukcja JavaScript (1 etap)
4. ✅ Weryfikacja (1 etap)
5. **Łącznie:** 13 etapów

---

## ⚠️ OSTRZEŻENIA

### NIE DOTYKAĆ:
1. ❌ CSS Variables (`:root`) - 57 linii
2. ❌ Reset/Base styles - ~20 linii
3. ❌ Wszystkie `@keyframes` - ~50 linii
4. ❌ Wszystkie media queries (tylko minifikacja, nie usuwanie)
5. ❌ Wszystkie selektory używane w JavaScript
6. ❌ Wszystkie funkcje JavaScript (tylko puste linie)

### BEZPIECZNE:
1. ✅ Minifikacja prostych selektorów (1-2 właściwości)
2. ✅ Usunięcie pustych linii (zachować 1 między sekcjami)
3. ✅ Konsolidacja podobnych selektorów (jeśli jeszcze nie skonsolidowane)

---

## ✅ CHECKLIST WYKONANIA

### Przed rozpoczęciem:
- [ ] Commit początkowy wykonany (backup w Git)
- [ ] Branch utworzony (opcjonalnie)
- [ ] Aplikacja działa poprawnie
- [ ] Liczba linii sprawdzona
- [ ] Git status czysty (wszystkie zmiany zapisane)

### Po każdym etapie:
- [ ] Test wizualny wykonany
- [ ] Test funkcjonalny wykonany
- [ ] Commit wykonany (to jest backup - Git przechowuje historię)
- [ ] Dokumentacja zaktualizowana
- [ ] Możliwość cofnięcia: `git reset --hard HEAD~1` (jeśli coś pójdzie nie tak)

### Po zakończeniu:
- [ ] Wszystkie testy przechodzą
- [ ] Liczba linii sprawdzona
- [ ] Finalny commit wykonany (wszystkie zmiany zapisane w Git)
- [ ] Dokumentacja zaktualizowana
- [ ] Historia Git sprawdzona: `git log --oneline` (wszystkie backupy w historii)

---

## 📝 NOTATKI

### ⚠️ ZERO BACKUPÓW LOKALNYCH - TYLKO GIT

**Wszystkie backupy tylko przez Git:**
- Każdy commit = backup
- Historia Git = historia zmian
- Możliwość cofnięcia do dowolnego momentu

### Jeśli coś pójdzie nie tak:
1. **Cofnij ostatni commit:** `git reset --hard HEAD~1` (usuwa ostatni commit i przywraca poprzedni stan)
2. **Cofnij zmiany w pliku:** `git checkout HEAD -- <file>` (przywraca plik z ostatniego commita)
3. **Sprawdź różnice:** `git diff` (pokazuje zmiany)
4. **Zobacz historię:** `git log --oneline` (pokazuje wszystkie commity)
5. **Przywróć konkretny commit:** `git checkout <commit-hash> -- <file>` (przywraca plik z konkretnego commita)
6. **Przywróć cały projekt:** `git reset --hard <commit-hash>` (przywraca cały projekt do konkretnego commita)

### Przykłady:
```bash
# Cofnij ostatni commit (usuwa go, przywraca poprzedni stan)
git reset --hard HEAD~1

# Cofnij zmiany w konkretnym pliku (nie usuwa commita)
git checkout HEAD -- frontend/src/styles/main.css

# Zobacz co się zmieniło
git diff

# Zobacz historię commitów
git log --oneline -10

# Przywróć plik z konkretnego commita
git checkout abc1234 -- frontend/src/styles/main.css
```

### Jeśli redukcja jest zbyt agresywna:
1. **Zatrzymaj się** na aktualnym etapie
2. **Przetestuj dokładnie** wszystkie funkcje
3. **Zapisz postęp** w commitach

---

**Data utworzenia:** 2025-01-27  
**Status:** ✅ **GOTOWY DO REALIZACJI**  
**Szacowany czas:** ~2h 45min  
**Szacowana redukcja:** ~111-178 linii (~8-12%)

