/**
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target
 *
 * Input: nums = [2,7,11,15], target = 9
 * Output [0,1] (nums[0] + nums[1] === 9)
 */

// brute force approach

const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9));

const twoSumOptimized = (nums, target) => {
  const obj1 = {};
  for (let i = 0; i < nums.length; i++) {
    if (obj1?.[target - nums[i]] >= 0) {
      return [obj1[target - nums[i]], i];
    }
    obj1[nums[i]] = i;
  }
};

console.log(twoSumOptimized([2, 7, 11, 15], 9));
