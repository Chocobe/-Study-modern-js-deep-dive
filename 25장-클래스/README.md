# 25장. 클래스

`객체지향 프로그래밍 언어` 에서는 `class` 를 사용하여 객체를 생성합니다.

자바스크립트에서는 `생성자 함수` 를 통해서 객체를 생성하였는데, `ES6` 에 `class` 문법이 추가되어, 좀 더 `객체지향 프로그래밍 언어` 와 친숙한 방식으로 객체를 생성할 수 있게 되었습니다.

자바스크립트의 `class` 를 기존의 `생성자 함수` 에 대한 `문법적 설탕 (Syntactic Sugar)` 로 불 수도 있지만, `class` 에서만 사용할 수 있는 기능도 있습니다.

때문에 `class` 를 단순한 `문법적 설탕 (Syntactic Sugar)` 로 보는것이 아닌, `새로운 객체 생성 메커니즘` 으로 보는것이 적합합니다.

<br />

`class` 와 `생성자 함수` 의 차이점은 다음과 같습니다.

1. `class` 를 `new` 키워드 없이 호출하면 에러가 발생합니다.
    * `생성자 함수` 는 `new` 키워드 없이 호출하면, 일반함수처럼 `[[Caller]]` 를 호출합니다.

2. `class` 는 `extends` 와 `super` 키워드를 제공합니다.

3. `class` 는 `호이스팅 (Hoisting)` 이 발생하지 않는것 처럼 동작합니다.
    * `class` 선언문 이전에 호출 시, `ReferenceError` 가 발생합니다.

4. `class` 내부에는 암묵적으로 `strict mode` 가 적용되며, 해제할 수 없습니다.

5. `class` 의 `constructor`, `prototype 메서드`, `정적 메서드` 는 열거되지 않습니다.
    * 위 메서드의 `프로퍼티 어트리뷰트` 중 `[[Enumerable]]` 이 `false` 로 되어 있습니다.

<br />

```javascript
const chocobe = new Person('Chocobe', 36);

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayGreeting = function() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  };
}

chocobe.sayGreeting();

// ReferenceError 발생
// const kim = new Client('Kim', 20);

// class Client {
//   name = null;
//   age = null;

//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   sayGreeting() {
//     console.log(`Hello, I'm ${this.name} and ${this.age}`);
//   }
// }
```



<br /><hr /><br />



# 2. 클래스 정의

자바스크립트의 `class` 는 `함수` 입니다.

즉, `class` 는 `일급 객체` 로 평가 됩니다.

1. `무명 리터럴` 로 생성할 수 있습니다.
    * (=== `런타임` 에 `class` 를 생성할 수 있습니다.)

2. `변수` 나 `자료구조` 에 `저장` 할 수 있습니다.

3. `class` 를 `함수` 의 `인수` 로 넘겨줄 수 있습니다.

4. `함수` 에서 `class` 를 `반환값` 으로 사용할 수 있습니다.

<br />

```javascript
// 1. `무명 리터럴` 로 `class` 생성하기
const Person = class {
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
```

<br />

`class` 를 정의할 때, `class` 몸체에 정의할 수 있는 메서드는 다음과 같이 3가지가 있습니다.

* constructor (생성자)
* prototype 메서드
* 정적 (static) 메서드

<br />

```javascript
class Person {
  name = null;
  age = null;

  // 생성자
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // prototype 메서드
  sayGreeting() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  }

  // static 메서드
  static hello() {
    console.log('Hello');
  }
}
```



<br /><hr /><br />



