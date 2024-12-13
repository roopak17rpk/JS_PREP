/**
 * some api libraries create a ram storage for cachint the api results
 *
 * examples of such libraries are axios, useSwr , tanStack-Query etc
 *
 *
 * App
 *  |
 *  |
 *  v
 *  ram storage
 *  |
 *  |
 *  v
 *  server
 *
 * there are different policy in library.
 *
 * cache first
 * network only // may maintain cache data
 * cache and network
 * no-cache // wont even maintain cache data
 */

