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

router.get("/", function (req, res) {
  console.log("get join url");
  res.sendFile(path.join(__dirname, "../../public/join.html"));
});

router.post("/", function (req, res) {
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var password = body.password;
  console.log(email);

  var sql = { email: email, name: name, password: password };
  var query = connection.query("insert into user set ?", sql, function (
    err,
    rows
  ) {
    if (err) {
      throw err;
    } else console.log(rows);
    res.render("welcom.ejs", { name: name, id: rows.insertId });
  });
});

module.exports = router;
