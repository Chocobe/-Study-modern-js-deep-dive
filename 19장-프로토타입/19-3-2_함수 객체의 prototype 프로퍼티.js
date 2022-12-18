function Person(name, age) {
  this.name = name;
  this.age = age;
}
console.log(Person.hasOwnProperty('prototype'));

const myObject = {
  myValue: "Hello World",
  myMethod() {
    // ...do something
  },
};
console.log(myObject.hasOwnProperty('prototype'));
console.log(myObject.myMethod.hasOwnProperty('prototype'));

const person = new Person("Chocobe", 36);
console.log(person.__proto__ === Person.prototype);