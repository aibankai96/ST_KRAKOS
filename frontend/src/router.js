import { renderHome } from './pages/home.js'

export function initRouter() {
    const content = document.getElementById('content')
    if (!content) return console.error('Content container not found')
    renderHome(content)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-scroll]')
        if (link) {
            e.preventDefault()
            const sectionId = link.getAttribute('data-scroll')
            if (sectionId) { scrollToSection(sectionId); window.history.pushState({}, '', `#${sectionId}`) }
        }
    })
    if (window.location.hash) setTimeout(() => scrollToSection(window.location.hash.substring(1)), 100)
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
        window.scrollTo({ top: section.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
    }
}

