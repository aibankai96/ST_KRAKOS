import {updateSEO, addStructuredData} from '../utils/seo.js'
import {t, getLang} from '../utils/i18n.js'
import {initScrollReveal} from '../utils/scrollReveal.js'
const ANIMATION_STEPS = 60
const ANIMATION_DURATION = 2000
const INTERSECTION_THRESHOLD = 0.3
const createCard = (type, props) => {
  if (type === 'stat') {
    const {target, prefix = '', suffix = '', labelKey, source} = props
    return `<div class="stat-card"><div class="stat-number" data-target="${target}"${prefix ? ` data-prefix="${prefix}"` : ''}${suffix ? ` data-suffix="${suffix}"` : ''}>${prefix}0${suffix}</div><div class="stat-label">${t(labelKey)}</div><div class="stat-source">${source}</div></div>`
  }
  if (type === 'feature') {
    const {icon, titleKey, descKey} = props
    return `<div class="feature-card"><div class="feature-icon">${icon}</div><h3>${t(titleKey)}</h3><p>${t(descKey)}</p></div>`
  }
  if (type === 'service') {
    const {icon, titleKey, descKey, forKey, forLabel} = props
    return `<div class="service-card"><div class="service-icon">${icon}</div><h3>${t(titleKey)}</h3><p>${t(descKey)}</p><p class="service-for"><strong>${forLabel}</strong> ${t(forKey)}</p></div>`
  }
  if (type === 'portfolio') {
    const {icon, titleKey, descKey} = props
    return `<div class="portfolio-item"><div class="portfolio-image">${icon}</div><h3>${t(titleKey)}</h3><p>${t(descKey)}</p></div>`
  }
  return ''
}
const createStatCard = (target, prefix, suffix, labelKey, source) => createCard('stat', {target, prefix, suffix, labelKey, source})
const createFeatureCard = (icon, titleKey, descKey) => createCard('feature', {icon, titleKey, descKey})
const createServiceCard = (icon, titleKey, descKey, forKey, forLabel) => createCard('service', {icon, titleKey, descKey, forKey, forLabel})
const createPortfolioItem = (icon, titleKey, descKey) => createCard('portfolio', {icon, titleKey, descKey})
export function renderHome(container) {
  const lang = getLang()
  const forLabel = lang === 'pl' ? 'Dla:' : 'For:'
  updateSEO(t('seo.title'), t('seo.desc'), t('seo.keywords'))
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ST KRATOS',
    description: t('seo.orgDesc'),
    url: window.location.origin
  })
  container.innerHTML = `
        <section id="home" class="hero" role="banner" aria-label="Hero section">
            <div class="ai-badge-circle">
                <span class="badge-icon">⚡</span>
                <span class="badge-text">${t('hero.badge')}</span>
            </div>
            <div class="hero-content">
                <h1>${t('hero.title')}</h1>
                <p class="hero-subtitle">${t('hero.subtitle')}</p>
                <div class="hero-buttons">
                    <button class="cta-button primary" data-scroll="services" aria-label="${t('hero.btn1')}" type="button">${t('hero.btn1')}</button>
                    <button class="cta-button secondary" data-scroll="contact" aria-label="${t('hero.btn2')}" type="button">${t('hero.btn2')}</button>
                </div>
            </div>
        </section>
        <section id="ai-stats" class="ai-stats-section" role="region" aria-label="AI Statistics">
            <div class="container">
                <h2>${t('aiStats.title')}</h2>
                <p class="section-intro">${t('aiStats.intro')}</p>
                <div class="stats-grid">
                    ${createStatCard('73', '', '%', 'aiStats.stat1', '(McKinsey, 2023)')}
                    ${createStatCard('40', '', '%', 'aiStats.stat2', '(Accenture, 2023)')}
                    ${createStatCard('15.7', '$', 'T', 'aiStats.stat3', '(PwC, 2023)')}
                    ${createStatCard('85', '', '%', 'aiStats.stat4', '(Deloitte, 2023)')}
                </div>
            </div>
        </section>
        <section id="about" class="about-page" role="region" aria-label="About us">
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
                            ${createFeatureCard('🤖', 'about.feat1', 'about.feat1d')}
                            ${createFeatureCard('🎯', 'about.feat2', 'about.feat2d')}
                            ${createFeatureCard('⚡', 'about.feat3', 'about.feat3d')}
                            ${createFeatureCard('💎', 'about.feat4', 'about.feat4d')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="services" class="services" role="region" aria-label="Services">
            <div class="container">
                <h2>${t('services.title')}</h2>
                <p class="section-intro">${t('services.intro')}</p>
                <div class="certificate-info">
                    <div class="certificate-icon">🏆</div>
                    <p class="certificate-text">${t('services.cert')}</p>
                </div>
                <div class="services-grid">
                    ${createServiceCard('📄', 'services.lp', 'services.lpd', 'services.lpf', forLabel)}
                    ${createServiceCard('🔧', 'services.mod', 'services.modd', 'services.modf', forLabel)}
                    ${createServiceCard('✨', 'services.elem', 'services.elemd', 'services.elemf', forLabel)}
                </div>
            </div>
        </section>
        <section id="technologies" class="portfolio" role="region" aria-label="Technologies">
            <div class="container">
                <h2>${t('tech.title')}</h2>
                <p class="section-intro">${t('tech.intro')}</p>
                <div class="portfolio-grid">
                    ${createPortfolioItem('🤖', 'tech.t1', 'tech.t1d')}
                    ${createPortfolioItem('⚙️', 'tech.t2', 'tech.t2d')}
                    ${createPortfolioItem('🚀', 'tech.t3', 'tech.t3d')}
                </div>
                <div class="technologies-cta">
                    <p class="technologies-cta-text">${t('tech.cta')}</p>
                </div>
            </div>
        </section>
        <section id="portfolio" class="portfolio-section" role="region" aria-label="Portfolio">
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
                            <a href="https://nesyra.com" target="_blank" rel="noopener noreferrer" class="project-btn" aria-label="${t('portfolio.view')} - ${t('portfolio.p1')}">${t('portfolio.view')}</a>
                        </div>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <h3>${t('portfolio.p2')}</h3>
                            <span class="project-badge client">${t('portfolio.clientBadge')}</span>
                        </div>
                        <p class="project-description">${t('portfolio.p2d')}</p>
                        <div class="project-link">
                            <a href="https://misjaczystawoda.com" target="_blank" rel="noopener noreferrer" class="project-btn" aria-label="${t('portfolio.view')} - ${t('portfolio.p2')}">${t('portfolio.view')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="contact" class="contact-page" role="region" aria-label="Contact">
            <div class="container">
                <h1>${t('contact.title')}</h1>
                <p class="section-intro">${t('contact.intro')}</p>
                <div class="contact-main-wrapper">
                    <div class="contact-visual">
                        <div class="contact-circle">
                            <div class="contact-circle-inner">
                                <div class="contact-main-icon">✉️</div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-content">
                        <div class="contact-email-section">
                            <div class="contact-label">${t('contact.email')}</div>
                            <a href="mailto:contact@stkratos.com" aria-label="Email contact@stkratos.com" class="contact-main-email">contact@stkratos.com</a>
                        </div>
                        <div class="contact-divider"></div>
                        <div class="contact-response-section">
                            <div class="contact-response-badge">
                                <span class="response-badge-icon">⏱️</span>
                                <span class="response-badge-text">${t('contact.responseDetail')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
  setupStatsAnimation()
  setTimeout(() => {
    initScrollReveal()
  }, 100)
}
function resetStat(stat) {
  const prefix = stat.getAttribute('data-prefix') || ''
  const suffix = stat.getAttribute('data-suffix') || ''
  stat.textContent = `${prefix}0${suffix}`
}
function animateStat(stat, timersArray) {
  return new Promise((resolve) => {
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
        const index = timersArray.indexOf(timer)
        if (index > -1) {
          timersArray.splice(index, 1)
        }
        resolve()
      }
    }, ANIMATION_DURATION / ANIMATION_STEPS)
    timersArray.push(timer)
  })
}
function setupStatsAnimation() {
  const statsSection = document.getElementById('ai-stats')
  if (!statsSection) {
    return
  }
  if (typeof IntersectionObserver === 'undefined') {
    return
  }
  const statNumbers = statsSection.querySelectorAll('.stat-number')
  let isAnimating = false
  let currentTimers = []
  new IntersectionObserver(async (entries) => {
    const isIntersecting = entries[0]?.isIntersecting
    if (isIntersecting && !isAnimating) {
      isAnimating = true
      currentTimers.forEach(timer => clearInterval(timer))
      currentTimers = []
      for (const stat of statNumbers) {
        resetStat(stat)
      }
      await new Promise(resolve => setTimeout(resolve, 200))
      for (const stat of statNumbers) {
        await animateStat(stat, currentTimers)
      }
      isAnimating = false
    } else if (!isIntersecting) {
      currentTimers.forEach(timer => clearInterval(timer))
      currentTimers = []
      isAnimating = false
      for (const stat of statNumbers) {
        resetStat(stat)
      }
    }
  }, {threshold: INTERSECTION_THRESHOLD}).observe(statsSection)
}
