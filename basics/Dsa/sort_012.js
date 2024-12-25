/**
 * Given an array arr[]
 * containing only 0s, 1s, and 2s. Sort the array in ascending order.
 */

const sort012 = (arr) => {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[mid], arr[low]] = [arr[low], arr[mid]];
      mid++;
      low++;
      continue;
    }
    if (arr[mid] === 1) {
      mid++;
      continue;
    }
    if (arr[mid] === 2) {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
      continue;
    }
  }
  return arr;
};

const arr1 = [0, 1, 2, 0, 1, 2];
sort012(arr1);
console.log("arr1", arr1);

const arr2 = [0, 2, 1, 2, 0];
sort012(arr2);
console.log("arr2", arr2);

const arr3 = [2, 2, 1, 1, 0, 0];
sort012(arr3);
console.log("arr3", arr3);

const arr4 = [2, 1, 0];
sort012(arr4);
console.log("arr4", arr4);
