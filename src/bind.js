
function bindPolyfill() {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (thisArg, ...args1) {
            const callerFunction = this;

            return (...args2) => {
                callerFunction.call(thisArg, ...args1, ...args2);
            }
        }
    }
}