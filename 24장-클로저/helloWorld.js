const Person = (function() {
  let _age;
  
  function Person(name, age) {
    this.name = name;
    _age = age;
    this.sayGreeting = function() {
      console.log(`Hello, I'm ${this.name}, ${_age}`);
    };
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);
const kim = new Person('Kim', 20);

chocobe.sayGreeting();
kim.sayGreeting();