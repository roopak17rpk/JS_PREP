/**
 * How web works?
 * 
 * client ----> server
 * 
 * client sends request to server.
 * server sends response to client.
 * 
 * server is a machine(can be a simple computer). for high processing and avaialbilty we
 * get the best machines and serve responses from there. any laptop, pc, server, etc. can be a server.
 * 
 * to connect client and server we need address and that is ip address.
 * 
 * lets say i search google.com. first i need to get the ip address of google.com.
 * mobile device will request cell tower than phone company and than dns server and than google.com ip address will be ther and we will go to google server and get the response.
 * 
 * www.google.com is broken into 3 parts: www, google, com.
 * root level domain 
 * top level domain
 * second level domain
 * third level domain
 * 
 * the request on website fetches a website html code.
 * if its 304 not modified then it will not fetch the file again.
 * 
 * subsequent files are fetched in 200 status code via service worker
 * aboyt 6-8 files are fetched in parallel. rest are queued. by browser.
 * 
 * in service worker u het startup and respondWith param that shows timing
 * 
 * from client to server a handshake is done.
 * 
 * sends syn packet to server.
 * server sends syn+ack packet to client.
 * client sends data packet to server.
 * server sends data packet to client.
 * 
 * for secure network
 * 
 * DNS lookup is there than tcp than ssl then http request is sent.
 * 
 * 
 * how page is loaded
 * 
 * loading -> scripting-> rendering -> painting -> compositing -> displaying
 * 
 * there is css and cssom
 * DOM and CSSOM are merged to form render tree.
 * 
 * 
 * 
 * 
 *  */