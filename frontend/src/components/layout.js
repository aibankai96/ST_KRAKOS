import { t, getLang, setLang } from '../utils/i18n.js'
const CURRENT_YEAR = 2025
export const renderHeader = () => {
    const header = document.getElementById('header')
    if (!header) return
    const lang = getLang()
    const navItems = [
        { scroll: 'home', key: 'nav.home' },
        { scroll: 'ai-stats', key: 'nav.aiStats' },
        { scroll: 'about', key: 'nav.about' },
        { scroll: 'services', key: 'nav.services' },
        { scroll: 'portfolio', key: 'nav.portfolio' },
        { scroll: 'contact', key: 'nav.contact' }
    ]
    header.innerHTML = `<nav><div class="logo">ST KRAKOS</div><ul>${navItems.map(({scroll, key}) => `<li><a href="#${scroll}" data-scroll="${scroll}">${t(key)}</a></li>`).join('')}</ul><div class="lang-switcher"><button class="lang-btn ${lang === 'pl' ? 'active' : ''}" data-lang="pl" title="Polski">🇵🇱</button><button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en" title="English">🇺🇸</button></div></nav>`
    header.querySelectorAll('.lang-btn').forEach(btn => { const newBtn = btn.cloneNode(true); btn.replaceWith(newBtn); newBtn.addEventListener('click', () => setLang(newBtn.dataset.lang)) })
}
export const renderFooter = () => {
    const footer = document.getElementById('footer')
    if (footer) footer.innerHTML = `<div class="footer-content"><p>&copy; ${CURRENT_YEAR} ST KRAKOS. ${t('footer')}</p></div>`
}
export function renderLayout(container) {
    container.innerHTML = `<header id="header"></header><main id="content"><div style="padding: 2rem; text-align: center;"><p>Ładowanie...</p></div></main><footer id="footer"></footer>`
    renderHeader()
    renderFooter()
}
