class Person {
  name = null;
  age = null;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static sayHello() {
    console.log('Hello World');
  }
}

const chocobe = new Person('Chocobe', 36);

// 인스턴스가 속한 `프로토타입 체인` 에는 `정적 메서드` 가 없습닌다.
// ReferenceError
// chocobe.sayHello();

Person.sayHello();