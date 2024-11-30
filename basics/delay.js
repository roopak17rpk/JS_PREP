/**
 * implement delay such that after time t the evening is printed
 *
 * console.log("Morning");
 * dealy(5);
 * console.log("Evening");
 *
 *
 * main idea will be we have to write some function that delays the main thread
 */

function delay(time) {
  const start = Date.now();

  while (true) {
    if (Date.now() >= start + time * 1000) {
      return;
    }
  }
}
console.log("Morning");
delay(5);
console.log("Evening");

