export function initPuzzleLoader() {
  const loader = document.getElementById('puzzle-loader')
  const grid = document.getElementById('puzzle-grid')
  const app = document.getElementById('app')

  if (!loader || !grid || !app) {
    return
  }

  const GRID_SIZE = 6
  const TOTAL_PIECES = GRID_SIZE * GRID_SIZE
  const PIECES_START_DELAY = 400
  const PIECE_ANIMATION_DURATION = 1800
  const FADE_OUT_DELAY = 2700

  function createPuzzlePieces() {
    grid.innerHTML = ''
    const centerX = GRID_SIZE / 2
    const centerY = GRID_SIZE / 2

    for (let i = 0; i < TOTAL_PIECES; i++) {
      const piece = document.createElement('div')
      piece.className = 'puzzle-piece'
      const row = Math.floor(i / GRID_SIZE)
      const col = i % GRID_SIZE
      const dx = row - centerX
      const dy = col - centerY
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dx, dy)
      const burstDistance = 150 + Math.random() * 100

      piece.style.setProperty('--piece-rotate', `${(Math.random() - 0.5) * 180}deg`)
      piece.style.setProperty('--piece-x', `${Math.cos(angle) * burstDistance + (Math.random() - 0.5) * 30}px`)
      piece.style.setProperty('--piece-y', `${Math.sin(angle) * burstDistance + (Math.random() - 0.5) * 30}px`)
      piece.style.setProperty('--piece-scale', `${0.2 + Math.random() * 0.3}`)
      piece.style.setProperty('--glow-intensity', `${0.2 + Math.random() * 0.2}`)
      piece.style.animation = `puzzle-piece-assemble ${PIECE_ANIMATION_DURATION}ms ease-out ${PIECES_START_DELAY + distanceFromCenter * 35 + Math.random() * 30}ms forwards`

      grid.appendChild(piece)
    }
  }

  function hideLoader() {
    loader.classList.add('hiding')
    setTimeout(() => {
      loader.style.display = 'none'
      app.classList.add('loaded')
    }, 500)
  }

  createPuzzlePieces()

  setTimeout(hideLoader, FADE_OUT_DELAY + 200)
}
