/**
 * Shallow Copy vs Deep Copy in JavaScript
 *
 * @description
 * Shallow Copy:
 * - Creates a new object or array.
 * - Copies references of nested objects or arrays.
 * - Changes to nested objects/arrays in the copy affect the original.
 * - Suitable for simple, one-level deep structures.
 *
 * Deep Copy:
 * - Creates a new object or array.
 * - Recursively copies all nested objects and arrays.
 * - Changes to nested objects/arrays in the copy don't affect the original.
 * - Suitable for complex, multi-level structures.
 *
 * @example
 * // Shallow Copy
 * const original = { a: 1, b: { c: 2 } };
 * const shallowCopy = { ...original };
 * shallowCopy.b.c = 3;
 * console.log("original.b.c", original.b.c); // Outputs: 3
 *
 * // Deep Copy
 * const deepCopy = JSON.parse(JSON.stringify(original));
 * deepCopy.b.c = 4;
 * console.log("original.b.c", original.b.c); // Outputs: 3
 */

// Example implementation
const shallowCopyExample = () => {
  const original = { a: 1, b: { c: 2 } };
  const shallowCopy = { ...original };

  console.log("Before modification:");
  console.log("original", original);
  console.log("shallowCopy", shallowCopy);

  shallowCopy.b.c = 3;

  console.log("After modification:");
  console.log("original", original);
  console.log("shallowCopy", shallowCopy);
};

const deepCopyExample = () => {
  const original = { a: 1, b: { c: 2 } };
  const deepCopy = JSON.parse(JSON.stringify(original));

  console.log("Before modification:");
  console.log("original", original);
  console.log("deepCopy", deepCopy);

  deepCopy.b.c = 4;

  console.log("After modification:");
  console.log("original", original);
  console.log("deepCopy", deepCopy);
};

shallowCopyExample();
deepCopyExample();

// if you only want to do a top level copying of object use spread operator

const obj = {
  name: {
    firstName: "roopak",
    lastName: "gupta",
  },
  education: {
    primary: true,
    secondary: true,
  },
};

const obj1 = { ...obj };
const obj2 = { ...obj };
obj.name.firstName = "satyam"; // changes first name
obj2.name = "shubham"; // changes first name
console.log(obj);
console.log(obj1);
console.log(obj2);
