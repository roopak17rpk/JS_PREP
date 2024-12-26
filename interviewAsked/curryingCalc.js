/**
 * Write a js function that can be invoked like below -
calc().add(10).subtract(5).multiply(20).divide(2).getResult() . In this case, the output should be 50.
 */

function calc() {
  let calculatedValue = null;

  const add = function (args) {
    calculatedValue = calculatedValue === null ? args : calculatedValue + args;
    console.log("calculatedValue after add", calculatedValue);
    return this;
  };

  const multiply = function (args) {
    calculatedValue = calculatedValue === null ? args : calculatedValue * args;
    console.log("calculatedValue after multiply", calculatedValue);
    return this;
  };

  const subtract = function (args) {
    calculatedValue = calculatedValue === null ? args : calculatedValue - args;
    console.log("calculatedValue after subtract", calculatedValue);
    return this;
  };

  const divide = function (args) {
    calculatedValue = calculatedValue === null ? args : calculatedValue / args;
    console.log("calculatedValue after divide", calculatedValue);
    return this;
  };

  const getResult = function () {
    console.log("final result", calculatedValue);
    return calculatedValue;
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
