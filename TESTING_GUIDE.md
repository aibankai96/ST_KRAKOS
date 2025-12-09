# PRZEWODNIK PO TESTACH I ANALIZACH

## 📋 Przegląd

Ten projekt zawiera kompleksowy system testów i narzędzi analitycznych dla aplikacji ST KRATOS.

## 🧪 Typy Testów

### 1. Testy Jednostkowe (Unit Tests)
- Testują pojedyncze funkcje i komponenty w izolacji
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 2. Testy Integracyjne (Integration Tests)
- Testują współdziałanie między komponentami
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 3. Testy Systemowe (System Tests)
- Testują cały system jako całość
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 4. Testy Akceptacyjne (Acceptance Tests)
- Testują czy aplikacja spełnia wymagania użytkownika
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 5. Testy Funkcjonalne (Functional Tests)
- Testują funkcjonalność aplikacji
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 6. Testy Niefunkcjonalne (Non-Functional Tests)
- Testują wydajność, skalowalność, użyteczność
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 7. Testy Wydajnościowe (Performance Tests)
- Testują czas odpowiedzi i wydajność
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 8. Testy Obciążeniowe (Load Tests)
- Testują zachowanie pod obciążeniem
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 9. Testy Stresowe (Stress Tests)
- Testują zachowanie w ekstremalnych warunkach
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 10. Testy Odpornościowe (Resilience Tests)
- Testują obsługę błędów i wyjątków
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 11. Testy Bezpieczeństwa (Security Tests)
- Testują ochronę przed atakami (XSS, SQL injection, itp.)
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 12. Testy Użyteczności (Usability Tests)
- Testują łatwość użycia
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 13. Testy Zgodności (Compatibility Tests)
- Testują zgodność z różnymi przeglądarkami i środowiskami
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 14. Testy Dostępności (Accessibility Tests)
- Testują zgodność z WCAG i dostępność dla użytkowników z niepełnosprawnościami
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 15. Testy Regresyjne (Regression Tests)
- Testują czy nowe zmiany nie psują istniejących funkcji
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 16. Testy Smoke (Smoke Tests)
- Podstawowe testy sprawdzające czy aplikacja się uruchamia
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 17. Testy Sanity (Sanity Tests)
- Szybkie testy podstawowej funkcjonalności
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 18. Testy E2E (End-to-End Tests)
- Testują pełny przepływ użytkownika
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 19. Testy Czarnej Skrzynki (Black Box Tests)
- Testują bez znajomości implementacji wewnętrznej
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 20. Testy Białej Skrzynki (White Box Tests)
- Testują z pełną znajomością implementacji
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 21. Testy Lokalizacyjne (Localization Tests)
- Testują tłumaczenia i internacjonalizację
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 22. Testy Internacjonalizacyjne (i18n Tests)
- Testują obsługę wielu języków
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

### 23. Testy Kompatybilności Zakładek
- Testują kompatybilność między wszystkimi zakładkami aplikacji
- Lokalizacja: `frontend/tests/tab-compatibility.test.js`

### 24. Testy Struktury
- Testują strukturę projektu i kodu
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 25. Testy Kodu
- Testują jakość i poprawność kodu
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 26. Testy Procesów
- Testują procesy biznesowe i techniczne
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`, `backend/tests/test_comprehensive.py`

### 27. Testy Dużych Plików
- Testują obsługę dużych danych
- Lokalizacja: `frontend/tests/comprehensive-all-types.test.js`

## 🛠️ Narzędzia Analityczne

### 1. Analiza Duplikatów
Znajduje duplikaty i podobny kod w projekcie.

**Funkcjonalności:**
- Wykrywa dokładne duplikaty kodu (100% podobieństwa)
- Wykrywa podobny kod (>75% podobieństwa)
- Ignoruje bardzo małe pliki (<100 znaków)
- Używa inteligentnej normalizacji kodu
- Porównuje pliki podobnej długości

```bash
npm run analyze:duplicates
# lub
node tools/analyze-duplicates.js
```

**Uwagi:**
- Przed usunięciem duplikatów sprawdź czy są rzeczywiście niepotrzebne
- Niektóre duplikaty mogą być zamierzone (np. wzorce projektowe)

### 2. Analiza Nieużywanych Plików
Znajduje pliki, które nie są używane w projekcie.

**Funkcjonalności:**
- Buduje graf zależności z importów
- Rozpoznaje różne formaty importów (ES6, require, Python)
- Uwzględnia entry points aplikacji
- Wyklucza pliki specjalne (config, setup, test)

```bash
npm run analyze:unused
# lub
node tools/analyze-unused-files.js
```

**Uwagi:**
- Przed usunięciem plików sprawdź czy:
  - Nie są używane dynamicznie (eval, require dynamic)
  - Nie są potrzebne w przyszłości
  - Nie są używane przez zewnętrzne narzędzia

### 3. Optymalizacja Kodu
Bezpiecznie optymalizuje kod (skraca z 5 linii do 1, gdy jest bezpieczne).

**Funkcjonalności:**
- Optymalizuje proste return statements
- Optymalizuje proste if-else (na ternarne)
- Optymalizuje proste const assignments
- Optymalizuje object destructuring
- Sprawdza bezpieczeństwo przed optymalizacją
- Tryb dry-run (bez zapisu zmian)

**Bezpieczeństwo:**
- Nie optymalizuje kodu z try-catch
- Nie optymalizuje kodu z async/await
- Nie optymalizuje kodu z eval
- Nie optymalizuje złożonych wyrażeń

```bash
# Sprawdź optymalizacje (dry run)
npm run optimize:check
# lub
node tools/optimize-code.js

# Zastosuj optymalizacje
npm run optimize:apply
# lub
node tools/optimize-code.js --write
```

**Uwagi:**
- Zawsze uruchom testy po optymalizacji
- Sprawdź czy aplikacja działa poprawnie
- Optymalizacja działa tylko gdy jest bezpieczna

## 🚀 Uruchamianie Testów

### Wszystkie testy i analizy

```bash
npm run test:all
# lub
node tools/run-all-tests.js
```

### Tylko testy frontend

```bash
cd frontend
npm test
# lub konkretne testy
npm run test:all
npm run test:compatibility
```

### Tylko testy backend

```bash
cd backend
pytest tests/test_comprehensive.py -v
```

## 📊 Raporty

Po uruchomieniu wszystkich testów, raport jest zapisywany w `TEST_REPORT.json`.

Raport zawiera:
- Podsumowanie testów (przeszłe/nieprzeszłe)
- Szczegóły każdego testu
- Wyniki analiz (duplikaty, nieużywane pliki, optymalizacje)

## ⚠️ Uwagi

1. **Bezpieczna optymalizacja**: Optymalizacja kodu działa tylko wtedy, gdy jest bezpieczna. Nie zmienia logiki aplikacji.

2. **Duplikaty**: Przed usunięciem duplikatów, upewnij się, że są rzeczywiście niepotrzebne.

3. **Nieużywane pliki**: Przed usunięciem plików, sprawdź czy nie są używane dynamicznie lub w przyszłości.

4. **Testy**: Wszystkie testy powinny przechodzić przed wdrożeniem zmian.

## 📝 Struktura Plików

```
.
├── frontend/
│   └── tests/
│       ├── comprehensive-all-types.test.js  # Wszystkie typy testów
│       └── tab-compatibility.test.js        # Testy kompatybilności zakładek
├── backend/
│   └── tests/
│       └── test_comprehensive.py            # Kompleksowe testy backend
└── tools/
    ├── analyze-duplicates.js               # Analiza duplikatów
    ├── analyze-unused-files.js             # Analiza nieużywanych plików
    ├── optimize-code.js                    # Optymalizacja kodu
    └── run-all-tests.js                    # Uruchamianie wszystkich testów
```

## ✅ Checklista Przed Wdrożeniem

- [ ] Wszystkie testy przechodzą (`npm run test:all`)
- [ ] Brak duplikatów kodu (lub są uzasadnione)
- [ ] Nieużywane pliki zostały usunięte (lub są potrzebne)
- [ ] Kod został zoptymalizowany (jeśli to możliwe)
- [ ] Raport testów został przejrzany
- [ ] Wszystkie zmiany zostały przetestowane lokalnie

