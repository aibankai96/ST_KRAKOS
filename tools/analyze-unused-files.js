/**
 * ANALIZA NIEUŻYWANYCH PLIKÓW
 * Znajduje pliki, które nie są używane w projekcie
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

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

function extractImports(content, filePath) {
  const imports = new Set()
  const ext = path.extname(filePath)
  
  if (ext === '.js') {
    // ES6 imports - różne formaty
    const importPatterns = [
      /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
      /import\s+['"]([^'"]+)['"]/g,
      /require\(['"]([^'"]+)['"]\)/g,
      /import\(['"]([^'"]+)['"]\)/g
    ]
    
    importPatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        imports.add(match[1])
      }
    })
  } else if (ext === '.py') {
    // Python imports
    const importPatterns = [
      /from\s+([\w.]+)\s+import/g,
      /import\s+([\w.]+)/g
    ]
    
    importPatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        imports.add(match[1])
      }
    })
  }
  
  return Array.from(imports)
}

function resolveImportPath(importPath, fromFile) {
  const dir = path.dirname(fromFile)
  const ext = path.extname(fromFile)
  const isJS = ext === '.js'
  
  // Ignoruj node_modules i inne zewnętrzne moduły
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    return null
  }
  
  // Handle relative imports
  if (importPath.startsWith('.')) {
    const possiblePaths = []
    
    // Bezpośrednia ścieżka z rozszerzeniem
    const directPath = path.resolve(dir, importPath)
    possiblePaths.push(directPath)
    
    // Z rozszerzeniem .js/.py
    if (isJS) {
      possiblePaths.push(directPath + '.js')
      possiblePaths.push(directPath + '.mjs')
      // Sprawdź index.js
      possiblePaths.push(path.join(directPath, 'index.js'))
    } else {
      possiblePaths.push(directPath + '.py')
      // Sprawdź __init__.py
      possiblePaths.push(path.join(directPath, '__init__.py'))
    }
    
    // Sprawdź wszystkie możliwe ścieżki
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        return possiblePath
      }
    }
    
    // Jeśli nie znaleziono, zwróć najbardziej prawdopodobną ścieżkę
    return directPath
  }
  
  return null
}

function buildDependencyGraph(files) {
  const graph = new Map()
  const fileToModule = new Map()
  
  // Map files to module names (bez rozszerzenia)
  files.forEach(file => {
    const relative = path.relative(ROOT_DIR, file)
    const moduleName = relative.replace(/\\/g, '/').replace(/\.(js|py)$/, '')
    fileToModule.set(file, moduleName)
  })
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8')
      const imports = extractImports(content, file)
      const dependencies = []
      
      imports.forEach(imp => {
        const resolved = resolveImportPath(imp, file)
        if (resolved && fs.existsSync(resolved)) {
          dependencies.push(resolved)
        } else {
          // Spróbuj znaleźć przez nazwę modułu
          const moduleName = imp.replace(/^\.\//, '').replace(/\/$/, '')
          files.forEach(f => {
            const fModule = fileToModule.get(f)
            if (fModule && fModule.endsWith(moduleName)) {
              dependencies.push(f)
            }
          })
        }
      })
      
      graph.set(file, dependencies)
    } catch (error) {
      graph.set(file, [])
    }
  })
  
  return graph
}

function findUnusedFiles(files, entryPoints = []) {
  const graph = buildDependencyGraph(files)
  const used = new Set()
  
  // Default entry points
  const defaultEntries = [
    path.join(ROOT_DIR, 'frontend/src/main.js'),
    path.join(ROOT_DIR, 'backend/app.py'),
    path.join(ROOT_DIR, 'frontend/index.html')
  ]
  
  // Add all entry points
  const allEntries = [...entryPoints, ...defaultEntries]
  allEntries.forEach(entry => {
    if (fs.existsSync(entry)) {
      used.add(entry)
    }
  })
  
  // BFS to find all used files
  const queue = Array.from(used)
  while (queue.length > 0) {
    const current = queue.shift()
    const deps = graph.get(current) || []
    
    deps.forEach(dep => {
      if (fs.existsSync(dep) && !used.has(dep)) {
        used.add(dep)
        queue.push(dep)
      }
    })
  }
  
  // Find unused files (wyklucz pliki specjalne)
  const unused = files.filter(file => {
    const fileName = path.basename(file)
    const relativePath = path.relative(ROOT_DIR, file)
    
    // Wyklucz pliki specjalne
    if (fileName.includes('test') || fileName.includes('spec')) return false
    if (fileName.includes('config') || fileName.includes('setup')) return false
    if (fileName === 'main.js' || fileName === 'app.py') return false
    if (relativePath.includes('__init__')) return false
    
    return !used.has(file)
  })
  
  return unused
}

function analyzeUnusedFiles() {
  console.log('🔍 Analiza nieużywanych plików...\n')
  
  const frontendFiles = getAllFiles(path.join(ROOT_DIR, 'frontend/src'), ['.js'])
  const backendFiles = getAllFiles(path.join(ROOT_DIR, 'backend'), ['.py'])
  
  console.log(`Znaleziono ${frontendFiles.length} plików frontend`)
  console.log(`Znaleziono ${backendFiles.length} plików backend\n`)
  
  const entryPoints = [
    path.join(ROOT_DIR, 'frontend/src/main.js'),
    path.join(ROOT_DIR, 'backend/app.py')
  ]
  
  console.log('Budowanie grafu zależności...')
  const frontendUnused = findUnusedFiles(frontendFiles, entryPoints)
  const backendUnused = findUnusedFiles(backendFiles, entryPoints)
  
  console.log('\n' + '='.repeat(60))
  console.log('WYNIKI ANALIZY NIEUŻYWANYCH PLIKÓW')
  console.log('='.repeat(60))
  
  if (frontendUnused.length > 0) {
    console.log('\n📋 NIEUŻYWANE PLIKI FRONTEND:')
    frontendUnused.forEach((file, idx) => {
      console.log(`${idx + 1}. ${path.relative(ROOT_DIR, file)}`)
    })
  } else {
    console.log('\n✅ Wszystkie pliki frontend są używane')
  }
  
  if (backendUnused.length > 0) {
    console.log('\n📋 NIEUŻYWANE PLIKI BACKEND:')
    backendUnused.forEach((file, idx) => {
      console.log(`${idx + 1}. ${path.relative(ROOT_DIR, file)}`)
    })
  } else {
    console.log('\n✅ Wszystkie pliki backend są używane')
  }
  
  console.log('\n' + '='.repeat(60))
  console.log(`PODSUMOWANIE:`)
  console.log(`- Nieużywane pliki frontend: ${frontendUnused.length}`)
  console.log(`- Nieużywane pliki backend: ${backendUnused.length}`)
  console.log('\n⚠️  UWAGA: Przed usunięciem plików upewnij się, że:')
  console.log('   1. Nie są używane dynamicznie (np. przez eval, require dynamic)')
  console.log('   2. Nie są potrzebne w przyszłości')
  console.log('   3. Nie są używane przez zewnętrzne narzędzia')
  console.log('='.repeat(60))
  
  return {
    frontendUnused,
    backendUnused
  }
}

// Uruchom jeśli plik jest wykonywany bezpośrednio
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('analyze-unused-files')) {
  analyzeUnusedFiles()
}

export {analyzeUnusedFiles, findUnusedFiles}
