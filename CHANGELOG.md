# Changelog

Wszystkie znaczące zmiany w projekcie ST KRAKOS będą udokumentowane w tym pliku.

Format jest oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.0.0/),
a projekt używa [Semantic Versioning](https://semver.org/lang/pl/).

---

## [Unreleased]

### Changed
- Usunięto nieużywany plik `frontend/src/api/client.js` (112 linii)
- Zarchiwizowano ~89 starych plików dokumentacyjnych do `docs/archive/`
- Naprawiono console.log w produkcji - zastąpione warunkowym logowaniem (tylko dev mode)
- Zaktualizowano README.md - usunięto nieaktualne funkcje, dodano rzeczywiste
- Zaktualizowano strukturę projektu w dokumentacji

### Added
- `.env.example` - przykładowa konfiguracja środowiska
- `API.md` - dokumentacja endpointów API
- `CHANGELOG.md` - historia zmian projektu
- `PLAN_BEZPIECZNY_NAPRAWY_2025.md` - plan bezpiecznej naprawy
- `SZCZEGOLOWA_ANALIZA_CALEJ_APLIKACJI_2025.md` - szczegółowa analiza aplikacji
- Raporty z faz naprawy (Faza 1-6)

---

## [1.0.0] - 2025-01-27

### Added
- Inicjalna wersja aplikacji ST KRAKOS
- Frontend: Strona firmowa z sekcjami (hero, o nas, usługi, portfolio, kontakt)
- Frontend: Wielojęzyczność (PL/EN) z przełącznikiem
- Frontend: SEO optimization (meta tagi, structured data, Open Graph)
- Frontend: Responsive design (mobile-first)
- Frontend: Service Worker (PWA) z cache'owaniem
- Backend: Flask API z endpointami:
  - `GET /api/health` - Status serwisu
  - `GET /api/metrics` - Metryki wydajności
  - `POST /api/generate-page` - Generowanie strony przez AI
  - `POST /api/generate-content` - Generowanie treści przez AI
- Backend: Integracja z OpenAI API
- Backend: Rate limiting (200/dzień, 50/godzinę)
- Backend: Walidacja i sanityzacja danych wejściowych
- Backend: Monitoring wydajności
- Backend: Error handling i logowanie
- Testy jednostkowe i integracyjne
- Dokumentacja projektu (README.md, PLAN.md, DEPLOYMENT.md, STATUS.md)

### Security
- Rate limiting na endpointy API
- Walidacja wszystkich danych wejściowych
- Sanityzacja inputów (usuwanie niebezpiecznych znaków)
- Error handling bez ujawniania szczegółów systemu
- Logowanie operacji

---

## Typy zmian

- `Added` - Nowe funkcje
- `Changed` - Zmiany w istniejących funkcjach
- `Deprecated` - Funkcje, które wkrótce zostaną usunięte
- `Removed` - Usunięte funkcje
- `Fixed` - Naprawione błędy
- `Security` - Zmiany związane z bezpieczeństwem

---

**Data utworzenia:** 2025-01-27  
**Ostatnia aktualizacja:** 2025-01-27

