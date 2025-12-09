/**
 * ANALIZA DUPLIKATÓW KODU
 * Znajduje i raportuje duplikaty w kodzie
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const MIN_FILE_SIZE = 100 // Minimalny rozmiar pliku w znakach, aby uznać za duplikat

function normalizeCode(code) {
  // Usuń komentarze wieloliniowe
  code = code.replace(/\/\*[\s\S]*?\*\//g, '')
  // Usuń komentarze jednoliniowe
  code = code.replace(/\/\/.*/g, '')
  // Normalizuj białe znaki (zachowaj strukturę)
  code = code.replace(/\s+/g, ' ')
  // Usuń puste linie
  code = code.replace(/\n\s*\n/g, '\n')
  // Usuń wiodące i końcowe białe znaki
  code = code.trim()
  return code
}

function getCodeHash(code) {
  // Tworzy hash kodu dla szybkiego porównania
  let hash = 0
  for (let i = 0; i < code.length; i++) {
    const char = code.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

function findDuplicates(files) {
  const codeMap = new Map()
  const duplicates = []

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8')
      
      // Ignoruj bardzo małe pliki
      if (content.length < MIN_FILE_SIZE) return
      
      const normalized = normalizeCode(content)
      
      // Ignoruj jeśli po normalizacji jest za krótki
      if (normalized.length < MIN_FILE_SIZE) return
      
      const hash = getCodeHash(normalized)
      
      if (codeMap.has(hash)) {
        const existing = codeMap.get(hash)
        // Sprawdź czy to rzeczywiście duplikat (nie tylko hash collision)
        if (normalized === normalizeCode(fs.readFileSync(existing, 'utf-8'))) {
          duplicates.push({
            file,
            duplicateOf: existing,
            similarity: 100
          })
        }
      } else {
        codeMap.set(hash, file)
      }
    } catch (error) {
      // Skip file silently
    }
  })

  return duplicates
}

function findSimilarCode(files, threshold = 80) {
  const similarities = []
  const processed = new Set()
  
  for (let i = 0; i < files.length; i++) {
    try {
      const content1 = fs.readFileSync(files[i], 'utf-8')
      if (content1.length < MIN_FILE_SIZE) continue
      
      const normalized1 = normalizeCode(content1)
      if (normalized1.length < MIN_FILE_SIZE) continue
      
      const key1 = `${files[i]}-${normalized1.length}`
      if (processed.has(key1)) continue
      processed.add(key1)
      
      for (let j = i + 1; j < files.length; j++) {
        try {
          const content2 = fs.readFileSync(files[j], 'utf-8')
          if (content2.length < MIN_FILE_SIZE) continue
          
          const normalized2 = normalizeCode(content2)
          if (normalized2.length < MIN_FILE_SIZE) continue
          
          // Porównaj tylko pliki podobnej długości
          const lengthDiff = Math.abs(normalized1.length - normalized2.length)
          const avgLength = (normalized1.length + normalized2.length) / 2
          if (lengthDiff / avgLength > 0.5) continue // Różnica >50% długości
          
          const similarity = calculateSimilarity(normalized1, normalized2)
          if (similarity >= threshold) {
            similarities.push({
              file1: files[i],
              file2: files[j],
              similarity: Math.round(similarity)
            })
          }
        } catch (error) {
          // Skip file
        }
      }
    } catch (error) {
      // Skip file
    }
  }
  
  return similarities
}

function calculateSimilarity(str1, str2) {
  // Użyj prostszego algorytmu dla wydajności
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  
  if (longer.length === 0) return 100
  
  // Porównaj na podstawie wspólnych tokenów (słów)
  const tokens1 = new Set(longer.split(/\s+/).filter(t => t.length > 2))
  const tokens2 = new Set(shorter.split(/\s+/).filter(t => t.length > 2))
  
  let common = 0
  tokens1.forEach(token => {
    if (tokens2.has(token)) common++
  })
  
  const total = tokens1.size + tokens2.size
  if (total === 0) return 0
  
  return (common * 2 / total) * 100
}

function getAllFiles(dir, extensions = ['.js', '.py'], excludeDirs = ['node_modules', '.git', 'dist', '__pycache__', 'tests', 'docs']) {
  const files = []
  
  function walk(currentDir) {
    try {
      const entries = fs.readdirSync(currentDir, {withFileTypes: true})
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name)
        const relativePath = path.relative(ROOT_DIR, fullPath)
        
        if (entry.isDirectory()) {
          if (!excludeDirs.some(excl => relativePath.includes(excl))) {
            walk(fullPath)
          }
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath)
        }
      }
    } catch (error) {
      // Skip directory
    }
  }
  
  walk(dir)
  return files
}

function analyzeDuplicates() {
  console.log('🔍 Analiza duplikatów kodu...\n')
  
  const frontendFiles = getAllFiles(path.join(ROOT_DIR, 'frontend/src'), ['.js'])
  const backendFiles = getAllFiles(path.join(ROOT_DIR, 'backend'), ['.py'])
  
  console.log(`Znaleziono ${frontendFiles.length} plików frontend`)
  console.log(`Znaleziono ${backendFiles.length} plików backend\n`)
  
  // Znajdź dokładne duplikaty
  console.log('Szukanie dokładnych duplikatów...')
  const frontendDuplicates = findDuplicates(frontendFiles)
  const backendDuplicates = findDuplicates(backendFiles)
  
  // Znajdź podobny kod (tylko jeśli nie ma zbyt wielu plików)
  let frontendSimilar = []
  let backendSimilar = []
  
  if (frontendFiles.length < 50) {
    console.log('Szukanie podobnego kodu frontend...')
    frontendSimilar = findSimilarCode(frontendFiles, 75)
  }
  
  if (backendFiles.length < 50) {
    console.log('Szukanie podobnego kodu backend...')
    backendSimilar = findSimilarCode(backendFiles, 75)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('WYNIKI ANALIZY DUPLIKATÓW')
  console.log('='.repeat(60))
  
  if (frontendDuplicates.length > 0) {
    console.log('\n📋 DOKŁADNE DUPLIKATY FRONTEND:')
    frontendDuplicates.forEach((dup, idx) => {
      console.log(`${idx + 1}. ${path.relative(ROOT_DIR, dup.file)}`)
      console.log(`   Duplikat: ${path.relative(ROOT_DIR, dup.duplicateOf)}`)
    })
  } else {
    console.log('\n✅ Brak dokładnych duplikatów frontend')
  }
  
  if (backendDuplicates.length > 0) {
    console.log('\n📋 DOKŁADNE DUPLIKATY BACKEND:')
    backendDuplicates.forEach((dup, idx) => {
      console.log(`${idx + 1}. ${path.relative(ROOT_DIR, dup.file)}`)
      console.log(`   Duplikat: ${path.relative(ROOT_DIR, dup.duplicateOf)}`)
    })
  } else {
    console.log('\n✅ Brak dokładnych duplikatów backend')
  }
  
  if (frontendSimilar.length > 0) {
    console.log('\n📋 PODOBNY KOD FRONTEND (>75% podobieństwa):')
    frontendSimilar.slice(0, 10).forEach((sim, idx) => {
      console.log(`${idx + 1}. ${path.relative(ROOT_DIR, sim.file1)}`)
      console.log(`   vs ${path.relative(ROOT_DIR, sim.file2)}`)
      console.log(`   Podobieństwo: ${sim.similarity}%`)
    })
    if (frontendSimilar.length > 10) {
      console.log(`   ... i ${frontendSimilar.length - 10} więcej`)
    }
  } else {
    console.log('\n✅ Brak podobnego kodu frontend')
  }
  
  if (backendSimilar.length > 0) {
    console.log('\n📋 PODOBNY KOD BACKEND (>75% podobieństwa):')
    backendSimilar.slice(0, 10).forEach((sim, idx) => {
      console.log(`${idx + 1}. ${path.relative(ROOT_DIR, sim.file1)}`)
      console.log(`   vs ${path.relative(ROOT_DIR, sim.file2)}`)
      console.log(`   Podobieństwo: ${sim.similarity}%`)
    })
    if (backendSimilar.length > 10) {
      console.log(`   ... i ${backendSimilar.length - 10} więcej`)
    }
  } else {
    console.log('\n✅ Brak podobnego kodu backend')
  }
  
  const totalDuplicates = frontendDuplicates.length + backendDuplicates.length
  const totalSimilar = frontendSimilar.length + backendSimilar.length
  
  console.log('\n' + '='.repeat(60))
  console.log(`PODSUMOWANIE:`)
  console.log(`- Dokładne duplikaty: ${totalDuplicates}`)
  console.log(`- Podobny kod (>75%): ${totalSimilar}`)
  console.log('='.repeat(60))
  
  return {
    exactDuplicates: [...frontendDuplicates, ...backendDuplicates],
    similarCode: [...frontendSimilar, ...backendSimilar]
  }
}

// Uruchom jeśli plik jest wykonywany bezpośrednio
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('analyze-duplicates')) {
  analyzeDuplicates()
}

export {analyzeDuplicates, findDuplicates, findSimilarCode}
