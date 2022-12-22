const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHello = function() {
      console.log(`Hello, I'm ${this.name} and ${this.age}`);
    };
  }

  Person.staticSayHello = function() {
    console.log('[static] Hello!');
  };

  return Person;
}());

// "[static] Hello!"
Person.staticSayHello();

const chocobe = new Person('Chocobe', 36);

// "Hello I'm Chocobe and 36"
chocobe.sayHello();
