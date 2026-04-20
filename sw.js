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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
