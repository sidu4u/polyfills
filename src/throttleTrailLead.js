// Trailing - Where the first call will be made after the specified delay and all the calls thereafter.
// Leading - The first call will be made immediately and all the calls thereafter.

function throttle(func, delay, isLeading) {
  if (isLeading) {
    let isOpen = true;
    return function (...args) {
      const that = this;
      if (isOpen) {
        func.call(that, ...args);
        isOpen = false;
        setTimeout(() => (isOpen = true), delay);
      }
    };
  } else {
    let isClose = true;
    let that, params;
    return function (...args) {
       that = this;
       params = args;
      if(isClose){
        isClose = false;
        setTimeout(()=>{
            func.call(that,...params);
            isClose = true;
        },delay);
      }
    };
  }
}
