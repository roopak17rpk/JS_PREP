/**
 * Given an unsorted array arr containing only non-negative integers,
 *  your task is to find a continuous subarray (a contiguous sequence of elements)
 *  whose sum equals a specified value target.
 *  You need to return the 1-based indices of the leftmost and rightmost elements of this subarray.
 *  If no such subarray exists, return [-1].
 */

const subArraySum = (arr, target) => {
  let start = 0;
  let end = 0;
  let sum = 0;

  while (end < arr.length) {
    sum = sum + arr[end];
    if (sum < target) {
      end++;
      continue;
    }
    if (sum > target) {
      sum = sum - arr[start];
      start++;
      if (sum === target) {
        return [start + 1, end + 1];
      }
    }
    if (sum === target) {
      return [start + 1, end + 1];
    }
  }

  return [-1];
};

console.log(subArraySum([1, 2, 3, 4, 5], 9));
console.log(subArraySum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15));
