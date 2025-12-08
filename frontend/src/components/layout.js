import {t, getLang, setLang} from '../utils/i18n.js'
const CURRENT_YEAR = 2025
let mobileMenuInitialized = false
let toggleMenuHandler = null

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

  // Remove existing overlay if present (to avoid duplicates)
  const existingOverlay = document.querySelector('.mobile-menu-overlay')
  if (existingOverlay) {
    existingOverlay.remove()
  }
  document.body.insertAdjacentHTML('beforeend', '<div class="mobile-menu-overlay"></div>')

  header.querySelectorAll('.lang-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true)
    btn.replaceWith(newBtn)
    newBtn.addEventListener('click', () => setLang(newBtn.dataset.lang))
  })

  // Reset initialization flag and reinitialize
  mobileMenuInitialized = false
  initMobileMenu()
}

const initMobileMenu = () => {
  if (mobileMenuInitialized) {
    return
  }

  const hamburger = document.querySelector('.hamburger')
  const menu = document.querySelector('.nav-menu')
  const overlay = document.querySelector('.mobile-menu-overlay')

  if (!hamburger || !menu || !overlay) {
    console.warn('[Mobile Menu] Missing elements:', {hamburger: !!hamburger, menu: !!menu, overlay: !!overlay})
    return
  }

  // Remove old event listeners if any
  if (toggleMenuHandler) {
    hamburger.removeEventListener('click', toggleMenuHandler)
    overlay.removeEventListener('click', toggleMenuHandler)
  }

  toggleMenuHandler = () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true'
    const newState = !isOpen

    hamburger.setAttribute('aria-expanded', String(newState))
    hamburger.classList.toggle('active', newState)
    menu.classList.toggle('active', newState)
    overlay.classList.toggle('active', newState)
    document.body.style.overflow = newState ? 'hidden' : ''

    console.log('[Mobile Menu] Toggled:', {isOpen, newState})
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleMenuHandler()
  })

  overlay.addEventListener('click', (e) => {
    e.stopPropagation()
    if (overlay.classList.contains('active')) {
      toggleMenuHandler()
    }
  })

  const menuLinks = document.querySelectorAll('.nav-menu a')
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && hamburger.getAttribute('aria-expanded') === 'true') {
        toggleMenuHandler()
      }
    })
  })

  mobileMenuInitialized = true
  console.log('[Mobile Menu] Initialized successfully')
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
