// function delay(sec, callback) {
//   setTimeout(() => {
//     callback(new Date().toISOString());
//   }, sec * 1000);
// }

// delay(1, (result) => {
//   console.log(1, result);
// });

function delayP(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, sec * 1000);
  });
}

delayP(1)
  .then((result) => {
    console.log(1, result);
    return delayP(1);
  })
  .then((result) => {
    console.log(2, result);
    return delayP(1);
  })
  .then((result) => {
    console.log(3, result);
    return "WoW";
  })
  .then((result) => {
    console.log(result);
  });
