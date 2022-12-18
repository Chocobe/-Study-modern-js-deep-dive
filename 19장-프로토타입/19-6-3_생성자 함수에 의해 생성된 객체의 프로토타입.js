function Person(name) {
  this.name = name;
}

// Person.prototype.sayGreeting = () => {
//   console.log(`Hello, I'm ${this.name}`);
// };

Person.prototype.sayGreeting = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const kim = new Person('Kim');
kim.sayGreeting();

const chocobe = new Person('Chocobe');
chocobe.sayGreeting();

console.log('kim.sayGreeting === chocobe.sayGreeting: ', kim.sayGreeting === chocobe.sayGreeting);