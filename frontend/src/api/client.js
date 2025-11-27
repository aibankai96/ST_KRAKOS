import axios from 'axios'

const api = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } })

const apiCall = async (method, endpoint, data) => {
    try {
        const response = await api[method](endpoint, data)
        return response.data
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error)
        throw error
    }
}

export const generatePage = (prompt, pageType = 'landing') => 
    apiCall('post', '/generate-page', { prompt, page_type: pageType, title: 'ST KRAKOS' })
export const generateContent = (prompt) => apiCall('post', '/generate-content', { prompt })
export const checkHealth = () => apiCall('get', '/health')

