import { createTimeout } from "./polyfill_setTimeout.mjs";

function createInterval() {
  let intervalId = 1;
  let intervalMap = {};

  const { setTimeoutPoly, clearTimeoutPoly } = createTimeout();

  function setIntervalPoly(callback, delay) {
    let id = intervalId++;

    function reIterate() {
      intervalMap[id] = setTimeoutPoly((args) => {
        callback.apply(this, args);
        reIterate();
      }, delay);
    }
    reIterate();
    return id;
  }
  function clearIntervalPoly(id) {
    clearTimeoutPoly(intervalMap[id]);
  }
  return { setIntervalPoly, clearIntervalPoly };
}

const { setIntervalPoly, clearIntervalPoly } = createInterval();

setIntervalPoly(() => {
  console.log("hello");
}, 2000);
