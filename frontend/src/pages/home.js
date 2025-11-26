import { updateSEO, addStructuredData } from '../utils/seo.js'
import { validators, validateField, clearValidationErrors } from '../utils/validators.js'

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
        <section id="home" class="hero">
            <div class="hero-content">
                <h1>Przyszłość Biznesu w Sztucznej Inteligencji</h1>
                <p class="hero-subtitle">ST KRAKOS - Twój partner w transformacji cyfrowej. Wykorzystujemy zaawansowane technologie AI, aby automatyzować procesy, optymalizować operacje i tworzyć inteligentne rozwiązania dla Twojej firmy.</p>
                <div class="hero-buttons">
                    <button class="cta-button primary" data-scroll="services">Poznaj nasze rozwiązania</button>
                    <button class="cta-button secondary" data-scroll="contact">Bezpłatna konsultacja</button>
                </div>
            </div>
        </section>
        
        <section id="about" class="about-page">
            <div class="container">
                <h1>O ST KRAKOS</h1>
                <div class="about-content">
                    <div class="about-section">
                        <h2>Eksperci w Sztucznej Inteligencji</h2>
                        <p>ST KRAKOS to zespół doświadczonych specjalistów AI, którzy pomagają firmom wykorzystać pełny potencjał sztucznej inteligencji. Łączymy głęboką wiedzę techniczną z praktycznym zrozumieniem potrzeb biznesowych, tworząc rozwiązania, które przynoszą realne korzyści.</p>
                        <p>Nasza ekspertyza obejmuje machine learning, deep learning, przetwarzanie języka naturalnego, computer vision oraz zaawansowaną analitykę danych. Każdy projekt traktujemy indywidualnie, dostosowując technologie AI do unikalnych wyzwań naszych klientów.</p>
                    </div>
                    
                    <div class="about-section">
                        <h2>Nasza Misja</h2>
                        <p>Demokratyzujemy dostęp do sztucznej inteligencji, sprawiając, że zaawansowane technologie AI stają się dostępne dla firm każdej wielkości. Wierzymy, że każda organizacja może skorzystać z AI, niezależnie od branży czy rozmiaru.</p>
                        <p>Naszym celem jest nie tylko wdrożenie technologii, ale przede wszystkim zapewnienie, że rozwiązania AI rzeczywiście rozwiązują problemy biznesowe i generują wartość dla naszych klientów.</p>
                    </div>
                    
                    <div class="about-section">
                        <h2>Dlaczego warto z nami współpracować?</h2>
                        <ul class="features-list">
                            <li>✅ Wieloletnie doświadczenie w projektach AI i machine learning</li>
                            <li>✅ Indywidualne podejście - każdy projekt jest unikalny</li>
                            <li>✅ Najnowsze technologie - wykorzystujemy cutting-edge rozwiązania AI</li>
                            <li>✅ Kompleksowe wsparcie - od koncepcji po wdrożenie i utrzymanie</li>
                            <li>✅ Mierzalne rezultaty - każdy projekt ma jasno określone KPI</li>
                            <li>✅ Transparentność - regularne raporty i komunikacja na każdym etapie</li>
                        </ul>
                    </div>
                    
                    <div class="about-section">
                        <h2>Nasze Wartości</h2>
                        <p><strong>Innowacyjność</strong> - Stale śledzimy najnowsze trendy w AI i implementujemy je w praktyce.</p>
                        <p><strong>Jakość</strong> - Każde rozwiązanie przechodzi rygorystyczne testy i walidację przed wdrożeniem.</p>
                        <p><strong>Etyka AI</strong> - Zobowiązujemy się do odpowiedzialnego wykorzystania AI, z poszanowaniem prywatności i transparentności.</p>
                        <p><strong>Partnerstwo</strong> - Traktujemy klientów jako partnerów w procesie transformacji cyfrowej.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="services" class="services">
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
        
        <section id="technologies" class="portfolio">
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
        
        <section id="contact" class="contact-page">
            <div class="container">
                <h1>Skontaktuj się z nami</h1>
                <p class="contact-intro">Masz pytania? Chcesz dowiedzieć się więcej o naszych usługach? Napisz do nas!</p>
                
                <div class="contact-wrapper">
                    <form id="contact-form" class="contact-form">
                        <div class="form-group">
                            <label for="name">Imię i nazwisko</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Temat</label>
                            <input type="text" id="subject" name="subject" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Wiadomość</label>
                            <textarea id="message" name="message" rows="6" required></textarea>
                        </div>
                        
                        <button type="submit" class="submit-btn">Wyślij wiadomość</button>
                        <div id="form-message" class="form-message"></div>
                    </form>
                    
                    <div class="contact-info">
                        <h2>Informacje kontaktowe</h2>
                        <div class="info-item">
                            <strong>Email:</strong>
                            <p>kontakt@stkrakos.pl</p>
                        </div>
                        <div class="info-item">
                            <strong>Telefon:</strong>
                            <p>+48 123 456 789</p>
                        </div>
                        <div class="info-item">
                            <strong>Adres:</strong>
                            <p>Kraków, Polska</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
    
    setupNavigation()
    setupContactForm()
}

function setupNavigation() {
    document.querySelectorAll('button[data-scroll], a[data-scroll]').forEach(btn => 
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const sectionId = btn.getAttribute('data-scroll')
            if (sectionId) {
                const section = document.getElementById(sectionId)
                if (section) {
                    window.scrollTo({ top: section.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
                    window.history.pushState({}, '', `#${sectionId}`)
                }
            }
        })
    )
}

function setupContactForm() {
    const form = document.getElementById('contact-form')
    if (!form) return
    
    const nameInput = form.name
    const emailInput = form.email
    const subjectInput = form.subject
    const messageInput = form.message
    
    nameInput.addEventListener('blur', () => validateField(nameInput, validators.name))
    emailInput.addEventListener('blur', () => validateField(emailInput, validators.email))
    subjectInput.addEventListener('blur', () => validateField(subjectInput, validators.subject))
    messageInput.addEventListener('blur', () => validateField(messageInput, validators.message))
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const isValid = [nameInput, emailInput, subjectInput, messageInput]
            .every((input, i) => validateField(input, [validators.name, validators.email, validators.subject, validators.message][i]))
        
        if (!isValid) {
            return
        }
        
        const messageDiv = document.getElementById('form-message')
        const submitBtn = form.querySelector('.submit-btn')
        
        const formData = Object.fromEntries([...form.elements].filter(e => e.name).map(e => [e.name, e.value.trim()]))
        Object.assign(submitBtn, { disabled: true, textContent: 'Wysyłanie...' })
        messageDiv.textContent = ''
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            Object.assign(messageDiv, { textContent: 'Dziękujemy! Twoja wiadomość została wysłana.', className: 'form-message success' })
            form.reset()
            clearValidationErrors()
        } catch (error) {
            Object.assign(messageDiv, { textContent: 'Wystąpił błąd. Spróbuj ponownie.', className: 'form-message error' })
        } finally {
            Object.assign(submitBtn, { disabled: false, textContent: 'Wyślij wiadomość' })
        }
    })
}

