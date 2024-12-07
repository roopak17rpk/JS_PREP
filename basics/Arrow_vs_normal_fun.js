/**
 * Differences between Arrow Functions and Regular Functions in JavaScript
 * 
 * 1. Syntax
 * - Regular functions use 'function' keyword
 * - Arrow functions use => syntax and are more concise
 * 
 * 2. 'this' binding
 * - Regular functions create their own 'this' context
 * - Arrow functions inherit 'this' from enclosing scope
 * 
 * 3. Arguments object
 * - Regular functions have access to 'arguments' object
 * - Arrow functions do not have their own 'arguments'
 * 
 * 4. Constructor
 * - Regular functions can be used as constructors with 'new'
 * - Arrow functions cannot be used as constructors
 * 
 * 5. Hoisting
 * - Regular functions are hoisted completely with their definition
 * - Arrow functions are not hoisted (they follow variable hoisting rules)
 * 
 * Examples:
 * 
 * // 1. Syntax Examples
 * // Regular function
 * function add(a, b) {
 *   return a + b;
 * }
 * 
 * // Arrow function - concise
 * const addArrow = (a, b) => a + b;
 * 
 * // Arrow function with body
 * const addArrowBody = (a, b) => {
 *   return a + b;
 * };
 * 
 * // 2. 'this' Context Example
 * const obj = {
 *   name: 'John',
 *   // Regular function - has its own 'this'
 *   regularMethod: function() {
 *     console.log('Regular:', this.name);
 *     setTimeout(function() {
 *       console.log('Regular timeout:', this.name); // undefined - lost context
 *     }, 100);
 *   },
 *   
 *   // Arrow function - inherits 'this'
 *   arrowMethod: function() {
 *     console.log('Arrow:', this.name);
 *     setTimeout(() => {
 *       console.log('Arrow timeout:', this.name); // maintains context
 *     }, 100);
 *   }
 * };
 * 
 * // 3. Arguments Object Example
 * function regularArgs() {
 *   console.log(arguments); // has arguments object
 *   return Array.from(arguments).reduce((a, b) => a + b);
 * }
 * 
 * const arrowArgs = (...args) => {
 *   // console.log(arguments); // ReferenceError
 *   return args.reduce((a, b) => a + b); // must use rest parameters
 * };
 * 
 * // 4. Constructor Example
 * function Car(make) {
 *   this.make = make;
 * }
 * const civic = new Car('Honda'); // Works
 * 
 * const CarArrow = (make) => {
 *   this.make = make;
 * };
 * // const civic2 = new CarArrow('Honda'); // TypeError
 * 
 * // 5. Hoisting Example
 * console.log(regularHoisted()); // Works - "I am hoisted"
 * // console.log(arrowHoisted()); // ReferenceError - cannot access before initialization
 * 
 * function regularHoisted() {
 *   return "I am hoisted";
 * }
 * 
 * const arrowHoisted = () => {
 *   return "I am not hoisted";
 * };
 * 
 * Additional Notes:
 * - Arrow functions are great for callbacks and short methods
 * - Regular functions are better for object methods and constructors
 * - Arrow functions provide cleaner syntax for functional programming
 * - Understanding hoisting is crucial for function organization
 */