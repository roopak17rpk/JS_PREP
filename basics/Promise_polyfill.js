/**
 * Enum representing the possible states of a Promise
 * A Promise can only be in one of these three states at any given time
 * @readonly
 * @enum {string}
 * @example
 * // Internal state transitions
 * PENDING → FULFILLED (when resolved)
 * PENDING → FAILED (when rejected)
 * Once changed from PENDING, the state cannot be changed again
 */
const STATE = {
  FULFILLED: "fullfilled",
  PENDING: "pending",
  FAILED: "failed",
};

/**
 * A Promise implementation that follows the Promise/A+ specification
 * Provides functionality for handling asynchronous operations
 * 
 * @class MyPromise
 * @example
 * // Creating a simple promise that resolves after 1 second
 * const promise = new MyPromise((resolve, reject) => {
 *   setTimeout(() => {
 *     resolve('Operation completed');
 *   }, 1000);
 * });
 * 
 * // Handling promise resolution
 * promise
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 */
class MyPromise {
  /** @private Array of callbacks to be executed when promise is fulfilled */
  #thenCbs = [];
  
  /** @private Array of callbacks to be executed when promise is rejected */
  #catchCbs = [];
  
  /** @private Current state of the promise */
  #state = STATE.PENDING;
  
  /** @private Value that the promise resolves or rejects with */
  #value = null;
  
  /** @private Bound version of onSuccess to maintain correct 'this' context */
  #onSuccessBind = this.#onSuccess.bind(this);
  
  /** @private Bound version of onFail to maintain correct 'this' context */
  #onFailedBind = this.#onFail.bind(this);

  /**
   * Creates a new Promise instance
   * @param {Function} cb - Executor function that receives resolve and reject functions
   * @throws {UncaughtPromiseError} If the promise is rejected without a catch handler
   * 
   * @example
   * // Basic usage
   * const promise = new MyPromise((resolve, reject) => {
   *   // Async operation
   *   fs.readFile('file.txt', (err, data) => {
   *     if (err) reject(err);
   *     else resolve(data);
   *   });
   * });
   */
  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailedBind);
    } catch {
      this.#onFail();
    }
  }

  /**
   * Executes stored callbacks based on promise state
   * This method ensures that callbacks are executed only once
   * and in the order they were registered
   * @private
   * 
   * @example
   * // Internal usage
   * #runCallbacks() {
   *   // For fulfilled promises
   *   this.#thenCbs.forEach(cb => cb(this.#value));
   *   // Clear callbacks after execution
   *   this.#thenCbs = [];
   * }
   */
  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => {
        cb(this.#value);
      });
      this.#thenCbs = [];
    }
    if (this.#state === STATE.FAILED) {
      this.#catchCbs.forEach((cb) => {
        cb(this.#value);
      });
      this.#catchCbs = [];
    }
  }

  /**
   * Handles successful promise resolution
   * Uses queueMicrotask to ensure proper execution timing
   * @private
   * @param {*} value - The value to resolve the promise with
   * 
   * @example
   * // Internal handling of promise resolution
   * const promise = new MyPromise((resolve) => {
   *   resolve(42); // Internally calls #onSuccess(42)
   * });
   */
  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailedBind);
        return;
      }
      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  }

  /**
   * Handles promise rejection
   * Uses queueMicrotask to ensure proper execution timing
   * @private
   * @param {*} value - The reason for promise rejection
   * @throws {UncaughtPromiseError} If no catch handlers are registered
   * 
   * @example
   * // Internal handling of promise rejection
   * const promise = new MyPromise((resolve, reject) => {
   *   reject(new Error('Failed')); // Internally calls #onFail(error)
   * });
   */
  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailedBind);
        return;
      }

      if (this.#catchCbs.length === 0) {
        throw UncaughtPromiseError(value);
      }

      this.#value = value;
      this.#state = STATE.FAILED;
      this.#runCallbacks();
    });
  }

  /**
   * Attaches callbacks for promise resolution and rejection
   * Returns a new promise to enable chaining
   * @param {Function} thenCb - Callback for successful resolution
   * @param {Function} catchCb - Callback for rejection
   * @returns {MyPromise} A new promise instance
   * 
   * @example
   * // Promise chaining
   * const promise = new MyPromise(resolve => resolve(1))
   *   .then(result => result * 2)
   *   .then(result => result + 1)
   *   .then(result => {
   *     console.log(result); // Outputs: 3
   *   });
   * 
   * // Error handling in chain
   * const promise2 = new MyPromise((resolve, reject) => reject('error'))
   *   .then(result => console.log(result))
   *   .catch(error => console.log('Caught:', error));
   */
  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (thenCb === null) {
          resolve(result);
          return;
        }
        try {
          resolve(thenCb(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#catchCbs.push((result) => {
        if (catchCb === null) {
          resolve(result);
          return;
        }
        try {
          resolve(catchCb(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#runCallbacks();
    });
  }

  /**
   * Attaches a callback for promise rejection
   * Shorthand for .then(undefined, cb)
   * @param {Function} cb - Callback for rejection
   * @returns {MyPromise}
   * 
   * @example
   * // Error handling
   * const promise = new MyPromise((resolve, reject) => {
   *   reject(new Error('Operation failed'));
   * })
   * .catch(error => {
   *   console.log('Error caught:', error.message);
   *   // Handle the error appropriately
   * });
   */
  catch(cb) {
    this.then(undefined, cb);
  }

  /**
   * Attaches a callback that is invoked when the Promise is settled
   * The callback runs regardless of success or failure
   * @param {Function} cb - Callback to execute when promise settles
   * @returns {MyPromise}
   * 
   * @example
   * // Cleanup operations
   * const promise = new MyPromise((resolve, reject) => {
   *   // Some async operation
   *   resolve('data');
   * })
   * .finally(() => {
   *   console.log('Promise settled');
   *   // Cleanup code here
   *   closeConnection();
   * });
   */
  finally(cb) {
    return this.then(
      (result) => {
        cb();
        throw result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }
}

/**
 * Custom error class for uncaught promise rejections
 * Provides better error messages for debugging
 * @extends Error
 * 
 * @example
 * // This error is thrown when a promise is rejected without a catch handler
 * const promise = new MyPromise((resolve, reject) => {
 *   reject(new Error('Unhandled rejection'));
 * });
 * // Will throw UncaughtPromiseError if no catch handler is attached
 */
class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);
    this.stack = `(in promise) ${this.error}`;
  }
}

/**
 * Example implementation showing common promise usage patterns
 * 
 * @example
 * // Basic usage
 * samplePromise()
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 * 
 * // Using with async/await
 * async function example() {
 *   try {
 *     const result = await samplePromise();
 *     console.log(result);
 *   } catch (error) {
 *     console.error(error);
 *   }
 * }
 */
const samplePromise = () => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("hi");
    }, 1000);
  });
};

/**
 * Example async function demonstrating promise usage with async/await
 * @async
 * 
 * @example
 * // Using the async function
 * runPromise()
 *   .then(() => console.log('Complete'))
 *   .catch(error => console.error('Error:', error));
 */
const runPromise = async () => {
  const res = await samplePromise();
  console.log("res", res);
};

// Execute the example
runPromise();

module.exports = MyPromise;
