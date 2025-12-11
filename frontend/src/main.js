import {initRouter} from './router.js'
import {renderLayout} from './components/layout.js'
import {showError} from './utils/error.js'
import {initPuzzleLoader} from './utils/puzzleLoader.js'
import {initCookieConsent} from './components/CookieConsent.js'
import './utils/analytics.js'
import {initSecretCode} from './utils/statsModal.js'

window.addEventListener('error', (e) => {
  console.error('[Main] Error:', e.error)
  showError('Wystąpił nieoczekiwany błąd. Odśwież stronę jeśli problem się powtarza.')
})
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Main] Promise rejection:', e.reason)
  showError('Wystąpił błąd podczas wykonywania operacji.')
})

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (!app) return console.error('[Main] App container not found')
  initPuzzleLoader()
  setTimeout(() => {
    renderLayout(app)
    initRouter()
    initSecretCode()
    setTimeout(() => initCookieConsent(), 3000)
  }, 2900)
})
