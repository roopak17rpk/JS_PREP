/**
 * remove duplicate from sorted array
 */

function removeDuplicate(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i + 1, 1);
      i--;
    }
  }

  return nums;
}

console.log(removeDuplicate([1, 1, 2, 2, 2, 3]));

// no js function

function removeDuplicate2(nums) {
  if (nums.length === 0) return nums;

  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      i++;
      nums[i] = nums[j];
    }
  }
  let lengthNums = nums.length;
  i++;
  while (i < lengthNums) {
    nums.pop();
    i++;
  }

  return nums;
}

console.log(removeDuplicate2([1, 1, 2, 2, 2, 3]));
