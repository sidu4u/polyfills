function myDebounce1(toDebounce, delay) {
  let timer;
  let flag = true;

  return function (...args) {
    let that = this;

    if (!flag) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => (flag = true), delay);
    } else {
      flag = false;
      toDebounce.call(that, ...args);
      timer = setTimeout(() => (flag = true), delay);
    }
  };
}

function myDebounce2(toDebounce, delay) {
  let timer;

  return function (...args) {
    let that = this;

    timer && clearTimeout(timer);
    timer = setTimeout(() => toDebounce.call(that, ...args), delay);
  };
}

const myDebounce3 = (func, offset) => {
  let timeoutId;

  const debouncedFun = (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), offset);
  };

  return debouncedFun;
};


function myDeb3(func, offset){
     let timeoutId;

     function inner(...args){
        const that = this;
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(()=> func.call(that, ...args), offset)
     }

     return inner;
}

function logger(...args) {
  console.log(...args);
}

const debLogger = myDebounce3(logger, 500);

debLogger("a");

setTimeout(()=>debLogger("b"), 100);
setTimeout(()=>debLogger("c"), 300);
setTimeout(()=>debLogger("d"), 900);