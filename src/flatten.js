// Input:
// [[[1, [1.1]], 2, 3], [4, 5]]

// Output:
// [1, 1.1, 2, 3, 4, 5]

function flat() {
  return this.reduce((acc, item) => {
    if (item.constructor === Array) {
       acc.push(...item.flat());
    }
    else{
        acc.push(item);
    }
    return acc;
  }, []);
}

Array.prototype.flat = flat;

let result = [[1,2,3],[[23,45,['er','ew','ddg']],56,765]];

console.log(result.flat());

