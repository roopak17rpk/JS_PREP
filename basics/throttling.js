/**
 * its  a simple rate limiting methodology
 */

const throttledFunc = throttle(() => {
  console.log("throttle up");
}, 3000);

throttledFunc();

function throttle(fn, limit) {
  let flag = true;
  return function (...args) {
    const context = this;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}
