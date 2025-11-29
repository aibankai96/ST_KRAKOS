const CACHE_NAME = 'st-krakos-v1.0.0'
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
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('Cache install failed:', error)
      })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          const responseToCache = response.clone()
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
          return response
        })
      })
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match(`${BASE_PATH}index.html`)
        }
      })
  )
})

