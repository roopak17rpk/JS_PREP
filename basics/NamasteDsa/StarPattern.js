/**
 * star pattern n = 4
 * * * *
 * * * *
 * * * *
 * * * *
 */

function starPattern(n) {
    for (let i = 0; i <= n; i++) {
        let row = "";
        for (let j = 0; j <= n; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

starPattern(5);

console.log("================================================");

/**
 * star pattern n = 4
 * 
 * * 
 * * *
 * * * *
 */

function starPatternPyramid(n) {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            row = row + "* ";
        }
        console.log(row);
    }
}

starPatternPyramid(4);

console.log("================================================");


/**
 * star pattern n = 5
 1
 2 2 
 3 3 3
 4 4 4 4
 5 5 5 5
 */

function starPatternNumber(n) {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            row = row + `${i + 1} `
        }
        console.log(row);
    }
}
starPatternNumber(5)

/**
 * star pattern n = 5
 1 2 3 4 5
 1 2 3 4 
 1 2 3 
 1 2 
 1 
 */
console.log("================================================");

function starPatternReverse(n) {
    for (let i = n; i > 0; i--) {
        let row = "";
        for (j = i; j > 0; j--) {
            row = `${j} ` + row;
        }
        console.log(row);
    }
}

starPatternReverse(5);

console.log("================================================");

/**
 * star pattern n = 5
 1 2 3 4 5
 1 2 3 4 
 1 2 3 
 1 2 
 1 
 */

function starPatternReverse(n) {
    for (let i = n; i > 0; i--) {
        let row = "";
        for (j = i; j > 0; j--) {
            row = `${j} ` + row;
        }
        console.log(row);
    }
}

starPatternReverse(5);

console.log("================================================");

/**
 * star pattern n = 5
          *
        * *
      * * *
    * * * *
 * * * * *
 */

function starPatternRightTree(n) {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = n - i - 1; j > 0; j--) {
            row = row + " ";
        }
        for (let k = 0; k <= i; k++) {
            row = row + "*";
        }
        console.log(row);
    }
}

starPatternRightTree(5);

console.log("================================================");

/**
 * n = 5
 * 
 * 1
 * 1 0
 * 1 0 1
 * 1 0 1 0
 * 1 0 1 0 1
 */

function starPatternNumberZeroOne(n) {
    for (let i = 0; i < n; i++) {
        let flag = true;
        let row = "";
        for (let j = 0; j <= i; j++) {
            row = row + `${flag ? `1` : `0`}`;
            flag = !flag;
        }
        console.log(row);
    }
}

starPatternNumberZeroOne(5);

console.log("================================================");
