/**
 * num = 258
 * 
 * answer = 3
 */

function countDigits(n) {
    let count = 0;
    n = Math.abs(n);
    if (n === 0) {
        console.log(1);
    }
    while (n > 0) {
        n = Math.floor(n / 10);
        count++;
    }
    console.log(count);
}

countDigits(0);
countDigits(420);
countDigits(-420);