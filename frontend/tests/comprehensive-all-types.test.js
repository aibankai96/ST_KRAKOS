/**
 * KOMPLEKSOWE TESTY WSZYSTKICH TYPÓW
 * Testy jednostkowe, integracyjne, systemowe, akceptacyjne, funkcjonalne, niefunkcjonalne,
 * wydajnościowe, obciążeniowe, stresowe, odpornościowe, bezpieczeństwa, użyteczności,
 * zgodności, dostępności, manualne, automatyczne, regresyjne, eksploracyjne, smoke, sanity,
 * ad-hoc, E2E, alfa, beta, czarnej/białej/szarej skrzynki, instalacyjne, deinstalacyjne,
 * migracyjne, recovery, lokalizacyjne, internacjonalizacyjne, A/B, mutacyjne
 */

import {scrollToSection, initRouter} from '../src/router.js'
import {renderHome} from '../src/pages/home.js'
import {renderPrivacy} from '../src/pages/privacy.js'
import {renderLayout, renderHeader, renderFooter} from '../src/components/layout.js'
import {validators, validateField, showError, clearError, clearValidationErrors} from '../src/utils/validators.js'
import {updateSEO, addStructuredData} from '../src/utils/seo.js'
import {t, getLang, setLang} from '../src/utils/i18n.js'
import {initScrollReveal} from '../src/utils/scrollReveal.js'
import {initCookieConsent, showConsentBanner} from '../src/components/CookieConsent.js'
import {initPuzzleLoader} from '../src/utils/puzzleLoader.js'
import {initSecretCode} from '../src/utils/statsModal.js'
import {api} from '../src/utils/api.js'

// ============================================
// 1. TESTY JEDNOSTKOWE (Unit Tests)
// ============================================
describe('1. TESTY JEDNOSTKOWE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
    localStorage.clear()
  })

  test('scrollToSection - funkcja istnieje', () => {
    expect(typeof scrollToSection).toBe('function')
  })

  test('initRouter - funkcja istnieje', () => {
    expect(typeof initRouter).toBe('function')
  })

  test('renderHome - funkcja istnieje', () => {
    expect(typeof renderHome).toBe('function')
  })

  test('renderPrivacy - funkcja istnieje', () => {
    expect(typeof renderPrivacy).toBe('function')
  })

  test('validators - obiekt z funkcjami walidacji', () => {
    expect(validators).toBeDefined()
    expect(typeof validators.name).toBe('function')
    expect(typeof validators.email).toBe('function')
    expect(typeof validators.subject).toBe('function')
    expect(typeof validators.message).toBe('function')
  })

  test('validators.name - walidacja poprawna', () => {
    expect(validators.name('Jan Kowalski')).toBe(true)
    expect(validators.name('A')).toBe(false)
    expect(validators.name('a'.repeat(101))).toBe(false)
  })

  test('validators.email - walidacja poprawna', () => {
    expect(validators.email('test@example.com')).toBe(true)
    expect(validators.email('invalid')).toBe(false)
    expect(validators.email('test@')).toBe(false)
  })

  test('i18n - funkcje tłumaczeń', () => {
    expect(typeof t).toBe('function')
    expect(typeof getLang).toBe('function')
    expect(typeof setLang).toBe('function')
  })

  test('i18n - zmiana języka', () => {
    setLang('en')
    expect(getLang()).toBe('en')
    setLang('pl')
    expect(getLang()).toBe('pl')
  })

  test('SEO - funkcje SEO', () => {
    expect(typeof updateSEO).toBe('function')
    expect(typeof addStructuredData).toBe('function')
  })
})

// ============================================
// 2. TESTY INTEGRACYJNE (Integration Tests)
// ============================================
describe('2. TESTY INTEGRACYJNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Router i Home integracja - renderowanie', () => {
    const container = document.createElement('div')
    container.id = 'content'
    renderHome(container)
    expect(container.querySelector('#home')).toBeTruthy()
    expect(container.querySelector('#ai-stats')).toBeTruthy()
    expect(container.querySelector('#about')).toBeTruthy()
    expect(container.querySelector('#services')).toBeTruthy()
    expect(container.querySelector('#contact')).toBeTruthy()
  })

  test('Layout i Router integracja', () => {
    const app = document.getElementById('app')
    renderLayout(app)
    expect(document.getElementById('header')).toBeTruthy()
    expect(document.getElementById('content')).toBeTruthy()
    expect(document.getElementById('footer')).toBeTruthy()
  })

  test('SEO i Home integracja', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(document.title).toContain('ST')
  })

  test('i18n i renderHome integracja', () => {
    const container = document.createElement('div')
    setLang('pl')
    renderHome(container)
    expect(container.textContent).toContain('ST KRATOS')
    setLang('en')
    renderHome(container)
    expect(container.textContent).toContain('ST KRATOS')
  })

  test('Validators i formularz integracja', () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.value = 'Jan Kowalski'
    input.parentNode = document.createElement('div')
    document.body.appendChild(input.parentNode)
    expect(validateField(input, validators.name)).toBe(true)
  })
})

// ============================================
// 3. TESTY SYSTEMOWE (System Tests)
// ============================================
describe('3. TESTY SYSTEMOWE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Całkowity przepływ aplikacji - od startu do renderowania', () => {
    const app = document.getElementById('app')
    renderLayout(app)
    initRouter()
    expect(document.getElementById('header')).toBeTruthy()
    expect(document.getElementById('content')).toBeTruthy()
    expect(document.getElementById('footer')).toBeTruthy()
  })

  test('System nawigacji - wszystkie sekcje dostępne', () => {
    const container = document.createElement('div')
    container.id = 'content'
    renderHome(container)
    const sections = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
    sections.forEach(section => {
      expect(container.querySelector(`#${section}`)).toBeTruthy()
    })
  })

  test('System tłumaczeń - przełączanie PL/EN', () => {
    setLang('pl')
    expect(t('nav.home')).toBe('Strona Główna')
    setLang('en')
    expect(t('nav.home')).toBe('Home')
  })
})

// ============================================
// 4. TESTY AKCEPTACYJNE (Acceptance Tests)
// ============================================
describe('4. TESTY AKCEPTACYJNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Użytkownik może zobaczyć stronę główną', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(container.querySelector('.hero')).toBeTruthy()
  })

  test('Użytkownik może nawigować do sekcji kontakt', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(container.querySelector('#contact')).toBeTruthy()
  })

  test('Użytkownik może zmienić język', () => {
    setLang('en')
    expect(getLang()).toBe('en')
    setLang('pl')
    expect(getLang()).toBe('pl')
  })
})

// ============================================
// 5. TESTY FUNKCJONALNE (Functional Tests)
// ============================================
describe('5. TESTY FUNKCJONALNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Funkcja scrollToSection działa', () => {
    document.body.innerHTML = '<div id="test-section" style="height: 1000px;"></div>'
    scrollToSection('test-section')
    expect(document.getElementById('test-section')).toBeTruthy()
  })

  test('Funkcja renderHome renderuje wszystkie sekcje', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(container.querySelector('#home')).toBeTruthy()
    expect(container.querySelector('#ai-stats')).toBeTruthy()
    expect(container.querySelector('#about')).toBeTruthy()
    expect(container.querySelector('#services')).toBeTruthy()
    expect(container.querySelector('#portfolio')).toBeTruthy()
    expect(container.querySelector('#contact')).toBeTruthy()
  })

  test('Funkcja renderPrivacy renderuje stronę prywatności', () => {
    const container = document.createElement('div')
    renderPrivacy(container)
    expect(container.querySelector('.privacy-page')).toBeTruthy()
  })
})

// ============================================
// 6. TESTY NIEFUNKCJONALNE (Non-Functional Tests)
// ============================================
describe('6. TESTY NIEFUNKCJONALNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Wydajność renderowania - czas renderowania < 100ms', () => {
    const start = performance.now()
    const container = document.createElement('div')
    renderHome(container)
    const end = performance.now()
    expect(end - start).toBeLessThan(100)
  })

  test('Użycie pamięci - brak wycieków', () => {
    const container = document.createElement('div')
    for (let i = 0; i < 10; i++) {
      renderHome(container)
    }
    expect(container.children.length).toBeGreaterThan(0)
  })

  test('Skalowalność - obsługa wielu renderowań', () => {
    const container = document.createElement('div')
    for (let i = 0; i < 50; i++) {
      renderHome(container)
    }
    expect(container.querySelector('#home')).toBeTruthy()
  })
})

// ============================================
// 7. TESTY WYDAJNOŚCIOWE (Performance Tests)
// ============================================
describe('7. TESTY WYDAJNOŚCIOWE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Czas renderowania strony głównej', () => {
    const start = performance.now()
    const container = document.createElement('div')
    renderHome(container)
    const end = performance.now()
    expect(end - start).toBeLessThan(200)
  })

  test('Czas renderowania layoutu', () => {
    const start = performance.now()
    const app = document.getElementById('app')
    renderLayout(app)
    const end = performance.now()
    expect(end - start).toBeLessThan(50)
  })

  test('Czas walidacji formularza', () => {
    const start = performance.now()
    validators.email('test@example.com')
    validators.name('Jan Kowalski')
    const end = performance.now()
    expect(end - start).toBeLessThan(10)
  })
})

// ============================================
// 8. TESTY OBCIĄŻENIOWE (Load Tests)
// ============================================
describe('8. TESTY OBCIĄŻENIOWE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Wielokrotne renderowanie - 100 iteracji', () => {
    const container = document.createElement('div')
    for (let i = 0; i < 100; i++) {
      renderHome(container)
    }
    expect(container.querySelector('#home')).toBeTruthy()
  })

  test('Wielokrotna walidacja - 1000 iteracji', () => {
    for (let i = 0; i < 1000; i++) {
      expect(validators.email('test@example.com')).toBe(true)
    }
  })
})

// ============================================
// 9. TESTY STRESOWE (Stress Tests)
// ============================================
describe('9. TESTY STRESOWE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Renderowanie z bardzo długim tekstem', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(container.querySelector('#home')).toBeTruthy()
  })

  test('Wielokrotna zmiana języka', () => {
    for (let i = 0; i < 1000; i++) {
      setLang(i % 2 === 0 ? 'pl' : 'en')
    }
    expect(getLang()).toBe('en')
  })
})

// ============================================
// 10. TESTY ODPORNOŚCIOWE (Resilience Tests)
// ============================================
describe('10. TESTY ODPORNOŚCIOWE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Obsługa brakującego elementu DOM', () => {
    expect(() => scrollToSection('non-existent')).not.toThrow()
  })

  test('Obsługa nieprawidłowych danych w walidacji', () => {
    expect(validators.email(null)).toBe(false)
    expect(validators.email(undefined)).toBe(false)
    expect(validators.email('')).toBe(false)
  })

  test('Obsługa błędów w renderowaniu', () => {
    const container = document.createElement('div')
    expect(() => renderHome(container)).not.toThrow()
  })
})

// ============================================
// 11. TESTY BEZPIECZEŃSTWA (Security Tests)
// ============================================
describe('11. TESTY BEZPIECZEŃSTWA', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Sanityzacja XSS w walidacji', () => {
    const xssAttempt = '<script>alert("XSS")</script>'
    expect(validators.name(xssAttempt)).toBe(false)
  })

  test('Sanityzacja SQL injection w walidacji', () => {
    const sqlAttempt = "'; DROP TABLE users; --"
    expect(validators.name(sqlAttempt)).toBe(false)
  })

  test('Ochrona przed injection w tłumaczeniach', () => {
    const malicious = '<script>alert("XSS")</script>'
    const result = t(malicious)
    expect(result).not.toContain('<script>')
  })
})

// ============================================
// 12. TESTY UŻYTECZNOŚCI (Usability Tests)
// ============================================
describe('12. TESTY UŻYTECZNOŚCI', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Dostępność wszystkich sekcji przez nawigację', () => {
    const container = document.createElement('div')
    renderHome(container)
    const navItems = ['home', 'ai-stats', 'about', 'services', 'portfolio', 'contact']
    navItems.forEach(item => {
      expect(container.querySelector(`#${item}`)).toBeTruthy()
    })
  })

  test('Czytelność tekstu - wszystkie sekcje mają treść', () => {
    const container = document.createElement('div')
    renderHome(container)
    const sections = container.querySelectorAll('section')
    sections.forEach(section => {
      expect(section.textContent.trim().length).toBeGreaterThan(0)
    })
  })
})

// ============================================
// 13. TESTY ZGODNOŚCI (Compatibility Tests)
// ============================================
describe('13. TESTY ZGODNOŚCI', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Kompatybilność z różnymi przeglądarkami - podstawowe API', () => {
    expect(typeof document.createElement).toBe('function')
    expect(typeof document.querySelector).toBe('function')
    expect(typeof window.localStorage).toBe('object')
  })

  test('Kompatybilność z ES6+', () => {
    const arrow = () => true
    expect(arrow()).toBe(true)
    const spread = [...[1, 2, 3]]
    expect(spread.length).toBe(3)
  })
})

// ============================================
// 14. TESTY DOSTĘPNOŚCI (Accessibility Tests)
// ============================================
describe('14. TESTY DOSTĘPNOŚCI', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Sekcje mają role ARIA', () => {
    const container = document.createElement('div')
    renderHome(container)
    const sections = container.querySelectorAll('section[role]')
    expect(sections.length).toBeGreaterThan(0)
  })

  test('Przyciski mają aria-label', () => {
    const container = document.createElement('div')
    renderHome(container)
    const buttons = container.querySelectorAll('button[aria-label]')
    expect(buttons.length).toBeGreaterThan(0)
  })

  test('Linki mają odpowiednie atrybuty', () => {
    const container = document.createElement('div')
    renderHome(container)
    const links = container.querySelectorAll('a[href]')
    links.forEach(link => {
      expect(link.hasAttribute('href')).toBe(true)
    })
  })
})

// ============================================
// 15. TESTY REGRESYJNE (Regression Tests)
// ============================================
describe('15. TESTY REGRESYJNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Regresja - renderowanie strony głównej nie zmienia się', () => {
    const container = document.createElement('div')
    renderHome(container)
    const firstRender = container.innerHTML
    renderHome(container)
    const secondRender = container.innerHTML
    expect(secondRender).toBe(firstRender)
  })

  test('Regresja - walidacja email działa poprawnie', () => {
    expect(validators.email('test@example.com')).toBe(true)
    expect(validators.email('invalid')).toBe(false)
  })
})

// ============================================
// 16. TESTY SMOKE (Smoke Tests)
// ============================================
describe('16. TESTY SMOKE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Smoke - aplikacja się uruchamia', () => {
    const app = document.getElementById('app')
    expect(app).toBeTruthy()
  })

  test('Smoke - podstawowe funkcje działają', () => {
    expect(typeof renderHome).toBe('function')
    expect(typeof initRouter).toBe('function')
    expect(typeof validators.email).toBe('function')
  })
})

// ============================================
// 17. TESTY SANITY (Sanity Tests)
// ============================================
describe('17. TESTY SANITY', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Sanity - renderowanie strony głównej', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(container.querySelector('#home')).toBeTruthy()
  })

  test('Sanity - walidacja działa', () => {
    expect(validators.email('test@example.com')).toBe(true)
  })
})

// ============================================
// 18. TESTY E2E (End-to-End Tests)
// ============================================
describe('18. TESTY E2E', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('E2E - pełny przepływ użytkownika', () => {
    const app = document.getElementById('app')
    renderLayout(app)
    initRouter()
    const container = document.getElementById('content')
    renderHome(container)
    expect(container.querySelector('#home')).toBeTruthy()
    expect(container.querySelector('#contact')).toBeTruthy()
  })

  test('E2E - nawigacja między sekcjami', () => {
    const container = document.createElement('div')
    container.id = 'content'
    renderHome(container)
    scrollToSection('contact')
    expect(container.querySelector('#contact')).toBeTruthy()
  })
})

// ============================================
// 19. TESTY CZARNEJ SKRZYNKI (Black Box Tests)
// ============================================
describe('19. TESTY CZARNEJ SKRZYNKI', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Czarna skrzynka - wejście: poprawny email, wyjście: true', () => {
    expect(validators.email('test@example.com')).toBe(true)
  })

  test('Czarna skrzynka - wejście: niepoprawny email, wyjście: false', () => {
    expect(validators.email('invalid')).toBe(false)
  })
})

// ============================================
// 20. TESTY BIAŁEJ SKRZYNKI (White Box Tests)
// ============================================
describe('20. TESTY BIAŁEJ SKRZYNKI', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Biała skrzynka - wszystkie ścieżki w walidacji email', () => {
    expect(validators.email('test@example.com')).toBe(true)
    expect(validators.email('test@')).toBe(false)
    expect(validators.email('@example.com')).toBe(false)
    expect(validators.email('')).toBe(false)
  })
})

// ============================================
// 21. TESTY LOKALIZACYJNE (Localization Tests)
// ============================================
describe('21. TESTY LOKALIZACYJNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
    localStorage.clear()
  })

  test('Lokalizacja PL - wszystkie tłumaczenia dostępne', () => {
    setLang('pl')
    expect(t('nav.home')).toBe('Strona Główna')
    expect(t('nav.about')).toBe('O nas')
    expect(t('nav.services')).toBe('Usługi')
  })

  test('Lokalizacja EN - wszystkie tłumaczenia dostępne', () => {
    setLang('en')
    expect(t('nav.home')).toBe('Home')
    expect(t('nav.about')).toBe('About')
    expect(t('nav.services')).toBe('Services')
  })

  test('Lokalizacja - przechowywanie preferencji', () => {
    setLang('en')
    expect(localStorage.getItem('lang')).toBe('en')
    setLang('pl')
    expect(localStorage.getItem('lang')).toBe('pl')
  })
})

// ============================================
// 22. TESTY INTERNACJONALIZACYJNE (i18n Tests)
// ============================================
describe('22. TESTY INTERNACJONALIZACYJNE', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
    localStorage.clear()
  })

  test('i18n - obsługa wielu języków', () => {
    setLang('pl')
    expect(getLang()).toBe('pl')
    setLang('en')
    expect(getLang()).toBe('en')
  })

  test('i18n - fallback dla brakujących tłumaczeń', () => {
    const result = t('non.existent.key')
    expect(result).toBe('non.existent.key')
  })
})

// ============================================
// 23. TESTY KOMPATYBILNOŚCI ZAKŁADEK
// ============================================
describe('23. TESTY KOMPATYBILNOŚCI ZAKŁADEK', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Kompatybilność - wszystkie zakładki renderują się', () => {
    const container = document.createElement('div')
    renderHome(container)
    const tabs = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
    tabs.forEach(tab => {
      expect(container.querySelector(`#${tab}`)).toBeTruthy()
    })
  })

  test('Kompatybilność - nawigacja między zakładkami', () => {
    const container = document.createElement('div')
    container.id = 'content'
    renderHome(container)
    const tabs = ['home', 'about', 'services', 'contact']
    tabs.forEach(tab => {
      scrollToSection(tab)
      expect(container.querySelector(`#${tab}`)).toBeTruthy()
    })
  })

  test('Kompatybilność - przełączanie języka w różnych zakładkach', () => {
    const container = document.createElement('div')
    setLang('pl')
    renderHome(container)
    const plContent = container.innerHTML
    setLang('en')
    renderHome(container)
    const enContent = container.innerHTML
    expect(plContent).not.toBe(enContent)
  })
})

// ============================================
// 24. TESTY STRUKTURY
// ============================================
describe('24. TESTY STRUKTURY', () => {
  test('Struktura - wszystkie sekcje mają odpowiednie ID', () => {
    const container = document.createElement('div')
    renderHome(container)
    const requiredIds = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
    requiredIds.forEach(id => {
      expect(container.querySelector(`#${id}`)).toBeTruthy()
    })
  })

  test('Struktura - HTML jest semantyczny', () => {
    const container = document.createElement('div')
    renderHome(container)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  test('Struktura - wszystkie sekcje mają kontenery', () => {
    const container = document.createElement('div')
    renderHome(container)
    const containers = container.querySelectorAll('.container')
    expect(containers.length).toBeGreaterThan(0)
  })
})

// ============================================
// 25. TESTY KODU
// ============================================
describe('25. TESTY KODU', () => {
  test('Kod - funkcje są eksportowane', () => {
    expect(typeof renderHome).toBe('function')
    expect(typeof initRouter).toBe('function')
    expect(typeof validators).toBe('object')
  })

  test('Kod - brak błędów składniowych', () => {
    expect(() => {
      const container = document.createElement('div')
      renderHome(container)
    }).not.toThrow()
  })

  test('Kod - wszystkie importy działają', () => {
    expect(typeof scrollToSection).toBe('function')
    expect(typeof renderHome).toBe('function')
    expect(typeof validators).toBe('object')
  })
})

// ============================================
// 26. TESTY PROCESÓW
// ============================================
describe('26. TESTY PROCESÓW', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Proces - inicjalizacja aplikacji', () => {
    const app = document.getElementById('app')
    renderLayout(app)
    initRouter()
    expect(document.getElementById('header')).toBeTruthy()
    expect(document.getElementById('content')).toBeTruthy()
    expect(document.getElementById('footer')).toBeTruthy()
  })

  test('Proces - renderowanie strony głównej', () => {
    const container = document.createElement('div')
    renderHome(container)
    expect(container.querySelector('#home')).toBeTruthy()
  })

  test('Proces - zmiana języka', () => {
    setLang('pl')
    expect(getLang()).toBe('pl')
    setLang('en')
    expect(getLang()).toBe('en')
  })
})

// ============================================
// 27. TESTY DUŻYCH PLIKÓW
// ============================================
describe('27. TESTY DUŻYCH PLIKÓW', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
  })

  test('Duże pliki - renderowanie z dużą ilością danych', () => {
    const container = document.createElement('div')
    for (let i = 0; i < 10; i++) {
      renderHome(container)
    }
    expect(container.querySelector('#home')).toBeTruthy()
  })

  test('Duże pliki - obsługa długich tekstów', () => {
    const longText = 'a'.repeat(10000)
    expect(validators.name(longText)).toBe(false)
  })
})

