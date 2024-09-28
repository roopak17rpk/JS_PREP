/**
 * The Promise.all() accepts an array of promises and returns a promise
 * that resolves when all of the promises in the array are fulfilled or when
 * the iterable contains no promises. It rejects with the reason of the first
 * promise that rejects.
 */

/**
 * ● It will return a promise.
 * ● The promise will resolve with the result of all the passed
 * promises or reject with the error message of the first failed
 * promise.
 * ● The results are returned in the same order as the promises are in
 * the given array.
 */

const myPromiseAll = function (taskList) {
  // to store result
  const results = [];

  let promisesCompleted = 0;

  if (!taskList.every((task) => task instanceof Promise)) {
    reject(new TypeError("Not all of them are promises"));
  }

  return new Promise((resolve, reject) => {
    taskList.forEach((task, index) => {
      task
        .then((val) => {
          results[index] = val;
          promisesCompleted += 1;

          if (promisesCompleted === taskList?.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// example

function task(timeLimit) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timeLimit);
    }, timeLimit);
  });
}

const taskLists = [task(1000), task(5000), task(3000)];

const printResult = async () => {
  const result = await myPromiseAll(taskLists);
  console.log(result);
};

printResult();
