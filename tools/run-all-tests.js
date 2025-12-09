/**
 * GŁÓWNY SKRYPT URUCHAMIAJĄCY WSZYSTKIE TESTY I ANALIZY
 */

import {exec} from 'child_process'
import {promisify} from 'util'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

async function runCommand(command, cwd = ROOT_DIR) {
  try {
    const {stdout, stderr} = await execAsync(command, {cwd})
    return {success: true, stdout, stderr}
  } catch (error) {
    return {success: false, error: error.message, stdout: error.stdout, stderr: error.stderr}
  }
}

async function runFrontendTests() {
  console.log('\n' + '='.repeat(60))
  console.log('🧪 TESTY FRONTEND')
  console.log('='.repeat(60))
  
  const results = []
  
  // Testy jednostkowe i integracyjne
  console.log('\n1. Uruchamianie testów jednostkowych i integracyjnych...')
  const unitResult = await runCommand('npm test -- frontend/tests/comprehensive-all-types.test.js', path.join(ROOT_DIR, 'frontend'))
  results.push({name: 'Testy jednostkowe i integracyjne', ...unitResult})
  
  // Testy kompatybilności zakładek
  console.log('\n2. Uruchamianie testów kompatybilności zakładek...')
  const compatResult = await runCommand('npm test -- frontend/tests/tab-compatibility.test.js', path.join(ROOT_DIR, 'frontend'))
  results.push({name: 'Testy kompatybilności zakładek', ...compatResult})
  
  // Testy struktury
  console.log('\n3. Uruchamianie testów struktury...')
  const structureResult = await runCommand('npm test -- frontend/tests/structure.test.js', path.join(ROOT_DIR, 'frontend'))
  results.push({name: 'Testy struktury', ...structureResult})
  
  return results
}

async function runBackendTests() {
  console.log('\n' + '='.repeat(60))
  console.log('🧪 TESTY BACKEND')
  console.log('='.repeat(60))
  
  const results = []
  
  console.log('\n1. Uruchamianie testów backend...')
  const backendResult = await runCommand('pytest backend/tests/test_comprehensive.py -v', ROOT_DIR)
  results.push({name: 'Testy backend', ...backendResult})
  
  return results
}

async function runAnalyses() {
  console.log('\n' + '='.repeat(60))
  console.log('📊 ANALIZY KODU')
  console.log('='.repeat(60))
  
  const results = []
  
  // Analiza duplikatów
  console.log('\n1. Analiza duplikatów...')
  const duplicatesResult = await runCommand('node tools/analyze-duplicates.js', ROOT_DIR)
  results.push({name: 'Analiza duplikatów', ...duplicatesResult})
  
  // Analiza nieużywanych plików
  console.log('\n2. Analiza nieużywanych plików...')
  const unusedResult = await runCommand('node tools/analyze-unused-files.js', ROOT_DIR)
  results.push({name: 'Analiza nieużywanych plików', ...unusedResult})
  
  // Optymalizacja kodu (dry run)
  console.log('\n3. Analiza optymalizacji kodu (dry run)...')
  const optimizeResult = await runCommand('node tools/optimize-code.js', ROOT_DIR)
  results.push({name: 'Analiza optymalizacji', ...optimizeResult})
  
  return results
}

function generateReport(testResults, analysisResults) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: testResults.length,
      passedTests: testResults.filter(r => r.success).length,
      failedTests: testResults.filter(r => !r.success).length,
      analyses: analysisResults.length
    },
    tests: testResults,
    analyses: analysisResults
  }
  
  const reportPath = path.join(ROOT_DIR, 'TEST_REPORT.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  console.log('\n' + '='.repeat(60))
  console.log('📋 RAPORT TESTOW')
  console.log('='.repeat(60))
  console.log(`\nZapisano raport do: ${reportPath}`)
  console.log(`\nPodsumowanie:`)
  console.log(`- Testy: ${report.summary.passedTests}/${report.summary.totalTests} przeszły`)
  console.log(`- Analizy: ${report.summary.analyses} wykonane`)
  
  return report
}

async function main() {
  console.log('🚀 URUCHAMIANIE WSZYSTKICH TESTÓW I ANALIZ')
  console.log('='.repeat(60))
  
  try {
    // Testy frontend
    const frontendResults = await runFrontendTests()
    
    // Testy backend
    const backendResults = await runBackendTests()
    
    // Analizy
    const analysisResults = await runAnalyses()
    
    // Generuj raport
    const allResults = [...frontendResults, ...backendResults]
    const report = generateReport(allResults, analysisResults)
    
    console.log('\n✅ WSZYSTKIE TESTY I ANALIZY ZAKOŃCZONE')
    console.log('='.repeat(60))
    
    // Podsumowanie
    const totalPassed = report.summary.passedTests
    const totalTests = report.summary.totalTests
    
    if (totalPassed === totalTests) {
      console.log('\n🎉 WSZYSTKIE TESTY PRZESZŁY POMYŚLNIE!')
    } else {
      console.log(`\n⚠️  ${totalTests - totalPassed} TESTÓW NIE PRZESZŁO`)
    }
    
  } catch (error) {
    console.error('\n❌ BŁĄD PODCZAS URUCHAMIANIA TESTÓW:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export {runFrontendTests, runBackendTests, runAnalyses, generateReport}

