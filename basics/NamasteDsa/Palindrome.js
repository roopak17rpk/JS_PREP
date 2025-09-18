/**
 * num = 121
 * 
 * answer = true
 */

function palindrome(n) {
    if (n < 0) {
        return false;
    }
    let revNum = 0;
    const oldNum = n;
    let count = 0;
    while (n > 0) {
        n = Math.floor(n / 10);
        count++;
    }
    console.log("count", count);
    n = oldNum;
    while (n > 0) {
        revNum = revNum + ((n % 10) * Math.pow(10, (count - 1)));
        n = Math.floor(n / 10);
        count--;
    }
    console.log(revNum);
    console.log(oldNum);
    return revNum === oldNum;
}

console.log(palindrome(121));
console.log(palindrome(0));
console.log(palindrome(122));