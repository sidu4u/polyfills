function promiseMerge(...args) {
    // write your solution below
    const promises = [...args];
    let type, count = 0;
    let intResult = 0, stringResult = '', boolResult = true, arrResult = [], objResult = {}, result;
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then((data) => {
          count++;
          if (type === undefined) {
            type = data.constructor;
          }
          else if (type !== data.constructor) {
            reject(new TypeError())
          }
          else if (type === Number) {
            intResult += data;
            result = intResult;
          }
          else if (type === Boolean) {
            boolResult = boolResult && data;
            result = boolResult;
          }
          else if (type === String) {
            stringResult = stringResult + data;
            result = stringResult;
          }
          else if (type === Array) {
            arrResult = [...arrResult, ...data];
            result = arrResult;
          }
          else if (type === Object) {
            objResult = { ...objResult, ...data };
            result = objResult;
          }
          else {
            reject(new TypeError());
          }
  
          if (count === promises.length) {
            resolve(result);
          }
        }, () => reject(new TypeError()))
      })
    });
  }
  
  promiseMerge(Promise.resolve(1), Promise.resolve(2), Promise.resolve(2))
  .then(data=>console.log(data))