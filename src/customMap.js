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

mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.log("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
