/**
 * Read FAQs section on the left for more information on how to use the editor
 **/
/** Do not delete or change any function name **/

function getUserById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  let outputCount = 0;
  const outputs = [];

  const foo = () => {
    for (let i = 0; i < inputs.length; i = i + limit) {
      let limitCounter = 0;
      new Promise((resolve, reject) => {
        for (let j = i; j < i + limit && j < inputs.length; j++) {
          iterateeFn(inputs[j], (output) => {
            outputs[j] = output;
            outputCount++;
            limitCounter++;
            if (limitCounter === limit) {
              resolve();
            }
            if (outputCount === inputs.length) {
              callback(outputs);
            }
          });
        }
      }).then(() => {
        if (outputCount < inputs.length) {
          foo();
        }
      });
    }
  };

  foo();
}

// mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
//   console.log("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
// });

function getUserById2(id) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;
 console.log('executing', id);
  return new Promise((res) => {
    setTimeout(() => {
      res("User" + id);
    }, randomRequestTime);
  });
}

async function mapLimit2(tasks, limit, func, callback) {
  let execCount = 0;
  let completeCount = 0;
  let index = 0;
  const resArr = [];

  const wrapper = async (id, index) => {
    // call to each task
    const res = await func(id);
    console.log('got data', res);
    execCount--;
    resArr[index] = res;
    completeCount++;
    if (completeCount === tasks.length) {
      return callback(resArr);
    }
    execute();
  };

  const execute = async () => {
    while (execCount < limit && index < tasks.length) {
      wrapper(tasks[index], index);
      execCount++;
      index++;
    }
  };

   execute();
}

mapLimit2([1, 2, 3, 4, 5], 2, getUserById2, (allResults) => {
  console.log("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});