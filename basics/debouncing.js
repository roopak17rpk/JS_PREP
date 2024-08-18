function searchInp() {
  console.log("text input");
}

const debouncedSearchedInp = debounce(searchInp, 2000);

function debounce(fn, limit) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, limit);
    }
  };
}
