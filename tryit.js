for (var i = 1; i <= 10; i++) {
  function close(i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  close(i);
}
