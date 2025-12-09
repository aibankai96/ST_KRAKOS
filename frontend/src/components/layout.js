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
  header.innerHTML = `<nav>
    <div class="logo">ST KRATOS</div>
    <ul class="nav-menu desktop-menu">${navItems.map(({scroll, key}) => `<li><a href="#${scroll}" data-scroll="${scroll}">${t(key)}</a></li>`).join('')}</ul>
    <div class="nav-right">
      <div class="lang-switcher">
        <button class="lang-btn ${lang === 'pl' ? 'active' : ''}" data-lang="pl" title="Polski">🇵🇱</button>
        <button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en" title="English">🇺🇸</button>
      </div>
      <button class="hamburger" aria-label="Menu mobilne" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`

  // Create mobile menu OUTSIDE nav (to avoid flexbox layout issues)
  const existingMobileMenu = document.querySelector('.mobile-menu')
  if (existingMobileMenu) {
    existingMobileMenu.remove()
  }
  document.body.insertAdjacentHTML('beforeend', `<ul class="nav-menu mobile-menu">${navItems.map(({scroll, key}) => `<li><a href="#${scroll}" data-scroll="${scroll}">${t(key)}</a></li>`).join('')}</ul>`)

  // Create overlay for mobile menu
  const existingOverlay = document.querySelector('.mobile-menu-overlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }
  document.body.insertAdjacentHTML('beforeend', '<div class="mobile-menu-overlay"></div>')

  // Setup language switcher
  header.querySelectorAll('.lang-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true)
    btn.replaceWith(newBtn)
    newBtn.addEventListener('click', () => setLang(newBtn.dataset.lang))
  })

  // Initialize mobile menu
  initMobileMenu()
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger')
  const menu = document.querySelector('.mobile-menu') // Mobile menu poza nav
  const overlay = document.querySelector('.mobile-menu-overlay')

  if (!hamburger || !menu || !overlay) {
    return
  }

  // Toggle menu function
  function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true'
    const newState = !isOpen

    hamburger.setAttribute('aria-expanded', String(newState))
    hamburger.classList.toggle('active', newState)
    menu.classList.toggle('active', newState)
    overlay.classList.toggle('active', newState)

    // Prevent body scroll
    if (newState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  // Event listeners
  hamburger.addEventListener('click', (e) => {
    e.preventDefault()
    toggleMenu()
  })

  overlay.addEventListener('click', (e) => {
    e.preventDefault()
    if (overlay.classList.contains('active')) {
      toggleMenu()
    }
  })

  // Close menu when clicking links
  const menuLinks = document.querySelectorAll('.mobile-menu a')
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && hamburger.getAttribute('aria-expanded') === 'true') {
        toggleMenu()
      }
    })
  })
}
export const renderFooter = () => {
  const footer = document.getElementById('footer')
  if (footer) {
    const lang = getLang()
    const privacyLink = lang === 'pl' ? '#polityka-prywatnosci' : '#privacy-policy'
    const privacyText = lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'
    footer.innerHTML = `<div class="footer-content"><p>&copy; ${CURRENT_YEAR} ST KRATOS. ${t('footer')}</p><p class="footer-links"><a href="${privacyLink}">${privacyText}</a></p></div>`
  }
}
export function renderLayout(container) {
  container.innerHTML = '<header id="header"></header><main id="content"><div style="padding: 2rem; text-align: center;"><p>Ładowanie...</p></div></main><footer id="footer"></footer>'
  renderHeader()
  renderFooter()
}
