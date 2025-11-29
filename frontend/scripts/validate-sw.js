#!/usr/bin/env node
/**
 * Skrypt walidacji Service Worker
 * Sprawdza składnię i strukturę Service Worker przed buildem
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

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
    const activateMatch = swCode.match(/addEventListener\('activate',[\s\S]*?\)/g)
    if (activateMatch) {
      const activateCode = activateMatch[0]
      const waitUntilIndex = activateCode.indexOf('event.waitUntil')
      const claimIndex = activateCode.indexOf('clients.claim()')
      const waitUntilEnd = activateCode.lastIndexOf('})', waitUntilIndex)

      if (waitUntilIndex === -1) {
        errors.push('❌ Brak event.waitUntil() w activate listener')
      } else if (claimIndex === -1) {
        errors.push('❌ Brak self.clients.claim() w activate listener')
      } else if (claimIndex <= waitUntilIndex || claimIndex >= waitUntilEnd) {
        errors.push('❌ self.clients.claim() musi być wewnątrz event.waitUntil()')
      }

      // Sprawdź czy nie ma return poza waitUntil
      const codeAfterWaitUntil = activateCode.substring(waitUntilEnd + 2)
      if (codeAfterWaitUntil.match(/^\s*return\s+/m)) {
        errors.push('❌ return poza event.waitUntil() w activate listener')
      }
    } else {
      errors.push('❌ Brak activate event listener')
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

