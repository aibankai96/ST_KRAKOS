export function initScrollReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    return
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, observerOptions)

  // Observe sections
  const sections = document.querySelectorAll(':is(.services, .portfolio, .contact-page, .about-page, .ai-stats-section, .portfolio-section)')
  sections.forEach(section => {
    observer.observe(section)
  })

  // Observe containers
  const containers = document.querySelectorAll('.container')
  containers.forEach(container => {
    observer.observe(container)
  })

  // Observe grids
  const grids = document.querySelectorAll(':is(.services-grid, .portfolio-grid, .features-grid, .stats-grid)')
  grids.forEach(grid => {
    observer.observe(grid)
  })
}

