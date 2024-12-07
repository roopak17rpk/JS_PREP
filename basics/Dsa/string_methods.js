// creating string

const string1 = new String("roadside coder");
const string2 = "Roadside coder";
const string3 = "Roadside";

const string4 = `Welcome 
to the ${string3}`; // backticks allow multiline formatiing. same is reflected in console

console.log("string4", string4);

console.log`hello ${"world"} kaise hai ${"app"}`; // [ 'hello ', ' kaise hai ', '' ] world app two arguments
// string literals in array and arguments are there

// accessing a character

const str = "hello world awezsss";
console.log(str[3]);
console.log(str.charAt(3)); // negative doesnt return anything ex: -3

// modifying string
str[3] = "b";
console.log("str", str);
console.log("str no modify", str);
console.log(str.replace("s", "b")); // returns a new string. strings are immutatable in js
console.log(str.replaceAll("s", "b")); // replace all instance of s
console.log("str", str);

const newStr = str.concat(" adding this string via concat");
console.log(newStr);
const tobeTrimmed = "   Hello    World   ";
console.log(tobeTrimmed.trim());

const indexationStr = "RoadSide Coder";
console.log(indexationStr.indexOf("e"));
console.log(indexationStr.lastIndexOf("e"));
console.log(indexationStr.startsWith("r")); // returns true for "R"
console.log(indexationStr.endsWith("r"));

console.log(indexationStr.substring(7)); // same "e Coder"
console.log(indexationStr.substring(7, 15)); // same "e Coder"
console.log(indexationStr.substring(7, indexationStr?.length)); // same "e Coder"
console.log(indexationStr.substring(7, 10)); // same "e C"
console.log(indexationStr.slice(-14, -1)); //RoadSide Code

const aNum = 1;
console.log(String(aNum)); // this is a string
const obj = { class: "new" };
console.log(String(obj)); // fails here gives [object object] have to use JSON.stringify()
console.log(JSON.stringify(obj));

const caseSensitive = "Hello World";
console.log(caseSensitive.toLowerCase());
console.log(caseSensitive.toUpperCase());

console.log(str.charCodeAt(0));
console.log(String.fromCharCode(65)); // prints A

const fruit1 = "apple";
const fruit2 = "banana";

console.log(fruit2.localeCompare(fruit1)); // 1 b comes before a so true else would have given -1

console.log(fruit1.includes("ap")); //true

//splitting and joining

console.log(fruit1.split("l"));
const arr = ["apple", "banana"];
console.log(arr.join(" and "));

/**
 * truncate the string
 *
 * str = "subscribe to Ravindra Singh" , maxlength = 9;
 * output: "Subscribe..."
 */

const truncate = (str, maxlength) => {
  if (str.length > maxlength) {
    return str.slice(0, maxlength) + "...";
  }

  return str;
};

const exampleStr = "Subscribe to Ravindra Singh";
console.log(truncate(exampleStr, 9));

/**
 * hamming distance
 *
 * str1 =  "hello";
 * str2 = "htllr";
 *
 * answer 2. t is different thn r is deifference and distance between them is 2
 */

const hammingDistance = (txt1, txt2) => {
  if (txt1.length !== txt2.length) {
    throw new Error("hamming distance not possible");
  }

  let distance = 0;

  for (let i = 0; i < txt1.length; i++) {
    if (txt1[i] !== txt2[i]) {
      distance++;
    }
  }

  return distance;
};
