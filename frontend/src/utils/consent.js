// Consent Management - Zarządzanie zgodą na cookies/localStorage
const CONSENT_KEY = 'st_kratos_consent'
const CONSENT_VERSION = '1.0'

export const ConsentManager = {
  /**
   * Sprawdza czy użytkownik wyraził zgodę
   * @returns {Object|null} Obiekt z zgodą lub null
   */
  getConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Sprawdź czy zgoda jest aktualna (ta sama wersja)
        if (parsed.version === CONSENT_VERSION) {
          return parsed
        }
      }
    } catch (error) {
      console.error('[Consent] Error reading consent:', error)
    }
    return null
  },

  /**
   * Zapisuje zgodę użytkownika
   * @param {Object} consent - Obiekt z zgodą
   */
  saveConsent(consent) {
    try {
      const consentData = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        analytics: consent.analytics || false,
        necessary: true // Zawsze true - potrzebne do działania strony
      }
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData))
    } catch (error) {
      console.error('[Consent] Error saving consent:', error)
    }
  },

  /**
   * Sprawdza czy użytkownik wyraził zgodę na analytics
   * @returns {boolean}
   */
  hasAnalyticsConsent() {
    const consent = this.getConsent()
    return consent ? consent.analytics === true : false
  },

  /**
   * Usuwa zgodę (po cofnięciu)
   */
  revokeConsent() {
    try {
      localStorage.removeItem(CONSENT_KEY)
      // Usuń również dane analytics jeśli użytkownik cofnął zgodę
      localStorage.removeItem('st_kratos_analytics')
    } catch (error) {
      console.error('[Consent] Error revoking consent:', error)
    }
  },

  /**
   * Sprawdza czy zgoda została już zapytana
   * @returns {boolean}
   */
  hasBeenAsked() {
    return this.getConsent() !== null
  }
}

