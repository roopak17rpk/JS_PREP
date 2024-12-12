/**
 * What ----> Client Side storage for Data persistence.
 *
 * How it works ---> indexedDB.open() , transaction(), objectStore,
 *
 * Size Limit ---> >100Mbs, Large Dataset,
 *
 * Performance ---> Asynchronous , non blocking.
 *
 * Data Persistence ---> persists across tabs( not impacted by session)
 *
 * Data Structure ---> key: value, (value can be any Data structure)
 * you can create indexes for performance.(searching).
 * 
 * Securtiy ---> encryption , XSS , Auth, cleanup data on logout.
 *
 * when to use ---> Large Data set, data cache, offline lot of history(whaysapp chat).
 *
 * when not to use --> secure data, small data(localstorage is better no need to open connection do transactions)
 * synchronous operations
 * 
 * works with web workers also.
 * 
 * 
 * we can use dexie.db for simpler api structure than native indexDB 
 */
