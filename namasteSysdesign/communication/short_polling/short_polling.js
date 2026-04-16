/**
 * Keep asking the server after a interval of time to check the response on client side
 *
 * example:
 * client: ask the server after 1 second
 * server: send the response
 * client: ask the server after 1 second
 *
 * use case: cricinfo, analytics, etc.
 *
 *
 * some properties:
 * 1.) short lived
 * 2.) less resource hogging
 * 3.) no persistent connection
 * 4.) easy to implement
 *
 *
 * problem will come with scale
 */

const placeHolderData = {
  data: "Hello World",
};
let counter = 0;
const express = require("express");
const app = express();
const port = 4010;

app.get("/short-polling", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  if (counter < 3) {
    counter++;
    return res.send({ data: "no data", status: "failure", counter: counter });
  }
  counter = 0;
  res.send({ data: placeHolderData.data, status: "success" });
});

app.get("/updateData", (req, res) => {
  const data = "update data";
  res.send({ data: data });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
