const chocobe = {
  name: 'Chocobe',
  getName() {
    return this.name;
  },
};
// chocobe.getName(): Chocobe
console.log('chocobe.getName(): ', chocobe.getName());

const kim = {
  name: 'Kim',
  getName: chocobe.getName,
};
// kim.getName(): Kim
console.log('kim.getName(): ', kim.getName());

const { getName } = chocobe;
// getName(): undefined
console.log('getName(): ', getName());

const Person = (function() {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.getName = chocobe.getName;

  return Person;
}());

const lucidMoon = new Person('Lucid Moon');
// lucidMoon.getName(): Lucid Moon
console.log('lucidMoon.getName(): ', lucidMoon.getName());

// Person.prototype.getName(): undefined
console.log('Person.prototype.getName(): ', Person.prototype.getName());

Person.prototype.name = "value of Person's name property";
// Person.prototype.getName(): value of Person's name property
console.log('Person.prototype.getName(): ', Person.prototype.getName());