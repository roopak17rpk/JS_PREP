/**
 * given a array find the second largest number
 *
 * Input: [12, 35, 1, 10, 34,1] --->> Output: 34
 * Input: [10,5,10] ---->> Output: 5
 */

function secondLargest(nums) {
  const uniquesArr = Array.from(new Set(nums));
  uniquesArr.sort((a, b) => a - b);
  // console.log("uniquesArr", uniquesArr);
  return uniquesArr.at(-2);
}

console.log(secondLargest([12, 35, 1, 10, 34, 1]));
console.log(secondLargest([10, 5, 10]));

function secondLargestOptimized(nums) {
  let largest = Number.NEGATIVE_INFINITY;
  let secondLargest = Number.NEGATIVE_INFINITY;

  for (let index = 0; index < nums.length; index++) {
    if (nums[index] > largest) {
      secondLargest = largest;
      largest = nums[index];
      continue;
    }
    if (nums[index] < largest && nums[index] > secondLargest) {
      secondLargest = nums[index];
			continue;
    }
  }

  return secondLargest;
}

console.log(secondLargestOptimized([12, 35, 1, 10, 34, 1]));
console.log(secondLargestOptimized([10, 5, 10]));
