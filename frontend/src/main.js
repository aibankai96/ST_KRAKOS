import { initRouter } from './router.js'
import { renderLayout } from './components/layout.js'

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app')
    renderLayout(app)
    setTimeout(() => initRouter(), 100)
})

