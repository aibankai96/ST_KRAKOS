const CACHE_NAME = 'st-krakos-v1.0.7'
const BASE_PATH = '/ST_KRAKOS/'

self.addEventListener('install', (event) => {
  // Force skip waiting to activate immediately
  self.skipWaiting()
  
  // Don't block installation if cache fails
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Try to cache files, but don't fail if some don't exist
        return Promise.allSettled([
          cache.add(`${BASE_PATH}index.html`).catch(() => {}),
          cache.add(`${BASE_PATH}src/main.js`).catch(() => {}),
          cache.add(`${BASE_PATH}src/styles/main.css`).catch(() => {})
        ])
      })
      .catch((error) => {
        console.error('Cache install failed:', error)
        // Don't throw - allow installation to succeed
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName).catch(() => {})
            }
          })
        )
      }),
      // Claim clients
      self.clients.claim()
    ]).catch((error) => {
      console.error('Activate failed:', error)
      // Don't throw - allow activation to succeed
    })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  
  // Only handle requests from our domain
  if (!url.pathname.includes(BASE_PATH) && url.pathname !== '/' && !url.pathname.startsWith(BASE_PATH.slice(0, -1))) {
    return
  }

  // Network-first strategy for all requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {})
          }).catch(() => {})
        }
        return response
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          // If no cache, return a basic offline response for HTML
          if (event.request.destination === 'document') {
            return new Response('Offline', {
              status: 503,
              headers: {'Content-Type': 'text/html'}
            })
          }
          // For other requests, let the browser handle it
          return new Response('', {status: 503})
        })
      })
  )
})

// Listen for messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
