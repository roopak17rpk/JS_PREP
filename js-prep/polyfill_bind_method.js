/**
 * polyfills are fallbacks. if a certain browser doesnt support bind we have to
 * write it on our own.
 */

let nameClass = {
  firstName: "Roopak",
  lastName: "Gupta",
};

let printName = function (homeTown, age) {
  console.log(
    `${this.firstName} ${this.lastName} hometown = ${homeTown} age = ${age}`
  );
};

let bindedPrintName = printName.bind(nameClass, "DelhiBoi");
bindedPrintName("22");

/**
 * my bind is a function that returns a function
 * this -> function that reference it in our Case its printName this -> printName
 * to accept others params we will store them in ine new var params
 */
Function.prototype.myBind = function (...args) {
  let obj = this;
  let params = args.slice(1);
  return function (...localArgs) {
    obj.apply(args[0], [...params, ...localArgs]);
  };
};

let myBindedPrintName = printName.myBind(nameClass, "MumBhai");
myBindedPrintName("22");
