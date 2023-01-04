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

console.log('typeof Person: ', typeof Person);