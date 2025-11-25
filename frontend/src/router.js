import { renderHome } from './pages/home.js'
import { renderAbout } from './pages/about.js'
import { renderServices } from './pages/services.js'
import { renderContact } from './pages/contact.js'
import { renderAdmin } from './pages/admin.js'
import { renderBlog } from './pages/blog.js'
import { renderCMS } from './pages/cms.js'

const routes = {
    '/': renderHome,
    '/about': renderAbout,
    '/services': renderServices,
    '/contact': renderContact,
    '/admin': renderAdmin,
    '/blog': renderBlog,
    '/cms': renderCMS
}

export function initRouter() {
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
    const render = routes[path] || routes['/']
    const content = document.getElementById('content')
    if (content) {
        render(content)
    }
}

function navigate(path) {
    window.history.pushState({}, '', path)
    handleRoute()
}

