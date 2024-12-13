/**
 * service worker act as a proxy between client and server
 * it can cache the response and serve it to client
 * it can also act as a middleman between client and server
 *
 * app ==> service worker <===> cache
 *             | 							    |
 *             |                  |
 *             v                  |
 *            network            	|
 * 							|            			|
 * 							|            			|
 * 							v            			|
 * 							server ---------->v
 *
 *
 * register service worker
 * 	1. installing
 * 	2. installed
 * 	3. activing
 *  4. activated
 *
 *
 */

// sw.js
const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/index.html", "/style.css", "/main.js", "myGif.gif"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// index.html
{
  /* <html/>
  <head>
    <script>
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        });
      }
</script>
</body>
</html> */
}

// for offline support and custom caching strategy service worker is used gives more control over caching