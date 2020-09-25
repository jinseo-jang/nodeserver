var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./router/index");

app.listen(3000, function () {
  console.log("start@ express server on port 3000!");
});

// set static directory for serving static file e.g. html, js, etc.
// set up bodyparser for processing post requests
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(router);
// app.use("/main", main);
// app.use("/email", email);

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/public/main.html");
// });

// app.post("/search", function (req, res) {
//   console.log(req.body.query);
//   var responseData = { result: "ok", data: "nike airforce 11" };
//   res.json(responseData);
// });
