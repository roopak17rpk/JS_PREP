/**
 * palindrome number
 * plaindrome number is a number that is same when read forwards and backwards
 *
 * example: 121, 12321, 13531, 1221, 1331
 *
 * not a palindrome: 123, 135, 1321
 */

const isPalindrome = (num) => {
  if (typeof num !== "number") {
    throw new Error("Given argument is not a number");
  }

  const stringNum = num.toString();
  let reverseString = stringNum.split("").reverse().join(""); // + helps us to make it int
  if (stringNum === reverseString) return true;
  return false;
};

console.log("isPalindrome", isPalindrome(121));
console.log("isPalindrome", isPalindrome(122));
console.log("isPalindrome", isPalindrome(-121));
// console.log("isPalindrome", isPalindrome("heelo"));

const isPalindrome2 = (x) => {
  return x > 0 ? x === +x.toString().split("").reverse("").join("") : false;
};

console.log("isPalindrome", isPalindrome2(121));
console.log("isPalindrome", isPalindrome2(122));
console.log("isPalindrome", isPalindrome2(-121));
