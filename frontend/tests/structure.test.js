describe('Struktura strony', () => {
  let container

  beforeEach(async () => {
    container = document.createElement('div')
    const {renderHome} = await import('../src/pages/home.js')
    await renderHome(container)
  })

  test('Wszystkie wymagane sekcje istnieją', () => {
    const requiredSections = ['home', 'ai-stats', 'about', 'services', 'technologies', 'portfolio', 'contact']
    requiredSections.forEach(id => expect(container.querySelector(`#${id}`)).toBeTruthy())
  })

  test('Struktura HTML jest poprawna', () => {
    expect(container.querySelector('section#home')).toBeTruthy()
    expect(container.querySelector('section#about')).toBeTruthy()
    expect(container.querySelector('section#services')).toBeTruthy()
  })

  test('ID sekcji są unikalne', () => {
    const ids = Array.from(container.querySelectorAll('[id]')).map(el => el.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('Wszystkie sekcje mają klasę CSS', () => {
    const sections = container.querySelectorAll('section[id]')
    sections.forEach(section => expect(section.className.length).toBeGreaterThan(0))
  })
})
