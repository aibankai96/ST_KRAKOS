import {initRouter} from './router.js'
import {renderLayout} from './components/layout.js'
import {showError} from './utils/error.js'
import {initPuzzleLoader} from './utils/puzzleLoader.js'

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  showError('Wystąpił nieoczekiwany błąd. Odśwież stronę jeśli problem się powtarza.')
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  showError('Wystąpił błąd podczas wykonywania operacji.')
})

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (!app) {
    return console.error('App container not found')
  }

  initPuzzleLoader()

  setTimeout(() => {
    renderLayout(app)
    initRouter()
  }, 2900)
})
