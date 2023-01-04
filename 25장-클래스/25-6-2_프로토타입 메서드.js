class Person {
  name = null;
  age = null;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayGreeting() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  }
}

const chocobe = new Person('Chocobe', 36);

// Object.getPrototypeOf(chocobe).sayGreeint: [Function: sayGreeting]
console.log(
  'Object.getPrototypeOf(chocobe).sayGreeint: ', 
  Object.getPrototypeOf(chocobe).sayGreeting
);

// Object.getPrototypeOf(chocobe).hasOwnProperty("sayGreeting"): true
console.log(
  'Object.getPrototypeOf(chocobe).hasOwnProperty("sayGreeting"): ',
  Object.getPrototypeOf(chocobe).hasOwnProperty('sayGreeting')
);

// Object.getPrototypeOf(chocobe) === Person.prototype: true
console.log(
  'Object.getPrototypeOf(chocobe) === Person.prototype: ', 
  Object.getPrototypeOf(chocobe) === Person.prototype
);

// Object.getPrototypeOf(Person.prototype) === Object.prototype: true
console.log(
  'Object.getPrototypeOf(Person.prototype) === Object.prototype: ',
  Object.getPrototypeOf(Person.prototype) === Object.prototype
);