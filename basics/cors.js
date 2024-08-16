/**
 * CORS is a mechanism to share resources among two different origin machines
 * 
 * Preflight call is made before actual api call is made first
 * Cors mechanism uses additional HTTP headers to verify this.
 * 
 * Machine B verifies these headers and sends back Additional Headers
 * That Let Machine A Make the Actual Api Call
 * 
 * example header : Accept-control-allow-origin : *
 * this will mean any other domain can have access to resources of 
 * Machine B. a Public Api or resource 
 * else a list is set.
 * 
 * Allow-methods : PUT , POST (What methods to allow)
 * 
 * Machine/Domain A ----Preflight Request----> Machine/Domain B  |
 * 									<---------Options---------									 |
 * 																															 | Time
 * 									---------Api Call--------->									 |
 * 																															 v
 */																															