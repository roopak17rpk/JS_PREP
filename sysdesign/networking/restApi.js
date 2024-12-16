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
 */
