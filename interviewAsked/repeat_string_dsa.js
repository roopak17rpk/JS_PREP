/**
 * Decodes a string with pattern like "2[a2[b]]" -> "abbabb"
 * @param {string} encodedString - The encoded string to decode
 * @returns {string} - The decoded string
 * make better
 */
const decodeString = (encodedString) => {
  // Stack to store characters and numbers

  let final = "";

  for (let i = encodedString?.length - 1; i >= 0; i--) {
    const char = encodedString[i];
    if (char === "[" || char === "]") {
      continue;
    }
    if (!isNaN(char)) {
      const num = parseInt(char);
      // console.log("num", num);
      final = final.repeat(num);
      // console.log("final", final);
      continue;
    }
    final = char + final;
  }

  return final;
};

// Test cases
const testCases = ["2[a2[b]]", "3[b2[ca]]"];

testCases.forEach((test) => {
  const result = decodeString(test);
  console.log("input_string", test);
  console.log("decoded_result", result);
});
