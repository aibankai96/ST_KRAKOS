import { scrollToSection, initRouter } from '../src/router.js'
import { renderHome } from '../src/pages/home.js'

describe('Testy Kompleksowe', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>'
    })
    describe('Testy Jednostkowe', () => {
        test('scrollToSection - funkcja istnieje', () => {
            expect(typeof scrollToSection).toBe('function')
        })
        test('initRouter - funkcja istnieje', () => {
            expect(typeof initRouter).toBe('function')
        })
    })
    describe('Testy Integracyjne', () => {
        test('Router i Home integracja', async () => {
            const container = document.createElement('div')
            await renderHome(container)
            expect(container.querySelector('#home')).toBeTruthy()
        })
    })
    describe('Testy Systemowe', () => {
        test('Wszystkie sekcje renderują się', async () => {
            const container = document.createElement('div')
            await renderHome(container)
            const sections = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
            sections.forEach(id => expect(container.querySelector(`#${id}`)).toBeTruthy())
        })
    })
    describe('Testy Funkcjonalne', () => {
        test('Nawigacja smooth scroll', () => {
            document.body.innerHTML = '<div id="test-section" style="height: 2000px;"></div>'
            expect(() => scrollToSection('test-section')).not.toThrow()
        })
    })
    describe('Testy Kompatybilności', () => {
        test('Kompatybilność między sekcjami', async () => {
            const container = document.createElement('div')
            await renderHome(container)
            const links = container.querySelectorAll('a[data-scroll], button[data-scroll]')
            links.forEach(link => {
                const sectionId = link.getAttribute('data-scroll')
                expect(container.querySelector(`#${sectionId}`)).toBeTruthy()
            })
        })
    })
    describe('Testy Struktury', () => {
        test('Wszystkie wymagane ID są unikalne', async () => {
            const container = document.createElement('div')
            await renderHome(container)
            const ids = Array.from(container.querySelectorAll('[id]')).map(el => el.id)
            expect(new Set(ids).size).toBe(ids.length)
        })
    })
    describe('Testy Dostępności', () => {
        test('Wszystkie linki mają href lub data-scroll', async () => {
            const container = document.createElement('div')
            await renderHome(container)
            const links = container.querySelectorAll('a')
            links.forEach(link => {
                expect(link.hasAttribute('href') || link.hasAttribute('data-scroll')).toBe(true)
            })
        })
    })
})

