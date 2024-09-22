/**
 * write some documentation for js filter method
 * used to create new array from calling a function for every array element.
 */

const arr = [1, 2, 3, 4, 5];

const newArr = arr.filter((item) => item > 2);

console.log(newArr);

Array.prototype.myFilter = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

const newArr2 = arr.myFilter((item) => item > 2);
console.log(newArr2);
