/**
  ● Map the array of promises to return an object with status
	  and value/error depending upon the promised settlement.

  ● Pass this map to the Promise.all to run them at once and return the result.
 */

const allSettled = (promises) => {
  // map the promises to return a custom response.
  const mappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ status: "fulfilled", value: val }),
      (err) => ({ status: "rejected", reason: err })
    )
  );
  // run all the promises once with .all
  return Promise.all(mappedPromises);
};

Promise.myAllSettled = function (taskList) {
  return new Promise((resolve, reject) => {
    const result = [];
    let completedPromise = 0;
    taskList.forEach((task, i) => {
      Promise.resolve(task)
        .then((value) => {
          result[i] = { status: "fulfilled", value: value };
        })
        .catch((err) => {
          result[i] = { status: "failed", value: err };
        })
        .finally(() => {
          completedPromise++;
          if (completedPromise === taskList?.length) {
            resolve(result);
          }
        });
    });
  });
};

const customTask = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay === 2000) {
        reject(`reject ${delay}`);
      }
      resolve(`resolve ${delay}`);
    }, delay);
  });
};

const taskList = [customTask(1000), customTask(2000), customTask(3000)];

const showResult = async () => {
  const res = await Promise.myAllSettled(taskList);
  console.log("res", res);
};

showResult();
