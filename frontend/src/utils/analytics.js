const STORAGE_KEY = 'st_kratos_analytics'

class Analytics {
  constructor() {
    try {
      this.stats = this.loadStats()
      // Track visit only once per session (page load)
      this.trackVisitOnce()
    } catch (error) {
      console.error('[Analytics] Error initializing:', error)
      this.stats = this.loadStats()
    }
  }

  trackVisitOnce() {
    // Track visit only once per page load
    // Use performance.timing to ensure page is loaded
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(() => {
            try {
              this.trackVisit()
            } catch (error) {
              console.error('[Analytics] Error in trackVisit:', error)
            }
          }, 1000)
        })
      } else {
        setTimeout(() => {
          try {
            this.trackVisit()
          } catch (error) {
            console.error('[Analytics] Error in trackVisit:', error)
          }
        }, 1000)
      }
    } catch (error) {
      console.error('[Analytics] Error in trackVisitOnce:', error)
    }
  }

  loadStats() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure all required fields exist
        return {
          totalOpens: parsed.totalOpens || 0,
          opensByDate: parsed.opensByDate || {},
          opensByDevice: parsed.opensByDevice || {},
          opensByBrowser: parsed.opensByBrowser || {},
          opensByDeviceBrowser: parsed.opensByDeviceBrowser || {},
          opensByOS: parsed.opensByOS || {},
          firstOpen: parsed.firstOpen || null
        }
      }
    } catch (error) {
      console.error('[Analytics] Error loading stats:', error)
    }
    return {
      totalOpens: 0,
      opensByDate: {},
      opensByDevice: {},
      opensByBrowser: {},
      opensByDeviceBrowser: {},
      opensByOS: {},
      firstOpen: null
    }
  }

  saveStats() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.stats))
    } catch (error) {
      console.error('[Analytics] Error saving stats:', error)
    }
  }

  detectDevice() {
    const ua = navigator.userAgent

    // iPad (nowe iPady używają macOS w user agent)
    if (/ipad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return 'iPad'
    }

    // iPhone
    if (/iphone/i.test(ua)) {
      return 'iPhone'
    }

    // Android Phone
    if (/android.*mobile/i.test(ua) && !/tablet/i.test(ua)) {
      return 'Android Phone'
    }

    // Android Tablet
    if (/android/i.test(ua) && /tablet/i.test(ua)) {
      return 'Android Tablet'
    }

    // Mac (komputer)
    if (/macintosh|mac os x/i.test(ua) && !(/iphone|ipad/i.test(ua))) {
      return 'Mac'
    }

    // Windows PC
    if (/windows/i.test(ua) && !(/phone|mobile/i.test(ua))) {
      return 'Windows PC'
    }

    // Linux PC
    if (/linux/i.test(ua) && !(/android/i.test(ua))) {
      return 'Linux PC'
    }

    // Tablety (ogólne)
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      return 'Tablet'
    }

    // Mobile (ogólne)
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
      return 'Mobile'
    }

    // Desktop (ogólne)
    return 'Desktop'
  }

  detectBrowser() {
    const ua = navigator.userAgent
    if (ua.includes('Chrome') && !ua.includes('Edg')) {
      return 'Chrome'
    }
    if (ua.includes('Firefox')) {
      return 'Firefox'
    }
    if (ua.includes('Safari') && !ua.includes('Chrome')) {
      return 'Safari'
    }
    if (ua.includes('Edg')) {
      return 'Edge'
    }
    if (ua.includes('Opera') || ua.includes('OPR')) {
      return 'Opera'
    }
    return 'Other'
  }

  detectOS() {
    const ua = navigator.userAgent
    const platform = navigator.platform

    if (/win/i.test(platform) || /win/i.test(ua)) {
      return 'Windows'
    }
    if (/mac/i.test(platform) || /mac/i.test(ua)) {
      return 'macOS'
    }
    if (/linux/i.test(platform) || /linux/i.test(ua)) {
      return 'Linux'
    }
    if (/android/i.test(ua)) {
      return 'Android'
    }
    if (/iphone|ipad|ipod/i.test(ua)) {
      return 'iOS'
    }
    return 'Other'
  }

  trackVisit() {
    try {
      const now = new Date()
      const date = now.toLocaleDateString('pl-PL')
      const device = this.detectDevice()
      const browser = this.detectBrowser()
      const os = this.detectOS()
      const deviceBrowser = `${device}_${browser}`

      console.log('[Analytics] Tracking visit:', {device, browser, os, deviceBrowser, date})

      this.stats.totalOpens++

      if (!this.stats.firstOpen) {
        this.stats.firstOpen = now.toISOString()
      }

      if (!this.stats.opensByDate[date]) {
        this.stats.opensByDate[date] = 0
      }
      this.stats.opensByDate[date]++

      if (!this.stats.opensByDevice[device]) {
        this.stats.opensByDevice[device] = 0
      }
      this.stats.opensByDevice[device]++

      if (!this.stats.opensByBrowser[browser]) {
        this.stats.opensByBrowser[browser] = 0
      }
      this.stats.opensByBrowser[browser]++

      if (!this.stats.opensByDeviceBrowser[deviceBrowser]) {
        this.stats.opensByDeviceBrowser[deviceBrowser] = 0
      }
      this.stats.opensByDeviceBrowser[deviceBrowser]++

      if (!this.stats.opensByOS[os]) {
        this.stats.opensByOS[os] = 0
      }
      this.stats.opensByOS[os]++

      this.saveStats()
      console.log('[Analytics] Visit tracked successfully. Total opens:', this.stats.totalOpens)
    } catch (error) {
      console.error('[Analytics] Error tracking visit:', error)
    }
  }

  getStats() {
    try {
      const daysCount = Object.keys(this.stats.opensByDate || {}).length
      const total = this.stats.totalOpens || 0

      // Oblicz procenty
      const calculatePercentage = (count) => {
        return total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0
      }

      // Formatuj device_browser do czytelnej formy
      const formatDeviceBrowser = (key) => {
        const [device, browser] = key.split('_')
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
        return `${deviceName} - ${browser}`
      }

      // Sortuj i przygotuj dane device_browser
      const deviceBrowserData = Object.entries(this.stats.opensByDeviceBrowser || {})
        .map(([key, count]) => ({
          key,
          label: formatDeviceBrowser(key),
          count,
          percentage: calculatePercentage(count)
        }))
        .sort((a, b) => b.count - a.count)

      // Sortuj i przygotuj dane OS
      const osData = Object.entries(this.stats.opensByOS || {})
        .map(([os, count]) => ({
          os,
          count,
          percentage: calculatePercentage(count)
        }))
        .sort((a, b) => b.count - a.count)

      // Sortuj i przygotuj dane urządzeń z procentami
      const deviceData = Object.entries(this.stats.opensByDevice || {})
        .map(([device, count]) => ({
          device,
          count,
          percentage: calculatePercentage(count)
        }))
        .sort((a, b) => b.count - a.count)

      // Sortuj i przygotuj dane przeglądarek z procentami
      const browserData = Object.entries(this.stats.opensByBrowser || {})
        .map(([browser, count]) => ({
          browser,
          count,
          percentage: calculatePercentage(count)
        }))
        .sort((a, b) => b.count - a.count)

      return {
        totalOpens: total,
        opensByDate: this.stats.opensByDate || {},
        opensByDevice: this.stats.opensByDevice || {},
        opensByBrowser: this.stats.opensByBrowser || {},
        opensByDeviceBrowser: this.stats.opensByDeviceBrowser || {},
        opensByOS: this.stats.opensByOS || {},
        firstOpen: this.stats.firstOpen || null,
        daysCount: daysCount,
        averagePerDay: total / Math.max(daysCount, 1),
        // Analiza
        deviceBrowserData,
        osData,
        deviceData,
        browserData
      }
    } catch (error) {
      console.error('[Analytics] Error getting stats:', error)
      return {
        totalOpens: 0,
        opensByDate: {},
        opensByDevice: {},
        opensByBrowser: {},
        opensByDeviceBrowser: {},
        opensByOS: {},
        firstOpen: null,
        daysCount: 0,
        averagePerDay: 0,
        deviceBrowserData: [],
        osData: [],
        deviceData: [],
        browserData: []
      }
    }
  }
}

export const analytics = new Analytics()
