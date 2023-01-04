// 기명 클래스 표현식
// MyPerson 식별자는 class 내부에서만 유효합니다.
const Person = class MyPerson {
  name = null;
  age = null;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayGreeting() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  }
};

// class 는 [[Caller]] 로 호출할 경우, 에러를 발생 시킵니다.
// Person();

// 기명 클래스 표현식에 사용한 이름은, 클래스 외부에서 사용할 수 없습니다.
// ReferenceError
// const chocobe = new MyPerson('Chocobe', 36);

const kim = new Person('Kim', 20);
kim.sayGreeting();