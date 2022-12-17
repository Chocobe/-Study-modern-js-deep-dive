function Client(name) {
  if (!new.target) {
    return new Client(name);
  }
  
  this.name = name;
  this.sayGreeting = () => {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const chocobe = new Client("Chocobe");
chocobe.sayGreeting();

const kim = Client("Kim");
kim.sayGreeting();

function Person(name, age) {
  if (!(this instanceof Person)) {
    return new Person(name, age);
  }

  this.name = name;
  this.age = age;
  this.sayHello = () => {
    console.log(`Hi, I'm ${this.name} and ${this.age}`);
  };
}

const lucid = new Person("Lucid", 36);
lucid.sayHello();

const moon = Person("Moon", 20);
moon.sayHello();