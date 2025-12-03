// Error utility - pokazuje/ukrywa komunikaty błędów
import {hideOverlay} from './overlay.js'

let errorToast = null
const setErrorToast = (val) => {
  errorToast = val
}

/**
 * Pokazuje toast z komunikatem błędu
 * @param {string} message - Wiadomość błędu do wyświetlenia
 * @param {number} duration - Czas wyświetlania w ms (domyślnie 5000ms, 0 = bez auto-dismiss)
 */
export function showError(message, duration = 5000) {
  hideError()
  errorToast = document.createElement('div')
  errorToast.className = 'error-toast'
  errorToast.textContent = message
  document.body.appendChild(errorToast)
  requestAnimationFrame(() => errorToast.classList.add('show'))
  if (duration > 0) {
    setTimeout(() => hideError(), duration)
  }
  return () => hideError()
}

/**
 * Ukrywa toast z komunikatem błędu
 */
export function hideError() {
  hideOverlay(errorToast, setErrorToast)
}

