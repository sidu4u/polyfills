// In this example, we are going to solve a JavaScript interview question that was asked in Uber’s frontend interview.

// Implement a mapLimit function that is similar to the Array.map() which returns a promise that resolves on the list of output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs. It also accepts a limit to decide how many operations can occur at a time.

// The asynchronous iteratee function will accept a input and a callback. The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.

// let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
//   setTimeout(function () {
//     num = num * 2;
//     console.log(num);
//     callback(null, num);
//   }, 2000);
// });

function mapLimit(coll, limit, ite, callback) {
  const resArr = [];
  let runCount = 0;
  const execute = (element, index, resolve, reject) => {
    ite(element, (err, data) => {
      if (err !== undefined) {
        if (callback.constructor === Function) {
          callback(err);
        } else {
          reject(err);
        }
      } else {
        resArr[index] = data;
        runCount++;
        if (runCount === coll.length) {
          if (callback.constructor === Function) {
            callback(undefined, resArr);
          } else {
            resolve(resArr);
          }
        }
        execute(coll[index + 1], index + 1);
      }
    });
  };

  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < limit; i++) {
        execute(coll[i], i, resolve, reject);
      }
    });
  } else {
    for (let i = 0; i < limit; i++) {
      execute(coll[i], i);
    }
  }
}
