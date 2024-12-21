const res = {
  statusCode: null,
  setStatusCode: function (statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  getStatusCode: function () {
    return this.statusCode;
  },
};

console.log(res.setStatusCode(200).getStatusCode());
