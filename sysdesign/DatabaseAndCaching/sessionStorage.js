/**
 * what ----> Storage to store data persistently on user device(works on reload only)
 * how it works ---> sessionStorage.getItem(key), sessionStorage.setItem(key, value)
 * remove ---> sessionStorage.removeItem(key)
 * clear ---> sessionStorage.clear()
 *
 * size limit ---> 5mb per domain (could be around 10 mb as well)
 *
 * performance ---> synchronous (blocks the main thread till it is done)
 *
 * Data persistence --> cleared when the session ends (tab or window closed).
 *
 * Data structure --> key: Value (value is string) same as localstorage;
 * 
 * sessionStorage.setItem("value" , JSON.stringify(notesData)); // for objects
 * const notesData = JSON.parse(sessionStorage.getItem("value"));
 *
 * Duplicating a tab also duplicates the sessionStorage in browser.
 * 
 * security ---> XSS, encryption, storage limit, session expiry.
 *
 * when to use ---> temporary sensitive data
 *
 * when not use ---> large datasets, async operations, long duration of storage
 */

