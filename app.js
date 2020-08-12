var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var db_config = require("./config/db-config.json");

var connection = mysql.createConnection({
  host: db_config.host,
  port: db_config.port,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
});

connection.connect();

app.listen(3000, function () {
  console.log("start@ express server on port 3000!");
});

// set static directory for serving static file e.g. html, js, etc.
// set up bodyparser for processing post requests
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function (req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function (req, res) {
  console.log(req.body.email);
  //to convert ejs to html, use render function
  res.render("email.ejs", { email: req.body.email });
});

app.post("/ajax_send_email", function (req, res) {
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email="' + email + '"',
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        console.log(rows[0]);
      } else {
        console.log("none : " + rows[0]);
      }
    }
  );
});

// app.post("/search", function (req, res) {
//   console.log(req.body.query);
//   var responseData = { result: "ok", data: "nike airforce 11" };
//   res.json(responseData);
// });
