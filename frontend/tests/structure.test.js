// Testy struktury strony
describe('Struktura strony', () => {
    test('Wszystkie wymagane sekcje istnieją', () => {
        const requiredSections = ['home', 'about', 'services', 'technologies', 'contact']
        requiredSections.forEach(id => {
            const section = document.getElementById(id)
            expect(section).toBeTruthy()
        })
    })

    test('Header zawiera nawigację', () => {
        const header = document.getElementById('header')
        expect(header).toBeTruthy()
        const nav = header.querySelector('nav')
        expect(nav).toBeTruthy()
    })

    test('Footer istnieje', () => {
        const footer = document.getElementById('footer')
        expect(footer).toBeTruthy()
    })
})

