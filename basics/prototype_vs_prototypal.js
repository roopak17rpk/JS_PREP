/**
 * whenever a variable or function is created the JS engines attaches a property called prototype to it.
 * that provides additional properties to the object.
 *
 * way to access the prototype of an object is using __proto__ property.
 */

const object0 = {
  name: "John",
  age: 25,
  getInfoAge: function () {
    return `${this.name} is ${this.age} years old`;
  },
};

const object1 = {
  name: "John",
  city: "New York",
  getInfo: function () {
    return `${this.name} lives in ${this.city}`;
  },
};

object1.__proto__ = object0;

const object2 = {
  name: "Jane",
  age: 25,
  getInfoAge: function () {
    return `${this.name} is ${this.age} years old`;
  },
};

object2.__proto__ = object1;

// this.name refers to jane but this.city if not there sot it goes and checks if its proto has it
// as object2.__proto__ is object1 so it checks object1 for city property and finds it and returns it.
console.log(object2.getInfo());
console.log(object2.getInfoAge()); // object 2 can refer object 0 method this is called prototypal inheritance.

// thats why arr.map() and arr.__proto__.map works as well.
