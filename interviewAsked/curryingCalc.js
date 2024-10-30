/**
 * Write a js function that can be invoked like below -
calc().add(10).subtract(5).multiply(20).divide(2).getResult() . In this case, the output should be 50.
 */

function calc() {
  let calculatedValue = 1;

  const add = function (args) {
    calculatedValue = +args;
    return this;
  };
  const multiply = function (args) {
    calculatedValue = calculatedValue * args;
    return this;
  };
  const subtract = function (args) {
    calculatedValue = calculatedValue - args;
    return this;
  };
  const divide = function (args) {
    calculatedValue = calculatedValue / args;
    return this;
  };

  const getResult = function () {
    console.log(calculatedValue);
  };

  return {
    add,
    multiply,
    subtract,
    divide,
    getResult,
  };
}

calc().add(10).subtract(5).multiply(20).divide(2).getResult();
