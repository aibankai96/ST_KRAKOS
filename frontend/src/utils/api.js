// API Client - warstwa abstrakcji dla komunikacji z backendem
import {showLoading, hideLoading} from './loading.js'
import {showError} from './error.js'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Wykonuje request do API
 * @param {string} endpoint - Endpoint API (bez /api)
 * @param {object} options - Opcje fetch (method, body, headers)
 * @returns {Promise} Promise z odpowiedzią JSON
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }
  
  // Konwersja body do JSON jeśli to obiekt
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }
  
  try {
    // Timeout 30 sekund
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({error: 'Unknown error'}))
      throw new Error(error.error || `HTTP ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - server did not respond in time (30s limit)')
    }
    throw error
  }
}

/**
 * API Client - funkcje do komunikacji z backendem
 */
export const api = {
  /**
   * Generuje stronę przez AI
   * @param {string} prompt - Prompt dla AI
   * @param {string} pageType - Typ strony (landing, about, product, blog, contact)
   * @param {string} title - Tytuł strony
   * @returns {Promise} Promise z wygenerowaną stroną
   */
  async generatePage(prompt, pageType = 'landing', title = 'ST KRAKOS') {
    showLoading('Generowanie strony...')
    try {
      const result = await request('/generate-page', {
        method: 'POST',
        body: {prompt, page_type: pageType, title},
      })
      return result
    } catch (error) {
      showError(error.message || 'Błąd podczas generowania strony')
      throw error
    } finally {
      hideLoading()
    }
  },
  
  /**
   * Generuje treść przez AI
   * @param {string} prompt - Prompt dla AI
   * @returns {Promise} Promise z wygenerowaną treścią
   */
  async generateContent(prompt) {
    showLoading('Generowanie treści...')
    try {
      const result = await request('/generate-content', {
        method: 'POST',
        body: {prompt},
      })
      return result
    } catch (error) {
      showError(error.message || 'Błąd podczas generowania treści')
      throw error
    } finally {
      hideLoading()
    }
  },
  
  /**
   * Sprawdza status API (health check)
   * @returns {Promise} Promise z statusem API
   */
  async health() {
    try {
      return await request('/health')
    } catch (error) {
      // Health check nie pokazuje error toast (może być wywołany w tle)
      throw error
    }
  },
  
  /**
   * Pobiera metryki API
   * @returns {Promise} Promise z metrykami
   */
  async metrics() {
    try {
      return await request('/metrics')
    } catch (error) {
      showError(error.message || 'Błąd podczas pobierania metryk')
      throw error
    }
  },
}

