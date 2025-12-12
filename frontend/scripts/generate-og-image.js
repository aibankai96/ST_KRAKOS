import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const width = 1200
const height = 630

// SVG z gradientem i tekstem
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a1f3a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f1419;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="0" dy="0" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  <text x="${width/2}" y="250" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#FFD700" text-anchor="middle" filter="url(#shadow)">ST KRATOS</text>
  <text x="${width/2}" y="340" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="rgba(255,255,255,0.95)" text-anchor="middle">Innowacyjne rozwiązania AI</text>
  <text x="${width/2}" y="400" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.75)" text-anchor="middle">Strony internetowe • Aplikacje webowe • Rozwiązania IT</text>
  <line x1="200" y1="480" x2="1000" y2="480" stroke="#FFD700" stroke-width="4" filter="url(#shadow)"/>
  <text x="${width/2}" y="530" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.6)" text-anchor="middle">Wykorzystujemy najnowsze technologie AI</text>
</svg>
`

async function generateOGImage() {
  try {
    const outputPath = join(__dirname, '../public/og-image.png')
    
    // Konwersja SVG do PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer()
    
    writeFileSync(outputPath, pngBuffer)
    console.log(`✅ Utworzono: ${outputPath} (${width}x${height}px)`)
  } catch (error) {
    console.error('❌ Błąd podczas generowania obrazka:', error)
    process.exit(1)
  }
}

generateOGImage()

