// Create a function in javascript which will take a nested object and a filter function as input and return the filtered object.

// Input:
// const obj = {
//   a: 1,
//   b: {
//     c: "Hello World",
//     d: 2,
//     e: {
//      f: {
//        g: -4,
//       },
//     },
//     h: "Good Night Moon",
//   },
// };

// const filter = (s) => typeof s === "string";

// Output:
// {
//   b: {
//     c: "Hello World",
//     h: "Good Night Moon",
//   }
// };

function isEmpty(obj){
    return Object.keys(obj).length === 0;
}

function filter(obj, callback) {
  const ret = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== "object" && callback(obj[key])) {
      ret[key] = obj[key];
    } else {
      const value = filter(obj[key], callback);
      if(!isEmpty(value)){
        ret[key] = value;
      }
    }
  });

  return ret;
}



const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
     f: {
       g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const callback = (s) => typeof s === "string";

// Output:
// {
//   b: {
//     c: "Hello World",
//     h: "Good Night Moon",
//   }
// };

console.log(filter(obj,callback))