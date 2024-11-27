// this in global space

"use strict";

console.log(this); //global object
// this inside a function

function x() {
  // depend on strict and non strict mode
  // strict mode: undefinded
  // non strict mode: global object
  console.log(this);
}
x();
window.x(); // window becomes this variable now

// this in non strict mode - (this subtitution)
// if the value of keyword is undefined or null
// this will be replaced with global object.

const obj = {
  a: 10,
  x: function () {
    console.log(this);
  },
};

obj.x();
// when a function is written inside a object its called
// a method else its called a function

const student = {
  name: "akshay",
  printName: function () {
    console.log(this.name);
  },
};

student.printName(); // prints akshay

const student2 = {
  a: 20,
};

// i want printName to be shared with student2
// to share we have call, apply, bind. they help
// to override this keyword

student.printName.call(student2); // prints 20

// fn.call(this , args); // call signature

const dummyobj = {
  a: 10,
  x: () => {
    console.log(this);
  },
};
dummyobj.x(); //  prints window
// this refers to the ecnlocsing lexical context here
// in arrow functions
// this refers to where the dummy object was decalred
// and its parent scope. here dummyobj is decalred art global
// level and hence this is window object

const obj2 = {
  a: 20,
  x: function () {
    const y = () => {
      console.log(this);
    };
    y();
  },
};
obj2.x(); // encloseing context: prints a: 20 , x: f()
// arrow funtion dont create there own this binding
// they just take one from its parent

// this inside DOM element
// => reference to HTMLElement
// <button onClick={alert(this)}>
//click me</button>
// refers to button element
