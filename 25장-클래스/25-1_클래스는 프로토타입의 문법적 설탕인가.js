const chocobe = new Person('Chocobe', 36);

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayGreeting = function() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  };
}

chocobe.sayGreeting();

// ReferenceError 발생
// const kim = new Client('Kim', 20);

// class Client {
//   name = null;
//   age = null;

//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   sayGreeting() {
//     console.log(`Hello, I'm ${this.name} and ${this.age}`);
//   }
// }