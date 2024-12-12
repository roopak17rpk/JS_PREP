/**
 * Resume Experience
 */

const arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log(arr[i]);
  }, 3000);
}

/**
 * what is closure
 */

const x = outer();
console.log(x(1)); // 1
console.log(x(5)); // 6

/** disadvantage of closure */

/**
 * promise question
 *
 */

function ApiCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promise Resolve");
    }, 2000);
  });
}

async function A() {
  const res = await ApiCall();
  console.log("A function called");
}

function B() {
  ApiCall().then(() => {
    console.log("then resolve");
  });
  console.log("B function called");
}

A();
B();
console.log("Global call");

/** make undo / redo
 * start by asking debouncing and give debouncing code
 */

// https://stackblitz.com/edit/react-1m5esi?file=src%2FApp.js
