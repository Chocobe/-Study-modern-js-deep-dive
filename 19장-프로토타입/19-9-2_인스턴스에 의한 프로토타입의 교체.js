const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

Object.setPrototypeOf(chocobe, {
  sayGreeting() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  },
});

chocobe.sayGreeting();
console.log('chocobe.constructor: ', chocobe.constructor);