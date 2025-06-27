// function message(){
//     console.log("hello");
//   }

//   const sample = sampler(message, 4);
//   sample();
//   sample();
//   sample();
//   sample(); // this will be executed
//   sample();
//   sample();
//   sample();
//   sample(); // this will be executed

function sampler(func, threshold, context = null) {
  let count = 0;
  return function (...args) {
    count++;
    const thisArg = context ?? this;
    if (count === threshold) {
      count = 0;
      func.apply(thisArg, ...args);
    }
  };
}

const ter = {
  e: 123,
  rex: function () {
    console.log("e is", this.e);
  },
};

const sample = sampler(ter.rex, 4, ter);

  sample();
  sample();
  sample();
  sample(); // this will be executed
  sample();
  sample();
  sample();
  sample(); // this will be executed