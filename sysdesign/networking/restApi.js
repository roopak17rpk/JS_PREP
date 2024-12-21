/**
 * one - tier architecture: where frontend and backend are in the same server. hard to scale and maintain.
 *
 * two - tier architecture: where frontend and backend are in different servers. easy to scale and maintain.
 *
 * three - tier architecture: where frontend, backend and database are in different servers.
 * easy to scale and maintain.
 *
 * one tof the way to communicate between these web service is REST API.
 *
 * Rest api: Representational State Transfer Application Programming Interface.
 *
 * Rest is built on top of HTTP(hypertext transfer protocol).
 *
 * Benefits of Rest Api:
 * 1.) ease of use
 *
 * 2.) stateless(server does not store any information about the client's state,
 *  example authentication , session management, what it last did);
 *
 * 3.) scalability(no states to maintain, you only need to scale horizontally or vertically);
 *
 * 4.) Flexibility(easy to change the format of the data, easy to change the protocol);
 *
 * 5.) uniform interface(easy to understand path URL, clearly species what is required and what is returned);
 *
 * 6.) cacheable(easy to cache the data, easy to improve the performance);
 *
 * 7.) separation of concerns(easy to separate the concerns of the client(react, angular, vue, etc.)
 *  and the server(nodejs, Go, Java, etc.) and can implement microservices);
 *
 * 8.) Interoperability(Language independent);
 *
 * 9.) Testing(easy to test);
 *
 * 10.) security(https and header authorization out of the box);
 *
 *
 * Each Request is made of 3 parts
 * 1.) Request Line: https://www.google.com/search?q=hello
 * 2.) Request Header: Host: www.google.com
 *                     cache-control: no-cache
 *                     user-agent: curl/7.81.0
 *                     accept: *,
 *                     content-type: application/json
 *                     content-length: 100
 *                     connection: keep-alive
 *                     cookie: sessionId=1234567890
 *                     authorization: Bearer 1234567890
 *
 * 3.) Request Body: {
 *                      "q": "hello"
 *                    }
 *
 *
 *
 *
 */

import express from "express";
import bodyParser from "body-parser";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World"); // send response to the client
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/**
 * URL
 * https://www.example.com/forum/questions/?tag=networking&order=newest#top
 *
 * scheme =  https = protocol type
 * host = www.example.com
 * .com = Top level domain
 * example = domain
 * www = subdomain
 * path = /forum/questions/ (they can be folder inside server of dynamic query)
 * query = tag=networking&order=newest (dynamic query)(key value pair separated by &)
 * fragment = #top (dynamic fragment)(used to identify a section of the page for scrolling)(server doesnt get it)
 *
 *
 * lets say we make a TODO app
 *  functional requirement
 *  1.) create a todo ---> create ---> POST
 *  2.) get a todo   ----> read   ---> GET
 *  3.) update a todo ----> update ---> PUT/PATCH(PUT : change entire Data, PATCH : change partial Data)
 *  4.) delete a todo ----> delete ---> DELETE
 *
 * we have methods that tell what to do on server
 *	HEAD = if i want to know about the headers of the response.
 *	OPTIONS = a preflight request to check if the server supports the request method.
 *	CONNECT = used to establish a tunnel to the server.(No TCP Handshake required once tunnel is established)
 *	TRACE = used to diagnosis the request and response.
 *
 */

const todos = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: true },
  { id: 3, title: "Todo 3", completed: false },
];

app.use(bodyParser.json()); // parse the body of the request
//READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

// CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo); // 201 created
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  todo.title = title;
  todo.completed = completed;
  res.json(todo);
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  todos.splice(todos.indexOf(todo), 1);
  res.status(204).json({ message: "Todo deleted" }); // 204 no content
});

/**
 * Request Headers
 *
 * Host ---> target Host ---> www.1.cdn.example.com
 * Origin ---> Origin Host ---> www.example.com
 * Referer ---> Indicates previous web page making this request ---> https://www.example.com/prevpage
 *
 * user-agent ---> machine info ---> Mozilla/5.0
 * (Macintosh; Intel Mac OS X 10_15_7)
 * AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
 *
 * Accept ---> Response content --> application/json ,application/xml
 *
 * accept-language ---> language pref ----> en-USq=0.9 (0.9 is priority if there are other languages)
 *
 * accept-encoding ---> encoding pref ----> gzip, deflate, br(brotli compression)
 * (implicitly done by browser, gziping and deflating the response).
 *
 * connection ---> keep-alive, close (keep-alive : keep the connection open for multiple requests,
 * close : close the connection after the request is done)
 *
 * Authorization ---> Send Credentials ----> Bearer 1234567890
 *
 * cookie ---> sessionId=1234567890(previous server token can be resend)---> Key - Value
 *
 *
 */

/**
 * Response Headers
 *
 * Date ---> Date and time when the response was generated ----> Fri, 20 Dec 2024 10:10:10 GMT
 *
 * server ---> server info ----> Apache/2.4.41 (Unix) remove this status cause of security reasons
 *
 * content-type ---> content type of the response ----> application/json
 *
 * content-length ---> length of the response body in bytes ----> 100 bytes
 * (in downloading file i can show the progress percentage)
 *
 * set-cookie ---> informs about the cookie need to store for future response---> Key - Value
 *
 */

/**
 * HTTP Status Codes Guide
 * 
 * 1xx - Informational Responses
 * -----------------------------
 * 100 Continue
 * - Server received request headers and client should proceed with request body
 * - Example: Large file upload where server confirms it's ready to receive data
 * 
 * 101 Switching Protocols  
 * - Server agrees to switch protocols (e.g., HTTP to WebSocket)
 * - Example: WebSocket handshake for real-time chat applications
 * 
 * 2xx - Successful Responses
 * -------------------------
 * 200 OK
 * - Request succeeded
 * - Example: Successful GET request for user profile data
 * 
 * 201 Created
 * - Resource successfully created
 * - Example: New user registration, creating blog post
 * 
 * 202 Accepted
 * - Request accepted but processing not completed
 * - Example: Batch processing jobs, email scheduling
 * 
 * 204 No Content
 * - Success but no content to return
 * - Example: DELETE operations, updating user preferences
 * 
 * 206 Partial Content
 * - Partial resource returned
 * - Example: Video streaming, large file downloads with resume capability
 * 
 * 3xx - Redirection
 * ----------------
 * 301 Moved Permanently
 * - Resource permanently moved to new URL
 * - Example: Website domain change, permanent URL restructuring
 * 
 * 302 Found (Temporary Redirect)
 * - Resource temporarily at different URL
 * - Example: A/B testing, maintenance page redirect
 * 
 * 307 Temporary Redirect
 * - Same as 302 but maintains HTTP method
 * - Example: Load balancing, temporary routing
 * 
 * 308 Permanent Redirect
 * - Same as 301 but maintains HTTP method
 * - Example: API version migration
 * 
 * 4xx - Client Errors
 * ------------------
 * 400 Bad Request
 * - Invalid syntax or parameters
 * - Example: Invalid JSON format, missing required fields
 * 
 * 401 Unauthorized
 * - Authentication required
 * - Example: Accessing protected API endpoints without token
 * 
 * 403 Forbidden
 * - Client lacks permissions
 * - Example: Regular user accessing admin features
 * 
 * 404 Not Found
 * - Resource doesn't exist
 * - Example: Accessing deleted content, mistyped URLs
 * 
 * 405 Method Not Allowed
 * - HTTP method not supported
 * - Example: POST request to GET-only endpoint
 * 
 * 5xx - Server Errors
 * ------------------
 * 500 Internal Server Error
 * - Unexpected server condition
 * - Example: Unhandled exceptions, database connection failures
 * 
 * 502 Bad Gateway
 * - Invalid response from upstream server
 * - Example: Microservice communication failure
 * 
 * 503 Service Unavailable
 * - Server temporarily unable to handle request
 * - Example: Server maintenance, rate limiting
 * 
 * 504 Gateway Timeout
 * - Upstream server didn't respond in time
 * - Example: Database query timeout, third-party API timeout
 * 
 * 507 Insufficient Storage
 * - Server out of storage space
 * - Example: File upload server at capacity
 */
