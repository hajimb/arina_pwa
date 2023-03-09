// Files to cache 
// To update App, Add Version in CacheName  
const cacheName = 'arina_cache_v1_1';
const OFFLINE_URL = "offline.html";
const appShellFiles = [
  'assets/css/bootstrap.css',
  'assets/css/icons.css',
  'assets/css/app.css',
  'assets/images/favicon.ico',
  'assets/js/vendor.min.js',
  'assets/js/app.min.js',
  'assets/images/android-launchericon-48-48.png',
  'assets/images/android-launchericon-72-72.png',
  'assets/images/android-launchericon-96-96.png',
  'assets/images/android-launchericon-144-144.png',
  'assets/images/android-launchericon-192-192.png',
  'assets/images/android-launchericon-512-512.png',
  'assets/images/logo-dark.png',
  'assets/images/logo-light.png',
  'offline.html',

];

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(appShellFiles);
    await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
  })());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ("navigationPreload" in self.registration) {
          await self.registration.navigationPreload.enable();
        }
      })()
    );
  
    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
  });

// Fetching content using Service Worker
/*
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});*/

self.addEventListener("fetch", (event) => {
    // Only call event.respondWith() if this is a navigation request
    // for an HTML page.
    if (event.request.mode === "navigate") {
      event.respondWith(
        (async () => {
          try {
            // First, try to use the navigation preload response if it's
            // supported.
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            }
  
            // Always try the network first.
            const networkResponse = await fetch(event.request);
            return networkResponse;
          } catch (error) {
            // catch is only triggered if an exception is thrown, which is
            // likely due to a network error.
            // If fetch() returns a valid HTTP response with a response code in
            // the 4xx or 5xx range, the catch() will NOT be called.
            console.log("Fetch failed; returning offline page instead.", error);
  
            const cache = await caches.open(cacheName);
            const cachedResponse = await cache.match(OFFLINE_URL);
            return cachedResponse;
          }
        })()
      );
    }
  
    // If our if() condition is false, then this fetch handler won't
    // intercept the request. If there are any other fetch handlers
    // registered, they will get a chance to call event.respondWith().
    // If no fetch handlers call event.respondWith(), the request
    // will be handled by the browser as if there were no service
    // worker involvement.
  });
