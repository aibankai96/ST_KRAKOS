const CURRENT_YEAR = 2025
const navItems = [
    { scroll: 'home', text: 'Strona Główna' },
    { scroll: 'ai-stats', text: 'AI w Liczbach' },
    { scroll: 'about', text: 'O nas' },
    { scroll: 'services', text: 'Usługi' },
    { scroll: 'portfolio', text: 'Portfolio' },
    { scroll: 'contact', text: 'Kontakt' }
]
const renderHeader = () => {
    const header = document.getElementById('header')
    if (!header) return
    header.innerHTML = `<nav><div class="logo">ST KRAKOS</div><ul>${navItems.map(({scroll, text}) => `<li><a href="#${scroll}" data-scroll="${scroll}">${text}</a></li>`).join('')}</ul></nav>`
}
const renderFooter = () => {
    const footer = document.getElementById('footer')
    if (footer) footer.innerHTML = `<div class="footer-content"><p>&copy; ${CURRENT_YEAR} ST KRAKOS. Wszystkie prawa zastrzeżone.</p></div>`
}
export function renderLayout(container) {
    container.innerHTML = `<header id="header"></header><main id="content"><div style="padding: 2rem; text-align: center;"><p>Ładowanie...</p></div></main><footer id="footer"></footer>`
    renderHeader()
    renderFooter()
}
