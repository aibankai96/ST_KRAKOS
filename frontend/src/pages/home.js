import {updateSEO, addStructuredData} from '../utils/seo.js'
import {t, getLang} from '../utils/i18n.js'
const ANIMATION_STEPS = 60
const ANIMATION_DURATION = 2000
const INTERSECTION_THRESHOLD = 0.3
export function renderHome(container) {
  const lang = getLang()
  const seoTexts = lang === 'pl' ? {
    title: 'ST KRAKOS - Innowacyjne rozwiązania AI',
    desc: 'ST KRAKOS oferuje zaawansowane rozwiązania z wykorzystaniem sztucznej inteligencji. Generowanie stron, automatyzacja procesów i analiza danych.',
    keywords: 'AI, sztuczna inteligencja, automatyzacja, generowanie stron, ST KRAKOS',
    orgDesc: 'Innowacyjne rozwiązania z wykorzystaniem sztucznej inteligencji'
  } : {
    title: 'ST KRAKOS - Innovative AI Solutions',
    desc: 'ST KRAKOS offers advanced solutions using artificial intelligence. Website generation, process automation and data analysis.',
    keywords: 'AI, artificial intelligence, automation, website generation, ST KRAKOS',
    orgDesc: 'Innovative solutions using artificial intelligence'
  }
  updateSEO(seoTexts.title, seoTexts.desc, seoTexts.keywords)
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ST KRAKOS',
    description: seoTexts.orgDesc,
    url: window.location.origin
  })
  container.innerHTML = `
        <section id="home" class="hero">
            <div class="lion-pattern"></div>
            <div class="ai-badge-circle">
                <span class="badge-icon">⚡</span>
                <span class="badge-text">${t('hero.badge')}</span>
            </div>
            <div class="hero-content">
                <h1>${t('hero.title')}</h1>
                <p class="hero-subtitle">${t('hero.subtitle')}</p>
                <div class="hero-buttons">
                    <button class="cta-button primary" data-scroll="services">${t('hero.btn1')}</button>
                    <button class="cta-button secondary" data-scroll="contact">${t('hero.btn2')}</button>
                </div>
            </div>
        </section>
        <section id="ai-stats" class="ai-stats-section">
            <div class="container">
                <h2>${t('aiStats.title')}</h2>
                <p class="section-intro">${t('aiStats.intro')}</p>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number" data-target="73" data-suffix="%">0%</div>
                        <div class="stat-label">${t('aiStats.stat1')}</div>
                        <div class="stat-source">(McKinsey, 2023)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" data-target="40" data-suffix="%">0%</div>
                        <div class="stat-label">${t('aiStats.stat2')}</div>
                        <div class="stat-source">(Accenture, 2023)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" data-target="15.7" data-prefix="$" data-suffix="T">$0T</div>
                        <div class="stat-label">${t('aiStats.stat3')}</div>
                        <div class="stat-source">(PwC, 2023)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" data-target="85" data-suffix="%">0%</div>
                        <div class="stat-label">${t('aiStats.stat4')}</div>
                        <div class="stat-source">(Deloitte, 2023)</div>
                    </div>
                </div>
            </div>
        </section>
        <section id="about" class="about-page">
            <div class="container">
                <h1>${t('about.title')}</h1>
                <p class="section-intro">${t('about.intro')}</p>
                <div class="about-content">
                    <div class="about-intro-card">
                        <h2>${t('about.h2_1')}</h2>
                        <p>${t('about.p1')}</p>
                    </div>
                    <div class="about-features">
                        <h2 class="features-title">${t('about.h2_2')}</h2>
                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon">🤖</div>
                                <h3>${t('about.feat1')}</h3>
                                <p>${t('about.feat1d')}</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🎯</div>
                                <h3>${t('about.feat2')}</h3>
                                <p>${t('about.feat2d')}</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">⚡</div>
                                <h3>${t('about.feat3')}</h3>
                                <p>${t('about.feat3d')}</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">💎</div>
                                <h3>${t('about.feat4')}</h3>
                                <p>${t('about.feat4d')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="services" class="services">
            <div class="container">
                <h2>${t('services.title')}</h2>
                <p class="section-intro">${t('services.intro')}</p>
                <div class="certificate-info">
                    <div class="certificate-icon">🏆</div>
                    <p class="certificate-text">${t('services.cert')}</p>
                </div>
                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge fast">${t('services.cat1')}</span>
                        <p class="category-description">${t('services.cat1d')}</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">📄</div>
                            <h3>${t('services.lp')}</h3>
                            <p>${t('services.lpd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.lpf')}</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔧</div>
                            <h3>${t('services.mod')}</h3>
                            <p>${t('services.modd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.modf')}</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">✨</div>
                            <h3>${t('services.elem')}</h3>
                            <p>${t('services.elemd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.elemf')}</p>
                        </div>
                    </div>
                </div>

                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge medium">${t('services.cat2')}</span>
                        <p class="category-description">${t('services.cat2d')}</p>
                    </div>
                    <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🌐</div>
                            <h3>${t('services.web')}</h3>
                            <p>${t('services.webd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.webf')}</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔐</div>
                            <h3>${t('services.panel')}</h3>
                            <p>${t('services.paneld')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.panelf')}</p>
                        </div>
                        <div class="service-card">
                            <div class="service-icon">🔗</div>
                            <h3>${t('services.int')}</h3>
                            <p>${t('services.intd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.intf')}</p>
                        </div>
                    </div>
                </div>

                <div class="services-category">
                    <div class="category-header">
                        <span class="category-badge complex">${t('services.cat3')}</span>
                        <p class="category-description">${t('services.cat3d')}</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">💻</div>
                            <h3>${t('services.app')}</h3>
                            <p>${t('services.appd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.appf')}</p>
                    </div>
                    <div class="service-card">
                            <div class="service-icon">📅</div>
                            <h3>${t('services.res')}</h3>
                            <p>${t('services.resd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.resf')}</p>
                    </div>
                    <div class="service-card">
                            <div class="service-icon">⚡</div>
                            <h3>${t('services.rt')}</h3>
                            <p>${t('services.rtd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.rtf')}</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">📊</div>
                            <h3>${t('services.dash')}</h3>
                            <p>${t('services.dashd')}</p>
                            <p class="service-for"><strong>${lang === 'pl' ? 'Dla:' : 'For:'}</strong> ${t('services.dashf')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="technologies" class="portfolio">
            <div class="container">
                <h2>${t('tech.title')}</h2>
                <p class="section-intro">${t('tech.intro')}</p>
                <div class="portfolio-grid">
                    <div class="portfolio-item">
                        <div class="portfolio-image">🤖</div>
                        <h3>${t('tech.t1')}</h3>
                        <p>${t('tech.t1d')}</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">⚙️</div>
                        <h3>${t('tech.t2')}</h3>
                        <p>${t('tech.t2d')}</p>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-image">🚀</div>
                        <h3>${t('tech.t3')}</h3>
                        <p>${t('tech.t3d')}</p>
                    </div>
                </div>
                <div class="technologies-cta">
                    <p class="technologies-cta-text">${t('tech.cta')}</p>
                </div>
            </div>
        </section>
        <section id="portfolio" class="portfolio-section">
            <div class="container">
                <h2>${t('portfolio.title')}</h2>
                <p class="section-intro">${t('portfolio.intro')}</p>
                <div class="portfolio-projects">
                    <div class="project-card">
                        <div class="project-header">
                            <h3>${t('portfolio.p1')}</h3>
                            <span class="project-badge beta">BETA</span>
                        </div>
                        <p class="project-description">${t('portfolio.p1d')}</p>
                        <div class="project-link">
                            <a href="https://nesyra.com" target="_blank" rel="noopener noreferrer" class="project-btn">${t('portfolio.view')}</a>
                        </div>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <h3>${t('portfolio.p2')}</h3>
                            <span class="project-badge client">${lang === 'pl' ? 'PROJEKT KLIENTA' : 'CLIENT PROJECT'}</span>
                        </div>
                        <p class="project-description">${t('portfolio.p2d')}</p>
                        <div class="project-link">
                            <a href="https://misjaczystawoda.com" target="_blank" rel="noopener noreferrer" class="project-btn">${t('portfolio.view')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="contact" class="contact-page">
            <div class="container">
                <h1>${t('contact.title')}</h1>
                <p class="contact-intro">${t('contact.intro')}</p>
                <div class="contact-info-wrapper">
                    <div class="contact-info">
                        <h2>${t('contact.info')}</h2>
                        <div class="info-item">
                            <strong>${t('contact.email')}</strong>
                            <p><a href="mailto:kontakt@stkrakos.pl">kontakt@stkrakos.pl</a></p>
                        </div>
                        <div class="info-item">
                            <strong>${t('contact.phone')}</strong>
                            <p><a href="tel:+48123456789">+48 123 456 789</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
  setupStatsAnimation()
}
function setupStatsAnimation() {
  const statsSection = document.getElementById('ai-stats')
  if (!statsSection) {
    return
  }
  const statNumbers = statsSection.querySelectorAll('.stat-number')
  let hasAnimated = false
  new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && !hasAnimated) {
      hasAnimated = true
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'))
        const prefix = stat.getAttribute('data-prefix') || ''
        const suffix = stat.getAttribute('data-suffix') || ''
        const step = target / ANIMATION_STEPS
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + step, target)
          stat.textContent = `${prefix}${suffix === 'T' ? current.toFixed(1) : Math.floor(current)}${suffix}`
          if (current >= target) {
            clearInterval(timer)
          }
        }, ANIMATION_DURATION / ANIMATION_STEPS)
      })
    }
  }, {threshold: INTERSECTION_THRESHOLD}).observe(statsSection)
}
