/**
 * Given an array arr of positive integers. 
 * The task is to return the maximum of j - i 
 * subjected to the constraint of arr[i] < arr[j] and i < j.
 * 
 * @param {number[]} arr - Input array of positive integers
 * @returns {number} - Maximum difference j-i where arr[i] < arr[j]
 */
const maxIndexDiff = (arr) => {
    console.log("input_array", arr);
    
    const n = arr.length;
    console.log("array_length", n);
    
    // If array has less than 2 elements, return 0
    if (n < 2) {
        return 0;
    }

    let maxDiff = 0;
    
    // Create two auxiliary arrays
    // leftMin[i] will contain minimum value from arr[0] to arr[i]
    const leftMin = new Array(n);
    console.log("leftMin_array_initialized", leftMin);
    
    // rightMax[i] will contain maximum value from arr[i] to arr[n-1]
    const rightMax = new Array(n);
    console.log("rightMax_array_initialized", rightMax);
    
    // Fill leftMin array
    leftMin[0] = arr[0];
    for (let i = 1; i < n; i++) {
        leftMin[i] = Math.min(arr[i], leftMin[i - 1]);
    }
    console.log("leftMin_array_filled", leftMin);
    
    // Fill rightMax array
    rightMax[n - 1] = arr[n - 1];
    for (let j = n - 2; j >= 0; j--) {
        rightMax[j] = Math.max(arr[j], rightMax[j + 1]);
    }
    console.log("rightMax_array_filled", rightMax);
    
    // Find the maximum j-i using leftMin and rightMax
    let i = 0;
    let j = 0;
    
    while (i < n && j < n) {
        if (leftMin[i] <= rightMax[j]) {
            maxDiff = Math.max(maxDiff, j - i);
            j++;
        } else {
            i++;
        }
    }
    
    console.log("maximum_difference", maxDiff);
    return maxDiff;
};

// Test cases
console.log("Test Case 1:");
const arr1 = [34, 8, 10, 3, 2, 80, 30, 33, 1];
console.log("Result:", maxIndexDiff(arr1)); // Expected output: 6

console.log("\nTest Case 2:");
const arr2 = [9, 2, 3, 4, 5, 6, 7, 8, 18, 0];
console.log("Result:", maxIndexDiff(arr2)); // Expected output: 8

