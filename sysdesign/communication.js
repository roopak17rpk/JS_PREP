/**
 * in early days there were HTTP 1.0
 * 
 * Server 1 open -------> server 2    (happening for request 1)
 * 					<------Data--
 * 					close-------> server 2
 * 
 * Server 1 open -------> server 2			(happening for request 2)
 * 					<------Data--
 * 					close-------> server 2
 * 
 * Server 1 open -------> server 2			(happening for request 3)
 * 					<------Data--
 * 					close-------> server 2
 * 
 * then came HTTP 1.1
 * 
 *  Server 1 open -------> server 2    
 * 					<--Data1 request1
 * 					<--Data2 request2
 * 					<--Data3 request3
 * 					close --------> server 2
 * 
 * 	WebSockets
 * 
 *  Server 1 open -----GET 1.1 Upgraded Protocol------> server 2    
 * 								<------switching protocol 101-----(no longer http)																		
 * 					<--Data1 request1
 * 					<--Data2 request2
 * 					Data3 request3---->			(data can flow in any direction)
 * 					close --------> server 2
 * 
 * use Case ===> Group chats.
 * 
 * Server Side events (only server sends data)
 * 		Server 1 open -----GET  text/event-stream ------> server 2    
 * 								<------text/event stream (transfer encoding: chunks)-----(we send chunks as we no longer know the
 * 																																												the exact lenth of data )		
 * 								<------text/event stream (transfer encoding: chunks)-----		
 * 
 * close
 * 
 * SSE ---> use case live feed , showing client progress , logging											
 * 								
 */

let i = 0;

				app.get("/stream" , (req,res) => {
					res.setHeader("Content-Type" , "text/event-stream")
					res.write("data:" + "hello!\n\n") // write on same connection else it is end() or send() method used
					send(res)
				})

				function send(res){
					res.write("data:" + "hello\n\n") // \n\n is required to signal it is an event
					setTimeout(() => {
						res.write("data:" + `hello${i++}\n\n`) // \n\n is required to signal it is an event
					}, 1000)
				}

// on frontend

let sse = new EventSource("localhost:8080/stream");
sse.onmessage = console.log // logs data:hello twice
// even if server is killed EventSource Tries to reconnect with server and as soon as server spins up it connects

/**
 * SSE Pros And Cons
 * 
 * pros : 1.) lightweight (no headers involved very less logic while sending chunks)
 * 				2.) HTTP and HTTP 2 compatible (issues in websocket)
 * 				3.) Firewall friendly (Simple Http Request at port 80)
 * 
 * cons		1.) proxying is tricky(set headers in such a way to keep the connection alive)
 * 2.) handling timeouts for api (client cannot send data , server needs to ping to keep client alive refers to proxying)
 * 3.) statefull , harder to scale horizontally(once request is sent i am hooked to one server)
 * 				
 * still events are acknowledged on client side for every chunk sent
 * 
 * chatGPT uses SSE.
 * 
 * 
 * Websockets Create a Bi directional and full duplex method of communication
 * example a  messaging app / trading app (for connection api message tab is there to check data that os floating)
 * 
 * websocket at client gives http request first and asks server to upgrade protocol
 * server sens 101 which means upgrade protocol and the start full duplex connection
 * 
 * websockets can be checked under WS tab of inspect.
 */

const app = express();
const port = 8080;

const server = app.listen(port , () => {
	console.log("server is listening");
})

const wss = new WebSocket({server});

	wss.on("connection" , (stream) => {
		stream.on("message" , (data) => {
			console.log("data");
			res.send("data is this %s" , data);
		})
	})


/**
 * webhooks are useful for third party service
 * lets say i am generating a image than can take 5-10min
 * its not good to hook up a connection  with server for that much time
 * 
 * so you give third party a webhook link(api link type https://abcd/api/webhook)
 * so when the processing is done it will call this link and let us know that 
 * the image is ready
 */