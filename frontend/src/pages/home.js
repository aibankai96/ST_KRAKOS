import { updateSEO, addStructuredData } from '../utils/seo.js'

export async function renderHome(container) {
    updateSEO(
        'ST KRAKOS - Innowacyjne rozwiązania AI',
        'ST KRAKOS oferuje zaawansowane rozwiązania z wykorzystaniem sztucznej inteligencji. Generowanie stron, automatyzacja procesów i analiza danych.',
        'AI, sztuczna inteligencja, automatyzacja, generowanie stron, ST KRAKOS'
    )
    
    addStructuredData({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ST KRAKOS',
        description: 'Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji',
        url: window.location.origin
    })
    container.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <h1>Przyszłość Biznesu w Sztucznej Inteligencji</h1>
                <p class="hero-subtitle">ST KRAKOS - Twój partner w transformacji cyfrowej. Wykorzystujemy zaawansowane technologie AI, aby automatyzować procesy, optymalizować operacje i tworzyć inteligentne rozwiązania dla Twojej firmy.</p>
                <div class="hero-buttons">
                    <button class="cta-button primary" data-route="/services">Poznaj nasze rozwiązania</button>
                    <button class="cta-button secondary" data-route="/contact">Bezpłatna konsultacja</button>
                </div>
            </div>
        </section>
        
        <section class="about-preview">
            <div class="container">
                <h2>Dlaczego Sztuczna Inteligencja?</h2>
                <p class="about-text" id="about-text">W erze cyfrowej transformacji, sztuczna inteligencja nie jest już opcją - to konieczność. ST KRAKOS pomaga firmom wykorzystać pełny potencjał AI poprzez inteligentną automatyzację, analizę danych i personalizowane rozwiązania, które zwiększają efektywność, redukują koszty i przyspieszają rozwój biznesu.</p>
            </div>
        </section>
        
        <section class="services">
            <div class="container">
                <h2>Nasze usługi</h2>
                <div class="services-grid" id="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🤖</div>
                        <h3>Inteligentna Automatyzacja</h3>
                        <p>Automatyzujemy powtarzalne procesy biznesowe przy użyciu zaawansowanych algorytmów AI, oszczędzając czas i zasoby Twojej firmy.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🧠</div>
                        <h3>Machine Learning & Deep Learning</h3>
                        <p>Budujemy modele uczenia maszynowego dostosowane do Twoich potrzeb, które uczą się i poprawiają z każdym użyciem.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">📊</div>
                        <h3>Analiza Danych z AI</h3>
                        <p>Przetwarzamy ogromne ilości danych w czasie rzeczywistym, generując wartościowe insights wspierające strategiczne decyzje.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">💬</div>
                        <h3>Chatboty i Asystenci AI</h3>
                        <p>Tworzymy inteligentne asystenty wirtualne, które obsługują klientów 24/7, odpowiadają na pytania i automatyzują obsługę.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🔮</div>
                        <h3>Predykcyjna Analityka</h3>
                        <p>Wykorzystujemy AI do przewidywania trendów, zachowań klientów i optymalizacji przyszłych działań biznesowych.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🎯</div>
                        <h3>Personalizacja i Rekomendacje</h3>
                        <p>Implementujemy systemy rekomendacji oparte na AI, które personalizują doświadczenia użytkowników i zwiększają konwersje.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="portfolio">
            <div class="container">
                <h2>Technologie, które wykorzystujemy</h2>
                <div class="portfolio-grid">
                    <div class="portfolio-item">
                        <div class="portfolio-image">⚡</div>
                        <h3>Natural Language Processing</h3>
                        <p>Przetwarzanie języka naturalnego do analizy tekstu, sentymentu i automatycznej klasyfikacji treści</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">🔍</div>
                        <h3>Computer Vision</h3>
                        <p>Rozpoznawanie obrazów i analiza wizualna dla automatyzacji procesów opartych na dokumentach</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">🌐</div>
                        <h3>AI-Powered Web Solutions</h3>
                        <p>Inteligentne aplikacje webowe z integracją AI, które adaptują się do potrzeb użytkowników</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="contact-preview">
            <div class="container">
                <h2>Rozpocznij Transformację z AI</h2>
                <p>Umów się na bezpłatną konsultację i odkryj, jak sztuczna inteligencja może zrewolucjonizować Twój biznes</p>
                <button class="cta-button primary" data-route="/contact">Bezpłatna Konsultacja</button>
            </div>
        </section>
    `
    
    setupNavigation()
}

function setupNavigation() {
    document.querySelectorAll('button[data-route]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const route = e.target.getAttribute('data-route')
            if (route) {
                window.history.pushState({}, '', route)
                window.dispatchEvent(new PopStateEvent('popstate'))
            }
        })
    })
}
