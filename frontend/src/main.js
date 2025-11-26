import { initRouter } from './router.js'
import { renderLayout } from './components/layout.js'

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app')
    if (!app) return console.error('App container not found')
    renderLayout(app)
    const checkContent = setInterval(() => {
        const content = document.getElementById('content')
        if (content) { clearInterval(checkContent); initRouter() }
    }, 10)
    setTimeout(() => { clearInterval(checkContent); document.getElementById('content') && initRouter() }, 1000)
})

