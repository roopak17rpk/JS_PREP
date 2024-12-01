/**
 * Generator Functions in JavaScript
 * 
 * Generator functions are special functions that can be paused and resumed,
 * allowing for the generation of a sequence of values over time. They are
 * defined using the function* syntax and use the yield keyword to pause
 * execution and return a value.
 * 
 * Use Cases and Examples:
 * 
 * 1. Iterating over large data sets:
 *    Generators are useful for processing large amounts of data without
 *    loading everything into memory at once.
 * 
 *    Example:
 *    function* largeDataSet() {
 *      for (let i = 0; i < 1000000; i++) {
 *        yield i;
 *      }
 *    }
 *    
 *    for (let value of largeDataSet()) {
 *      if (value > 100) break;
 *      console.log(value);
 *    }
 * 
 * 2. Implementing custom iterables:
 *    Generators make it easy to create custom iterable objects.
 * 
 *    Example:
 *    function* fibonacci() {
 *      let [prev, curr] = [0, 1];
 *      while (true) {
 *        yield curr;
 *        [prev, curr] = [curr, prev + curr];
 *      }s
 *    }
 *    
 *    let fib = fibonacci();
 *    for (let i = 0; i < 10; i++) {
 *      console.log(fib.next().value);
 *    }
 * 
 * 3. Asynchronous programming:
 *    Generators can be used to write asynchronous code that looks synchronous.
 * 
 *    Example:
 *    function* fetchData() {
 *      const result1 = yield fetch('https://api.example.com/data1');
 *      const result2 = yield fetch('https://api.example.com/data2');
 *      return [result1, result2];
 *    }
 *    
 *    function runGenerator(gen) {
 *      const iterator = gen();
 *      function iterate(iteration) {
 *        if (iteration.done) return iteration.value;
 *        const promise = iteration.value;
 *        return promise.then(x => iterate(iterator.next(x)));
 *      }
 *      return iterate(iterator.next());
 *    }
 *    
 *    runGenerator(fetchData).then(console.log);
 * 
 * 4. State machines:
 *    Generators can be used to implement complex state machines.
 * 
 *    Example:
 *    function* trafficLight() {
 *      while (true) {
 *        yield 'green';
 *        yield 'yellow';
 *        yield 'red';
 *      }
 *    }
 *    
 *    const light = trafficLight();
 *    console.log(light.next().value); // 'green'
 *    console.log(light.next().value); // 'yellow'
 *    console.log(light.next().value); // 'red'
 *    console.log(light.next().value); // 'green'
 * 
 * These examples demonstrate the versatility and power of generator functions
 * in JavaScript, showcasing their ability to handle complex iterative processes,
 * manage asynchronous operations, and model stateful systems with ease.
 */

function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = simpleGenerator();
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3














