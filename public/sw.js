const CACHE_NAME = 'astrokraft-cache-v4';
const OFFLINE_URLS = [
  '/en/offline',
  '/hin/offline',
  '/bn/offline',
  '/favicons/favicon.ico',
  '/favicons/favicon-32x32.png',
  '/favicons/favicon-16x16.png',
  '/favicons/android-chrome-192x192.png',
  '/favicons/android-chrome-512x512.png',
  '/favicons/apple-touch-icon.png',
  '/astrokraft_logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // UseaddAll to cache crucial offline files
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests and skip internal/API routes
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/') ||
    event.request.url.includes('/_next/') ||
    event.request.url.includes('webpack-hmr') ||
    event.request.url.includes('/sitemap.xml') ||
    event.request.url.includes('/robots.txt')
  ) {
    return;
  }

  // Handle navigate (full page load) requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const url = new URL(event.request.url);
        
        // Serve localized offline page based on route path
        if (url.pathname.startsWith('/hin')) {
          return (await cache.match('/hin/offline')) || cache.match('/en/offline');
        } else if (url.pathname.startsWith('/bn')) {
          return (await cache.match('/bn/offline')) || cache.match('/en/offline');
        }
        return cache.match('/en/offline');
      })
    );
    return;
  }

  // Stale-While-Revalidate caching strategy for fonts, static assets, and images
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in the background to update cache
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Ignore background fetch errors (device is offline)
          });
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cache static files (CSS, JS, Fonts, Images) dynamically
        const url = new URL(event.request.url);
        if (
          url.pathname.includes('/assets/') ||
          url.pathname.includes('/favicons/') ||
          url.pathname.endsWith('.png') ||
          url.pathname.endsWith('.svg') ||
          url.pathname.endsWith('.webp') ||
          url.pathname.endsWith('.jpg') ||
          url.pathname.endsWith('.jpeg') ||
          url.pathname.endsWith('.woff2') ||
          url.pathname.endsWith('.css') ||
          url.pathname.endsWith('.js')
        ) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      });
    })
  );
});
