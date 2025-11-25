export function renderServices(container) {
    container.innerHTML = `
        <section class="services-page">
            <div class="container">
                <h1>Nasze usługi</h1>
                <p class="services-intro">Oferujemy kompleksowe rozwiązania oparte na sztucznej inteligencji</p>
                
                <div class="services-list">
                    <div class="service-item">
                        <div class="service-icon">🌐</div>
                        <h3>Generowanie Stron WWW</h3>
                        <p>Tworzenie profesjonalnych stron internetowych z wykorzystaniem AI. Szybko, efektywnie i zgodnie z Twoimi potrzebami. Nasze rozwiązania pozwalają na automatyczne generowanie treści, układów i elementów wizualnych.</p>
                        <ul>
                            <li>Automatyczne generowanie treści</li>
                            <li>Responsywne projekty</li>
                            <li>Optymalizacja SEO</li>
                        </ul>
                    </div>
                    
                    <div class="service-item">
                        <div class="service-icon">⚙️</div>
                        <h3>Automatyzacja Procesów</h3>
                        <p>Optymalizacja i automatyzacja procesów biznesowych przy użyciu zaawansowanych rozwiązań AI. Zwiększ efektywność swojej firmy dzięki inteligentnym systemom.</p>
                        <ul>
                            <li>Automatyzacja workflow</li>
                            <li>Przetwarzanie dokumentów</li>
                            <li>Integracja systemów</li>
                        </ul>
                    </div>
                    
                    <div class="service-item">
                        <div class="service-icon">🤖</div>
                        <h3>Rozwiązania AI</h3>
                        <p>Zaawansowane rozwiązania oparte na sztucznej inteligencji dostosowane do potrzeb Twojej firmy. Od chatbotów po systemy rekomendacyjne.</p>
                        <ul>
                            <li>Chatboty i asystenci wirtualni</li>
                            <li>Systemy rekomendacyjne</li>
                            <li>Analiza danych</li>
                        </ul>
                    </div>
                    
                    <div class="service-item">
                        <div class="service-icon">📊</div>
                        <h3>Analiza Danych</h3>
                        <p>Inteligentna analiza danych i generowanie raportów wspierających decyzje biznesowe. Wykorzystaj potencjał swoich danych.</p>
                        <ul>
                            <li>Przetwarzanie big data</li>
                            <li>Predykcje i prognozy</li>
                            <li>Wizualizacja danych</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `
}
