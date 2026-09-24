// Starter service worker for Ndanga District Hospital.
// NOT yet registered from any page — this is a placeholder for the later
// PWA step described in the deployment notes. Once the plain website is
// live and working, register it from app.js with:
//
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("sw.js");
//   }

const CACHE_NAME = "ndanga-hospital-v1";
const CACHE_FILES = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
