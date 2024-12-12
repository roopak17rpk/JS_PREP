/**
 * what ----> Storage to store data persistently on user device
 * even on reload or closing the tab the data is not lost.
 *
 * how it works ---> localStorage.getItem(key) , localStorage.setItem(key, value)
 * localStorage.removeItem(key) , localStorage.clear()
 *
 * size limit ---> 5mb per domain (could be around 10 mb as well)
 *
 * Performance ---> synchronous (blocks the main thread till it is done)
 * 
 * Data persistence --> shared across all tabs and sessions
 * 
 * Data structure --> key: value (value is always a string);
 * value automatically converted to string when stored
 * an object or array needs to be stringfied else it becomes
 * '[object Object]'
 * 
 * Security --->  Dont overestimate the storage. save only little data as possible
 * if gone beyond 5mb then u may lose data.
 * encrypt the data before storing it. as anyone or any third party can access it.
 * anything CORS (any other domain shoudl not access my local storage)
 * if other scripts are executiong then they should not access my local storage(XSS)
 * 
 * When to use ===> user Preferences(default landing page), DArk mode light mode
 * Non sensitive data
 * 
 * when not to use ===> large Dataset( syncronous stringified info)
 * Sensitive information (password, credit card info, etc, authtoken, etc)
 * 
 * localStortage is not reactive so if i change data in local storage
 *  then it will not reflect in UI. although u can add a listener to it.
 * 
 * addEventListner('storage', (event) => {
 * 	event.key === key of the item changed
 * 	event.newValue === new value of the item
 * 	event.oldValue === old value of the item
 * 	event.url === url of the document that changed the item
 * 	event.storageArea === storage area that was changed
 * })
 *
 */

