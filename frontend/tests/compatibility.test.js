// Testy kompatybilności między sekcjami
describe('Kompatybilność sekcji', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>'
        require('../src/main.js')
    })

    test('Wszystkie sekcje są dostępne', () => {
        const sections = ['home', 'about', 'services', 'technologies', 'contact']
        sections.forEach(id => {
            const section = document.getElementById(id)
            expect(section).toBeTruthy()
        })
    })

    test('Nawigacja działa między sekcjami', () => {
        const links = document.querySelectorAll('a[data-scroll]')
        links.forEach(link => {
            const sectionId = link.getAttribute('data-scroll')
            const section = document.getElementById(sectionId)
            expect(section).toBeTruthy()
        })
    })

    test('Formularz kontaktowy jest dostępny', () => {
        const form = document.getElementById('contact-form')
        expect(form).toBeTruthy()
        expect(form.querySelector('#name')).toBeTruthy()
        expect(form.querySelector('#email')).toBeTruthy()
        expect(form.querySelector('#subject')).toBeTruthy()
        expect(form.querySelector('#message')).toBeTruthy()
    })
})

