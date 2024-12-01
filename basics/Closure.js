/**
 * what is closure ?
 *
 * A closure in JavaScript is a powerful concept that combines a
 * function with references to its surrounding state (the lexical environment).
 * Essentially, it allows an inner function to access variables from its outer function,
 * even after the outer function has finished executing.
 *
 * disadvantages ---> high memory consumption.
 *
 * question.) make a function such that it returns the sum
 */

function outer() {
  let sum = 0;
  function inner(...args) {
    let param = args[0];
    sum = sum + param;
    return sum;
  }

  return inner;  
}

const x = outer();
console.log(x(1));
console.log(x(5));
