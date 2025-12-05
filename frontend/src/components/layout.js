import {t, getLang, setLang} from '../utils/i18n.js'
const CURRENT_YEAR = 2025
export const renderHeader = () => {
  const header = document.getElementById('header')
  if (!header) {
    return
  }
  const lang = getLang()
  const navItems = [
    {scroll: 'home', key: 'nav.home'},
    {scroll: 'ai-stats', key: 'nav.aiStats'},
    {scroll: 'about', key: 'nav.about'},
    {scroll: 'services', key: 'nav.services'},
    {scroll: 'portfolio', key: 'nav.portfolio'},
    {scroll: 'contact', key: 'nav.contact'}
  ]
  header.innerHTML = `<nav><div class="logo">ST KRATOS</div><button class="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button><ul class="nav-menu">${navItems.map(({scroll, key}) => `<li><a href="#${scroll}" data-scroll="${scroll}">${t(key)}</a></li>`).join('')}</ul><div class="lang-switcher"><button class="lang-btn ${lang === 'pl' ? 'active' : ''}" data-lang="pl" title="Polski">🇵🇱</button><button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en" title="English">🇺🇸</button></div></nav>`
  document.body.insertAdjacentHTML('beforeend', '<div class="mobile-menu-overlay"></div>')
  header.querySelectorAll('.lang-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true)
    btn.replaceWith(newBtn)
    newBtn.addEventListener('click', () => setLang(newBtn.dataset.lang))
  })
  initMobileMenu()
}

const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger')
  const menu = document.querySelector('.nav-menu')
  const overlay = document.querySelector('.mobile-menu-overlay')
  const menuLinks = document.querySelectorAll('.nav-menu a')
  if (!hamburger || !menu || !overlay) {
    return
  }
  const toggleMenu = () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true'
    hamburger.setAttribute('aria-expanded', !isOpen)
    hamburger.classList.toggle('active')
    menu.classList.toggle('active')
    overlay.classList.toggle('active')
    document.body.style.overflow = !isOpen ? 'hidden' : ''
  }
  hamburger.addEventListener('click', toggleMenu)
  overlay.addEventListener('click', toggleMenu)
  menuLinks.forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu()
    }
  }))
}
export const renderFooter = () => {
  const footer = document.getElementById('footer')
  if (footer) {
    footer.innerHTML = `<div class="footer-content"><p>&copy; ${CURRENT_YEAR} ST KRATOS. ${t('footer')}</p></div>`
  }
}
export function renderLayout(container) {
  container.innerHTML = '<header id="header"></header><main id="content"><div style="padding: 2rem; text-align: center;"><p>Ładowanie...</p></div></main><footer id="footer"></footer>'
  renderHeader()
  renderFooter()
}
