const Person = (function() {
  // 자유변수 (Free Variable)
  // private 프로퍼티 입니다.
  let _age;

  function Person(name, age) {
    // public 프로퍼티 입니다.
    this.name = name;
    _age = age;
  }

  // Person 인스턴스가 상속받을 메서드이며, 
  // sayGreeting() 메서드는 모든 인스턴스가 `동일한 함수 객체` 를 참조합니다.
  // 인스턴스를 생성할 때마다, sayGreeting() 함수의 `렉시컬 환경` 이 변경 됩니다.
  Person.prototype.sayGreeting = function() {
    console.log(`Hello, I'm ${this.name} and ${_age}`);
  };

  return Person;
}());

// Person.prototype.sayGreeting() 이 참조하는 `자유변수`
// _age === 36
const chocobe = new Person('Chocobe', 36);

// Person.prototype.sayGreeting() 이 참조하는 `자유변수`
// _age === 22
const kim = new Person('Kim', 22);

// 마지막으로 Person 객체를 생성하면서 넘겨주었던 `age`값, `22` 를 Person.prototype.sayGreeting() 이 참조하게 됩니다.
// 모든 Person 인스턴스의 sayGreeting() 은 `22` 를 참조하게 됩니다.

// "Hello, I'm Chocobe and 22"
kim.sayGreeting();

// "Hello, I'm Kim and 22"
chocobe.sayGreeting();