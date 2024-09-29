/**
  ● Map the array of promises to return an object with status
	  and value/error depending upon the promised settlement.

  ● Pass this map to the Promise.all to run them at once and return the result.
 */

const allSettled = (promises) => {
  // map the promises to return a custom response.
  const mappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ status: "fulfilled", value: val }),
      (err) => ({ status: "rejected", reason: err })
    )
  );
  // run all the promises once with .all
  return Promise.all(mappedPromises);
};
