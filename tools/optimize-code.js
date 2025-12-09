/**
 * BEZPIECZNA OPTYMALIZACJA KODU
 * Skraca kod z 5 linii do 1, ale tylko gdy jest bezpieczne
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

function isSafeToOptimize(code, originalLines) {
  // Nie optymalizuj jeśli:
  // 1. Zawiera komentarze wieloliniowe
  if (code.includes('/*') && code.includes('*/')) return false
  
  // 2. Zawiera złożone wyrażenia warunkowe (więcej niż 2 ternarne)
  if ((code.match(/\?/g) || []).length > 2) return false
  
  // 3. Zawiera wiele zagnieżdżonych funkcji
  const openBraces = (code.match(/\{/g) || []).length
  const closeBraces = (code.match(/\}/g) || []).length
  if (openBraces > 5 || closeBraces > 5) return false
  
  // 4. Zawiera try-catch
  if (code.includes('try') || code.includes('catch')) return false
  
  // 5. Zawiera async/await
  if (code.includes('async') || code.includes('await')) return false
  
  // 6. Zawiera eval lub Function constructor
  if (code.includes('eval(') || code.includes('new Function')) return false
  
  // 7. Zawiera template literals z wyrażeniami
  if ((code.match(/\$\{/g) || []).length > 3) return false
  
  return true
}

function optimizeCodeBlock(lines) {
  if (lines.length < 3) return null
  
  const code = lines.join(' ').trim()
  
  // Proste przypadki optymalizacji
  const optimizations = []
  
  // 1. Proste return statements (3-5 linii)
  const returnPattern = /return\s+([^;]+);\s*$/
  if (returnPattern.test(code) && lines.length <= 5) {
    const match = code.match(returnPattern)
    if (match && isSafeToOptimize(code, lines.length)) {
      optimizations.push(`return ${match[1].trim()}`)
    }
  }
  
  // 2. Proste if-else return (4-5 linii)
  const ifElsePattern = /if\s*\(([^)]+)\)\s*{\s*return\s+([^}]+);\s*}\s*else\s*{\s*return\s+([^}]+);\s*}/
  if (ifElsePattern.test(code) && lines.length <= 5) {
    const match = code.match(ifElsePattern)
    if (match && isSafeToOptimize(code, lines.length)) {
      optimizations.push(`return ${match[1].trim()} ? ${match[2].trim()} : ${match[3].trim()}`)
    }
  }
  
  // 3. Proste const assignments (2-3 linie)
  const constPattern = /const\s+(\w+)\s*=\s*([^;]+);/
  if (constPattern.test(code) && lines.length <= 3) {
    const match = code.match(constPattern)
    if (match && isSafeToOptimize(code, lines.length)) {
      optimizations.push(`const ${match[1]}=${match[2].trim()}`)
    }
  }
  
  // 4. Proste object destructuring (2-3 linie)
  const destructurePattern = /const\s+\{([^}]+)\}\s*=\s*([^;]+);/
  if (destructurePattern.test(code) && lines.length <= 3) {
    const match = code.match(destructurePattern)
    if (match && isSafeToOptimize(code, lines.length)) {
      optimizations.push(`const {${match[1].trim()}}=${match[2].trim()}`)
    }
  }
  
  // Zwróć najlepszą optymalizację (najkrótszą)
  if (optimizations.length > 0) {
    return optimizations.sort((a, b) => a.length - b.length)[0]
  }
  
  return null
}

function optimizeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    const optimized = []
    let i = 0
    let changes = 0
    
    while (i < lines.length) {
      const line = lines[i]
      
      // Skip comments and empty lines
      if (line.trim().startsWith('//') || line.trim() === '') {
        optimized.push(line)
        i++
        continue
      }
      
      // Look for blocks that can be optimized (3-5 lines)
      if (i + 2 < lines.length && i + 4 < lines.length) {
        const block = lines.slice(i, Math.min(i + 5, lines.length))
        const blockCode = block.join(' ').trim()
        
        // Sprawdź czy blok kończy się średnikiem lub nawiasem
        const lastLine = block[block.length - 1]
        const isCompleteBlock = lastLine.trim().endsWith(';') || 
                                lastLine.trim().endsWith('}') ||
                                lastLine.trim().endsWith(')')
        
        if (isCompleteBlock && isSafeToOptimize(blockCode, block.length)) {
          const optimizedBlock = optimizeCodeBlock(block)
          if (optimizedBlock && optimizedBlock.length < blockCode.length * 0.8) {
            optimized.push(optimizedBlock)
            i += block.length
            changes++
            continue
          }
        }
      }
      
      optimized.push(line)
      i++
    }
    
    const newContent = optimized.join('\n')
    
    // Only return if there's actual optimization (co najmniej 5% redukcji)
    if (changes > 0 && newContent.length < content.length * 0.95) {
      return {
        original: content,
        optimized: newContent,
        saved: content.length - newContent.length,
        changes: changes,
        file: filePath
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message)
    return null
  }
}

function getAllFiles(dir, extensions = ['.js', '.py'], excludeDirs = ['node_modules', '.git', 'dist', '__pycache__', 'tests']) {
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

function optimizeProject(dryRun = true) {
  console.log('🔧 Bezpieczna optymalizacja kodu...\n')
  console.log(`Tryb: ${dryRun ? 'DRY RUN (bez zapisu)' : 'ZAPIS ZMIAN'}\n`)
  
  const frontendFiles = getAllFiles(path.join(ROOT_DIR, 'frontend/src'), ['.js'])
  const backendFiles = getAllFiles(path.join(ROOT_DIR, 'backend'), ['.py'])
  
  const results = []
  
  console.log('Optymalizacja plików frontend...')
  frontendFiles.forEach(file => {
    const result = optimizeFile(file)
    if (result) {
      results.push(result)
      console.log(`  ✓ ${path.relative(ROOT_DIR, file)} - ${result.changes} zmian, zaoszczędzono ${result.saved} znaków`)
    }
  })
  
  console.log('\nOptymalizacja plików backend...')
  backendFiles.forEach(file => {
    const result = optimizeFile(file)
    if (result) {
      results.push(result)
      console.log(`  ✓ ${path.relative(ROOT_DIR, file)} - ${result.changes} zmian, zaoszczędzono ${result.saved} znaków`)
    }
  })
  
  console.log('\n' + '='.repeat(60))
  console.log('PODSUMOWANIE OPTYMALIZACJI')
  console.log('='.repeat(60))
  console.log(`- Zoptymalizowanych plików: ${results.length}`)
  if (results.length > 0) {
    console.log(`- Zaoszczędzone znaki: ${results.reduce((sum, r) => sum + r.saved, 0)}`)
    console.log(`- Średnia redukcja: ${Math.round(results.reduce((sum, r) => sum + (r.saved / r.original.length * 100), 0) / results.length)}%`)
    console.log(`- Łączna liczba zmian: ${results.reduce((sum, r) => sum + r.changes, 0)}`)
  } else {
    console.log('✅ Brak możliwości optymalizacji (kod już zoptymalizowany lub niebezpieczne do optymalizacji)')
  }
  
  if (!dryRun && results.length > 0) {
    console.log('\n⚠️  UWAGA: Zapisuję zmiany...')
    results.forEach(result => {
      fs.writeFileSync(result.file, result.optimized, 'utf-8')
      console.log(`  ✓ Zapisano: ${path.relative(ROOT_DIR, result.file)}`)
    })
    console.log('\n✅ Wszystkie zmiany zapisane. Uruchom testy aby upewnić się, że wszystko działa!')
  } else if (dryRun && results.length > 0) {
    console.log('\n💡 Uruchom z --write aby zapisać zmiany')
  }
  
  console.log('='.repeat(60))
  
  return results
}

// Uruchom jeśli plik jest wykonywany bezpośrednio
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('optimize-code')) {
  const dryRun = !process.argv.includes('--write')
  optimizeProject(dryRun)
}

export {optimizeFile, optimizeProject, isSafeToOptimize}
