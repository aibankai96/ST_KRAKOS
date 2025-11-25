import { generateContent } from '../api/client.js'
import { updateSEO, addStructuredData } from '../utils/seo.js'
import { addSocialShareButtons } from '../utils/social.js'

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
                <h1>Witamy w ST KRAKOS</h1>
                <p class="hero-subtitle">Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji</p>
                <div class="hero-buttons">
                    <button class="cta-button primary" data-route="/services">Nasze usługi</button>
                    <button class="cta-button secondary" data-route="/contact">Skontaktuj się</button>
                </div>
                <button class="ai-generate-btn" id="generate-hero">✨ Wygeneruj treść przez AI</button>
            </div>
        </section>
        
        <section class="about-preview">
            <div class="container">
                <h2>O ST KRAKOS</h2>
                <p class="about-text" id="about-text">ST KRAKOS to firma specjalizująca się w tworzeniu innowacyjnych rozwiązań z wykorzystaniem sztucznej inteligencji. Oferujemy kompleksowe usługi w zakresie automatyzacji procesów biznesowych, tworzenia inteligentnych aplikacji oraz generowania treści i stron internetowych.</p>
                <button class="ai-generate-btn" id="generate-about">✨ Wygeneruj opis przez AI</button>
            </div>
        </section>
        
        <section class="services">
            <div class="container">
                <h2>Nasze usługi</h2>
                <div class="services-grid" id="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🌐</div>
                        <h3>Generowanie Stron WWW</h3>
                        <p>Tworzenie profesjonalnych stron internetowych z wykorzystaniem AI. Szybko, efektywnie i zgodnie z Twoimi potrzebami.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">⚙️</div>
                        <h3>Automatyzacja Procesów</h3>
                        <p>Optymalizacja i automatyzacja procesów biznesowych przy użyciu zaawansowanych rozwiązań AI.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🤖</div>
                        <h3>Rozwiązania AI</h3>
                        <p>Zaawansowane rozwiązania oparte na sztucznej inteligencji dostosowane do potrzeb Twojej firmy.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">📊</div>
                        <h3>Analiza Danych</h3>
                        <p>Inteligentna analiza danych i generowanie raportów wspierających decyzje biznesowe.</p>
                    </div>
                </div>
                <button class="ai-generate-btn" id="generate-services">✨ Wygeneruj usługi przez AI</button>
            </div>
        </section>
        
        <section class="portfolio">
            <div class="container">
                <h2>Nasze projekty</h2>
                <div class="portfolio-grid">
                    <div class="portfolio-item">
                        <div class="portfolio-image">📱</div>
                        <h3>System AI dla E-commerce</h3>
                        <p>Zaawansowany system rekomendacji produktów oparty na AI</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">💼</div>
                        <h3>Automatyzacja CRM</h3>
                        <p>Inteligentny system zarządzania relacjami z klientami</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">🎨</div>
                        <h3>Generator Treści</h3>
                        <p>Narzędzie do automatycznego generowania treści marketingowych</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="contact-preview">
            <div class="container">
                <h2>Gotowy na współpracę?</h2>
                <p>Skontaktuj się z nami i dowiedz się, jak możemy pomóc Twojej firmie</p>
                <button class="cta-button primary" data-route="/contact">Kontakt</button>
            </div>
        </section>
    `
    
    setupAIHandlers()
    setupNavigation()
}

function setupAIHandlers() {
    const generateHero = document.getElementById('generate-hero')
    const generateAbout = document.getElementById('generate-about')
    const generateServices = document.getElementById('generate-services')
    
    if (generateHero) {
        generateHero.addEventListener('click', async () => {
            const prompt = 'Stwórz krótki, zachęcający tekst hero section dla firmy ST KRAKOS specjalizującej się w rozwiązaniach AI'
            await generateAndUpdate('hero-subtitle', prompt, 'p')
        })
    }
    
    if (generateAbout) {
        generateAbout.addEventListener('click', async () => {
            const prompt = 'Stwórz krótki opis firmy ST KRAKOS (2-3 zdania) specjalizującej się w rozwiązaniach AI'
            await generateAndUpdate('about-text', prompt, 'p')
        })
    }
    
    if (generateServices) {
        generateServices.addEventListener('click', async () => {
            const prompt = 'Stwórz listę 4 usług dla firmy ST KRAKOS w formacie: nazwa usługi - krótki opis (max 2 zdania)'
            await generateAndUpdate('services-grid', prompt, 'div')
        })
    }
}

async function generateAndUpdate(elementId, prompt, elementType) {
    const element = document.getElementById(elementId)
    if (!element) return
    
    const originalContent = element.innerHTML
    element.innerHTML = '<span class="loading">Generowanie przez AI...</span>'
    
    try {
        const result = await generateContent(prompt)
        if (result.success && result.content) {
            if (elementType === 'div') {
                element.innerHTML = formatServices(result.content)
            } else {
                element.textContent = result.content
            }
        } else {
            element.innerHTML = originalContent
            alert('Błąd generowania treści przez AI')
        }
    } catch (error) {
        element.innerHTML = originalContent
        console.error('Error:', error)
        alert('Błąd połączenia z API')
    }
}

function formatServices(content) {
    const lines = content.split('\n').filter(line => line.trim())
    return lines.map(line => {
        const parts = line.split('-')
        if (parts.length >= 2) {
            return `<div class="service-card">
                <div class="service-icon">🚀</div>
                <h3>${parts[0].trim()}</h3>
                <p>${parts.slice(1).join('-').trim()}</p>
            </div>`
        }
        return ''
    }).join('')
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
