/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO NOT CHANGE FUNCTION NAMES

function isPrimitive(ele) {
    return (typeof ele === 'object' || typeof ele === 'function') ? false : true;
  }
  
  function filter(collection, callback) {
    // DO NOT REMOVE
    'use strict';
    let res;
    if (collection.constructor === Array) {
      res = collection.map(value => {
        if (isPrimitive(value) && callback(value)) {
          return value;
        }
        else if (!isPrimitive(value)) {
          return filter(value, callback);
        }
      }).filter(ele => ele !== undefined);
    }
    else {
      res = {};
      for (let key of Object.keys(collection)) {
        let value = collection[key];
        if (isPrimitive(value) && callback(value)) {
          res[key] = value;
        }
        else if (!isPrimitive(value)) {
          let innerObject =  filter(value, callback);
          if(Object.keys(innerObject).length>0){
            res[key] = innerObject;
          }
        }
      }
    }
  
    return res;
  
    // write your code below
  }
  
  const input = {
    a: 1,
    b: {
      c: 2,
      d: -3,
      e: {
        f: {
          g: -4,
        },
      },
      h: {
        i: 5,
        j: 6,
      },
    }
  };
  
  const callback = element => element >= 0;
  
  
  const filtered = filter(input, callback);
  

  // { a: 1, b: { c: 2, h: { i: 5, j: 6 } } }
  console.log(filtered);