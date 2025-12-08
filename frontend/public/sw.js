const CACHE_NAME = 'st-krakos-v1.0.6'
const BASE_PATH = '/ST_KRAKOS/'
const urlsToCache = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}src/main.js`,
  `${BASE_PATH}src/router.js`,
  `${BASE_PATH}src/pages/home.js`,
  `${BASE_PATH}src/components/layout.js`,
  `${BASE_PATH}src/styles/main.css`,
  `${BASE_PATH}src/utils/i18n.js`,
  `${BASE_PATH}src/utils/seo.js`,
  `${BASE_PATH}src/utils/validators.js`
]

self.addEventListener('install', (event) => {
  // Force skip waiting to activate immediately
  self.skipWaiting()
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})))
      })
      .catch((error) => {
        console.error('Cache install failed:', error)
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Delete ALL old caches (aggressive cleanup)
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      // Force claim all clients immediately
      return self.clients.claim()
    }).then(() => {
      // Notify all clients to reload
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({type: 'SW_UPDATED', cacheVersion: CACHE_NAME})
        })
      })
    })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const url = new URL(event.request.url)
  
  // For CSS and JS files, use network-first with aggressive cache busting
  if (url.pathname.includes('/src/styles/main.css') || 
      url.pathname.includes('/src/') && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'})
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(event.request)
        })
    )
    return
  }

  // For other files, use cache-first but check for updates
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Always try to fetch fresh version in background
        const fetchPromise = fetch(event.request, {cache: 'no-store'})
          .then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache)
              })
            }
            return response
          })
          .catch(() => null)

        // Return cached version immediately if available
        if (cachedResponse) {
          // Update cache in background
          fetchPromise.catch(() => {})
          return cachedResponse
        }

        // No cache, wait for network
        return fetchPromise
      })
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match(`${BASE_PATH}index.html`)
        }
        return new Response('Offline', {status: 503})
      })
  )
})

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({success: true})
    })
  }
})
