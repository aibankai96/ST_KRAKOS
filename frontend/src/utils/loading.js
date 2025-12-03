// Loading utility - pokazuje/ukrywa wskaźnik ładowania
import {hideOverlay} from './overlay.js'

let loadingOverlay = null
const setLoadingOverlay = (val) => {
  loadingOverlay = val
}

/**
 * Pokazuje overlay z wskaźnikiem ładowania
 * @param {string} message - Opcjonalna wiadomość do wyświetlenia
 */
export function showLoading(message = 'Ładowanie...') {
  hideLoading()
  loadingOverlay = document.createElement('div')
  loadingOverlay.className = 'loading-overlay'
  loadingOverlay.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>${message}</p></div>`
  document.body.appendChild(loadingOverlay)
  requestAnimationFrame(() => loadingOverlay.classList.add('show'))
}

/**
 * Ukrywa overlay z wskaźnikiem ładowania
 */
export function hideLoading() {
  hideOverlay(loadingOverlay, setLoadingOverlay)
}

