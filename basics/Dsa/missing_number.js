/**
 * You are given an array arr of size n - 1 that
 * contains distinct integers in the range from 1 to n (inclusive).
 * This array represents a permutation of the integers from 1 to n
 * with one element missing. Your task is to identify
 * and return the missing element.
 */

const missingNumber = (arr) => {
  const n = arr.length + 1;
  let xor = 0;
  for (let i = 0; i < n; i++) {
    xor ^= i;
  }
  for (let i = 0; i < arr.length; i++) {
    xor ^= arr[i];
  }

  return xor;
};

console.log("missingNumber([1, 2, 3, 5])", missingNumber([1, 2, 3, 5])); // Should return 4
console.log("missingNumber([6, 1, 2, 8, 3, 4, 7, 10, 5])", missingNumber([6, 1, 2, 8, 3, 4, 7, 10, 5])); // Should return 9
console.log("missingNumber([1])", missingNumber([1])); // Should return 2
console.log("missingNumber([2, 3, 1, 5])", missingNumber([2, 3, 1, 5])); // Should return 4
console.log("missingNumber([1, 2, 4, 6, 3, 7, 8])", missingNumber([1, 2, 4, 6, 3, 7, 8])); // Should return 5
