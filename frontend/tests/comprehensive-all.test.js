/**
 * KOMPLEKSOWE TESTY - WSZYSTKIE TYPY
 * Testy jednostkowe, integracyjne, systemowe, wydajnościowe, bezpieczeństwa, dostępności, kompatybilności
 */

import { scrollToSection, initRouter } from '../src/router.js'
import { renderHome } from '../src/pages/home.js'
import { renderLayout } from '../src/components/layout.js'
import { validators, validateField, showError, clearError, clearValidationErrors } from '../src/utils/validators.js'
import { updateSEO, addStructuredData } from '../src/utils/seo.js'

describe('🧪 KOMPLEKSOWE TESTY APLIKACJI ST KRAKOS', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>'
        document.head.innerHTML = ''
    })

    // ============================================
    // 1. TESTY JEDNOSTKOWE
    // ============================================
    describe('1. TESTY JEDNOSTKOWE', () => {
        test('scrollToSection - funkcja istnieje i jest funkcją', () => {
            expect(typeof scrollToSection).toBe('function')
        })

        test('initRouter - funkcja istnieje i jest funkcją', () => {
            expect(typeof initRouter).toBe('function')
        })

        test('renderHome - funkcja istnieje i jest funkcją', () => {
            expect(typeof renderHome).toBe('function')
        })

        test('renderLayout - funkcja istnieje i jest funkcją', () => {
            expect(typeof renderLayout).toBe('function')
        })

        test('validators - obiekt istnieje i ma właściwości', () => {
            expect(validators).toBeDefined()
            expect(validators.name).toBeDefined()
            expect(validators.email).toBeDefined()
            expect(validators.subject).toBeDefined()
            expect(validators.message).toBeDefined()
        })

        test('validators.name - walidacja poprawna', () => {
            expect(validators.name('Jan Kowalski')).toBe(true)
            expect(validators.name('A')).not.toBe(true)
            expect(validators.name('a'.repeat(101))).not.toBe(true)
        })

        test('validators.email - walidacja poprawna', () => {
            expect(validators.email('test@example.com')).toBe(true)
            expect(validators.email('invalid')).not.toBe(true)
            expect(validators.email('test@')).not.toBe(true)
        })

        test('updateSEO - funkcja istnieje', () => {
            expect(typeof updateSEO).toBe('function')
        })

        test('addStructuredData - funkcja istnieje', () => {
            expect(typeof addStructuredData).toBe('function')
        })
    })

    // ============================================
    // 2. TESTY INTEGRACYJNE
    // ============================================
    describe('2. TESTY INTEGRACYJNE', () => {
        test('Router i Home integracja - renderowanie', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            expect(container.querySelector('#home')).toBeTruthy()
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
            expect(document.title).toContain('ST KRAKOS')
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
    // 3. TESTY SYSTEMOWE (E2E)
    // ============================================
    describe('3. TESTY SYSTEMOWE (E2E)', () => {
        test('Wszystkie sekcje renderują się', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const sections = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
            sections.forEach(id => {
                expect(container.querySelector(`#${id}`)).toBeTruthy()
            })
        })

        test('Nawigacja smooth scroll działa', () => {
            document.body.innerHTML = '<div id="test-section" style="height: 2000px; position: absolute; top: 1000px;"></div>'
            expect(() => scrollToSection('test-section')).not.toThrow()
        })

        test('Router inicjalizuje się poprawnie', () => {
            document.body.innerHTML = '<div id="app"><div id="content"></div></div>'
            expect(() => initRouter()).not.toThrow()
        })
    })

    // ============================================
    // 4. TESTY FUNKCJONALNE
    // ============================================
    describe('4. TESTY FUNKCJONALNE', () => {
        test('Nawigacja między sekcjami', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const links = container.querySelectorAll('a[data-scroll], button[data-scroll]')
            expect(links.length).toBeGreaterThan(0)
            links.forEach(link => {
                const sectionId = link.getAttribute('data-scroll')
                expect(sectionId).toBeTruthy()
                expect(container.querySelector(`#${sectionId}`)).toBeTruthy()
            })
        })

        test('Animacje statystyk - setup', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const statsSection = container.querySelector('#ai-stats')
            expect(statsSection).toBeTruthy()
            const statNumbers = statsSection.querySelectorAll('.stat-number')
            expect(statNumbers.length).toBeGreaterThan(0)
        })

        test('Structured data jest dodawane', () => {
            addStructuredData({ '@context': 'https://schema.org', '@type': 'Organization' })
            const script = document.querySelector('script[type="application/ld+json"]')
            expect(script).toBeTruthy()
        })
    })

    // ============================================
    // 5. TESTY BEZPIECZEŃSTWA
    // ============================================
    describe('5. TESTY BEZPIECZEŃSTWA', () => {
        test('Walidacja XSS - input sanitization', () => {
            const maliciousInput = '<script>alert("XSS")</script>'
            const result = validators.name(maliciousInput)
            expect(result).not.toBe(true) // Powinno być odrzucone
        })

        test('Walidacja długości - zapobieganie DoS', () => {
            const longInput = 'a'.repeat(10000)
            const result = validators.name(longInput)
            expect(result).not.toBe(true)
        })

        test('Email walidacja - zapobieganie injection', () => {
            const maliciousEmail = 'test@example.com<script>alert("XSS")</script>'
            const result = validators.email(maliciousEmail)
            expect(result).not.toBe(true)
        })

        test('SEO - bezpieczne meta tagi', () => {
            updateSEO('Test', 'Description')
            const meta = document.querySelector('meta[name="description"]')
            expect(meta).toBeTruthy()
            expect(meta.content).not.toContain('<script>')
        })
    })

    // ============================================
    // 6. TESTY DOSTĘPNOŚCI (WCAG)
    // ============================================
    describe('6. TESTY DOSTĘPNOŚCI (WCAG)', () => {
        test('Wszystkie linki mają href lub data-scroll', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const links = container.querySelectorAll('a')
            links.forEach(link => {
                expect(link.hasAttribute('href') || link.hasAttribute('data-scroll')).toBe(true)
            })
        })

        test('Wszystkie przyciski mają tekst lub aria-label', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const buttons = container.querySelectorAll('button')
            buttons.forEach(button => {
                expect(button.textContent.trim().length > 0 || button.hasAttribute('aria-label')).toBe(true)
            })
        })

        test('Struktura semantyczna - sekcje mają ID', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const sections = container.querySelectorAll('section')
            sections.forEach(section => {
                expect(section.id).toBeTruthy()
            })
        })
    })

    // ============================================
    // 7. TESTY KOMPATYBILNOŚCI
    // ============================================
    describe('7. TESTY KOMPATYBILNOŚCI', () => {
        test('Kompatybilność między sekcjami - wszystkie linki prowadzą do istniejących sekcji', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const links = container.querySelectorAll('a[data-scroll], button[data-scroll]')
            links.forEach(link => {
                const sectionId = link.getAttribute('data-scroll')
                expect(container.querySelector(`#${sectionId}`)).toBeTruthy()
            })
        })

        test('Wszystkie wymagane ID są unikalne', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const ids = Array.from(container.querySelectorAll('[id]')).map(el => el.id)
            expect(new Set(ids).size).toBe(ids.length)
        })

        test('Spójność danych między sekcjami', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const sections = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
            sections.forEach(id => {
                const section = container.querySelector(`#${id}`)
                expect(section).toBeTruthy()
                expect(section.textContent.length).toBeGreaterThan(0)
            })
        })
    })

    // ============================================
    // 8. TESTY STRUKTURY
    // ============================================
    describe('8. TESTY STRUKTURY', () => {
        test('Struktura HTML jest poprawna', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            expect(container.querySelector('section#home')).toBeTruthy()
            expect(container.querySelector('section#services')).toBeTruthy()
            expect(container.querySelector('section#contact')).toBeTruthy()
        })

        test('Wszystkie sekcje mają klasę CSS', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const sections = container.querySelectorAll('section')
            sections.forEach(section => {
                expect(section.className.length).toBeGreaterThan(0)
            })
        })

        test('Container jest używany poprawnie', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const containers = container.querySelectorAll('.container')
            expect(containers.length).toBeGreaterThan(0)
        })
    })

    // ============================================
    // 9. TESTY WYDAJNOŚCIOWE
    // ============================================
    describe('9. TESTY WYDAJNOŚCIOWE', () => {
        test('Renderowanie nie blokuje głównego wątku', async () => {
            const start = performance.now()
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const end = performance.now()
            expect(end - start).toBeLessThan(100) // Powinno być szybkie
        })

        test('Brak duplikatów w DOM', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            const ids = Array.from(container.querySelectorAll('[id]')).map(el => el.id)
            const uniqueIds = new Set(ids)
            expect(ids.length).toBe(uniqueIds.size)
        })
    })

    // ============================================
    // 10. TESTY REGRESYJNE
    // ============================================
    describe('10. TESTY REGRESYJNE', () => {
        test('Funkcjonalność nie została zepsuta', async () => {
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            expect(container.querySelector('#home')).toBeTruthy()
            expect(container.querySelector('#services')).toBeTruthy()
            expect(container.querySelector('#contact')).toBeTruthy()
        })

        test('Walidacja działa poprawnie', () => {
            expect(validators.name('Test')).toBe(true)
            expect(validators.email('test@example.com')).toBe(true)
        })
    })

    // ============================================
    // 11. TESTY SMOKE
    // ============================================
    describe('11. TESTY SMOKE', () => {
        test('Aplikacja startuje bez błędów', () => {
            expect(() => {
                const app = document.getElementById('app')
                if (app) {
                    renderLayout(app)
                    initRouter()
                }
            }).not.toThrow()
        })

        test('Podstawowe funkcje działają', () => {
            expect(typeof scrollToSection).toBe('function')
            expect(typeof renderHome).toBe('function')
            expect(typeof validators.name).toBe('function')
        })
    })

    // ============================================
    // 12. TESTY SANITY
    // ============================================
    describe('12. TESTY SANITY', () => {
        test('Wszystkie moduły są załadowane', () => {
            expect(scrollToSection).toBeDefined()
            expect(initRouter).toBeDefined()
            expect(renderHome).toBeDefined()
            expect(renderLayout).toBeDefined()
            expect(validators).toBeDefined()
            expect(updateSEO).toBeDefined()
        })

        test('Brak błędów w konsoli', () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation()
            const container = document.createElement('div')
            container.id = 'content'
            renderHome(container)
            expect(consoleError).not.toHaveBeenCalled()
            consoleError.mockRestore()
        })
    })
})

