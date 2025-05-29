function Animal() {
  this.legs = 4;
}

Animal.prototype.runs = function () {
  console.log(`runs with ${this.legs} legs`);
};

function Rabbit() {
  Animal.call(this);
  this.ears = "long";
}

Object.setPrototypeOf(Rabbit.prototype, Animal.prototype);

Rabbit.prototype.listen = function () {
  console.log(`listens with ${this.ears} ears`);
};

const sam = new Rabbit();

sam.listen();
sam.runs();
