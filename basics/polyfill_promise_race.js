/**
 ● It returns a promise.
 ● The returned promise fulfills or rejects as soon as any one of
   the input promises fulfills or rejects.
 ● Returned promise resolves with the value of the input
   promise or rejects with the reason of the input promise.
 */

const race = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 5000, "one");
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 1000, "two");
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 2000, "three");
});
race([test1, test2, test3])
  .then(function (value) {
    // first two resolve, 3rd fails, but promise2 is faster
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });

