// Input:
// const obj = {
//   a: {
//     b: {
//       c: [1,2,3]
//     }
//   }
// };

// console.log(get(obj, 'a.b.c'));
// console.log(get(obj, 'a.b.c.0'));
// console.log(get(obj, 'a.b.c[1]'));
// console.log(get(obj, 'a.b.c[3]'));

//testcase

// 1. {a:1} , 'a' // a
// 2. {a:{b:1}}, 'a.b'// ab
// 3. {a:[1,2,3]}, 'a[0]'// a0
// 4. {a:{b:[1,2,3]}},'a.b[1]' // ab1
// 5. [{a:123},{c:{w:[1,2,3]}}], '[1].c.w[1]' // 1cw1
// 6. [1,[2,[3,'data']]], '[1][1][1]' // 111

const sanitizePath = (path) => {
  return [...path].filter((ele) => ele.match(/[a-zA-Z0-9]+/) !== null).join("");
};

const getData = (path, obj) => {
  let res = obj;
  const sanPath = sanitizePath(path);
  for (let key of [...sanPath]) {
    res = res[key];
  }

  return res;
};

const setData = (path, obj, value) =>{
  let res = obj;
  const sanPathArr = [...sanitizePath(path)];

  for(let i=0;i<sanPathArr.length-1;i++){
    const key = sanPathArr[i];
    res = res[key];
  }

  res[sanPathArr[sanPathArr.length-1]] = value;
}



const data = [
  [{ a: 1 }, "a"], // a
  [{ a: { b: 1 } }, "a.b"], // ab
  [{ a: [1, 2, 3] }, "a[0]"], // a0
  [{ a: { b: [1, 2, 3] } }, "a.b[1]"], // ab1
  [[{ a: 123 }, { c: { w: [1, 2, 3] } }], "[1].c.w[1]"], // 1cw1
  [[1, [2, [3, "data"]]], "[1][1][1]"], // 111
];

console.log('getting data')
data.forEach((ele) => console.log(getData(ele[1], ele[0])));

const dataEntry = [
  [{ a: 1 }, "a.b", 2], // a
  [{ a: { b: 1 } }, "a.b.c", 'abc'], // ab
  [{ a: [1, 2, 3] }, "a[0]"], // a0
  [{ a: { b: [1, 2, 3] } }, "a.b[1]"], // ab1
  [[{ a: 123 }, { c: { w: [1, 2, 3] } }], "[1].c.w[1]"], // 1cw1
  [[1, [2, [3, "data"]]], "[1][1][1]"], // 111
];
console.log('setting data')


