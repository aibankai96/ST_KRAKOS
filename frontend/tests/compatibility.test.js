import {renderHome} from '../src/pages/home.js'
import {scrollToSection} from '../src/router.js'

describe('Kompatybilność sekcji', () => {
  let container

  beforeEach(async () => {
    container = document.createElement('div')
    document.body.innerHTML = '<div id="app"></div>'
    await renderHome(container)
  })

  test('Wszystkie sekcje są dostępne', () => {
    const sections = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
    sections.forEach(id => expect(container.querySelector(`#${id}`)).toBeTruthy())
  })

  test('Nawigacja działa między wszystkimi sekcjami', () => {
    const links = container.querySelectorAll('a[data-scroll], button[data-scroll]')
    expect(links.length).toBeGreaterThan(0)
    links.forEach(link => {
      const sectionId = link.getAttribute('data-scroll')
      expect(container.querySelector(`#${sectionId}`)).toBeTruthy()
    })
  })

  test('Kompatybilność hash w URL', () => {
    const sections = ['home', 'about', 'services', 'contact']
    sections.forEach(id => expect(() => scrollToSection(id)).not.toThrow())
  })

  test('Wszystkie linki w menu prowadzą do istniejących sekcji', () => {
    const navLinks = container.querySelectorAll('nav a[data-scroll]')
    navLinks.forEach(link => {
      const sectionId = link.getAttribute('data-scroll')
      expect(container.querySelector(`#${sectionId}`)).toBeTruthy()
    })
  })
})
