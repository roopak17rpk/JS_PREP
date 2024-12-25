/**
 * Given an unsorted array arr of positive integers.
 *  One number a from the set [1, 2,....,n]
 *  is missing and one number b occurs twice in the array. Find numbers a and b.
 */

const missingAndRepeating = (arr) => {
  const frequency = new Array(arr.length + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    frequency[arr[i]]++;
  }

  let repeating = -1;
  let missing = -1;

  for (let i = 0; i < frequency.length; i++) {
    if (frequency[i] === 0) {
      missing = i;
    }
    if (frequency[i] === 2) {
      repeating = i;
    }
  }

  return { missing: missing, repeating: repeating };
};

console.log("missingAndRepeating([1, 3, 4, 2, 2])", missingAndRepeating([1, 3, 4, 2, 2])); // Should return {missing: 5, repeating: 2}
console.log("missingAndRepeating([2, 2])", missingAndRepeating([2, 2])); // Should return {missing: 1, repeating: 2}
console.log("missingAndRepeating([1, 1])", missingAndRepeating([1, 1])); // Should return {missing: 2, repeating: 1}
console.log("missingAndRepeating([3, 1, 3])", missingAndRepeating([3, 1, 3])); // Should return {missing: 2, repeating: 3}
console.log("missingAndRepeating([4, 3, 6, 2, 1, 1])", missingAndRepeating([4, 3, 6, 2, 1, 1])); // Should return {missing: 5, repeating: 1}
