const nameClass = {
  firstName: "rpk",
  lastName: "gupta",
  printName: function (arg1) {
    console.log(this.firstName, " + ", this.lastName, " + ", arg1);
  },
};

nameClass2 = {
  firstName: "hof",
  lastName: "kinson",
};

nameClass.printName.call(nameClass2, "cardano");
nameClass.printName.apply(nameClass2, ["apply cardano"]);
