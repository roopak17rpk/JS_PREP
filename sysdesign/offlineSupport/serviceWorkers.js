/**
 * it act as proxy between browser and network.
 * it has its own thread and it is not blocked by other threads.(main thread)
 *
 * we can intercept a request and make decision and computations about it
 *
 * only allowed for https not http. can be easily attacked via man in the middle attack.
 *
 * service workers cant access DOM.(window object as matter of fact so no local storage)
 */

/**
 * u can get access to service worker api via navigator object.
 * navigator.serviceWorker
 */

// script.js
//check if we have service worker on browser
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./serviceWorker.js", {
      scope: "./", // by default scope is root can be a specified folder too ./folder
    })
    .then((res) => console.log("service worker registered successfully"))
    .catch((err) => console.log("service worker registration failed"));
}

// serviceWorker.js

const CACHE_NAME = "demo-v1";

self.addEventListener("install", (e) => {
  console.log("service worker installed");
  // dont complete install event till the code inside waitUntil executes
  // cache is just like db. uses .open to create a connection
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // i can pass the list of files that i need to cache.
      // now on first load all these files will be added to cache storage
      return cache.addAll([
        "./index.html",
        "./style.css",
        "./script.js",
        "./image.png",
      ]);
    })
  );
});

self.addEventListener("activate", (e) => {
  //clean up useless cache
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // offline experience
  // caching strategy
  // make a fetch request to network, if the network is offline then fetch from cache(cache work as fallback)
  console.log("service worker fetch");
  // middleware function logic
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const cloneData = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, cloneData);
        });
        return res;
      })
      .catch(() => {
        return caches.match(e.request).then((file) => file);
      })
  );
});
