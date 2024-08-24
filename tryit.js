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
    console.log("1");
  });
  console.log("B function called");
}

A();
B();
console.log("Global call");