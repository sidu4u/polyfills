// Say you need to fetch some data through 100 APIs, and as soon as possible.

// If you use Promise.all(), 100 requests go to your server at the same time, which is a burden to low spec servers.

// Can you throttle your API calls so that always maximum 5 API calls at the same time?

// You are asked to create a general throttlePromises() which takes an array of functions returning promises, and a number indicating the maximum concurrent pending promises.

function throttlePromises(funcs, max) {
  // your code here
  const results = [];
  const count = funcs.length;
  let index = max - 1;
  let completeCount = 0;

  const resolver = (resolve, val, currIndex) => {
    completeCount++;
    results[currIndex] = val;
    index++;
    if (completeCount === count) {
      resolve(results);
    } else if(index<count) {
      const copy = index;  
      funcs[copy]().then((newVal) => resolver(resolve, newVal, copy));
    }
  };

  return new Promise((resolve, reject) => {
    for (let i = 0; i < Math.min(funcs.length, max); i++) {
      funcs[i]().then(
        (val) => resolver(resolve, val, i),
        (err) => reject(err)
      );
    }
  });
}

var value = 0;
var asyncFactory = function () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value++);
    }, 10);
  });
};
const arr = [];
for (var i = 0; i < 20; i++) {
  arr.push(asyncFactory);
}
// this is the solution function you'll write
const throttled = throttlePromises(arr, 30);
throttled.then(function (results) {
 
  console.log(results);
});
