function bindPolyfill() {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (thisArg, ...args1) {
      const callerFunction = this;

      return (...args2) => {
        callerFunction.call(thisArg, ...args1, ...args2);
      };
    };
  }
}

function myBind(context, ...args1) {
  const func = this;
  return function (...args2) {
    return func.call(context, ...args1, ...args2);
  };
}
