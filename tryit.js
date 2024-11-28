const STATE = {
  FULFILLED: "fullfilled",
  PENDING: "pending",
  FAILED: "failed",
};

class MyPromise {
  #value;
  #state = STATE.PENDING;
  #thenCbs = [];
  #catchCbs = [];
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);
  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (err) {
      this.#onFailBind(err);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((callback) => {
        callback(this.#value);
      });
      this.#thenCbs = [];
    }

    if (this.#state === STATE.FAILED) {
      this.#catchCbs.forEach((callback) => {
        callback(this.#value);
      });
      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  }

  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (this.#catchCbs.length === 0) {
        throw new Error("uncaught promise");
      }

      this.#value = value;
      this.#state = STATE.FAILED;
      this.#runCallbacks();
    });
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (thenCb == null) {
          resolve(result);
          return;
        }

        try {
          resolve(thenCb(result));
        } catch (err) {
          reject(err);
        }
      });

      this.#catchCbs.push((result) => {
        if (catchCb == null) {
          reject(result);
          return;
        }

        try {
          resolve(catchCb(result));
        } catch (err) {
          reject(err);
        }
      });
      this.#runCallbacks();
    });
  }

  catch(cb) {
    return this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        return result;
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}

const customPromise = (delay) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (delay === 1500) {
        reject(`rejected ${delay}`);
        return;
      }
      resolve(`resolved ${delay}`);
    }, delay);
  });
};

const showResult = async () => {
  const res = await customPromise(2000);
  console.log(res, "res");
};

// customPromise(2000).then((value) => {
//   console.log(value);
// });
// showResult();

const testPromises = async () => {
  try {
    const res1 = await customPromise(1500);
    console.log("res1", res1);
  } catch (error) {
    console.log("error1", error);
  }

  try {
    const res2 = await customPromise(2000);
    console.log("res2", res2);
  } catch (error) {
    console.log("error2", error);
  }
};

testPromises();
