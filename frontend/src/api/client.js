import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - można dodać tokeny, logowanie
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - obsługa błędów
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject({
        message: error.response.data?.error || error.message,
        status: error.response.status,
        data: error.response.data
      })
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'Brak połączenia z serwerem',
        status: 0,
        data: null
      })
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'Wystąpił nieoczekiwany błąd',
        status: 0,
        data: null
      })
    }
  }
)

export const generatePage = async (prompt, pageType = 'landing', title = 'ST KRAKOS') => {
  try {
    const response = await apiClient.post('/api/generate-page', {
      prompt,
      page_type: pageType,
      title
    })
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      error: error?.message || 'Błąd podczas generowania strony',
      status: error?.status || 0
    }
  }
}

export const generateContent = async (prompt) => {
  try {
    const response = await apiClient.post('/api/generate-content', { prompt })
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      error: error?.message || 'Błąd podczas generowania treści',
      status: error?.status || 0
    }
  }
}

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/api/health')
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      error: error?.message || 'Brak połączenia z backendem',
      status: error?.status || 0
    }
  }
}

export const getMetrics = async () => {
  try {
    const response = await apiClient.get('/api/metrics')
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      error: error?.message || 'Błąd podczas pobierania metryk',
      status: error?.status || 0
    }
  }
}

export default apiClient

