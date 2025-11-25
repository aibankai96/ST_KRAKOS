import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export async function generatePage(prompt, pageType = 'landing') {
    try {
        const response = await api.post('/generate-page', {
            prompt,
            page_type: pageType,
            title: 'ST KRAKOS'
        })
        return response.data
    } catch (error) {
        console.error('Error generating page:', error)
        throw error
    }
}

export async function generateContent(prompt) {
    try {
        const response = await api.post('/generate-content', { prompt })
        return response.data
    } catch (error) {
        console.error('Error generating content:', error)
        throw error
    }
}

export async function checkHealth() {
    try {
        const response = await api.get('/health')
        return response.data
    } catch (error) {
        console.error('Health check failed:', error)
        throw error
    }
}

