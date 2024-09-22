/**
 * Example of reduce function in JavaScript
 * Used to calculate the sum of all elements in an array
 */

const arr1 = [1, 2, 3, 4, 5];
const arr3 = [1, 2, 3, 4, 7];

// arr3 is provided for reference as the original array
const sum = arr1.reduce((acc, curr, i, arr) => {
  console.log("acc", acc);
  console.log("curr", curr);
  console.log("i", i);
  console.log("arr", arr);
  console.log("this", this);
  return acc + curr;
}, 0 , arr3);

console.log("sum", sum);

Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];

  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

const arr2 = [1, 2, 3, 4, 5];

const sum2 = arr2.myReduce((acc, curr) => acc + curr, 0);

console.log("sum2", sum2);
