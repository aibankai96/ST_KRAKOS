const STORAGE_KEY = 'st_kratos_analytics'

class Analytics {
  constructor() {
    try {
      this.stats = this.loadStats()
      setTimeout(() => this.trackVisit(), 100)
    } catch (error) {
      console.error('[Analytics] Error initializing:', error)
      this.stats = this.loadStats()
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
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      return 'tablet'
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
      return 'mobile'
    }
    return 'desktop'
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

  trackVisit() {
    try {
      const now = new Date()
      const date = now.toLocaleDateString('pl-PL')
      const device = this.detectDevice()
      const browser = this.detectBrowser()

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

      this.saveStats()
    } catch (error) {
      console.error('[Analytics] Error tracking visit:', error)
    }
  }

  getStats() {
    try {
      const daysCount = Object.keys(this.stats.opensByDate || {}).length
      return {
        totalOpens: this.stats.totalOpens || 0,
        opensByDate: this.stats.opensByDate || {},
        opensByDevice: this.stats.opensByDevice || {},
        opensByBrowser: this.stats.opensByBrowser || {},
        firstOpen: this.stats.firstOpen || null,
        daysCount: daysCount,
        averagePerDay: (this.stats.totalOpens || 0) / Math.max(daysCount, 1)
      }
    } catch (error) {
      console.error('[Analytics] Error getting stats:', error)
      return {
        totalOpens: 0,
        opensByDate: {},
        opensByDevice: {},
        opensByBrowser: {},
        firstOpen: null,
        daysCount: 0,
        averagePerDay: 0
      }
    }
  }
}

export const analytics = new Analytics()
