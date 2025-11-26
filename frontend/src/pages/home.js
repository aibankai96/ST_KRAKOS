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
                        <h2>Eksperci w Rozwiązaniach Webowych</h2>
                        <p>ST KRAKOS to zespół doświadczonych specjalistów, którzy pomagają firmom stworzyć profesjonalne strony internetowe i aplikacje webowe. Łączymy wiedzę techniczną z praktycznym zrozumieniem potrzeb biznesowych, tworząc rozwiązania, które przynoszą realne korzyści.</p>
                    </div>
                    
                    <div class="about-section">
                        <h2>Nasza Misja</h2>
                        <p>Demokratyzujemy dostęp do nowoczesnych technologii webowych, sprawiając, że profesjonalne strony i aplikacje stają się dostępne dla firm każdej wielkości. Każdy projekt traktujemy indywidualnie, dostosowując rozwiązania do unikalnych potrzeb naszych klientów.</p>
                    </div>
                    
                    <div class="about-section">
                        <h2>Dlaczego warto z nami współpracować?</h2>
                        <ul class="features-list">
                            <li>✅ Indywidualne podejście - każdy projekt jest unikalny</li>
                            <li>✅ Najnowsze technologie i najlepsze praktyki</li>
                            <li>✅ Kompleksowe wsparcie - od koncepcji po wdrożenie</li>
                            <li>✅ Mierzalne rezultaty i transparentna komunikacja</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="services" class="services">
            <div class="container">
                <h2>Nasze Usługi</h2>
                <p style="text-align: center; font-size: 1.2rem; color: #4a5568; margin-bottom: 4rem; max-width: 900px; margin-left: auto; margin-right: auto;">
                    Oferujemy kompleksowe rozwiązania webowe dostosowane do Twoich potrzeb. Od szybkich landing page'ów po zaawansowane aplikacje - każdy projekt realizujemy z dbałością o szczegóły i najwyższą jakość.
                </p>
                
                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge fast">⚡ Szybkie Projekty</span>
                        <p class="category-description">Szybkie, lekkie i estetyczne realizacje, które pozwalają błyskawicznie zaistnieć w sieci lub rozwinąć już istniejącą stronę. Idealne dla firm, które potrzebują szybkiego efektu bez skomplikowanych funkcji.</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">📄</div>
                            <h3>Landing Page / One-Page</h3>
                            <p>Jednostronicowa, nowoczesna i dynamiczna strona prezentująca ofertę, produkt lub firmę. Zawiera sekcje: hero, o nas, oferta, cena, kontakt, dopracowany design, responsywność i animacje.</p>
                            <p class="service-for"><strong>Dla:</strong> Start-upy, jednoosobowe działalności, eventy, kampanie reklamowe</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔧</div>
                            <h3>Modyfikacje Istniejących Stron</h3>
                            <p>Ulepszenie lub odświeżenie już istniejącej strony. Poprawa błędów, optymalizacja, nowe sekcje, refaktoryzacja kodu, poprawa responsywności i przyspieszenie działania.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy, które mają stronę, ale nie chcą tworzyć nowej</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">✨</div>
                            <h3>Proste Elementy Interaktywne</h3>
                            <p>Efekty nadające stronie nowoczesny i profesjonalny wygląd. Niestandardowy kursor, animowane przejścia, galerie zdjęć, FAQ z animacjami - wszystko, co zwiększa zaangażowanie użytkowników.</p>
                            <p class="service-for"><strong>Dla:</strong> Wszystkie firmy chcące ulepszyć swoje strony</p>
                        </div>
                    </div>
                </div>

                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge medium">🎯 Projekty Średnie</span>
                        <p class="category-description">Realizacje dla firm, które potrzebują pełnej, profesjonalnej strony lub prostego systemu. Łączę atrakcyjny wygląd z funkcjonalnością i wygodą zarządzania treścią.</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">🌐</div>
                            <h3>Strona Firmowa / Serwis Wielostronicowy</h3>
                            <p>Pełna strona internetowa z wieloma podstronami (5-15 stron/sekcji), dedykowany projekt graficzny, animacje premium, blog, lekki CMS, formularze kontaktowe, optymalizacja SEO i wydajności.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy usługowe, agencje, małe i średnie biznesy</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔐</div>
                            <h3>Proste Panele i Backend (CRUD + Logowanie)</h3>
                            <p>Lekki system webowy do zarządzania danymi. Logowanie, rejestracja, panel administratora, listy użytkowników/produktów/zadań, możliwość dodawania, edytowania i usuwania danych, baza danych, API.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy potrzebujące wewnętrznych narzędzi, CRM-ów lite, paneli dla klientów</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔗</div>
                            <h3>Integracje Podstawowe (API / CRM / Automatyzacje)</h3>
                            <p>Połączenie strony lub aplikacji z zewnętrznymi systemami. Integracja z CRM (HubSpot, Pipedrive), generowanie PDF, wysyłka maili, webhooki, zapisy do Google Sheets, podstawowe automatyzacje.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy, które chcą automatyzować swoją pracę</p>
                        </div>
                    </div>
                </div>

                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge complex">🚀 Projekty Złożone</span>
                        <p class="category-description">Uproszczone, ale w pełni funkcjonalne aplikacje webowe — idealne jako MVP lub narzędzie dla zespołu. Szybkie wdrożenie, rozsądna cena, możliwość dalszej rozbudowy.</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">💻</div>
                            <h3>Prosta Aplikacja Webowa (MVP)</h3>
                            <p>Aplikacja z bazą danych, logowaniem i panelem użytkownika. Logowanie, rejestracja, reset hasła, dashboard użytkownika, CRUD na kilku modelach, filtrowanie i sortowanie, zapis do bazy, intuicyjny interfejs.</p>
                            <p class="service-for"><strong>Dla:</strong> Startupy, firmy usługowe, które chcą narzędzia pod swoje procesy</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">📅</div>
                            <h3>System Rezerwacji / Zarządzania Wydarzeniami</h3>
                            <p>Lekki kalendarz z możliwością zapisów. Wybór daty, formularz rezerwacji, zapis do bazy, potwierdzenie e-mail, panel do podglądu rezerwacji.</p>
                            <p class="service-for"><strong>Dla:</strong> Fryzjerzy, trenerzy, konsultanci, gabinety</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">⚡</div>
                            <h3>Podstawowy Moduł Real-Time</h3>
                            <p>Komunikacja w czasie rzeczywistym. Prosty czat, statusy online/offline, live notifications - wszystko, co potrzebne do natychmiastowej komunikacji.</p>
                            <p class="service-for"><strong>Dla:</strong> Aplikacje komunikacyjne, panele klientów, narzędzia zespołowe</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">📊</div>
                            <h3>Uproszczony Dashboard Analityczny</h3>
                            <p>Panel z wykresami i statystykami. Wykresy (Chart.js itp.), filtrowanie danych, eksport CSV, widok tabel z danymi - wszystko, co potrzebne do analizy danych.</p>
                            <p class="service-for"><strong>Dla:</strong> Firmy, które potrzebują wglądu w dane bez zaawansowanego BI</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="technologies" class="portfolio">
            <div class="container">
                <h2>Nasze Narzędzia i Technologie</h2>
                <p style="text-align: center; font-size: 1.2rem; color: #4a5568; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                    Wykorzystujemy najnowocześniejsze narzędzia AI i zaawansowane technologie programistyczne, aby tworzyć rozwiązania, które naprawdę działają. Nasz zespół pracuje z najlepszymi narzędziami dostępnymi na rynku, gwarantując najwyższą jakość i efektywność każdego projektu.
                </p>
                <div class="portfolio-grid">
                    <div class="portfolio-item">
                        <div class="portfolio-image">🤖</div>
                        <h3>Zaawansowane Narzędzia AI</h3>
                        <p>Wykorzystujemy najnowsze narzędzia wspomagane sztuczną inteligencją, które przyspieszają proces tworzenia i optymalizacji rozwiązań. Dzięki temu możemy dostarczyć Ci gotowe rozwiązania szybciej, zachowując najwyższą jakość.</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">⚙️</div>
                        <h3>Profesjonalne Środowisko Programistyczne</h3>
                        <p>Pracujemy w zaawansowanych środowiskach deweloperskich, które pozwalają nam tworzyć stabilne, bezpieczne i wydajne aplikacje. Każdy projekt jest budowany z wykorzystaniem sprawdzonych narzędzi i najlepszych praktyk branżowych.</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">🚀</div>
                        <h3>Nowoczesne Frameworki i Biblioteki</h3>
                        <p>Wykorzystujemy najnowsze technologie webowe i frameworki, które zapewniają szybkie działanie, bezpieczeństwo i łatwość utrzymania. Twoja aplikacja będzie działać płynnie na wszystkich urządzeniach i przeglądarkach.</p>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 3rem;">
                    <p style="font-size: 1.1rem; color: #4a5568; margin-bottom: 2rem;">
                        Nie musisz znać się na technologiach - my się znamy! Skup się na swoim biznesie, a my zajmiemy się resztą.
                    </p>
                    <button class="cta-button primary" data-scroll="contact">Rozpocznij Współpracę</button>
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


