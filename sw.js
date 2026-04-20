const CACHE_NAME = 'course-outline-v2'; // bump this on every deploy
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/1st.html',
  '/2nd.html',
  '/3rd.html',
  '/4th.html',
  '/5th.html',
  '/6th.html'
];

// Install - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS.map(url => cache.add(url).catch(err => console.warn(`Failed to cache ${url}`, err)))
      );
    })
  );
  self.skipWaiting();
});

// Activate - delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
