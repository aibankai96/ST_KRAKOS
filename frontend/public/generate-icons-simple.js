// Prosty generator ikon PWA dla ST KRAKOS
// Tworzy ikony bez zewnętrznych bibliotek

const fs = require('fs')
const path = require('path')

// Kolory
const BG_COLOR = '#0a0e27' // Ciemny niebieski
const TEXT_COLOR = '#FFD700' // Złoty

// Funkcja do tworzenia prostego SVG
function createSVGIcon(size) {
  const fontSize = size / 4
  const fontSizeSmall = size / 8

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${BG_COLOR}"/>
  <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="${TEXT_COLOR}" text-anchor="middle" dominant-baseline="middle">ST</text>
  <text x="50%" y="70%" font-family="Arial, sans-serif" font-size="${fontSizeSmall}" font-weight="bold" fill="${TEXT_COLOR}" text-anchor="middle" dominant-baseline="middle">KRAKOS</text>
</svg>`
}

// Funkcja do konwersji SVG na PNG używając prostego rozwiązania
// Uwaga: To wymaga zewnętrznego narzędzia lub biblioteki
// Alternatywnie, możemy użyć prostego rozwiązania z base64

console.log('⚠️ Uwaga: Ten skrypt tworzy tylko SVG.')
console.log('Do konwersji SVG → PNG użyj:')
console.log('  1. Generator online: https://cloudconvert.com/svg-to-png')
console.log('  2. Lub zainstaluj: npm install sharp')
console.log('\nTworzenie tymczasowych plików SVG...')

// Utworzenie tymczasowych SVG
const svg192 = createSVGIcon(192)
const svg512 = createSVGIcon(512)

fs.writeFileSync(path.join(__dirname, 'icon-temp-192.svg'), svg192)
fs.writeFileSync(path.join(__dirname, 'icon-temp-512.svg'), svg512)

console.log('✅ Utworzono tymczasowe pliki SVG:')
console.log('  - icon-temp-192.svg')
console.log('  - icon-temp-512.svg')
console.log('\nNastępnie użyj konwertera online do konwersji na PNG.')

