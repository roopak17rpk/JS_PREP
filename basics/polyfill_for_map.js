/**
 * used to create new array from calling a function for every array element.
 */

const arr = [1, 2, 3, 4, 5];

const newArr = arr.map((item) => item * 2);

console.log(newArr);

Array.prototype.myMap = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(callback(this[i], i, this));
  }
  return temp;
};

const arr2 = [1, 2, 3, 4, 5];

const newArr2 = arr2.myMap((item) => item * 2);

console.log(newArr2);
