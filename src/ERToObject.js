// This question was asked in Amazon's frontend interview

// Given an array with two entries, parent and child relation, convert  the array to a relation tree object (parent -> child ->  grandchild) in JavaScript.

// The input array will contain relations for many ancestries in random order, We must return the array of strings representing different relationships.

// For example, in the below case, the topmost ancestor is an animal.

// Input:
// [
//   ["lion", "cat"],
//   ["cat", "mammal"],
//   ["dog", "mammal"],
//   ["mammal", "animal"],
//   ["fish", "animal"],
//   ["shark", "fish"],
// ];

// Output:
// [
//   "animal -> mammal -> cat -> lion",
//   "animal -> mammal -> cat",
//   "animal -> mammal -> dog",
//   "animal -> mammal",
//   "animal -> fish",
//   "animal -> fish -> shark"
// ]

function ERToObject(input) {
  const getMap = (arr) => {
    return arr.reduce((a, e) => {
      a[e[0]] = e[1];
      return a;
    }, {});
  };

  const convertToRelation = (obj) => {
    return Object.keys(obj).map((key) => getRelString(obj, key));
  };

  const getRelString = (obj, key) => {
    const value = obj[key];

    if (value in obj) {
      const childString = getRelString(obj, value);
      return `${childString}->${key}`;
    } else {
      return `${value}->${key}`;
    }
  };

  const map = getMap(input);
  const relations = convertToRelation(map);

  const dataObject = relations.reduce((a, e) => {
    const entities = e.split("->");
    let curr = a;
    for (entity of entities) {
      if (!(entity in curr)) {
        curr[entity] = {};
      }
      curr = curr[entity];
    }

    return a;
  }, {});

  console.log(JSON.stringify(dataObject));
}

const input = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];

ERToObject(input);
