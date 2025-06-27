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

MyPromise.prototype.then_Incomplete = function (
  resolveCallback,
  rejectCallback
) {
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

MyPromise.prototype.then = (resolveCallback, rejectCallback) => {
  return new Promise((resolve, reject) => {
    if (this.status === "resolved") {
      if (resolveCallback.constructor === Function) {
        resolve(resolveCallback(this.data));
      } else {
        resolve(this.data);
      }
    } else if (this.status === "rejected") {
      if (rejectCallback.constructor === Function) {
        resolve(rejectCallback(this.data));
      } else {
        resolve(this.data);
      }
    } else {
      // status pending
      this.resolveListeners.push((data) => {
        if (resolveCallback.constructor === Function) {
          const resolveCallbackValue = resolveCallback(data);
          if (resolveCallbackValue.constructor === Promise) {
            resolveCallbackValue.then(
              (data) => resolve(data),
              (error) => reject(error)
            );
          } else {
            // no promise ret
            resolve(data);
          }
        } else {
          resolve(this.data);
        }
      });

      this.rejectListeners.push((data) => {
        if (rejectCallback.constructor === Function) {
          const rejectCallbackValue = rejectCallback(data);
          if (rejectCallbackValue.constructor === Promise) {
            rejectCallbackValue.then(
              (data) => resolve(data),
              (error) => reject(error)
            );
          } else {
            // no promise ret
            resolve(data);
          }
        } else {
          resolve(this.data);
        }
      });
    }
  });
};

MyPromise.prototype.then2 = (onFullfilled, onRejected) => {
  return new MyPromise((resolve, reject) => {
    const resolveCallback = (data) => {
      try {
        if (resCall) {
          const result = onFullfilled(data);
          this.resolvePromise(result, resolve, reject);
        } else {
          resolve(data);
        }
      } catch (e) {
        reject(e);
      }
    };
    const rejectCallback = (data) => {
      try {
        if (rejCall) {
          const result = onRejected(data);
          this.resolvePromise(result, resolve, reject);
        } else {
          resolve(data);
        }
      } catch (e) {
        reject(e);
      }
    };

    if ((this.status = "resolved")) {
      resolveCallback(this.data);
    } else if ((this.status = "rejected")) {
      rejectCallback(this.data);
    } else {
      this.resolveListeners.push(() => resolveCallback(this.data));
      this.resolveListeners.push(() => rejectCallback(this.data));
    }
  });
};

MyPromise.prototype.resolvePromise = (data, resolve, reject) => {
  if(data.constructor === Promise){
    data.then(data=>resolve(data), err=> reject(err));
  }
  else{
    resolve(data);
  }
} 


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
