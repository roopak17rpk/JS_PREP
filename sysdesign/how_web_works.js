/**
 * on internet if when you type a website name lets say flipkart.com
 * then that Request is sent to server and it responds with that HTML,
 * Subsequently CSS , and Javascript(responsible for interactivity of web).
 * 
 * when you write google.com its returns a ip address from Domain Name Server(DNS)
 * now that u have gotten google ip u know which server to hot to fetch HTML Website.
 * 
 * in DNS there is Mapping of domain such as "." ===> root level domain
 * ".org" , ".gov" ===> first level domain mapping
 * "microsoft.com" ===> second level domain mapping
 * "download.microsoft.com" ===>  third level domain mapping
 * 
 * before calling router withing browser a lot of caching happend to get ip address
 * 
 * browser can handle 6-8 parralel requests. beyond that requests go to queue
 * 
 * so lets say you refresh the site the server responds with 304(no changes in html) so it 
 * will pick html from cache and assets from service workers or browser cache
 * 
 * google and netflix put there data/assets on isp level for better performance
 * 
 * for https: SSL handshake is done after TCP handshake and data is encrypted between server
 * and client
 * 
 * once you get HTML CSS, JS files (happening asynchronously). from HTML DOM is Made.
 * from CSS CSSOM is made
 * RENDER TREE ==> DOM + CSSOM merged together (computed styles here inherited classes get
 * over wriiten in render tree).
 * 
 * 			DOM ---> html ---> head ---> body ---> <p>hello</p>
 * 																		|
 * 																		|
 * 																		v
 * 																	<li>element text</li>
 * 
 */																		