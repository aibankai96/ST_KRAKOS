// Loading utility - pokazuje/ukrywa wskaźnik ładowania

let loadingOverlay = null

/**
 * Pokazuje overlay z wskaźnikiem ładowania
 * @param {string} message - Opcjonalna wiadomość do wyświetlenia
 */
export function showLoading(message = 'Ładowanie...') {
  // Ukryj poprzedni loading jeśli istnieje
  hideLoading()
  
  loadingOverlay = document.createElement('div')
  loadingOverlay.className = 'loading-overlay'
  loadingOverlay.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `
  
  document.body.appendChild(loadingOverlay)
  
  // Animacja pojawienia się
  requestAnimationFrame(() => {
    loadingOverlay.classList.add('show')
  })
}

/**
 * Ukrywa overlay z wskaźnikiem ładowania
 */
export function hideLoading() {
  if (loadingOverlay) {
    loadingOverlay.classList.remove('show')
    setTimeout(() => {
      if (loadingOverlay && loadingOverlay.parentNode) {
        loadingOverlay.remove()
      }
      loadingOverlay = null
    }, 300) // Czas animacji znikania
  }
}

