/**
 * client --> server(send requested resource)
 * |
 * |
 * v
 * browser Cache(check if resource is avalaible else request to server)
 *
 * caching will help with performance and reduction of traffic load.
 *
 * Headers for cache
 *
 * Cache-Control: max-age=3600, public
 * Expires: Fri, 13 Dec 2024 10:00:00 GMT
 * ETag: "1234567890"
 * Last-Modified: Fri, 13 Dec 2024 09:00:00 GMT
 *
 * Generally these thing get configured by our bundler.
 * (webpack, vite, nextjs, express, etc)
 *
 * now lets say i remove them now server will always be requested for a resource(images/ gif / js)
 *
 */

/**
 * Let me explain the key differences between localStorage and cache storage:
 * Purpose
 * localStorage: Designed for storing small amounts of application data (key-value pairs)
 * that needs to persist across browser sessions
 * Cache Storage: Specifically designed for storing HTTP responses (like HTML, CSS, JS files, images)
 * to improve load times and offline functionality
 */

// lets add a middleware on our backend and set cache
const express = require("express");
const app = express();

app.use(express.static("public", { maxAge: 3600000 }));

//middleware to set cache
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "max-age=86400, public"); // highest priority
  //date example Fri, 13 Dec 2024 10:00:00 GM;
  // till this date the resource is fetched from cache only
  res.setHeader("Expires", new Date(Date.now() + 86400 * 1000).toUTCString()); // second priority
  /**
   * request is sent to server to check if resource is modified(checking last date modify)
   * if modified then server will send new resource
   * if not modified then server will send 304 status code(not modified use from cache)
   */
  res.setHeader("Last-Modified", new Date().toUTCString()); // third priority
  /**
   * ETag is a unique identifier for a resource
   * it is used to check if the resource has been modified (checking by hash of content)
   * if modified then server will send new resource
   * if not modified then server will send 304 status code(not modified use from cache)
   */
  res.setHeader("ETag", "1234567890"); // similar to last modified priority
  /**
   * etag provides better control if server have some offset time of are being in different time zone.
   * or if the changes happen very quickly.
   */
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// this code sets cache and after first load the contnent is picked from cache and not from server
// stale if revalidate must-revalidate are different optiosn you can give

/**
 * lets say i want the same image to be fetched from server instead of cache
 * i will be required to create a new image name and invalidate local cache and get to server
 *
 * localhost:3000/image.jpg
 * localhost:3000/image.jpg?v=1234567890 (this will be fetched from server)(key not found in cache)
 *
 * but as only query param is different for server it will be from same route.
 *
 *
 */
