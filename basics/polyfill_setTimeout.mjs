export function createTimeout() {
  let timerId = 0;
  let timerMap = {};

  const requestIdleCallback = setImmediate;

  function setTimeoutPoly(callback, delay, ...args) {
    let id = timerId++;
    timerMap[id] = true;

    let start = Date.now();

    function triggerCallback() {
      if (!timerMap[id]) return;
      if (Date.now() - start >= delay) {
        callback.apply(this, args);
        delete timerMap[id];
      } else {
        requestIdleCallback(triggerCallback);
      }
    }
    requestIdleCallback(triggerCallback);
    return id;
  }
  function clearTimeoutPoly(id) {
    delete timerMap[id];
  }
  return { setTimeoutPoly, clearTimeoutPoly };
}

const { setTimeoutPoly, clearTimeoutPoly } = createTimeout();

// console.log("start");
// const timerID = setTimeoutPoly(() => {
//   console.log("hello");
// }, 2000);
// console.log("end");

// clearTimeoutPoly(timerID);
