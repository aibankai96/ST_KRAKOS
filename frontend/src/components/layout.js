export function renderLayout(container) {
    container.innerHTML = `
        <header id="header"></header>
        <main id="content"></main>
        <footer id="footer"></footer>
    `
    renderHeader()
    renderFooter()
}

function renderHeader() {
    const header = document.getElementById('header')
    if (header) {
        header.innerHTML = `
            <nav>
                <div class="logo">ST KRAKOS</div>
                <ul>
                    <li><a href="/" data-route="/">Strona Główna</a></li>
                    <li><a href="/about" data-route="/about">O nas</a></li>
                    <li><a href="/services" data-route="/services">Usługi</a></li>
                    <li><a href="/blog" data-route="/blog">Blog</a></li>
                    <li><a href="/contact" data-route="/contact">Kontakt</a></li>
                    <li><a href="/admin" data-route="/admin">🤖 Generator AI</a></li>
                    <li><a href="/cms" data-route="/cms">📝 CMS</a></li>
                </ul>
            </nav>
        `
    }
}

function renderFooter() {
    const footer = document.getElementById('footer')
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content">
                <p>&copy; 2025 ST KRAKOS. Wszystkie prawa zastrzeżone.</p>
            </div>
        `
    }
}

