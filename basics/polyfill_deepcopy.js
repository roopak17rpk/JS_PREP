const deepClonePolyfill = (data) => {
  if (typeof data !== "object") return data;
  if (Array.isArray(data)) return data.map((item) => deepClonePolyfill(item));
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = deepClonePolyfill(data[key]);
    return acc;
  }, {});
};

const obj1 = {
  name: "Steve",
  stack: {
    web: "react",
    mobile: "react native",
    backend: "nodejs",
  },
  numbers: [1, 2, 3, [4, 5]],
};
const obj2 = deepClonePolyfill(obj1);

obj2.name = "Louis";
obj2.stack.backend = "golang";
obj2.numbers[3].push(500);

console.log(obj1);
console.log(obj2);
