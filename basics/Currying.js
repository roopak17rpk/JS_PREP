/**
 * Currying in JavaScript is a powerful technique that transforms a function with multiple
 * arguments into a nested series of functions, each taking a single argument
 *
 * question print sum such that sum(1)(2)(3)(4).end() //10
 */

function outer() {
  let sum = 0;
  function inner(...args) {
    if (args.length) {
      sum =
        sum +
        args.reduce((acc, curr) => {
          acc = acc + curr;
					return acc;
        }, 0);
    }

		inner.end =  function() {
      console.log(sum);
    };

    return inner;
  }

  return inner;
}

const sum = outer();
sum(1, 2, 3)(4).end();
