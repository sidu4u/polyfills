// The Promise.race() method returns a promise that fulfills or rejects as 
//  soon as one of the promises in an iterable fulfills or rejects,
//  with the  value or reason from that promise.


function race(promises){

    return new Promise((resolve, reject)=>{
        promises.forEach((promise) => {
            promise.then(resolve,reject)
            .catch(reject);
        });
    });
}



const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'one');
});

const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'two');
});

const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, 'three');
});

race([test1, test2, test3]).then(function (value) {
  // first two resolve, 3rd fails, but promise2 is faster
  console.log(value);
}).catch(function (err){
  console.log(err);
});

