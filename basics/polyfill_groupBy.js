/**
 * create a exmaple array for groupBy
 */

const exampleArray = [
  { name: "John", age: 25, city: "New York" },
  { name: "Jane", age: 30, city: "Los Angeles" },
  { name: "John", age: 25, city: "New Jersey" },
  { name: "Jane", age: 30, city: "New York" },
];

const grouped = exampleArray.reduce((acc, curr) => {
  if (acc[curr.name]) {
    acc[curr.name].push(curr);
    return acc;
  }
  acc[curr.name] = [curr];
  return acc;
}, {});

console.log("grouped", grouped);
