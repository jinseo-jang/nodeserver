var fs = require("fs");

var data = fs.readFileSync("README.md");

console.log(data.toString());
console.log("2.program ended");
