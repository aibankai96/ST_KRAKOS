import {analytics} from './analytics.js'

const SECRET_CODE = '112233'
let codeSequence = ''
let codeTimeout = null
let isInitialized = false

export function initSecretCode() {
  if (isInitialized) {
    return
  }
  isInitialized = true

  // Only on desktop - skip on mobile to avoid errors
  if (window.innerWidth <= 768 || /mobile|iphone|ipad|android/i.test(navigator.userAgent)) {
    return // Silently skip on mobile
  }

  console.log('[Stats] Initializing secret code detection')

  const handleKeyPress = (e) => {
    // Ignore if typing in input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return
    }

    codeSequence += e.key
    if (codeSequence.length > SECRET_CODE.length) {
      codeSequence = codeSequence.slice(-SECRET_CODE.length)
    }

    if (codeSequence === SECRET_CODE) {
      console.log('[Stats] Secret code detected!')
      showStatsModal()
      codeSequence = ''
    }

    clearTimeout(codeTimeout)
    codeTimeout = setTimeout(() => {
      codeSequence = ''
    }, 3000)
  }

  // Add event listener
  document.addEventListener('keydown', handleKeyPress)
  console.log('[Stats] Secret code listener added')
}

function showStatsModal() {
  try {
    console.log('[Stats] Showing stats modal...')
    const stats = analytics.getStats()
    console.log('[Stats] Stats data:', stats)

    const modal = createModal(stats)
    document.body.appendChild(modal)
    setTimeout(() => modal.classList.add('show'), 10)

    modal.querySelector('.stats-close').addEventListener('click', () => {
      modal.classList.remove('show')
      setTimeout(() => modal.remove(), 300)
    })

    console.log('[Stats] Modal displayed')
  } catch (error) {
    console.error('[Stats] Error showing stats modal:', error)
    alert('Błąd podczas wyświetlania statystyk: ' + error.message)
  }
}

function createModal(stats) {
  const modal = document.createElement('div')
  modal.className = 'stats-modal'

  // Ensure stats have all required fields
  const safeStats = {
    totalOpens: stats?.totalOpens || 0,
    daysCount: stats?.daysCount || 0,
    averagePerDay: stats?.averagePerDay || 0,
    firstOpen: stats?.firstOpen || null,
    opensByDevice: stats?.opensByDevice || {},
    opensByBrowser: stats?.opensByBrowser || {},
    opensByDate: stats?.opensByDate || {},
    opensByDeviceBrowser: stats?.opensByDeviceBrowser || {},
    opensByOS: stats?.opensByOS || {},
    deviceBrowserData: stats?.deviceBrowserData || [],
    osData: stats?.osData || [],
    deviceData: stats?.deviceData || [],
    browserData: stats?.browserData || []
  }

  modal.innerHTML = `
    <div class="stats-modal-overlay"></div>
    <div class="stats-modal-content">
      <div class="stats-modal-header">
        <h2>📊 Statystyki Otwarcia Strony</h2>
        <button class="stats-close" aria-label="Zamknij">×</button>
      </div>
      <div class="stats-content">
        <div class="stat-box">
          <div class="stat-label">Łączne Otwarcia</div>
          <div class="stat-value">${safeStats.totalOpens}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Dni Zbierania</div>
          <div class="stat-value">${safeStats.daysCount}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Średnia / Dzień</div>
          <div class="stat-value">${Math.round(safeStats.averagePerDay * 10) / 10}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Pierwsze Otwarcie</div>
          <div class="stat-value-small">${safeStats.firstOpen ? new Date(safeStats.firstOpen).toLocaleDateString('pl-PL') : 'Brak'}</div>
        </div>
        <div class="stats-section">
          <h3>Otwarcia według Urządzenia</h3>
          <div class="stats-list">
            ${safeStats.deviceData && safeStats.deviceData.length > 0 ?
    safeStats.deviceData.map(({device, count, percentage}) => {
      const deviceEmojis = {
        'iPhone': '📱 iPhone',
        'iPad': '📱 iPad',
        'Android Phone': '📱 Android',
        'Android Tablet': '📱 Android Tablet',
        'Mac': '🖥️ Mac',
        'Windows PC': '🖥️ Windows',
        'Linux PC': '🖥️ Linux',
        'Desktop': '🖥️ Komputer',
        'Mobile': '📱 Mobilne',
        'Tablet': '📱 Tablet'
      }
      const deviceName = deviceEmojis[device] || device
      return `<div class="stats-item"><span>${deviceName}</span><span>${count} (${percentage}%)</span></div>`
    }).join('') :
    '<div class="stats-item"><span>Brak danych</span></div>'
}
          </div>
        </div>
        <div class="stats-section">
          <h3>Otwarcia według Przeglądarki</h3>
          <div class="stats-list">
            ${safeStats.browserData && safeStats.browserData.length > 0 ?
    safeStats.browserData.map(({browser, count, percentage}) =>
      `<div class="stats-item"><span>${browser}</span><span>${count} (${percentage}%)</span></div>`
    ).join('') :
    '<div class="stats-item"><span>Brak danych</span></div>'
}
          </div>
        </div>
        <div class="stats-section">
          <h3>📱 Urządzenia Mobilne - Przeglądarki</h3>
          <div class="stats-list">
            ${safeStats.deviceBrowserData && safeStats.deviceBrowserData.length > 0 ?
    safeStats.deviceBrowserData
      .filter(item => {
        const device = item.key.split('_')[0]
        return device === 'mobile' || device === 'iPhone' || device === 'iPad' || device === 'Android Phone' || device === 'Android Tablet' || device === 'Tablet'
      })
      .map(({label, count, percentage}) =>
        `<div class="stats-item"><span>${label}</span><span>${count} (${percentage}%)</span></div>`
      ).join('') :
    '<div class="stats-item"><span>Brak danych mobilnych</span></div>'
}
          </div>
        </div>
        <div class="stats-section">
          <h3>🖥️ Komputery - Przeglądarki</h3>
          <div class="stats-list">
            ${safeStats.deviceBrowserData && safeStats.deviceBrowserData.length > 0 ?
    safeStats.deviceBrowserData
      .filter(item => {
        const device = item.key.split('_')[0]
        return device === 'desktop' || device === 'Mac' || device === 'Windows PC' || device === 'Linux PC' || device === 'Desktop'
      })
      .map(({label, count, percentage}) =>
        `<div class="stats-item"><span>${label}</span><span>${count} (${percentage}%)</span></div>`
      ).join('') :
    '<div class="stats-item"><span>Brak danych komputerów</span></div>'
}
          </div>
        </div>
        <div class="stats-section">
          <h3>💻 System Operacyjny</h3>
          <div class="stats-list">
            ${safeStats.osData && safeStats.osData.length > 0 ?
    safeStats.osData.map(({os, count, percentage}) =>
      `<div class="stats-item"><span>${os}</span><span>${count} (${percentage}%)</span></div>`
    ).join('') :
    '<div class="stats-item"><span>Brak danych</span></div>'
}
          </div>
        </div>
        <div class="stats-section">
          <h3>Otwarcia według Dnia</h3>
          <div class="stats-list">
            ${Object.keys(safeStats.opensByDate).length > 0 ?
    Object.entries(safeStats.opensByDate)
      .sort((a, b) => {
        try {
          const dateA = a[0].split('.').reverse().join('-')
          const dateB = b[0].split('.').reverse().join('-')
          return new Date(dateB) - new Date(dateA)
        } catch {
          return 0
        }
      })
      .slice(0, 30)
      .map(([date, count]) =>
        `<div class="stats-item"><span>${date}</span><span>${count}</span></div>`
      ).join('') :
    '<div class="stats-item"><span>Brak danych</span></div>'
}
          </div>
        </div>
      </div>
    </div>
  `
  modal.querySelector('.stats-modal-overlay').addEventListener('click', () => {
    modal.classList.remove('show')
    setTimeout(() => modal.remove(), 300)
  })
  return modal
}
