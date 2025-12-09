/**
 * TESTY KOMPATYBILNOŚCI ZAKŁADEK
 * Testuje kompatybilność między wszystkimi zakładkami aplikacji
 */

import {renderHome} from '../src/pages/home.js'
import {renderPrivacy} from '../src/pages/privacy.js'
import {renderLayout, renderHeader} from '../src/components/layout.js'
import {initRouter, scrollToSection} from '../src/router.js'
import {t, getLang, setLang} from '../src/utils/i18n.js'

describe('TESTY KOMPATYBILNOŚCI ZAKŁADEK', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    document.head.innerHTML = ''
    localStorage.clear()
  })

  // Lista wszystkich zakładek/sekcji
  const allTabs = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
  const navTabs = ['home', 'ai-stats', 'about', 'services', 'portfolio', 'contact']

  describe('Kompatybilność podstawowa - wszystkie zakładki istnieją', () => {
    test('Wszystkie zakładki są renderowane na stronie głównej', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      
      allTabs.forEach(tab => {
        const element = container.querySelector(`#${tab}`)
        expect(element).toBeTruthy()
        expect(element.tagName).toBe('SECTION')
      })
    })

    test('Wszystkie zakładki mają unikalne ID', () => {
      const container = document.createElement('div')
      renderHome(container)
      
      const ids = allTabs.map(tab => container.querySelector(`#${tab}`)?.id).filter(Boolean)
      expect(new Set(ids).size).toBe(ids.length)
    })

    test('Wszystkie zakładki mają zawartość', () => {
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const element = container.querySelector(`#${tab}`)
        expect(element?.textContent.trim().length).toBeGreaterThan(0)
      })
    })
  })

  describe('Kompatybilność nawigacji - przełączanie między zakładkami', () => {
    test('Nawigacja do każdej zakładki działa', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      
      navTabs.forEach(tab => {
        expect(() => scrollToSection(tab)).not.toThrow()
        const element = container.querySelector(`#${tab}`)
        expect(element).toBeTruthy()
      })
    })

    test('Nawigacja zachowuje stan aplikacji', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      
      const initialLang = getLang()
      navTabs.forEach(tab => {
        scrollToSection(tab)
        expect(getLang()).toBe(initialLang)
      })
    })

    test('Nawigacja działa w obu językach', () => {
      const container = document.createElement('div')
      container.id = 'content'
      
      ['pl', 'en'].forEach(lang => {
        setLang(lang)
        renderHome(container)
        
        navTabs.forEach(tab => {
          expect(() => scrollToSection(tab)).not.toThrow()
          const element = container.querySelector(`#${tab}`)
          expect(element).toBeTruthy()
        })
      })
    })
  })

  describe('Kompatybilność języków - wszystkie zakładki w PL i EN', () => {
    test('Wszystkie zakładki mają tłumaczenia PL', () => {
      setLang('pl')
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const element = container.querySelector(`#${tab}`)
        expect(element).toBeTruthy()
        expect(element.textContent.length).toBeGreaterThan(0)
      })
    })

    test('Wszystkie zakładki mają tłumaczenia EN', () => {
      setLang('en')
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const element = container.querySelector(`#${tab}`)
        expect(element).toBeTruthy()
        expect(element.textContent.length).toBeGreaterThan(0)
      })
    })

    test('Zmiana języka nie psuje zakładek', () => {
      const container = document.createElement('div')
      
      setLang('pl')
      renderHome(container)
      const plContent = container.innerHTML
      
      setLang('en')
      renderHome(container)
      const enContent = container.innerHTML
      
      // Treść powinna się zmienić, ale struktura pozostaje
      expect(plContent).not.toBe(enContent)
      allTabs.forEach(tab => {
        expect(container.querySelector(`#${tab}`)).toBeTruthy()
      })
    })
  })

  describe('Kompatybilność struktury - spójność między zakładkami', () => {
    test('Wszystkie zakładki mają kontener .container', () => {
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const section = container.querySelector(`#${tab}`)
        const innerContainer = section?.querySelector('.container')
        expect(innerContainer).toBeTruthy()
      })
    })

    test('Wszystkie zakładki mają nagłówki', () => {
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const section = container.querySelector(`#${tab}`)
        const heading = section?.querySelector('h1, h2, h3')
        expect(heading).toBeTruthy()
      })
    })

    test('Wszystkie zakładki mają odpowiednie role ARIA', () => {
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const section = container.querySelector(`#${tab}`)
        expect(section?.hasAttribute('role')).toBe(true)
      })
    })
  })

  describe('Kompatybilność funkcjonalna - interakcje między zakładkami', () => {
    test('Przejście z home do contact zachowuje funkcjonalność', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      
      scrollToSection('home')
      expect(container.querySelector('#home')).toBeTruthy()
      
      scrollToSection('contact')
      expect(container.querySelector('#contact')).toBeTruthy()
      expect(container.querySelector('#home')).toBeTruthy() // Home nadal istnieje
    })

    test('Przejście między zakładkami nie powoduje błędów', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      
      const transitions = [
        ['home', 'about'],
        ['about', 'services'],
        ['services', 'portfolio'],
        ['portfolio', 'contact']
      ]
      
      transitions.forEach(([from, to]) => {
        expect(() => {
          scrollToSection(from)
          scrollToSection(to)
        }).not.toThrow()
        expect(container.querySelector(`#${to}`)).toBeTruthy()
      })
    })
  })

  describe('Kompatybilność z menu nawigacyjnym', () => {
    test('Menu nawigacyjne zawiera wszystkie zakładki', () => {
      renderHeader()
      const navLinks = document.querySelectorAll('.nav-menu a')
      const navIds = Array.from(navLinks).map(link => link.getAttribute('data-scroll') || link.getAttribute('href')?.replace('#', ''))
      
      navTabs.forEach(tab => {
        expect(navIds).toContain(tab)
      })
    })

    test('Kliknięcie w menu nawigacyjne przechodzi do zakładki', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      renderHeader()
      
      const navLinks = document.querySelectorAll('.nav-menu a[data-scroll]')
      navLinks.forEach(link => {
        const targetTab = link.getAttribute('data-scroll')
        if (targetTab && allTabs.includes(targetTab)) {
          link.click()
          expect(container.querySelector(`#${targetTab}`)).toBeTruthy()
        }
      })
    })
  })

  describe('Kompatybilność z routerem', () => {
    test('Router obsługuje wszystkie zakładki', () => {
      const container = document.createElement('div')
      container.id = 'content'
      document.body.appendChild(container)
      
      initRouter()
      
      allTabs.forEach(tab => {
        window.location.hash = `#${tab}`
        window.dispatchEvent(new Event('hashchange'))
        // Po krótkim czasie zakładka powinna być dostępna
        setTimeout(() => {
          expect(container.querySelector(`#${tab}`)).toBeTruthy()
        }, 100)
      })
    })
  })

  describe('Kompatybilność z polityką prywatności', () => {
    test('Przejście z home do privacy działa', () => {
      const container = document.createElement('div')
      container.id = 'content'
      
      renderHome(container)
      expect(container.querySelector('#home')).toBeTruthy()
      
      renderPrivacy(container)
      expect(container.querySelector('.privacy-page')).toBeTruthy()
    })

    test('Powrót z privacy do home działa', () => {
      const container = document.createElement('div')
      container.id = 'content'
      
      renderPrivacy(container)
      expect(container.querySelector('.privacy-page')).toBeTruthy()
      
      renderHome(container)
      expect(container.querySelector('#home')).toBeTruthy()
    })
  })

  describe('Kompatybilność responsywna - wszystkie zakładki na mobile', () => {
    test('Wszystkie zakładki są dostępne na mobile', () => {
      // Symulacja mobile viewport
      Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 375})
      
      const container = document.createElement('div')
      renderHome(container)
      
      allTabs.forEach(tab => {
        const element = container.querySelector(`#${tab}`)
        expect(element).toBeTruthy()
        // Sprawdź czy element jest widoczny (nie ma display: none)
        const style = window.getComputedStyle(element)
        expect(style.display).not.toBe('none')
      })
    })
  })

  describe('Kompatybilność wydajnościowa - szybkie przełączanie', () => {
    test('Szybkie przełączanie między zakładkami nie powoduje błędów', () => {
      const container = document.createElement('div')
      container.id = 'content'
      renderHome(container)
      
      const start = performance.now()
      for (let i = 0; i < 10; i++) {
        navTabs.forEach(tab => scrollToSection(tab))
      }
      const end = performance.now()
      
      expect(end - start).toBeLessThan(1000) // Powinno być szybkie
      allTabs.forEach(tab => {
        expect(container.querySelector(`#${tab}`)).toBeTruthy()
      })
    })
  })
})

