#!/usr/bin/env node
/**
 * Skrypt sprawdzania błędów w aplikacji
 * Sprawdza wszystkie pliki JavaScript pod kątem potencjalnych błędów
 */

import {readdirSync, readFileSync, statSync} from 'fs'
import {join, extname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = new URL('.', import.meta.url).pathname

function findJSFiles(dir, fileList = []) {
  const files = readdirSync(dir)

  files.forEach(file => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findJSFiles(filePath, fileList)
    } else if (extname(file) === '.js' && !file.includes('.test.')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

function checkFile(filePath) {
  const errors = []
  const code = readFileSync(filePath, 'utf-8')

  // Sprawdź składnię
  try {
    new Function(code)
  } catch (error) {
    errors.push({
      file: filePath,
      type: 'syntax',
      message: error.message
    })
  }

  // Sprawdź potencjalne problemy
  const lines = code.split('\n')
  lines.forEach((line, index) => {
    const lineNum = index + 1

    // Sprawdź czy nie ma return poza funkcją
    if (line.trim().startsWith('return ') && !code.substring(0, code.indexOf(line)).match(/function|=>|\{[\s\S]*$/)) {
      errors.push({
        file: filePath,
        line: lineNum,
        type: 'warning',
        message: 'return poza funkcją'
      })
    }

    // Sprawdź czy nie ma console.log w produkcji
    if (line.includes('console.log(') && !filePath.includes('test')) {
      errors.push({
        file: filePath,
        line: lineNum,
        type: 'warning',
        message: 'console.log() w kodzie produkcyjnym'
      })
    }

    // Sprawdź czy nie ma debugger
    if (line.includes('debugger')) {
      errors.push({
        file: filePath,
        line: lineNum,
        type: 'error',
        message: 'debugger w kodzie'
      })
    }
  })

  return errors
}

function main() {
  console.log('🔍 Sprawdzanie błędów w aplikacji...\n')

  const srcDir = join(__dirname, '../src')
  const publicDir = join(__dirname, '../public')
  const allErrors = []

  // Sprawdź pliki w src
  if (statSync(srcDir).isDirectory()) {
    const srcFiles = findJSFiles(srcDir)
    srcFiles.forEach(file => {
      const errors = checkFile(file)
      allErrors.push(...errors)
    })
  }

  // Sprawdź pliki w public (Service Worker)
  if (statSync(publicDir).isDirectory()) {
    const publicFiles = findJSFiles(publicDir)
    publicFiles.forEach(file => {
      const errors = checkFile(file)
      allErrors.push(...errors)
    })
  }

  if (allErrors.length > 0) {
    console.error('❌ Znaleziono błędy:\n')
    allErrors.forEach(error => {
      const location = error.line ? `${error.file}:${error.line}` : error.file
      const icon = error.type === 'error' ? '❌' : '⚠️'
      console.error(`${icon} ${location}: ${error.message}`)
    })
    console.error('\n❌ Sprawdzanie zakończone z błędami!')
    process.exit(1)
  } else {
    console.log('✅ Nie znaleziono błędów!')
    console.log('✅ Sprawdzanie zakończone pomyślnie!')
  }
}

main()

