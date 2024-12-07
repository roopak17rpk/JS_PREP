// var count = 1;
// function placeOrder() {
//   console.log(count);
//   var count = 2;
//   console.log(count);
//   function sendOrder() {
//     console.log(count);
//     count++;
//     console.log(count);
//     var count = 4;
//     console.log(count);
//     var count = 10;
//   }
//   sendOrder();
// }
// placeOrder();

// (function foo() {
//   bar();

//   function bar() {
//     abc();
//     console.log(typeof abc);
//   }

//   function abc() {
//     console.log(typeof bar);
//   }
// })();

// console.log(Number("1") - 1 == 0);

// var bar = 1, foof = {};

// foof: {
//   bar: 2;
//   baz: ++bar;
// }

// console.log(foof.baz + foof.bar + bar);

// var a = 1;
// (function () {
//   var arr = new Array("100");
//   console.log(arr);
//   console.log(arr.length);
//   // a = 2;
//   // console.log(a);
// })();

// let dummyObj = {
// 	price: 199,
//   get_price: function () {
//     return this.price;
//   },
// };

// let realObj = Object.create(dummyObj);
// realObj.price = 299;

// delete realObj.price;

// console.log(realObj.get_price());

// let person = {
//   name: "leonardo",
// };

// let animal = {
//   species: "snake",
// };

// Object.freeze(person);
// person.name = "leema";

// console.log(person);

(function () {
  // var greet = "hello world";
  // var toGreet = [].filter.call(greet, function (element, index) {
  //   return index > 5;
  // });
  // console.log(toGreet);

  var objA = {
    foo: "foo",
    bar: "bar",
  };
  var objB = {
    foo: "foo",
    bar: "bar",
  };

  console.log(objA.foo == objB.foo);
  console.log(objA.foo === objB.foo);
})();
