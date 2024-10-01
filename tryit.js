Function.prototype.myBind = function (...args) {
  let context = this;
  const params = args.slice(1);
  return function (...localArgs) {
    context.apply(args[0], [...params, ...localArgs]);
  };
};

const myPromiseAll = function (taskList) {
  let results = [];
  let completedPromises = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((task) => {
      task
        .then((val) => {
          results[index] = val;
          completedPromises += 1;

          if (results?.length === taskList?.length) {
            resolve(results);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};
