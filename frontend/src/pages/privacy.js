// Privacy Policy Page
import {t} from '../utils/i18n.js'
import {updateSEO} from '../utils/seo.js'

export function renderPrivacy(container) {
  updateSEO(
    `${t('privacy.title')} - ST KRATOS`,
    t('privacy.intro'),
    'privacy policy, polityka prywatności, RODO, GDPR'
  )

  const lastUpdated = '2025-12-08'

  container.innerHTML = `
    <section class="privacy-page">
      <div class="container">
        <h1>${t('privacy.title')}</h1>
        <p class="privacy-last-updated">${t('privacy.lastUpdated')}: ${lastUpdated}</p>
        
        <div class="privacy-content">
          <p class="privacy-intro">${t('privacy.intro')}</p>

          <section class="privacy-section">
            <h2>${t('privacy.admin.title')}</h2>
            <p>${t('privacy.admin.content')}</p>
            <p><strong>${t('privacy.admin.email')}</strong> ${t('privacy.contact.emailValue')}</p>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.data.title')}</h2>
            <p>${t('privacy.data.content')}</p>
            
            <h3>${t('privacy.data.analytics.title')}</h3>
            <ul>
              ${Array.isArray(t('privacy.data.analytics.list')) ? t('privacy.data.analytics.list').map(item => `<li>${item}</li>`).join('') : ''}
            </ul>

            <h3>${t('privacy.data.necessary.title')}</h3>
            <ul>
              ${Array.isArray(t('privacy.data.necessary.list')) ? t('privacy.data.necessary.list').map(item => `<li>${item}</li>`).join('') : ''}
            </ul>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.purpose.title')}</h2>
            <p>${t('privacy.purpose.content')}</p>
            <ul>
              <li><strong>${t('privacy.data.analytics.title')}:</strong> ${t('privacy.purpose.analytics')}</li>
              <li><strong>${t('privacy.data.necessary.title')}:</strong> ${t('privacy.purpose.necessary')}</li>
            </ul>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.legal.title')}</h2>
            <p>${t('privacy.legal.content')}</p>
            <ul>
              <li>${t('privacy.legal.analytics')}</li>
              <li>${t('privacy.legal.necessary')}</li>
            </ul>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.storage.title')}</h2>
            <p>${t('privacy.storage.content')}</p>
            <ul>
              <li><strong>${t('privacy.data.analytics.title')}:</strong> ${t('privacy.storage.analytics')}</li>
              <li><strong>${t('privacy.data.necessary.title')}:</strong> ${t('privacy.storage.necessary')}</li>
            </ul>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.rights.title')}</h2>
            <p>${t('privacy.rights.content')}</p>
            <ul>
              ${Array.isArray(t('privacy.rights.list')) ? t('privacy.rights.list').map(right => `<li>${right}</li>`).join('') : ''}
            </ul>
            <p>${t('privacy.rights.contact')}</p>
            <p><strong>${t('privacy.contact.email')}</strong> ${t('privacy.contact.emailValue')}</p>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.cookies.title')}</h2>
            <p>${t('privacy.cookies.content')}</p>
            <ul>
              <li><strong>localStorage:</strong> ${t('privacy.cookies.localStorage')}</li>
              <li><strong>sessionStorage:</strong> ${t('privacy.cookies.sessionStorage')}</li>
              <li><strong>Cookies:</strong> ${t('privacy.cookies.cookies')}</li>
            </ul>
            <p>${t('privacy.cookies.manage')}</p>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.complaint.title')}</h2>
            <p>${t('privacy.complaint.content')}</p>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.changes.title')}</h2>
            <p>${t('privacy.changes.content')}</p>
          </section>

          <section class="privacy-section">
            <h2>${t('privacy.contact.title')}</h2>
            <p>${t('privacy.contact.content')}</p>
            <p><strong>${t('privacy.contact.email')}</strong> <a href="mailto:${t('privacy.contact.emailValue')}">${t('privacy.contact.emailValue')}</a></p>
          </section>
        </div>
      </div>
    </section>
  `
}

