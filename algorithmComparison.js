// Brute Force Approach: O(n^2)
function maxSubarraySumBruteForce(arr) {
    let maxSum = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
    }
    return maxSum;
}

// Optimized Approach (Kadane's Algorithm): O(n)
function maxSubarraySumOptimized(arr) {
    let maxSum = -Infinity;
    let currentSum = 0;
    for (let num of arr) {
        currentSum = Math.max(num, currentSum + num);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}

// Test the algorithms and measure time
const smallTestArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const largeTestArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 200) - 100); // Array of 1000 random numbers between -100 and 100

console.log('\n=== Small Array (9 elements) ===');
// Brute Force
console.time('Brute Force (small)');
const bruteForceSmallResult = maxSubarraySumBruteForce(smallTestArray);
console.timeEnd('Brute Force (small)');
console.log('Brute Force Result:', bruteForceSmallResult);

// Optimized
console.time('Optimized (small)');
const optimizedSmallResult = maxSubarraySumOptimized(smallTestArray);
console.timeEnd('Optimized (small)');
console.log('Optimized Result:', optimizedSmallResult);

console.log('\n=== Large Array (1000 elements) ===');
// Brute Force
console.time('Brute Force (large)');
const bruteForceLargeResult = maxSubarraySumBruteForce(largeTestArray);
console.timeEnd('Brute Force (large)');
console.log('Brute Force Result:', bruteForceLargeResult);

// Optimized
console.time('Optimized (large)');
const optimizedLargeResult = maxSubarraySumOptimized(largeTestArray);
console.timeEnd('Optimized (large)');
console.log('Optimized Result:', optimizedLargeResult);

