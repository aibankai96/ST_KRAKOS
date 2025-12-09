// Cookie Consent Banner Component
import {t, getLang} from '../utils/i18n.js'
import {ConsentManager} from '../utils/consent.js'

let consentBannerShown = false

/**
 * Tworzy i wyświetla banner zgody na cookies
 */
export function initCookieConsent() {
  // Nie pokazuj jeśli już pokazano lub użytkownik już wyraził/odrzucił zgodę
  if (consentBannerShown || ConsentManager.hasBeenAsked()) {
    return
  }

  // Pokaż na wszystkich urządzeniach (również mobile)
  // Użytkownik musi wyrazić zgodę na wszystkich urządzeniach

  const banner = createConsentBanner()
  document.body.appendChild(banner)
  consentBannerShown = true

  // Pokaż banner z animacją
  setTimeout(() => {
    banner.classList.add('show')
  }, 100)
}

/**
 * Tworzy HTML bannera zgody
 */
function createConsentBanner() {
  const banner = document.createElement('div')
  banner.className = 'cookie-consent-banner'
  banner.setAttribute('role', 'dialog')
  banner.setAttribute('aria-label', 'Zgoda na cookies')
  banner.setAttribute('aria-live', 'polite')

  const lang = getLang()
  const privacyLink = lang === 'pl' ? '#polityka-prywatnosci' : '#privacy-policy'

  banner.innerHTML = `
    <div class="cookie-consent-content">
      <div class="cookie-consent-text">
        <h3>🍪 ${t('consent.title') || 'Pliki cookie i podobne technologie'}</h3>
        <p>${t('consent.message') || 'Ta strona używa plików cookie i technologii lokalnego przechowywania, aby zapamiętać Twoje preferencje i zbierać anonimowe statystyki użycia strony. Klikając "Akceptuj", wyrażasz zgodę na używanie tych technologii. Możesz zmienić ustawienia w dowolnym momencie.'}</p>
        <p class="cookie-consent-link">
          <a href="${privacyLink}">${t('consent.privacyLink') || 'Dowiedz się więcej w Polityce Prywatności'}</a>
        </p>
      </div>
      <div class="cookie-consent-buttons">
        <button class="cookie-consent-btn reject" aria-label="${t('consent.reject') || 'Odrzuć'}">
          ${t('consent.reject') || 'Odrzuć'}
        </button>
        <button class="cookie-consent-btn accept" aria-label="${t('consent.accept') || 'Akceptuj'}">
          ${t('consent.accept') || 'Akceptuj wszystkie'}
        </button>
      </div>
    </div>
  `

  // Event listeners
  const acceptBtn = banner.querySelector('.cookie-consent-btn.accept')
  const rejectBtn = banner.querySelector('.cookie-consent-btn.reject')

  acceptBtn.addEventListener('click', () => {
    handleConsent(true)
    hideBanner(banner)
  })

  rejectBtn.addEventListener('click', () => {
    handleConsent(false)
    hideBanner(banner)
  })

  return banner
}

/**
 * Obsługuje zgodę użytkownika
 */
function handleConsent(accepted) {
  ConsentManager.saveConsent({
    analytics: accepted,
    necessary: true
  })

  // Jeśli użytkownik zaakceptował - można rozpocząć tracking
  // Jeśli odrzucił - analytics nie będzie trackować
  if (accepted) {
    // Analytics automatycznie sprawdzi zgodę przed trackingiem
    console.log('[Consent] Analytics consent granted')
  } else {
    console.log('[Consent] Analytics consent rejected')
  }
}

/**
 * Ukrywa banner z animacją
 */
function hideBanner(banner) {
  banner.classList.remove('show')
  setTimeout(() => {
    banner.remove()
    consentBannerShown = false
  }, 300)
}

/**
 * Pokaż banner ponownie (jeśli użytkownik chce zmienić ustawienia)
 */
export function showConsentBanner() {
  if (consentBannerShown) {
    return
  }
  initCookieConsent()
}

