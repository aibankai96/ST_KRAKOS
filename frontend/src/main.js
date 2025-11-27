import { initRouter } from './router.js'
import { renderLayout } from './components/layout.js'
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app')
    if (!app) return console.error('App container not found')
    renderLayout(app)
    initRouter()
})
