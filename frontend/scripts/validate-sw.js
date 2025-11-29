#!/usr/bin/env node
/**
 * Skrypt walidacji Service Worker
 * Sprawdza składnię i strukturę Service Worker przed buildem
 */

import {readFileSync} from 'fs'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const swPath = join(__dirname, '../public/sw.js')

function validateServiceWorker() {
  console.log('🔍 Walidacja Service Worker...\n')

  try {
    const swCode = readFileSync(swPath, 'utf-8')
    const errors = []

    // 1. Sprawdź składnię
    try {
      new Function(swCode)
    } catch (error) {
      errors.push(`❌ Błąd składni: ${error.message}`)
    }

    // 2. Sprawdź czy clients.claim() jest wewnątrz event.waitUntil()
    if (!swCode.includes("addEventListener('activate'")) {
      errors.push('❌ Brak activate event listener')
    } else {
      // Sprawdź czy jest event.waitUntil w activate
      const activateStart = swCode.indexOf("addEventListener('activate'")
      if (activateStart === -1) {
        errors.push('❌ Brak activate event listener')
      } else {
        // Znajdź koniec bloku activate - szukaj zamykającego nawiasu
        let braceCount = 0
        let inString = false
        let activateEnd = activateStart
        for (let i = activateStart; i < swCode.length; i++) {
          const char = swCode[i]
          if (char === '"' || char === "'") {
            inString = !inString
          } else if (!inString) {
            if (char === '{') braceCount++
            if (char === '}') braceCount--
            if (braceCount === 0 && char === '}') {
              activateEnd = i + 1
              break
            }
          }
        }
        const activateCode = swCode.substring(activateStart, activateEnd)
        const waitUntilIndex = activateCode.indexOf('event.waitUntil')
        const claimIndex = activateCode.includes('self.clients.claim()') ? activateCode.indexOf('self.clients.claim()') : (activateCode.includes('clients.claim()') ? activateCode.indexOf('clients.claim()') : -1)

        if (waitUntilIndex === -1) {
          errors.push('❌ Brak event.waitUntil() w activate listener')
        } else if (claimIndex === -1) {
          errors.push('❌ Brak self.clients.claim() lub clients.claim() w activate listener')
        } else {
          // Sprawdź czy claim jest wewnątrz waitUntil - znajdź zakres waitUntil
          const waitUntilStart = activateCode.indexOf('event.waitUntil(', waitUntilIndex)
          let waitUntilEnd = waitUntilStart
          braceCount = 0
          inString = false
          for (let i = waitUntilStart; i < activateCode.length; i++) {
            const char = activateCode[i]
            if (char === '"' || char === "'") {
              inString = !inString
            } else if (!inString) {
              if (char === '(') braceCount++
              if (char === ')') braceCount--
              if (braceCount === 0 && char === ')') {
                waitUntilEnd = i + 1
                break
              }
            }
          }
          if (claimIndex < waitUntilStart || claimIndex > waitUntilEnd) {
            errors.push('❌ self.clients.claim() musi być wewnątrz event.waitUntil()')
          }
        }
      }
    }

    // 3. Sprawdź czy są wszystkie wymagane event listenery
    if (!swCode.includes("addEventListener('install'")) {
      errors.push('❌ Brak install event listener')
    }
    if (!swCode.includes("addEventListener('fetch'")) {
      errors.push('❌ Brak fetch event listener')
    }

    // 4. Sprawdź czy są wymagane stałe
    if (!swCode.match(/const\s+CACHE_NAME\s*=/)) {
      errors.push('❌ Brak CACHE_NAME')
    }
    if (!swCode.match(/const\s+BASE_PATH\s*=/)) {
      errors.push('❌ Brak BASE_PATH')
    }

    // 5. Sprawdź bezpieczeństwo
    if (!swCode.match(/if\s*\([^)]*method\s*!==\s*['"]GET['"]/)) {
      errors.push('⚠️  Brak sprawdzania metody request w fetch')
    }

    if (errors.length > 0) {
      console.error('❌ Błędy w Service Worker:\n')
      errors.forEach(error => console.error(`  ${error}`))
      console.error('\n❌ Walidacja nie powiodła się!')
      process.exit(1)
    } else {
      console.log('✅ Service Worker jest poprawny!')
      console.log('   ✓ Składnia poprawna')
      console.log('   ✓ Struktura poprawna')
      console.log('   ✓ Bezpieczeństwo OK')
      console.log('\n✅ Walidacja zakończona pomyślnie!')
    }
  } catch (error) {
    console.error(`❌ Błąd podczas walidacji: ${error.message}`)
    process.exit(1)
  }
}

validateServiceWorker()

