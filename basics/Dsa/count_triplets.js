/**
 * Given an array arr. The task is to count
 * all the triplets such that the sum of two elements equals the third element.
 */

const countTriplet = (props) => {
	const { arr } = props;
	let count = 0;
	
	// Sort array for optimization
	arr.sort((a, b) => a - b);

	// Check each element as potential sum
	for (let i = arr.length - 1; i >= 2; i--) {
		let left = 0;
		let right = i - 1;

		while (left < right) {
			const currentSum = arr[left] + arr[right];
			
			if (currentSum === arr[i]) {
				count++;
				left++;
				right--;
			}

			if (currentSum < arr[i]) {
				left++;
			}

			if (currentSum > arr[i]) {
				right--;
			}
		}
	}

	console.log("count", count);
	return count;
}

console.log("result", countTriplet({ arr: [1, 5, 3, 2] }));
