/**
 * TESTY SERVICE WORKER
 * Sprawdzanie poprawności składni i działania Service Worker
 */

describe('Service Worker Tests', () => {
  let swCode

  beforeAll(async () => {
    // Wczytaj kod Service Worker
    const response = await fetch('/sw.js')
    swCode = await response.text()
  })

  describe('Składnia Service Worker', () => {
    test('Service Worker ma poprawną składnię', () => {
      expect(() => {
        // Sprawdź czy kod można sparsować
        new Function(swCode)
      }).not.toThrow()
    })

    test('Service Worker ma event listener install', () => {
      expect(swCode).toContain('addEventListener(\'install\'')
      expect(swCode).toContain('event.waitUntil')
    })

    test('Service Worker ma event listener activate', () => {
      expect(swCode).toContain('addEventListener(\'activate\'')
      expect(swCode).toContain('event.waitUntil')
    })

    test('Service Worker ma event listener fetch', () => {
      expect(swCode).toContain('addEventListener(\'fetch\'')
    })

    test('self.clients.claim() jest wewnątrz event.waitUntil()', () => {
      const activateMatch = swCode.match(/addEventListener\('activate',[\s\S]*?\)/g)
      if (activateMatch) {
        const activateCode = activateMatch[0]
        // Sprawdź czy clients.claim() jest wewnątrz waitUntil
        const waitUntilIndex = activateCode.indexOf('event.waitUntil')
        const claimIndex = activateCode.indexOf('clients.claim()')
        const waitUntilEnd = activateCode.lastIndexOf('})', waitUntilIndex)
        
        expect(waitUntilIndex).not.toBe(-1)
        expect(claimIndex).not.toBe(-1)
        expect(claimIndex).toBeGreaterThan(waitUntilIndex)
        expect(claimIndex).toBeLessThan(waitUntilEnd)
      }
    })

    test('Brak return poza event.waitUntil() w activate', () => {
      const activateMatch = swCode.match(/addEventListener\('activate',[\s\S]*?\)/g)
      if (activateMatch) {
        const activateCode = activateMatch[0]
        const waitUntilEnd = activateCode.lastIndexOf('})')
        const codeAfterWaitUntil = activateCode.substring(waitUntilEnd + 2)
        
        // Sprawdź czy nie ma return poza waitUntil
        const returnMatch = codeAfterWaitUntil.match(/^\s*return\s+/m)
        expect(returnMatch).toBeNull()
      }
    })
  })

  describe('Struktura Service Worker', () => {
    test('Service Worker definiuje CACHE_NAME', () => {
      expect(swCode).toMatch(/const\s+CACHE_NAME\s*=/)
    })

    test('Service Worker definiuje BASE_PATH', () => {
      expect(swCode).toMatch(/const\s+BASE_PATH\s*=/)
    })

    test('Service Worker ma urlsToCache', () => {
      expect(swCode).toMatch(/const\s+urlsToCache\s*=/)
    })

    test('Service Worker używa skipWaiting w install', () => {
      expect(swCode).toContain('self.skipWaiting()')
    })
  })

  describe('Bezpieczeństwo Service Worker', () => {
    test('Service Worker sprawdza metodę request w fetch', () => {
      expect(swCode).toMatch(/if\s*\([^)]*method\s*!==\s*['"]GET['"]/)
    })

    test('Service Worker sprawdza status response przed cache', () => {
      expect(swCode).toMatch(/response\.status\s*!==\s*200/)
    })
  })
})

