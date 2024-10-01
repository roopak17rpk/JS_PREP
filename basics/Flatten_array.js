const flattenArray = (arr) => {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      acc = acc.concat(flattenArray(curr));
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
};

console.log("flattenArray", flattenArray([[1, [1.1], 2, 3], 7, 9]));
