class Person {
  name = null;
  age = null;

  constructor(name, age) {
    // constructor() 내부가 실행된 시점에는, 이미 `인스턴스` 와 `this 바인딩` 이 끝난 상태 입니다.
    // Person { name: null, age: null }
    console.log(this);

    // Object.getPropertyOf(this) === Person.prototype: true
    console.log(
      'Object.getPropertyOf(this) === Person.prototype: ',
      Object.getPrototypeOf(this) === Person.prototype
    );
    
    // 생성한 인스턴스를 가리키는 `this` 를 통하여, 인스턴스 초기화를 합니다.
    this.name = name;
    this.age = age;
  }
}

const chocobe = new Person('Chocobe', 36);