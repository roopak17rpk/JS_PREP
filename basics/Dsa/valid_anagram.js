/**
 * valid anagram
 * An Anagram is a word or phrase, formed by rearranging
 * the lettersof different word or phrase exactly once.
 *
 * "anaagram" --> "nagaram" == true
 * "rat" --> "car" == false
 */

const isAnagram = (s, t) => {
  s = s.split("").sort().join("");
  t = t.split("").sort().join("");

  return s === t;
};

const isAnagram2 = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  const obj1 = {};
  const obj2 = {};

  for (let i = 0; i < s.length; i++) {
    obj1[s[i]] = (obj1[s[i]] || 0) + 1;
    obj2[t[i]] = (obj2[t[i]] || 0) + 1;
  }

  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};

console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));
console.log(isAnagram2("anagram", "nagaram"));
console.log(isAnagram2("rat", "car"));
