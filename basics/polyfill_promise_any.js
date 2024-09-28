/**
 * Promise.any() takes an iterable of Promise objects. It returns a single
	 promise that fulfills as soon as any of the promises in the iterable
   fulfills, with the value of the fulfilled promise. If no promises in the
   iterable fulfill (if all of the given promises are rejected), then the
   returned promise is rejected with an AggregateError, a new subclass of
	 Error that groups together individual errors.
 */

/**
 * ● Function takes an array of promises as input and returns a new promise.
 * ● The returned promise is resolved as soon as any of the input promises resolves.
 * ● Else if all of the input promises are rejected then the returned
 * promise is rejected with the array of all the input promises reasons.
 */

const myPromiseAny = function (taskList) {
  if (!taskList.every((task) => task instanceof Promise)) {
    return new TypeError("all task are note promises");
  }

  return new Promise((resolve, reject) => {
    const aggregatedErrors = [];

    taskList.forEach((task, index) => {
      task
        .then((val) => {
          resolve(val);
        })
        .catch((error) => {
          aggregatedErrors[index] = error;

          if (aggregatedErrors?.length === taskList?.length) {
            reject(aggregatedErrors);
          }
        });
    });
  });
};

function task(timeLimit) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Task with ${timeLimit}ms limit resolved`);
      resolve(timeLimit);
    }, timeLimit);
  });
}

const taskLists = [task(6000), task(5000), task(1000)];

const printResult = async () => {
  const result = await myPromiseAny(taskLists);
  console.log(result);
};

printResult();
