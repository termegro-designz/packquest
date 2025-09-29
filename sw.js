// PackQuest Service Worker
// Offline-Funktionalität und Caching

const CACHE_NAME = 'packquest-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/game.css',
  '/game.js',
  '/scripts.js',
  '/favicon.svg',
  '/charakter_pq-01.svg',
  '/lkw_pq-01.svg',
  '/coin_pq.svg',
  '/sessel_pq.svg',
  '/so_soll_die_seite_aussehen.jpg',
  // Service Pages
  '/umzuege.html',
  '/entruempelung.html',
  '/montage.html',
  '/seniorenumzuege.html',
  '/wohnungsuebergabe.html',
  '/kontakt.html',
  // Legal Pages
  '/impressum.html',
  '/datenschutz.html',
  '/agb.html',
  // Google Fonts (fallback)
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Press+Start+2P&display=swap'
];

// Install Event - Cache Resources (optimiert)
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('PackQuest: Cache opened');
        // Cache nur kritische Ressourcen beim Install
        const criticalUrls = urlsToCache.filter(url => 
          !url.includes('.jpg') && !url.includes('fonts.googleapis.com')
        );
        return cache.addAll(criticalUrls.map(url => {
          return new Request(url, { mode: 'no-cors' });
        }));
      })
      .catch(function(error) {
        console.error('PackQuest: Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('PackQuest: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First with Cache Fallback
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (except fonts)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin && !url.hostname.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response for caching
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(function() {
        // Network failed, try cache
        return caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            }

            // Fallback for HTML pages
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }

            // Fallback for images
            if (event.request.headers.get('accept').includes('image')) {
              return caches.match('/favicon.svg');
            }

            return new Response('Offline - Ressource nicht verfügbar', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background Sync (if supported)
self.addEventListener('sync', function(event) {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions
      console.log('Background sync: contact-form')
    );
  }
});

// Push Notifications (if needed later)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      data: data.data || {}
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification Click Handler
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message Handler (communication with main thread)
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('PackQuest Service Worker initialized');
