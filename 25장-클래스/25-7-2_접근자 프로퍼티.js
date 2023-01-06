class Person {
  firstName = null;
  lastName = null;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(fullName) {
    [this.firstName, this.lastName] = fullName.split(' ');
  }
}

const lucidMoon = new Person();
lucidMoon.fullName = 'Lucid Moon';

// Lucid Moon
console.log(lucidMoon.fullName);