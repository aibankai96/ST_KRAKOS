let cmsContent = JSON.parse(localStorage.getItem('cmsContent') || '{}')

export function renderCMS(container) {
    container.innerHTML = `
        <section class="cms-page">
            <div class="container">
                <h1>System Zarządzania Treścią</h1>
                <p class="cms-intro">Zarządzaj treścią swojej strony</p>
                
                <div class="cms-sections">
                    <div class="cms-section">
                        <h2>Strona Główna</h2>
                        <div class="cms-item">
                            <label>Hero Title</label>
                            <input type="text" id="home-hero-title" value="${cmsContent.homeHeroTitle || 'Witamy w ST KRAKOS'}" />
                        </div>
                        <div class="cms-item">
                            <label>Hero Subtitle</label>
                            <textarea id="home-hero-subtitle" rows="2">${cmsContent.homeHeroSubtitle || 'Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji'}</textarea>
                        </div>
                    </div>
                    
                    <div class="cms-section">
                        <h2>O nas</h2>
                        <div class="cms-item">
                            <label>Opis firmy</label>
                            <textarea id="about-description" rows="4">${cmsContent.aboutDescription || 'ST KRAKOS to firma specjalizująca się w tworzeniu innowacyjnych rozwiązań z wykorzystaniem sztucznej inteligencji.'}</textarea>
                        </div>
                    </div>
                    
                    <div class="cms-section">
                        <h2>Kontakt</h2>
                        <div class="cms-item">
                            <label>Email</label>
                            <input type="email" id="contact-email" value="${cmsContent.contactEmail || 'kontakt@stkrakos.pl'}" />
                        </div>
                        <div class="cms-item">
                            <label>Telefon</label>
                            <input type="text" id="contact-phone" value="${cmsContent.contactPhone || '+48 123 456 789'}" />
                        </div>
                        <div class="cms-item">
                            <label>Adres</label>
                            <input type="text" id="contact-address" value="${cmsContent.contactAddress || 'Kraków, Polska'}" />
                        </div>
                    </div>
                </div>
                
                <div class="cms-actions">
                    <button class="save-btn" id="save-cms">💾 Zapisz zmiany</button>
                    <button class="reset-btn" id="reset-cms">🔄 Resetuj do domyślnych</button>
                </div>
            </div>
        </section>
    `
    
    setupCMSHandlers()
}

function setupCMSHandlers() {
    document.getElementById('save-cms').addEventListener('click', () => {
        cmsContent = {
            homeHeroTitle: document.getElementById('home-hero-title').value,
            homeHeroSubtitle: document.getElementById('home-hero-subtitle').value,
            aboutDescription: document.getElementById('about-description').value,
            contactEmail: document.getElementById('contact-email').value,
            contactPhone: document.getElementById('contact-phone').value,
            contactAddress: document.getElementById('contact-address').value
        }
        localStorage.setItem('cmsContent', JSON.stringify(cmsContent))
        alert('Zmiany zostały zapisane!')
    })
    
    document.getElementById('reset-cms').addEventListener('click', () => {
        if (confirm('Czy na pewno chcesz zresetować wszystkie zmiany?')) {
            localStorage.removeItem('cmsContent')
            cmsContent = {}
            renderCMS(document.getElementById('content'))
        }
    })
}

export function getCMSContent() {
    return JSON.parse(localStorage.getItem('cmsContent') || '{}')
}

