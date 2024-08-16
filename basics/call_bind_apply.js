let nameClass = {
  firstName: "Roopak",
  lastName: "Gupta",
  printName: function () {
    console.log(this.firstName + this.lastName);
  },
};

nameClass.printName();

let nameClass2 = {
  firstName: "Akash",
  lastName: "Kumar",
};

/**
 * with call method we can borrow functions form other objects. Call methods excepts new object and refers to it
 *  as its this variable.
 */

nameClass.printName.call(nameClass2);

let printHomeTownNameAge = function (homeTown, age) {
  console.log(this.firstName + this.lastName + "from" + homeTown + "age" + age);
};

printHomeTownNameAge.call(nameClass, "punjab", "25");
printHomeTownNameAge.call(nameClass2, "jharkhand", "23");

/**
 * in Apply method we pass hte extra arguments in array list.
 * 
*/

printHomeTownNameAge.apply(nameClass, ["punjab", "25"]);
printHomeTownNameAge.apply(nameClass2, ["jharkhand", "23"]);

/**
 * bind method returns a copy of method with its arguments binded. 
 * which can be invoked later as per requirement
 */

let bindedPrintHomeTownNameAge = printHomeTownNameAge.bind(nameClass, "punjab-Bind", "25-bind");

bindedPrintHomeTownNameAge();
