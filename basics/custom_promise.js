const STATE = {
  PENDING: "pending",
  FULFILLED: "fullfilled",
  FAILED: "failed",
};
class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value;
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);
  constructor(cb) {
    try {
      // whenever the promise is made the callback is called right away.
      // with resolve and reject.
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (e) {
      // any error in promise happens .catch is immediately called.
      this.#onFail(e);
    }
  }

  // runs all the callbacks that saved in then catch methods
  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((callback) => {
        callback.apply(this.#value);
      });

      // if we have p.then(); p.then(); then i dont want to call first .then() so we are
      // cleaning are callbacks
      this.#thenCbs = [];
    }

    if (this.#state === STATE.FAILED) {
      this.#catchCbs.forEach((callback) => {
        callback.apply(this.#value);
      });
      this.#catchCbs = [];
    }
  }
  // we only get access to .then() , .catch() , .finally() so these are only methods accessable
  // onSuccess and onFail hence are private methods
  // onSuccess ==> resolve("hi"); the "hi" is value. the rest we are doing internally
  #onSuccess(value) {
    // add these methods to microtask queue
    queueMicrotask(() => {
      // if the state is fulfilled or failed. dont call resolve. use Case
      // if resolve is called twice. resolve("hi 1") ; resolve("hi 2"); we only need to call resolve("hi 1");
      if (this.#state !== STATE.PENDING) return;

      // if p.then((value) => return new Promise()) then we need to wait for promise and then
      // call the success and fail methods
      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }
      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  }
  // onFail ==> reject("hi"); the "hi" is value. the rest we are doing internally
  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      // if developer forgets to add a catch block and error occurs
      if (this.#catchCbs.length === 0) {
        throw new UncaughtPromiseError(value);
      }

      this.#value = value;
      this.#state = STATE.FAILED;
      this.#runCallbacks();
    });
  }

  // there can be multiple .then chained. we call .then() when promise is succuussefull
  // we call all .then() when we have success from promise. hence we store these callbacks.
  // to make then chaninable we return a promise. promise is chainable as it has .then methods recursively
  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (!thenCb) {
          resolve(result);
          return;
        }

        try {
          resolve(thenCb(result));
        } catch (error) {
          reject(error);
        }
      });
      // if (!!thenCb) this.#thenCbs.push(cb);
      // if (!!catchCb) this.#catchCbs.push(cb);

      this.#catchCbs.push((result) => {
        if (!catchCb) {
          resolve(result);
          return;
        }

        try {
          resolve(catchCb(result));
        } catch (error) {
          reject(error);
        }
      });

      // sometimes the success is already called.
      /**
			 * const p = new MyPromise((resolve) => {
				resolve("data"); // Resolves immediately
				});
				p.then(data => console.log(data)); // Added after promise is already resolved
				to make sure call back runs we also add this.#runCallbacks in then
			 */
      this.#runCallbacks();
    });
  }

  catch(cb) {
    this.then(undefined, cb);
  }
  finally(cb) {
    // execute finally callback and return the last result
    // finally has not concern for result;
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
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

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);

    this.stack = `in Promise ${error} \n ${this.stack}`;
  }
}
