const CACHE_NAME = 'course-outline-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './1st.html',
  './2nd.html',
  './3rd.html',
  './4th.html',
  './5th.html',
  './6th.html'
];

// Install and cache files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Makes the new service worker take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// CLEANUP: This deletes old caches so your app stays updated
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Serve files from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
