import { initRouter } from './router.js'
import { renderLayout } from './components/layout.js'

console.log('main.js loaded')

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired')
    const app = document.getElementById('app')
    if (!app) {
        console.error('App container not found')
        return
    }
    
    console.log('Rendering layout...')
    renderLayout(app)
    
    // Upewniamy się, że element #content istnieje przed inicjalizacją routera
    const checkContent = setInterval(() => {
        const content = document.getElementById('content')
        if (content) {
            console.log('Content found, initializing router...')
            clearInterval(checkContent)
            initRouter()
        }
    }, 10)
    
    // Timeout bezpieczeństwa
    setTimeout(() => {
        clearInterval(checkContent)
        const content = document.getElementById('content')
        if (content) {
            console.log('Initializing router after timeout...')
            initRouter()
        } else {
            console.error('Content container not found after timeout')
        }
    }, 1000)
})

