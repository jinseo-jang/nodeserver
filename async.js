// var fs = require("fs");

// fs.readFile("README.md", function (err, data) {
//   if (err) return console.log(err);
//   console.log(data.toString());
// });

// console.log("2.program ended");

function delayP(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, sec * 1000);
  });
}

async function myAsync() {
  const time = await delayP(3);
  console.log(time);
  return "async";
}

myAsync().then((result) => {
  console.log(result);
});
