/**
 * Resume Experience
 */

const arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log(arr[i]);
  }, 3000);
}

/**
 * what is closure
 */
const x = outer();
console.log(x(1)); // 1
console.log(x(5)); // 6
console.log(x(10)); // 16

function outer() {
  let x = 0;
  return function inner(y) {
    x = x + y;
    return x;
  };
}
/** disadvantage of closure */

/**
 * promise question
 *
 */

function ApiCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promise Resolve");
    }, 2000);
  });
}

async function A() {
  const res = await ApiCall();
  console.log("A function called");
}

function B() {
  ApiCall().then(() => {
    console.log("then resolve");
  });
  console.log("B function called");
}

A();
B();
console.log("Global call");

/** make undo / redo
 * start by asking debouncing and give debouncing code
 */

// https://stackblitz.com/edit/react-1m5esi?file=src%2FApp.js

/** undo redo react code */

import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const DEBOUNCE_TIMER = 1000;

export default function App() {
  const [value, setValue] = useState("");
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const allowSave = useRef(true);
  const maxLength = useRef(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (allowSave.current) {
        undoStack.current.push(value);
        maxLength.current += 1;
      }
    }, DEBOUNCE_TIMER);

    return () => {
      clearTimeout(interval);
    };
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    allowSave.current = true;
  };

  const handleUndo = () => {
    allowSave.current = false;
    if (undoStack.current?.length) {
      const val = undoStack.current[undoStack.current?.length - 2];
      redoStack.current.push(value);
      undoStack.current.pop();
      setValue(val);
      return;
    }
  };

  const handleRedo = () => {
    allowSave.current = false;
    if (
      redoStack.current?.length &&
      redoStack.current?.length <= maxLength.current
    ) {
      const val = redoStack.current[redoStack.current?.length - 1];
      undoStack.current.push(val);
      redoStack.current.pop();
      setValue(val);
      return;
    }
  };

  return (
    <div>
      <input value={value} onChange={handleChange} type="text" />
      <button onClick={handleUndo}>undo</button>
      <button onClick={handleRedo}>redo</button>
    </div>
  );
}

// debounce

useEffect(() => {
  const interval = setTimeout(() => {
    // debounce logic
  }, DEBOUNCE_TIMER);

  return () => {
    clearTimeout(interval);
  };
}, [Dependency]);
