function compose(...funcs) {
  return function (...args) {
    const that = this;
    return Array.prototype.reduce.call(
      funcs,
      (acc, item) => item.call(that, acc),
      ...args
    );
  };
}
var f1 = (x) => x.toLowerCase();
var f2 = (x) => x.split("").reverse().join("");
var f3 = (x) => x + "!";

var composedFn = compose(f1, f2, f3);
console.log(composedFn("Hello"));
