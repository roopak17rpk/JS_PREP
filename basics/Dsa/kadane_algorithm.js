/**
 * Given an integer array arr[]. 
 * You need to find the maximum sum of a subarray.
 */

const maxSubarraySum = (arr) => {
	let sum = 0;
	let maxSum = 0;
	for(let i = 0; i < arr.length; i++){
			sum = sum + arr[i];
			maxSum = Math.max(sum , maxSum);
			if(sum < 0 ){
					sum = 0;
			}
	}
	
	if(maxSum === 0 ){
			return Math.max(...arr);
	}
	return maxSum;
}

console.log(maxSubarraySum([-2, -4]));
console.log(maxSubarraySum([-2, -4, 1, 5, -3]));
console.log(maxSubarraySum([-2, -4, 1, 5, -3, 2, 1, -1, -2, 1, 7]));
