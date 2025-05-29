// deep clone a object
// key: value, key is always string (symbol not considered)
// primitive value can be an object, array, number, string , boolean
// object value can be array, object or function

function functionCloner(func){
  const that = this;
  function temp(...args){
    func.call(that,...args);
  }

  for(let key of Object.keys(func)){
    temp[key] = func[key];
  }

  return temp;
}

function clone(item) {

 
 if (!(item?.constructor === Array || item?.constructor === Object)) {
    return item; // primitive
  }

  if(item?.constructor === Function){
    return functionCloner(item);
  }
  

  if (item?.constructor === Array) {
    const resArr = [];
    item.forEach((item) => resArr.push(clone(item)));
    return resArr;
  }

  const res = {};

  for (let key of Object.keys(item)) {
    if (item[key].constructor === Array) {
      res[key] = clone(item[key]);
    } else if (item[key].constructor === Object) {
      res[key] = clone(item[key]);  
    } 
    else if(item[key].constructor === Function){
      res[key] = clone(item[key]);  
    }
    else {
      res[key] = item[key];
    }
  }

  return res;
}

const test = {
    a:'a1',
    b:'a2',
    c:[1,2,3,{
      c1:'c1',
      c2:['innerArray',{
        'abs': 121
      },['in-c2']],
    }]
};

const test2 = {
  a:'a',
  b: new Date(),
  c:function(a,b){
    console.log(this.a);
    console.log('add is', a+b)
  }
}

const clonner = clone(test2);

clonner.c(12,-2);


const tstObj = {
  a: '123',
  b: function(){
    console.log(this.a);
  }
}



