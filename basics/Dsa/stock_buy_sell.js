/**
 * Best time to buy and sell sell stocks
 * you are given an array prices where prices[i] is the price of given stock on
 * ith day
 *
 * You want to maximize your profit by choosing a single day to buy one stock
 * on the ith day.
 *
 * you want to maximize your profit by choosing a single day to buy one stock
 * and choosing a different day in future to sell the stock
 * return the maximum profit, if u cannot acheive any profit return 0
 *
 * prices = [7,1,5,3,6,4]; ----->>>>> output: 5;
 * prices = [7,6,4,3,1]; ----->>>>> output: 0;
 */

// brute force

const maxProfit = (prices) => {
  let globalProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const currentProfit = prices[j] - prices[i];
      if (currentProfit > globalProfit) globalProfit = currentProfit;
    }
  }
  return globalProfit;
};

console.log("maxProfit", maxProfit([7, 1, 5, 3, 6, 4]));
console.log("maxProfit", maxProfit([7, 6, 4, 3, 1]));

const maxProfitGreedy = (prices) => {
  let profit = 0;
  let min = Infinity;
  for (let i = 0; i < prices.length; i++) {
    if (min > prices[i]) {
      min = prices[i];
    }
    if (profit < prices[i] - min) {
      profit = prices[i] - min;
    }
  }

  return profit;
};

console.log("maxProfitGreedy", maxProfitGreedy([7, 1, 5, 3, 6, 4]));
console.log("maxProfitGreedy", maxProfitGreedy([7, 6, 4, 3, 1]));
