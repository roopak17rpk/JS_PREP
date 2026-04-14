/**
 * Arrow vs normal function
 *
 * arrow function are not hoisted. u have to declare them before using them.
 * normal functions are hoiseted u can declare them before using.
 *
 * Arrow function have this keyword pointing to themselves
 * normal functions have this keyword pointing to the object that called them.
 */

const UNCOMPRESSED_STRING =
  "000000001111111000011100100100000010010000111110001111110000000";

function compressString(str) {
  let stringLength = str.length;
  let compressed = {};
  let tempLenth = 1;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] !== str[i + 1]) {
      compressed[str[i]] = [
        ...(compressed[str[i]] || []),
        { length: tempLenth, position: i },
      ];
      tempLenth = 1;
      continue;
    }
    tempLenth++;
  }
  if (str[str.length - 1] === str[str.length - 2]) {
    compressed[str[str.length - 1]] = [
      ...(compressed[str[str.length - 1]] || []),
      { length: tempLenth, position: str.length - 1 },
    ];
  } else {
    compressed[str[str.length - 1]] = [
      ...(compressed[str[str.length - 1]] || []),
      { length: 1, position: str.length - 1 },
    ];
  }
  return { compressed, stringLength };
}

function uncompressString(compressed, stringLength) {
  let uncompressed = new Array(stringLength).fill(" ");
  for (let key in compressed) {
    for (let i = 0; i < compressed[key].length; i++) {
      for (let k = 0; k < compressed[key][i]?.length; k++) {
        uncompressed[compressed[key][i]?.position - k] = key;
      }
    }
  }
  return uncompressed.join("");
}

const { compressed, stringLength } = compressString(UNCOMPRESSED_STRING);
console.log(compressed);
console.log(uncompressString(compressed, stringLength));
