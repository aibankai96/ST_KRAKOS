import {renderHome} from './pages/home.js'
const SCROLL_OFFSET = 80
const HASH_DELAY = 100
export const scrollToSection = (sectionId) => {
  try {
    const section = document.getElementById(sectionId)
    if (!section) {
      console.warn('[Router] Section not found for scrolling:', sectionId)
      return
    }
    const rect = section.getBoundingClientRect()
    const scrollTop = rect.top + window.pageYOffset - SCROLL_OFFSET
    window.scrollTo({top: Math.max(0, scrollTop), behavior: 'smooth'})
  } catch (error) {
    console.error('[Router] Error scrolling to section:', sectionId, error)
  }
}
import {renderPrivacy} from './pages/privacy.js'
import {showError} from './utils/error.js'

export function initRouter() {
  const content = document.getElementById('content')
  if (!content) {
    return console.error('Content container not found')
  }

  // Handle route changes
  function handleRouteChange() {
    try {
      const route = window.location.hash.slice(1) || 'home'
      if (route === 'home' || route === '') {
        renderHome(content)
      } else if (route === 'privacy-policy' || route === 'polityka-prywatnosci') {
        renderPrivacy(content)
      } else {
        // For section routes (like ai-stats, about, services, etc.), render home first
        // Then scroll to the section after a delay to ensure DOM is ready
        const section = document.getElementById(route)
        if (!section) {
          // Section doesn't exist - render home first, then try to scroll
          renderHome(content)
          setTimeout(() => {
            const sectionAfterRender = document.getElementById(route)
            if (sectionAfterRender) {
              scrollToSection(route)
            } else {
              console.warn('[Router] Section not found after rendering home:', route)
              showError(`Strona "${route}" nie została znaleziona.`)
            }
          }, HASH_DELAY + 100) // Extra delay to ensure renderHome completed
        } else {
          // Section exists - just scroll
          setTimeout(() => {
            scrollToSection(route)
          }, HASH_DELAY)
        }
      }
    } catch (error) {
      console.error('[Router] Error in handleRouteChange:', error)
    }
  }

  // Initial route handling
  handleRouteChange()

  // Handle navigation clicks (sections)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-scroll], button[data-scroll]')
    if (!link) {
      return
    }
    e.preventDefault()
    const sectionId = link.getAttribute('data-scroll')
    if (sectionId) {
      // Ensure home is rendered if navigating to a section
      if (sectionId !== 'home' && sectionId !== '') {
        const section = document.getElementById(sectionId)
        if (!section) {
          // Section doesn't exist - render home first
          renderHome(content)
          setTimeout(() => {
            scrollToSection(sectionId)
            window.history.pushState({}, '', `#${sectionId}`)
          }, HASH_DELAY + 100)
        } else {
          // Section exists - just scroll
          scrollToSection(sectionId)
          window.history.pushState({}, '', `#${sectionId}`)
        }
      } else {
        // Navigating to home
        window.location.hash = ''
        handleRouteChange()
      }
    }
  })

  // Handle privacy policy links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="privacy"], a[href*="polityka"]')
    if (link) {
      e.preventDefault()
      const href = link.getAttribute('href')
      if (href.includes('privacy') || href.includes('polityka')) {
        const route = href.startsWith('#') ? href.slice(1) : href.split('#')[1] || 'privacy-policy'
        window.location.hash = route
        handleRouteChange()
      }
    }
  })

  // Handle hash changes (browser back/forward)
  window.addEventListener('hashchange', handleRouteChange)
}
