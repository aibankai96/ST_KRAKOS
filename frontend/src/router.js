import { renderHome } from './pages/home.js'

export const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return
    window.scrollTo({ top: section.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

export function initRouter() {
    const content = document.getElementById('content')
    if (!content) return console.error('Content container not found')
    renderHome(content)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-scroll], button[data-scroll]')
        if (!link) return
        e.preventDefault()
        const sectionId = link.getAttribute('data-scroll')
        if (sectionId) { scrollToSection(sectionId); window.history.pushState({}, '', `#${sectionId}`) }
    })
    if (window.location.hash) setTimeout(() => scrollToSection(window.location.hash.slice(1)), 100)
}

