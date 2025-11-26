export function renderLayout(container) {
    container.innerHTML = `
        <header id="header"></header>
        <main id="content">
            <div style="padding: 2rem; text-align: center;">
                <p>Ładowanie...</p>
            </div>
        </main>
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
                    <li><a href="/contact" data-route="/contact">Kontakt</a></li>
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

