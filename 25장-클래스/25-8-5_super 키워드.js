class Base {
  name;
  
  constructor(name) {
    this.name = name;
  }

  sayGreeting() {
    const value = Object
      .entries(this)
      .map(([key, curValue]) => `${key}: ${curValue}`)
      .join(' | ');

    console.log(`Called Base Instance Method: - ${value}`);
  }
}

class Child extends Base {
  age;

  constructor(name, age) {
    super(name);
    
    this.age = age;
  }

  sayHi() {
    // super.sayGreeting 으로 접근하게 되면, 
    // 현재 클래스에서 `Overriding` 한 메서드가 아닌, 
    // 부모 클래스에 정의한 프로퍼티 또는 메서드를 참조하게 됩니다.
    super.sayGreeting();
  }

  // 이 메서드는 sayHi() 에서 호출하지 않습니다.
  sayGreeting() {
    console.log(`Child Instance's age - ${this.age}`);
  }
}

const child = new Child('Chocobe', 36);
child.sayHi();