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
  header.innerHTML = `<nav><div class="logo">ST KRATOS</div><button class="hamburger" aria-label="Menu mobilne" aria-expanded="false"><span></span><span></span><span></span></button><ul class="nav-menu">${navItems.map(({scroll, key}) => `<li><a href="#${scroll}" data-scroll="${scroll}">${t(key)}</a></li>`).join('')}</ul><div class="lang-switcher"><button class="lang-btn ${lang === 'pl' ? 'active' : ''}" data-lang="pl" title="Polski">🇵🇱</button><button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en" title="English">🇺🇸</button></div></nav>`

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

  // Only initialize on mobile devices
  if (window.innerWidth > 768 && !/mobile|iphone|ipad|android/i.test(navigator.userAgent)) {
    return // Skip on desktop
  }

  const hamburger = document.querySelector('.hamburger')
  const menu = document.querySelector('.nav-menu')
  const overlay = document.querySelector('.mobile-menu-overlay')

  if (!hamburger || !menu || !overlay) {
    console.warn('[Mobile Menu] Missing elements:', {hamburger: !!hamburger, menu: !!menu, overlay: !!overlay})
    // Retry after a short delay if elements not found
    setTimeout(() => {
      const retryHamburger = document.querySelector('.hamburger')
      const retryMenu = document.querySelector('.nav-menu')
      const retryOverlay = document.querySelector('.mobile-menu-overlay')
      if (retryHamburger && retryMenu && retryOverlay) {
        mobileMenuInitialized = false
        initMobileMenu()
      }
    }, 500)
    return
  }

  // Remove old event listeners if any
  const oldHamburgerHandler = hamburger.onclick
  const oldOverlayHandler = overlay.onclick
  if (oldHamburgerHandler) {
    hamburger.removeEventListener('click', oldHamburgerHandler)
  }
  if (oldOverlayHandler) {
    overlay.removeEventListener('click', oldOverlayHandler)
  }

  toggleMenuHandler = () => {
    try {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true'
      const newState = !isOpen

      hamburger.setAttribute('aria-expanded', String(newState))
      hamburger.classList.toggle('active', newState)
      menu.classList.toggle('active', newState)
      overlay.classList.toggle('active', newState)

      // Force menu position to left side
      if (newState) {
        menu.style.left = '0'
        menu.style.right = 'auto'
        menu.style.transform = 'none'
        menu.style.inset = 'auto auto auto 0'
      } else {
        menu.style.left = '-100%'
        menu.style.right = 'auto'
        menu.style.transform = 'none'
        menu.style.inset = 'auto auto auto -100%'
      }

      // Prevent body scroll when menu is open
      if (newState) {
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
      } else {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
      }

      console.log('[Mobile Menu] Toggled:', {isOpen, newState, menuLeft: menu.style.left})
    } catch (error) {
      console.error('[Mobile Menu] Error in toggleMenuHandler:', error)
    }
  }

  const hamburgerClickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      toggleMenuHandler()
    } catch (error) {
      console.error('[Mobile Menu] Error toggling menu:', error)
    }
  }

  const overlayClickHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (overlay.classList.contains('active')) {
        toggleMenuHandler()
      }
    } catch (error) {
      console.error('[Mobile Menu] Error closing menu:', error)
    }
  }

  hamburger.addEventListener('click', hamburgerClickHandler)
  overlay.addEventListener('click', overlayClickHandler)

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
