const FlattenObj = (obj) => {
  let finalObj = {};

  function generateFlattenObj(obj, parent) {
    for (let key in obj) {
      const newParent = parent + key;
      const value = obj[key];
      if (value !== null && typeof value === "object") {
        generateFlattenObj(value, newParent + ".");
      } else {
        finalObj[newParent] = value;
      }
    }
  }
  generateFlattenObj(obj, "");
  return finalObj;
};

const nestedObject = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: {
      code: "US",
      name: "United States",
    },
  },
  hobbies: ["reading", "traveling"],
  education: {
    highSchool: {
      name: "Anytown High",
      graduationYear: 2005,
    },
    university: {
      name: "State University",
      graduationYear: 2009,
      degree: "Computer Science",
    },
  },
  summy: null,
};

const flattenObject = FlattenObj(nestedObject);

console.log("flattenObject", flattenObject);
console.log("flattenObject", flattenObject[`hobbies.0`]);
