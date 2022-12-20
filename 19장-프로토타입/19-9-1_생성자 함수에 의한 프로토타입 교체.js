const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype = {
    sayGreeting() {
      console.log(`Hello, I'm ${this.name} and ${this.age}`);
    },
  };

  return Person;
}());

const chocobe = new Person('Chocobe', 36);
chocobe.sayGreeting();
console.log('chocobe.constructor: ', chocobe.constructor);

const Client = (function() {
  function Client(name, email) {
    this.name = name;
    this.email = email;
  }

  Client.prototype = {
    constructor: Client,
    sayHello() {
      console.log(`안녕하세요, 저는 ${this.name} 이고 Email은 ${this.email} 입니다.`);
    },
  };

  return Client;
}());

const kim = new Client('Kim', 20);
kim.sayHello();
console.log('kim.constructor: ', kim.constructor);