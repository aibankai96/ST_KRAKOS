import {renderHome} from './pages/home.js'
import {renderPrivacy} from './pages/privacy.js'
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
import {showError} from './utils/error.js'

export function initRouter() {
  const content = document.getElementById('content')
  if (!content) {
    setTimeout(() => document.getElementById('content') && initRouter(), 500)
    return
  }

  function handleRouteChange() {
    window.handleRouteChange = handleRouteChange
    try {
      const route = window.location.hash.slice(1) || 'home'
      const isPrivacyRoute = route === 'privacy-policy' || route === 'polityka-prywatnosci'
      if (isPrivacyRoute && content?.querySelector('.privacy-page')) return
      
      if (route === 'home' || route === '') {
        // Only render home if NOT privacy page
        const hasPrivacyPage = content.querySelector('.privacy-page')
        if (!hasPrivacyPage) {
          renderHome(content)
        }
      } else if (isPrivacyRoute) {
        if (content) renderPrivacy(content)
      } else {
        // For section routes (like ai-stats, about, services, etc.), render home first
        // Then scroll to the section after a delay to ensure DOM is ready
        const section = document.getElementById(route)
        if (!section) {
          // Section doesn't exist - render home first, then try to scroll
          const hasPrivacyPage = content.querySelector('.privacy-page')
          if (!hasPrivacyPage) {
            renderHome(content)
            setTimeout(() => {
              const sectionAfterRender = document.getElementById(route)
              if (sectionAfterRender) {
                scrollToSection(route)
              } else {
                console.warn('[Router] Section not found:', route)
                showError(`Strona "${route}" nie została znaleziona.`)
              }
            }, HASH_DELAY + 100)
          }
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

  setTimeout(() => {
    const contentContainer = document.getElementById('content')
    const initialHash = window.location.hash
    if (!contentContainer) {
      setTimeout(() => {
        const retry = document.getElementById('content')
        if (retry && (initialHash === '#privacy-policy' || initialHash === '#polityka-prywatnosci')) renderPrivacy(retry)
      }, 200)
      return
    }
    if (initialHash === '#privacy-policy' || initialHash === '#polityka-prywatnosci') {
      renderPrivacy(contentContainer)
      return
    }
    handleRouteChange()
  }, 150)

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
          const hasPrivacyPage = content.querySelector('.privacy-page')
          if (!hasPrivacyPage) {
            renderHome(content)
          }
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

  // Handle privacy links - simple delegation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="privacy"], a[href*="polityka"]')
    if (!link) return
    
    const href = link.getAttribute('href')
    if (href && (href.includes('#privacy-policy') || href.includes('#polityka-prywatnosci'))) {
      // Let browser handle hash navigation, router will catch it via hashchange
      // No need to prevent default or manually render
    }
  })

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash
    const isPrivacyHash = hash === '#privacy-policy' || hash === '#polityka-prywatnosci'
    const contentContainer = document.getElementById('content')
    if (!contentContainer) return
    const hasPrivacyPage = contentContainer.querySelector('.privacy-page')
    if (isPrivacyHash && hasPrivacyPage) return
    if (isPrivacyHash && !hasPrivacyPage) {
      renderPrivacy(contentContainer)
      return
    }
    handleRouteChange()
  })
}
