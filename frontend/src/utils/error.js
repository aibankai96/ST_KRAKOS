// Error utility - pokazuje/ukrywa komunikaty błędów

let errorToast = null

/**
 * Pokazuje toast z komunikatem błędu
 * @param {string} message - Wiadomość błędu do wyświetlenia
 * @param {number} duration - Czas wyświetlania w ms (domyślnie 5000ms, 0 = bez auto-dismiss)
 */
export function showError(message, duration = 5000) {
  // Ukryj poprzedni error jeśli istnieje
  hideError()
  
  errorToast = document.createElement('div')
  errorToast.className = 'error-toast'
  errorToast.textContent = message
  
  document.body.appendChild(errorToast)
  
  // Pokaż z animacją
  requestAnimationFrame(() => {
    errorToast.classList.add('show')
  })
  
  // Auto-dismiss
  if (duration > 0) {
    setTimeout(() => {
      hideError()
    }, duration)
  }
  
  // Zwróć funkcję do manualnego ukrycia
  return () => hideError()
}

/**
 * Ukrywa toast z komunikatem błędu
 */
export function hideError() {
  if (errorToast) {
    errorToast.classList.remove('show')
    setTimeout(() => {
      if (errorToast && errorToast.parentNode) {
        errorToast.remove()
      }
      errorToast = null
    }, 300) // Czas animacji znikania
  }
}

