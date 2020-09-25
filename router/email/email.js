var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

var bodyParser = require("body-parser");
var mysql = require("mysql");
var db_config = require("../../config/db-config.json");

var connection = mysql.createConnection({
  host: db_config.host,
  port: db_config.port,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
});
connection.connect();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

router.post("/form", function (req, res) {
  console.log(req.body.email);
  //to convert ejs to html, use render function
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", function (req, res) {
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email="' + email + '"',
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
        console.log(rows[0]);
      } else {
        responseData.result = "none";
        responseData.name = "";
        console.log("none : " + rows[0]);
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
