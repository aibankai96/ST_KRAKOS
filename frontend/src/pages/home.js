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
        <section id="home" class="hero">
            <div class="lion-pattern"></div>
            <div class="hero-content">
                <div class="ai-badge-hero">
                    <span class="badge-icon">⚡</span>
                    <span class="badge-text">Nieliczni w Polsce - w pełni AI</span>
                </div>
                <h1>Twój Biznes Napędzany Sztuczną Inteligencją</h1>
                <p class="hero-subtitle">ST KRAKOS - Wykorzystujemy najnowsze technologie AI, aby stworzyć dla Ciebie stronę lub aplikację, która przyciąga klientów i zwiększa sprzedaż. Profesjonalne rozwiązania, które działają.</p>
                <div class="hero-buttons">
                    <button class="cta-button primary" data-scroll="services">Poznaj nasze rozwiązania</button>
                    <button class="cta-button secondary" data-scroll="contact">Bezpłatna konsultacja</button>
                </div>
            </div>
        </section>
        
        <section id="ai-stats" class="ai-stats-section">
            <div class="container">
                <h2>AI w Liczbach</h2>
                <p class="section-intro">Sprawdzone statystyki pokazują, dlaczego sztuczna inteligencja to przyszłość biznesu</p>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number" data-target="73" data-suffix="%">0%</div>
                        <div class="stat-label">firm planuje zwiększyć inwestycje w AI do 2025 roku</div>
                        <div class="stat-source">(McKinsey, 2023)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" data-target="40" data-suffix="%">0%</div>
                        <div class="stat-label">wzrost produktywności dzięki wykorzystaniu AI</div>
                        <div class="stat-source">(Accenture, 2023)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" data-target="15.7" data-prefix="$" data-suffix="T">$0T</div>
                        <div class="stat-label">wartość AI dla globalnej gospodarki do 2030</div>
                        <div class="stat-source">(PwC, 2023)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" data-target="85" data-suffix="%">0%</div>
                        <div class="stat-label">firm zauważa poprawę jakości decyzji dzięki AI</div>
                        <div class="stat-source">(Deloitte, 2023)</div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="about" class="about-page">
            <div class="container">
                <h1>O ST KRAKOS</h1>
                <p class="section-intro">Poznaj zespół ekspertów, który przekształca technologie AI w realne korzyści biznesowe</p>
                <div class="about-content">
                    <div class="about-section">
                        <h2>Tworzymy Przyszłość z AI</h2>
                        <p>ST KRAKOS to eksperci, którzy przekształcają nowoczesne technologie sztucznej inteligencji w realne korzyści dla Twojego biznesu. Projektujemy i budujemy strony internetowe oraz aplikacje, które łączą elegancki design z inteligentnymi funkcjami, zapewniając Twojej firmie przewagę konkurencyjną.</p>
                    </div>
                    
                    <div class="about-section">
                        <h2>Dlaczego My?</h2>
                        <ul class="features-list">
                            <li>🤖 <strong>Technologie AI</strong> - wykorzystujemy najnowsze narzędzia wspomagane sztuczną inteligencją</li>
                            <li>🎯 <strong>Indywidualne podejście</strong> - każdy projekt dostosowujemy do Twoich potrzeb</li>
                            <li>⚡ <strong>Szybka realizacja</strong> - od koncepcji do wdrożenia w rekordowym czasie</li>
                            <li>💎 <strong>Najwyższa jakość</strong> - profesjonalne rozwiązania, które przyciągają klientów</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="services" class="services">
            <div class="container">
                <h2>Nasze Usługi</h2>
                <p class="section-intro">
                    Oferujemy kompleksowe rozwiązania webowe dostosowane do Twoich potrzeb. Od szybkich landing page'ów po zaawansowane aplikacje - każdy projekt realizujemy z dbałością o szczegóły i najwyższą jakość.
                </p>
                
                <div class="certificate-info">
                    <div class="certificate-icon">🏆</div>
                    <p class="certificate-text">Po zrealizowaniu projektu otrzymujesz certyfikat potwierdzający, że Twoja firma wykorzystuje sztuczną inteligencję w swojej działalności.</p>
                </div>
                
                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge fast">⚡ Szybkie Projekty</span>
                        <p class="category-description">Lekkie i estetyczne realizacje, które pozwalają szybko zaistnieć w sieci.</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">📄</div>
                            <h3>Landing Page</h3>
                            <p>Jednostronicowa strona z sekcjami: hero, o nas, oferta, kontakt. Nowoczesny design, responsywność, animacje.</p>
                            <p class="service-for"><strong>Dla:</strong> Start-upy, jednoosobowe działalności, eventy</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔧</div>
                            <h3>Modyfikacje Stron</h3>
                            <p>Ulepszenie istniejącej strony. Poprawa błędów, optymalizacja, nowe sekcje, przyspieszenie działania.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy z istniejącą stroną</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">✨</div>
                            <h3>Elementy Interaktywne</h3>
                            <p>Animacje, galerie, FAQ. Nowoczesne efekty zwiększające zaangażowanie użytkowników.</p>
                            <p class="service-for"><strong>Dla:</strong> Wszystkie firmy</p>
                        </div>
                    </div>
                </div>

                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge medium">🎯 Projekty Średnie</span>
                        <p class="category-description">Kompleksowe strony internetowe i proste systemy zarządzania treścią.</p>
                    </div>
                    <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🌐</div>
                            <h3>Strona Firmowa</h3>
                            <p>Wielostronicowa strona (5-15 podstron), projekt graficzny, blog, CMS, formularze, SEO.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy usługowe, agencje, biznesy</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔐</div>
                            <h3>Panele i Backend</h3>
                            <p>System do zarządzania danymi. Logowanie, panel admin, CRUD, baza danych, API.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy potrzebujące narzędzi wewnętrznych</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔗</div>
                            <h3>Integracje</h3>
                            <p>Połączenie z CRM, automatyzacje, generowanie PDF, wysyłka maili, webhooki.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy automatyzujące pracę</p>
                        </div>
                    </div>
                </div>

                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge complex">🚀 Projekty Złożone</span>
                        <p class="category-description">Aplikacje webowe z zaawansowanymi funkcjami, idealne jako MVP dla biznesu.</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">💻</div>
                            <h3>Aplikacja Webowa (MVP)</h3>
                            <p>Baza danych, logowanie, panel użytkownika, dashboard. Gotowe rozwiązanie dla Twojego biznesu.</p>
                            <p class="service-for"><strong>Dla:</strong> Startupy, firmy usługowe</p>
                    </div>
                    <div class="service-card">
                            <div class="service-icon">📅</div>
                            <h3>System Rezerwacji</h3>
                            <p>Kalendarz z zapisami, formularz rezerwacji, potwierdzenia e-mail. Proste i skuteczne.</p>
                            <p class="service-for"><strong>Dla:</strong> Fryzjerzy, trenerzy, gabinety</p>
                    </div>
                    <div class="service-card">
                            <div class="service-icon">⚡</div>
                            <h3>Moduł Real-Time</h3>
                            <p>Czat, statusy online, powiadomienia. Komunikacja w czasie rzeczywistym.</p>
                            <p class="service-for"><strong>Dla:</strong> Aplikacje komunikacyjne, narzędzia zespołowe</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">📊</div>
                            <h3>Dashboard Analityczny</h3>
                            <p>Wykresy, statystyki, eksport danych. Wgląd w kluczowe metryki biznesowe.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy potrzebujące analizy danych</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="technologies" class="portfolio">
            <div class="container">
                <h2>Nasze Narzędzia i Technologie</h2>
                <p class="section-intro">
                    Wykorzystujemy najnowsze narzędzia AI i technologie, aby tworzyć rozwiązania, które działają. Każdy projekt realizujemy z najwyższą jakością.
                </p>
                <div class="portfolio-grid">
                    <div class="portfolio-item">
                        <div class="portfolio-image">🤖</div>
                        <h3>Narzędzia AI</h3>
                        <p>Najnowsze narzędzia wspomagane sztuczną inteligencją. Szybsza realizacja projektów przy zachowaniu najwyższej jakości.</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">⚙️</div>
                        <h3>Środowisko Programistyczne</h3>
                        <p>Zaawansowane narzędzia deweloperskie. Stabilne, bezpieczne i wydajne aplikacje z wykorzystaniem sprawdzonych rozwiązań.</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">🚀</div>
                        <h3>Frameworki i Biblioteki</h3>
                        <p>Nowoczesne technologie webowe. Szybkie działanie, bezpieczeństwo i kompatybilność na wszystkich urządzeniach.</p>
                    </div>
                </div>
                <div class="technologies-cta">
                    <p class="technologies-cta-text">
                        Technologie to nasza specjalność - skup się na biznesie, resztą zajmiemy się my.
                    </p>
                </div>
            </div>
        </section>
        
        <section id="portfolio" class="portfolio-section">
            <div class="container">
                <h2>Nasze Realizacje</h2>
                <p class="section-intro">
                    Oto przykłady naszych projektów realizowanych dla klientów. Każdy projekt to unikalne rozwiązanie dostosowane do potrzeb biznesowych.
                </p>
                <div class="portfolio-projects">
                    <div class="project-card">
                        <div class="project-header">
                            <h3>Nesyra.com</h3>
                            <span class="project-badge beta">BETA</span>
                        </div>
                        <p class="project-description">
                            Projekt realizowany dla naszego klienta. Wersja beta strony internetowej, która prezentuje nowoczesne podejście do biznesu. 
                            <strong>Jesteśmy otwarci na współpracę z wszystkimi, którzy są otwarci na nowe propozycje biznesowe.</strong>
                        </p>
                        <div class="project-link">
                            <a href="https://nesyra.com" target="_blank" rel="noopener noreferrer" class="project-btn">
                                Zobacz projekt →
                            </a>
                        </div>
                    </div>
                    
                    <div class="project-card">
                        <div class="project-header">
                            <h3>Misja Czysta Woda</h3>
                            <span class="project-badge client">PROJEKT KLIENTA</span>
                        </div>
                        <p class="project-description">
                            Kolejny projekt realizowany dla naszego klienta - <strong>Misja Czysta Woda</strong>. Strona internetowa dedykowana promocji 
                            inicjatyw związanych z ochroną środowiska i czystością wód. Projekt łączy nowoczesny design z przekazem ekologicznym, 
                            tworząc platformę informacyjną dla osób zaangażowanych w ochronę przyrody.
                        </p>
                        <div class="project-link">
                            <a href="https://misjaczystawoda.com" target="_blank" rel="noopener noreferrer" class="project-btn">
                                Zobacz projekt →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="contact" class="contact-page">
            <div class="container">
                <h1>Skontaktuj się z nami</h1>
                <p class="contact-intro">Masz pytania? Chcesz dowiedzieć się więcej o naszych usługach? Skontaktuj się z nami bezpośrednio!</p>
                
                <div class="contact-info-wrapper">
                    <div class="contact-info">
                        <h2>Informacje kontaktowe</h2>
                        <div class="info-item">
                            <strong>Email:</strong>
                            <p><a href="mailto:kontakt@stkrakos.pl">kontakt@stkrakos.pl</a></p>
                        </div>
                        <div class="info-item">
                            <strong>Telefon:</strong>
                            <p><a href="tel:+48123456789">+48 123 456 789</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
    
    setupNavigation()
    setupStatsAnimation()
}

function setupStatsAnimation() {
    const statsSection = document.getElementById('ai-stats')
    if (!statsSection) return
    
    const statNumbers = statsSection.querySelectorAll('.stat-number')
    let hasAnimated = false
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'))
                    const prefix = stat.getAttribute('data-prefix') || ''
                    const suffix = stat.getAttribute('data-suffix') || ''
                    const duration = 2000
                    const steps = 60
                    const increment = target / steps
                    let current = 0
                    const stepTime = duration / steps
                    
                    const timer = setInterval(() => {
                        current += increment
                        if (current >= target) {
                            current = target
                            clearInterval(timer)
                        }
                        
                        if (suffix === 'T') {
                            stat.textContent = `${prefix}${current.toFixed(1)}${suffix}`
            } else {
                            stat.textContent = `${prefix}${Math.floor(current)}${suffix}`
                        }
                    }, stepTime)
                })
            }
        })
    }, { threshold: 0.3 })
    
    observer.observe(statsSection)
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


