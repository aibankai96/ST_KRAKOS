import { renderHome } from './pages/home.js'
import { renderAbout } from './pages/about.js'
import { renderServices } from './pages/services.js'
import { renderContact } from './pages/contact.js'

const routes = {
    '/': renderHome,
    '/about': renderAbout,
    '/services': renderServices,
    '/contact': renderContact
}

export function initRouter() {
    console.log('Router initialized')
    window.addEventListener('popstate', handleRoute)
    handleRoute()
    
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-route]')
        if (link) {
            e.preventDefault()
            const path = link.getAttribute('data-route')
            navigate(path)
        }
    })
}

function handleRoute() {
    const path = window.location.pathname
    console.log('Handling route:', path)
    const render = routes[path] || routes['/']
    const content = document.getElementById('content')
    
    if (!content) {
        console.error('Content container not found in handleRoute')
        return
    }
    
    if (!render) {
        console.error('No render function found for path:', path)
        return
    }
    
    console.log('Rendering page for path:', path)
    try {
        render(content)
        console.log('Page rendered successfully')
    } catch (error) {
        console.error('Error rendering route:', error)
    }
}

function navigate(path) {
    window.history.pushState({}, '', path)
    handleRoute()
}

