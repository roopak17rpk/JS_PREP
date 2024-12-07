/**
 * fibonacci num
 * 0 , 1, 1 ,2 ,3,5,8,13,21 ....
 */

const getFibbo = () => {
  const fibboMem = [0, 1];

  const fibbo = (num) => {
    if (num < 0) {
      return 0;
    }
    if (fibboMem?.[num]) {
      return fibboMem[num];
    }
    let fibboNum = fibbo(num - 1) + fibbo(num - 2);
    fibboMem[num] = fibboNum;

    return fibboNum;
  };

  return fibbo;
};

const fibbo2 = (num) => {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  let fibboNum = fibbo2(num - 1) + fibbo2(num - 2);

  return fibboNum;
};

const fibbo = getFibbo();

console.time("optimized fibbo");
console.log(fibbo(2));
console.log(fibbo(3));
console.log(fibbo(4));
console.log(fibbo(5));
console.log(fibbo(6));
console.log(fibbo(7));
console.log(fibbo(8));
console.log(fibbo(9));
console.log(fibbo(10));
console.log(fibbo(11));
console.log(fibbo(12));
console.log(fibbo(40));
console.timeEnd("optimized fibbo");

console.time("fibbo");
console.log(fibbo2(2));
console.log(fibbo2(3));
console.log(fibbo2(4));
console.log(fibbo2(5));
console.log(fibbo2(6));
console.log(fibbo2(7));
console.log(fibbo2(8));
console.log(fibbo2(9));
console.log(fibbo2(10));
console.log(fibbo2(11));
console.log(fibbo2(12));
console.log(fibbo2(40));
console.timeEnd("fibbo");
