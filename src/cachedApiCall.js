// const call = cachedApiCall(1500);

// // first call
// // an API call will be made and its response will be cached
// call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
// //"making new api call"
// /*
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }
// */

// // cached response will be returned
// // it will be quick
// setTimeout(() => {
//   call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
// }, 700);
// /*
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }
// */

// // a fresh API call is made
// // as time for cached entry is expired
// setTimeout(() => {
//   call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) => console.log(a));
// }, 2000);
// //"making new api call"
// /*
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }
// */

const fetch = () => {
  console.log("fetch called");
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        }),
      2000
    )
  );
};

const cachedApiCall = (threshold) => {
  const map = new Map();

  const initializeMap = (url, params) => {
    const promise = fetch(url, params);
    map.set(url, { promise, time: Date.now() });
    return promise;
  };

  return function (url, params) {
    // case 1: not present
    if (!map.has(url)) {
      return initializeMap(url, params);
    } else {
      const data = map.get(url);
      if (Date.now() - data.time <= threshold) {
        return data.promise;
      } else {
        return initializeMap(url, params);
      }
    }
  };
};

const call = cachedApiCall(1500);

// first call
// an API call will be made and its response will be cached
call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log(a)
);
//"making new api call"
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/

// cached response will be returned
// it will be quick
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 700);
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/

// a fresh API call is made
// as time for cached entry is expired
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 2000);
//"making new api call"
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/
