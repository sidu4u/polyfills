function MyPromise(callback) {
  this.status = "pending";
  this.data;
  this.resolveListeners = [];
  this.rejectListeners = [];

  const resolver = (value) => {
    this.data = value;
    this.status = "resolved";
    this.resolveListeners.forEach((listener) => listener(value));
  };

  const rejecter = (err) => {
    this.data = err;
    this.status = "rejected";
    this.rejectListeners.forEach((listener) => listener(err));
  };

  callback(resolver, rejecter);
}

MyPromise.prototype.then = function (resolveCallback, rejectCallback) {
  return new Promise((resolve, reject) => {
    if (this.status === "resolved") {
      resolve(resolveCallback(this.data));
    } else if (this.status === "rejected") {
      reject(rejectCallback(this.data));
    } else if (this.status === "pending") {
      try {
        resolveListeners.push((value) => {
          const chainedResolveValue = resolveCallback(value);
          if (chainedResolveValue.constructor === Promise) {
            chainedResolveValue.then(
              (value) => resolve(value),
              (err) => reject(err)
            );
          } else {
            resolve(chainedResolveValue);
          }
        });
        rejectListeners.push((errorValue) => {
          const chainedRejectValue = rejectCallback(errorValue);
          if (chainedRejectValue.constructor === Promise) {
            chainedRejectValue.then(
              (value) => resolve(value),
              (err) => reject(err)
            );
          } else {
            resolve(chainedRejectValue);
          }
        });
      } catch (err) {
        reject(err);
      }
    }
  });
};

MyPromise.all = function (promiseList) {
  const fulfilledPromises = [];

  return new Promise((resolve, reject) => {
    promiseList.forEach((element, index) => {
      element.then(
        (value) => {
          fulfilledPromises[index] = value;
          if (fulfilledPromises.length === promiseList.length) {
            resolve(fulfilledPromises);
          }
        },
        (err) => reject(err)
      );
    });
  });
};

MyPromise.any = function (promiseList) {
  const rejectedPromises = [];

  return new Promise((resolve, reject) =>
    promiseList.forEach((element, index) =>
      element.then(
        (value) => resolve(value),
        (err) => {
          rejectedPromises[index] = err;
          if (rejectedPromises.length === promiseList.length) {
            reject(new AggregateError(rejectedPromises));
          }
        }
      )
    )
  );
};
