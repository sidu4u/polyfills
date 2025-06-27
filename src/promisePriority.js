// Given a list of promises and their priorities, call them parallelly  and resolve with the value of the first promise with the most priority.  If all the promises fail then reject with a custom error.

// const promises = [
//  {status: 'resolve', priority: 4},
//  {status: 'reject', priority: 1},
//  {status: 'resolve', priority: 2},
//  {status: 'reject', priority: 3}
// ];

// resolvePromisesWithPriority(promises);
// // {status: 'resolve', priority: 2}

function resolvePromisesWithPriority(promises) {
  return new Promise((resolve, reject) => {
    let errCount = 0;
    let settleCount = 0;
    let maxPriorityPromise = { priority: -Infinity };

    promises.forEach(({ promise, priority }) =>
      promise
        .then(
          () => {
            settleCount++;
            if (priority > maxPriorityPromise.priority) {
              maxPriorityPromise = { promise, priority };
            }
          },
          () => {
            settleCount++;
            errCount++;
            if (errCount === promises.length) {
              reject(new Error("all promises failed"));
            } else if (priority > maxPriorityPromise.priority) {
              maxPriorityPromise = { promise, priority };
            }
          }
        )
        .finally(() => {
          if (settleCount === promises.length) {
            maxPriorityPromise.promise.then(
              (data) => resolve(data),
              (err) => reject(err)
            );
          }
        })
    );
  });
}

function createAsyncTask(val,priority) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (val > 5) {
        reject(priority);
      } else {
        resolve(priority);
      }
    }, val * 1000);
  });
}

const promises = [
  { promise: createAsyncTask(6,1), priority: 1 },
  { promise: createAsyncTask(4,4), priority: 4 },
  { promise: createAsyncTask(4,5), priority: 5 },
  { promise: createAsyncTask(3,3), priority: 3 },
  { promise: createAsyncTask(5,2), priority: 2 },
];

resolvePromisesWithPriority(promises).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);
