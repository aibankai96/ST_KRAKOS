// Overlay utility - wspólna funkcja pomocnicza dla hideError i hideLoading

/**
 * Ukrywa overlay z opóźnieniem (wspólna funkcja dla error i loading)
 * @param {HTMLElement} element - Element do ukrycia
 * @param {Function} setter - Funkcja ustawiająca element na null
 */
export function hideOverlay(element, setter) {
  if (element) {
    element.classList.remove('show')
    setTimeout(() => {
      if (element?.parentNode) {
        element.remove()
      }
      setter(null)
    }, 300)
  }
}

