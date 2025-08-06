// Given an array of objects and two keys “on” and “who”, aggregate the “who” values on the “on” values.
// Input:
// const endorsements = [ 
//   { skill: 'css', user: 'Bill' }, 
//   { skill: 'javascript', user: 'Chad' }, 
//   { skill: 'javascript', user: 'Bill' }, 
//   { skill: 'css', user: 'Sue' }, 
//   { skill: 'javascript', user: 'Sue' }, 
//   { skill: 'html', user: 'Sue' } 
// ];

// console.log(aggregate(endorsements, "user", "skill"));

// Output:
// [
//   {
//     "user": "Bill",
//     "skill": [
//       "css",
//       "javascript"
//     ]
//   },
//   {
//     "user": "Chad",
//     "skill": [
//       "javascript"
//     ]
//   },
//   {
//     "user": "Sue",
//     "skill": [
//       "css",
//       "javascript",
//       "html"
//     ]
//   }
// ]

function aggregate(arr, who, on){
    // aggregate on for who
    const data = new Map();
    const res = [];

    for(let ele of arr){
        if(data.has(ele[who])){
            data.set(ele[who], data.get(ele[who]).add(ele[on]));
        }
        else{
         const setData = new Set();   
         data.set(ele[who], setData);
         setData.add(ele[on]);
        }
    }

    for(let key of data.keys()){
        res.push({
            [who]: key,
            [on]: [...data.get(key)]
        });
    }

    return res;
}


const endorsements = [ 
  { skill: 'css', user: 'Bill' }, 
  { skill: 'javascript', user: 'Chad' }, 
  { skill: 'javascript', user: 'Bill' }, 
  { skill: 'css', user: 'Sue' }, 
  { skill: 'javascript', user: 'Sue' }, 
  { skill: 'html', user: 'Sue' } 
];

console.log(aggregate(endorsements, "user", "skill"));