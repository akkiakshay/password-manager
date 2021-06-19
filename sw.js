const cacheName = 'passwordManager';
const appShellFiles = [
    './',
    './index.html',
    './bundle.js',
    './style.css',
    './manifest.json',
    './ico/android-icon-36x36.png',
    './ico/android-icon-48x48.png',
    './ico/android-icon-72x72.png',
    './ico/android-icon-96x96.png',
    './ico/android-icon-144x144.png',
    './ico/android-icon-192x192.png',
    './ico/favicon-16x16.png',
    './ico/favicon-32x32.png',
    './ico/favicon-96x96.png',
    './ico/favicon.ico'
  ];
// Cache all the files to make a PWA
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Our application only has two files here index.html and manifest.json
      // but you can add more such as style.css as your app grows
      return cache.addAll(appShellFiles);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});