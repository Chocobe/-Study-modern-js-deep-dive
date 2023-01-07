# 25장. 클래스

`객체지향 프로그래밍 언어` 에서는 `class` 를 사용하여 객체를 생성합니다.

자바스크립트에서는 `생성자 함수` 를 통해서 객체를 생성하였는데, `ES6` 에 `class` 문법이 추가되어, 좀 더 `객체지향 프로그래밍 언어` 와 친숙한 방식으로 객체를 생성할 수 있게 되었습니다.

자바스크립트의 `class` 를 기존의 `생성자 함수` 에 대한 `문법적 설탕 (Syntactic Sugar)` 로 불 수도 있지만, `class` 에서만 사용할 수 있는 기능도 있습니다.

때문에 `class` 를 단순한 `문법적 설탕 (Syntactic Sugar)` 로 보는것이 아닌, `새로운 객체 생성 메커니즘` 으로 보는것이 적합합니다.

<br />

`class` 와 `생성자 함수` 의 차이점은 다음과 같습니다.

1. `class` 를 `new` 키워드 없이 호출하면 에러가 발생합니다.
    * `생성자 함수` 는 `new` 키워드 없이 호출하면, 일반함수처럼 `[[Call]]` 를 호출합니다.

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



# 3. 클래스 호이스팅

자바스크립트의 `class` 는 `함수` 입니다.

그래서 `typeof` 연산자를 사용하여 `class` 를 평가하면, `"function"` 으로 평가 됩니다.

<br />

```javascript
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
```

<br />

자바스크립트의 모든 식별자는 `호이스팅 (Hoisting)` 이 발생 합니다.

`class` 도 마찬가지로 `호이스팅` 이 발생하지만, `class 선언문` 이전에 접근하게 되면 `ReferenceError` 를 발생시킵니다.

이는 `class` 에는 호이스팅이 발생하지 않는 것 처럼 보이지만, 사실은 `let`, `const` 처럼 `일시적 사각지대 (TDZ: Temporal Dead Zone)` 이 존재하기 때문 입니다.

<br />

정리하면, 다음과 같습니다.

* 자바스크립트의 `모든 식별자` 에는 `호이스팅 (Hoisting)` 현상이 발생 합니다.
* `class` 는 `함수` 객체 입니다.
* `class` 는 `function` 이지만, `let`, `const` 처럼 `선언 단계` 와 `초기화 단계` 를 가지며, `일시적 사각지대 (TDZ: Temporal Dead Zone)` 가 존재 합니다.
* `class` 도 `호이스팅` 이 발생하지만, `일시적 사각지대` 가 존재하므로, 선언문 이전에 참조할 수 없습니다.

<br />

```javascript
const Person = 'Person String Value';

// 블록 스코프 생성
{
  // 현재 블록 스코프를 평가할 때, Person 식별자를 평가 합니다. (식별자 선언 단계)
  // let, const 처럼 class 도 `초기화 단계` 이전에 참조하게 되면 `ReferenceError` 를 발생 시킵니다.
  // 실행단계에서 현재 라인을 실행 시점에는, 아직 `class Person` 의 초기화 단계가 
  console.log(Person);

  class Person {
    //
  };
}
```



<br /><hr /><br />



# 4. 인스터스 생성

`class` 는 `함수` 라고 하였습니다.

하지만 `class` 를 일반함수 처럼 `[[Call]]` 로 호출하게 되면 에러를 발생 시킵니다.

<br />

`class` 는 값으로 평가되는 `일급 객체` 이므로, `기명 함수 표현식` 처럼 `기명 클래스 표현식` 으로 만들수도 있습니다.

주의할 점은 `기명 함수 표현식` 처럼 표현식에서 사용한 이름은 `class 내부` 에서만 유효하며 외부에서 참조할 경우 에러를 발생 시킵니다.

<br />

```javascript
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

// class 는 [[Call]] 로 호출할 경우, 에러를 발생 시킵니다.
// Person();

// 기명 클래스 표현식에 사용한 이름은, 클래스 외부에서 사용할 수 없습니다.
// ReferenceError
// const chocobe = new MyPerson('Chocobe', 36);

const kim = new Person('Kim', 20);
kim.sayGreeting();
```



<br /><hr /><br />



# 5. 메서드

자바스크립트의 `class` 에는 3가지 메서드가 존재 합니다.

* constructor (생성자)
* 프로토타입 메서드
* 정적 메서드

<br />

`class 몸체` 에 정의한 메서드는 `프로토타입 메서드` 가 되지만, `class 몸체` 에 정의한 프로퍼티는 `인스턴스 프로퍼티` 가 됩니다.

<br />

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <script>
      class Person {
        // 인스턴스 프로퍼티
        name = 'initial name'
        // 인스턴스 프로퍼티
        age = 'initial age'

        // 생성자
        constructor(name, age) {
          // 인스턴스 프로퍼티 초기화
          this.name = name;
          this.age = age;
        }

        // prototype 메서드
        sayGreeting() {
          console.log(`Hello, I'm ${this.name} and ${this.age}`);
        }
      }

      const chocobe = new Person('Chocobe', 36);
      console.log(chocobe);
    </script>
  </body>
</html>
```

<br />



## 5-1. constructor

`class` 의 메서드인 `constructor()` 는 인스턴스를 `생성` 하고 `초기화` 하는 특수한 메서드 입니다.

코드 평가 단계에서 `class` 정의를 평가하게 되면, `constructor 동작` 을 하는 `Function` 객체를 생성합니다.

<br />

`constructor` 는 특수한 메서드로써 일반함수와는 다른 특징을 가집니다.

* `constructor` 는 `class` 내에서 `최대 1개` 를 정의할 수 있습니다.
* `constructor` 는 생략 가능하지만, 인스턴스의 초기화를 수행하기 때문에, 생략하지 않는것이 좋습니다.
    * `constructor` 를 생략하게 되면, 암묵적으로 `비어있는 constructor` 를 정의 합니다.
* `constructor` 내부에서 `this` 키워드의 프로퍼티를 추가하면, 인스턴스의 프로퍼티가 됩니다.
* 인스턴스 생성시, 인스턴스 프로퍼티를 초기화하려면, `constructor` 의 `인자` 에 `초기화 값` 을 넘겨줍니다.
* `constructor` 내부에는 반드시 `반환문 (return)` 을 사용하지 않아야 합니다.
    * `constructor` 내부에 `반환문 (return)` 이 없다면, 암묵적으로 `this (생성한 인스턴스)` 를 반환 합니다.



<br /><hr /><br />



## 5-2. 프로토타입 메서드

`class 몸체` 에 정의한 메서드는 `class` 의 `prototype 메서드` 가 됩니다.

그리고 `class` 로 생성한 인스턴스는 `프로토타입 체인 (Prototype Chain)` 의 일원이 됩니다.

아래의 코드를 통해 알 수 있듯이, `class` 도 `생성자 함수` 와 마찬가지로 `프로토타입 기반` 의 `객체 생성 메커니즘` 입니다.

<br />

```javascript
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

const chocobe = new Person('Chocobe', 36);

// Object.getPrototypeOf(chocobe).sayGreeint: [Function: sayGreeting]
console.log(
  'Object.getPrototypeOf(chocobe).sayGreeint: ', 
  Object.getPrototypeOf(chocobe).sayGreeting
);

// Object.getPrototypeOf(chocobe).hasOwnProperty("sayGreeting"): true
console.log(
  'Object.getPrototypeOf(chocobe).hasOwnProperty("sayGreeting"): ',
  Object.getPrototypeOf(chocobe).hasOwnProperty('sayGreeting')
);

// Object.getPrototypeOf(chocobe) === Person.prototype: true
console.log(
  'Object.getPrototypeOf(chocobe) === Person.prototype: ', 
  Object.getPrototypeOf(chocobe) === Person.prototype
);

// Object.getPrototypeOf(Person.prototype) === Object.prototype: true
console.log(
  'Object.getPrototypeOf(Person.prototype) === Object.prototype: ',
  Object.getPrototypeOf(Person.prototype) === Object.prototype
);
```



<br /><hr /><br />



## 5-3. 정적 메서드

`정적(static) 메서드` 는 인스턴스가 아닌, `class` 의 `메서드` 입니다.

`class 몸체` 에 `static` 키워드와 함께 `메서드` 를 정의하여 `정적 메서드` 를 정의할 수 있습니다.

`정적 메서드` 는 `class` 의 메서드이기 때문에, 인스턴스를 통해서는 호출할 수 없다는 특징이 있습니다.

<br />

```javascript
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

// 정적 메서드 호출
Person.sayHello();
```



<br /><hr /><br />



## 5-4. 정적 메서드와 프로토타입 메서드의 차이

`정적 메서드` 와 `프로토타입 메서드` 는 다음과 같은 차이점이 있습니다.

* `정적 메서드` 와 `프로토타입 메서드` 가 속한 `프로토타입 체인 (Prototype Chain)` 이 다릅니다.
* `정적 메서드` 는 `class` 로 호출하고, `프로토타입 메서드` 는 `인스턴스` 로 호출합니다.
* `정적 메서드` 는 `인스턴스 프로퍼티` 를 참조할 수 없지만, `프로토타입 메서드` 는 `인스턴스 프로퍼티` 를 참조할 수 있습니다.

<br />

위와 같이 `정적 메서드` 와 `프로토타입 메서드` 가 다른 이유는 `this 바인딩` 이 다르기 때문입니다.

`함수` 를 호출할 때, `함수 코드 평가` 과정에서 `this 바인딩` 은 메서드를 호출한 객체가 바인딩 됩니다.

* `정적 메서드` 는 `class` 를 통해서 호출하기 때문에 `this` 에는 `class` 가 바인딩 됩니다.
* `프로토타입 메서드` 는 `인스턴스` 를 통해서 호출하기 때문에 `this` 에는 `인스턴스` 가 바인딩 됩니다.

<br />

만약 메서드 내부에서 `this` 를 사용하여 `인스턴스 프로퍼티` 에 접근하지 않는다면, 이 메서드는 `정적 메서드` 로 만드는 것이 좋습니다.

그리고 메서드 내부에서 `this` 를 사용하여 `인스턴스 프로퍼티` 에 접근한다면, 이는 `프로토타입 메서드` 로 만들어야만 합니다.

<br />

`this` 를 사용하지 않고, `파라메터` 를 통해 어떠한 동작을 하고 값을 반환한다면, 이는 `유틸리티` 역할을 하게 됩니다.

이는 `정적 메서드` 로 만들어도 무관하며, 이렇게 특정 `class` 에 묶인 `정적 메서드` 로 만든다면, `유틸리티 메서드` 를 `class` 라는 `네임스페이스` 에 속하도록 구조화 할 수 있습니다.

그래서 자바스크립트의 `표준 빌트인 객체` 에도 같은 맥락의 `유틸리티 메서드` 를 `정적 메서드` 로 제공합니다.

* `Number.isFinite`
* `Number.isNaN`
* `Number.parseFloat`
* 등등...



<br /><hr /><br />



## 5-5. 클래스에서 정의한 메서드의 특징

지금까지 `class` 에 정의할 수 있는 `정적 메서드` 와 `프로토타입 메서드` 를 살펴보았습니다.

다음은 `class` 에 정의할 수 있는 메서드가 갖는 특징 입니다.

* 메서드 축약 표현을 사용합니다.
    * `[[Construct]]` 내부 메서드를 갖지 않는 `non-constructor` 입니다.
    * `new` 키워드와 함께 사용할 경우 에러를 발생시킵니다.
* 암묵적으로 `strict mode` 로 실행됩니다.



<br /><hr /><br />



# 6. 클래스의 인스턴스 생성 과정

`class` 는 `new` 연산자와 함께 호출하여 내부 메서드인 `[[Construct]]` 가 호출되고, `인스턴스` 를 생성합니다.

`생성자 함수` 와는 다르게 `class` 에 `new` 연산자 없이 `[[Call]]` 를 호출하면 에러를 발생시킵니다.

<br />

`class` 를 사요하여 인스턴스를 생성하는 과정도 `생성자 함수의 인스턴스 생성 과정` 과 유사한 과정을 통해 인스턴스를 생성합니다.



<br /><hr /><br />



## 6-1. 인스턴스 생성 및 this 바인딩

`new` 연산자와 함께 `class` 를 호출하면 다음과 같은 순서로 동작하게 됩니다.

1. `인스턴스` 가 될 `빈 객체` 를 암묵적으로 생성 합니다.
2. 생성한 `인스턴스` 의 `__proto__` 에 `class` 의 `prototype` 이 바인딩됩니다.
3. `인스턴스` 를 `this` 에 바인딩 합니다.



<br /><hr /><br />



## 6-2. 인스턴스 초기화

`인스턴스` 를 생성하고 `this 바인딩` 이 끝나면, 다음과 같은 순서로 초기화를 진행합니다.

1. `class` 의 `생성자` 인 `constructor()` 메서드를 호출 합니다.
2. `constructor()` 메서드에 넘겨준 `인수` 와 내부 로직을 사용하여 `인스턴스 프로퍼티` 를 초기화 합니다.



<br /><hr /><br />



## 6-3. 인스턴스 반환

위 과정을 모두 마치면, `인스턴스` 를 암묵적으로 반환합니다.

만약 `constructor` 에 `반환문 (return)` 이 있다면, 인스턴스 생성에 훼손을 주게 되므로, `반환문 (return)` 은 반드시 생략해야 합니다.

<br />

```javascript
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
```



<br /><hr /><br />



# 7. 프로퍼티

## 7-1. 인스턴스 프로퍼티

`class` 를 사용하여 생성한 인스턴스의 프로퍼티는 `class` 의 `constructor` 내부에서 정의할 수 있습니다.

`constructor` 내부에서 `this` 에 `추가한 프로퍼티` 는 `인스턴스의 프로퍼티` 가 됩니다.



<br /><hr /><br />



## 7-2. 접근자 프로퍼티

자바스크립트 객체의 프로퍼티는 두가지로 분류할 수 있었습니다.

* 데이터 프로퍼티
* 접근자 프로퍼티

<br />

`class` 를 사용하여 생성한 `인스턴스` 에도 동일하게 `데이터 프로퍼티` 와 `접근자 프로퍼티` 를 정의할 수 있습니다.

`constructor` 내부에서 `this` 에 추가한 `프로퍼티` 가 인스턴스의 프로퍼티가 되는데, 이 프로퍼티는 `데이터 프로퍼티` 가 됩니다.

그리고 `class 몸체` 에 정의한 `GETTER` 와 `SETTER` 메서드는 `접근자 프로퍼티` 가 됩니다.

<br />

객체의 접근자 프로퍼티와 동일한 특징을 가지며 다음과 같습니다.

* `GETTER` 는 반드시 `값을 반환` 하여야 합니다.
* `SETTER` 반드시 `1개의 매개변수` 를 정의하여야 합니다.

<br />

```javascript
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
```



<br /><hr /><br />



## 7-3. 클래스 필드 정의 제안

`class` 로 생성할 인스턴스의 프로퍼티를 추가하는 방법은 두가지가 있습니다.

* `constructor` 내부에서 `this` 에 프로퍼티를 추가하는 방법
* `class 몸체` 에 프로퍼티를 추가하는 방법 (`TC39 - ECMA262` 의 `class field declarations`)

<br />

자바스크립트의 `함수` 는 `일급 객체` 이므로, `class` 의 프로퍼티에 `함수 표현식` 으로도 정의할 수 있지만, `인스턴스 프로퍼티` 에 추가된 `메서드` 는 인스턴스의 `__proto__` 가 아닌 (상속이 아닌) 인스턴스 개별로 가지는 메서드가 됩니다.

그래서 인스턴스 각각에 대한 메모리에 `프로퍼티에 할당된 메서드` 가 개별로 존재하게 되며, 이는 메모리 낭비가 됩니다.

이러한 이유로 `인스턴스의 프로퍼티` 에는 `함수 표현식` 으로 `메서드 정의` 하는 방식을 권장하지 않습니다.



<br /><hr /><br />



# 8. 상속에 의한 클래스 확장

## 8-1. 클래스 상속과 생성자 함수 상속

`class` 는 상속을 사용하여 확장할 수 있습니다.

이렇게 확장한 `class` 는 상속받은 모든 프로퍼티와 메서드를 가지며, 자신만의 프로퍼티와 메서드를 추가로 가지게 됩니다.

<br />

이러한 상속 기능으로 `extends` 를 사용하며, 기존의 `생성자 함수` 에는 이러한 기능은 없습니다.

아래의 코드는 `생성자 함수` 를 사용하여, `상속` 을 구현한 예시 입니다.

<br />

```javascript
const Animal = (function() {
  function Animal(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  Animal.prototype.eat = function() {
    return 'eat';
  }

  Animal.prototype.move = function() {
    return 'move';
  }

  return Animal;
}());

const Bird = (function() {
  function Bird() {
    Animal.apply(this, arguments);
  }

  Bird.prototype = Object.create(Animal.prototype);
  Bird.prototype.constructor = Bird;
  Bird.prototype.fly = function() {
    return 'fly';
  };

  return Bird;
}());

const bird = new Bird(11, 22);

// eat
console.log(bird.eat());

// move
console.log(bird.move());

// fly
console.log(bird.fly());

// { age: 11, weight: 22 }
console.dir(bird);
```

<br />

아래의 코드는 `class` 에 `extends` 를 사용하여, `class` 상속 예시 입니다.

<br />

```javascript
class Animal2 {
  age;
  weight;

  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return 'eat';
  }

  move() {
    return 'move';
  }
}

class Bird2 extends Animal2 {
  fly() {
    return 'fly';
  }
}

const secondBird = new Bird2(33, 44);

// eat
console.log(secondBird.eat());

// move
console.log(secondBird.move());

// fly
console.log(secondBird.fly());

// { age: 33, weight: 44 }
console.log(secondBird);
```



<br /><hr /><br />



## 8-2. extends 키워드

`class` 를 확장하기 위해 사용한 `extends` 는 상속 관계를 설정해 줍니다.

이렇게 확장된 `class` 와 상속해준 `class` 를 다음과 같이 부릅니다.

* 상속해준 class 명칭
    * 슈퍼 클래스
    * 부모 클래스
    * 베이스 클래스

* 상속받은 class 명칭
    * 서브 클래스
    * 자식 클래스
    * 파생 클래스

<br />

이렇게 상속받은 `class` 는 `부모 클래스` 의 `프로퍼티`, `메서드`, `정적 메서드` 모두를 상속 받게 됩니다.



<br /><hr /><br />



## 8-3. 동적 상속

`extends` 키워드는 `class` 뿐만 아니라, `생성자 함수` 도 상속 받을 수 있습니다.

`extends` 뒤에는 `[[Construct]]` 내부 메서드 를 가지는 `함수 객체` 는 모두 올 수 있습니다.

정확히는 `[[Constructor]]` 내부 메서드를 가지는 `함수 객체` 로 평가될 수 있는 `모든 표현식` 이 올 수 있습니다.

<br />

```javascript
// 동적 상속을 위한 상태값
let isPlant = true;

// 생성자 함수
const Plant = (function() {
  function Plant() {
    //
  }

  return Plant;
}());

// class
class Animal {
  //
}

// `생성자 함수` 를 상속받은 `class`
class DynamicExtendedClass extends (isPlant ? Plant : Animal) {
  //
}

const plantInstance = new DynamicExtendedClass();

// plantInstance instanceof Plant: true
console.log(
  'plantInstance instanceof Plant: ',
  plantInstance instanceof Plant
);

// plantInstance instanceof DynamicExtendedClass: true
console.log(
  'plantInstance instanceof DynamicExtendedClass: ',
  plantInstance instanceof DynamicExtendedClass
);

// plantInstance instanceof Animal: false
console.log(
  'plantInstance instanceof Animal: ',
  plantInstance instanceof Animal
);// 동적 상속을 위한 상태값
let isPlant = true;

// 생성자 함수
const Plant = (function() {
  function Plant() {
    //
  }

  return Plant;
}());

// class
class Animal {
  //
}

// `생성자 함수` 를 상속받은 `class`
class DynamicExtendedClass extends (isPlant ? Plant : Animal) {
  //
}

const plantInstance = new DynamicExtendedClass();

// plantInstance instanceof Plant: true
console.log(
  'plantInstance instanceof Plant: ',
  plantInstance instanceof Plant
);

// plantInstance instanceof DynamicExtendedClass: true
console.log(
  'plantInstance instanceof DynamicExtendedClass: ',
  plantInstance instanceof DynamicExtendedClass
);

// plantInstance instanceof Animal: false
console.log(
  'plantInstance instanceof Animal: ',
  plantInstance instanceof Animal
);
```

<br />

주의할 점은 위와 같이 `표현식` 으로 `부모 클래스` 를 결정할 수 있지만 (동적 상속), 이미 `class` 평가가 완료된 이후에는 부모 클래스가 변경되지 않습니다.

```javascript
// 동적 상속을 위한 상태값
let isPlant = true;

// 생성자 함수
const Plant = (function() {
  function Plant() {
    //
  }

  return Plant;
}());

// class
class Animal {
  //
}

// `생성자 함수` 를 상속받은 `class`
class DynamicExtendedClass extends (isPlant ? Plant : Animal) {
  //
}

const plantInstance = new DynamicExtendedClass();

// plantInstance instanceof Plant: true
console.log(
  'plantInstance instanceof Plant: ',
  plantInstance instanceof Plant
);

// plantInstance instanceof DynamicExtendedClass: true
console.log(
  'plantInstance instanceof DynamicExtendedClass: ',
  plantInstance instanceof DynamicExtendedClass
);

// plantInstance instanceof Animal: false
console.log(
  'plantInstance instanceof Animal: ',
  plantInstance instanceof Animal
);



console.log(' ');



isPlant = false;
const animalInstance = new DynamicExtendedClass();

// animalInstance instanceof Animal: false
console.log(
  'animalInstance instanceof Animal: ',
  animalInstance instanceof Animal
);

// isPlant 의 초기값이 `true` 였으므로, DynamicExtendedClass 는 Plant 클래스를 `부모 클래스` 로 가집니다.
// 부모 클래스가 한전 정해졌으면 변경되지는 않습니다.
console.log(
  'animalInstance instanceof Plant: ',
  animalInstance instanceof Plant
);
```



<br /><hr /><br />



## 8-4. 서브클래스의 constructor

`class` 의 내부 메서드인 `[[Construct]]` 는 생략할 수 있습니다.

만약 생략한다면, `class` 에 암묵적으로 아래와 같은 `constructor` 가 생성됩니다.

<br />

```javascript
class Base {
  // constructor 를 생략하였다면, 암묵적으로 생성될 constructor 형태
  constructor() {}
}

class Child extends Base {
  // 자식 클래스의 constructor 를 생략하면, 암묵적으로 아래와 같은 constructor 가 생성 됩니다.
  constructor(...args) {
    super(...args);
  }
}
```



<br /><hr /><br />



## 8-5. super 키워드

`super` 키워드는 인스턴스에서 `부모 클래스` 를 지칭합니다.

`super` 키워드는 `함수` 로 호출할 수도 있고, `식별자` 로 참조할 수도 있습니다.

각 특징은 다음과 같습니다.

<br />

* `super` 를 `함수` 로 호출
    * `부모 클래스` 의 `constructor` 를 호출하게 됩니다.
    * `자식 클래스` 의 `constructor` 를 정의하였다면, 반드시 `constructor` 메서드의 최상단에 `super(매개변수)` 를 호출하여야 합니다.
    * `constructor` 가 아닌 곳에서는 호출할 수 없습니다.

* `super` 를 `식별자` 로 호출
    * `부모 클래스` 에 정의된 `인스턴스` 프로퍼티와 메서드에 접근할 수 있습니다.
    * `ES6` 에서 추가된 `메서드 축약 표현` 으로 정의된 `메서드` 에서만 `super` 키워드를 사용할 수 있습니다.
        * `메서드 축약 표현` 으로 정의한 `메서드` 에는 내부슬록 `[[HomeObject]]` 가 있으며, `[[HomeObject]]` 를 통해서 `메서드 자신` 이 바인딩 되어있는 `객체` 를 참조하게 됩니다.
    * `class` 로 생성한 `인스턴스` 뿐만 아니라, `객체 리터럴` 의 내부에 정의한 `메서드 축약 표현` 메서드 내부에서도 `super` 키워드를 사용할 수 있습니다.
    * `자식 클래스` 의 메서드 내부에서 `부모 클래스` 에 정의한 `프로퍼티` 와 `메서드` 에 접근할 수 있습니다.

<br />

아래의 코드는 `super.메서드()` 를 호출한 예시 입니다.

<br />

```javascript
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
```

<br />

위 코드에서 `Child 인스턴스` 인 `child` 는 다음과 같은 구조가 됩니다.

```javascript
const child = {
  // `name` 은 Base 클래스의 프로퍼티였지만, 상속받게 되면서 Child 인스턴스의 프로퍼티로 등록 되는 특징이 있습니다.
  name: 'Chocobe',
  age: 36,

  // Child.prototype
  [[Prototype]]: {
    constructor: class Child,
    sayGreeting: f sayGreeting(),
    sayHi: f sayHi(),

    // Base.prototype
    [[Prototype]]: {
      constructor: class Base,
      sayGreeting: f sayGreeting(),
      
      // Object.prototype
      [[Prototype]]: {
        constructor: f Object(),
        // ... 생략
      }
    }
  }
}
```

<br />

## 8-6. 상속 클래스의 인스턴스 생성 과정

`extends` 를 사용하여 `상속받은 class 인스턴스` 를 생성하는 과정은 조금 달라집니다.

가장 큰 차이점은 `자식 클래스` 의 `constructor` 에서 `인스턴스` 를 생성하지 않고, `super()` 를 통해 `부모 클래스` 에 인스턴스 생성을 `위임` 하게 되는 동작 입니다.

<br />

1. 서브클래스 `constructor()` 의 첫째줄에 있는 `super()` 호출
    * `서브클래스` 는 인스턴스를 생성하지 않고, `부모 클래스` 의 `constructor` 를 호출하게 됩니다.

2. 수퍼클래스의 `인스턴스 생성` 과 `this 바인딩`
    * `부모 클래스` 의 `constructor` 가 호출되고 `인스턴스` 를 생성 합니다.
        * `부모 클래스` 가 생성한 인스턴스지만, 인스턴스의 `__proto__` 는 `자식 클래스` 의 `prototype` 이 바인딩 됩니다.
            * `부모 클래스` 의 `constructor` 내부이지만, `new.target` 은 `자식 클래스` 를 가리키고 있기 때문입니다.
    * 생성한 인스턴스를 `this` 에 바인딩 합니다.

3. 수퍼클래스 `인스턴스 초기화`
    * `부모 클래스` 의 `constructor` 에 정의한 `초기화` 로직을 사용하여, 인스턴스를 `초기화` 합니다.
    * `부모 클래스` 의 `constructor` 의 인스턴스 초기화 동작이 모두 완료되면, 암묵적으로 `인스턴스` 를 `반환` 합니다.

4. `서브클래스 constructor 로의 복귀` 와 `this 바인딩`
    * `super()` 가 종료되면 `자식 클래스` 의 `constructor` 로 복귀하게 됩니다.
    * `super()` 가 반환한 `인스턴스` 를 `this 바인딩` 합니다.

5. 서브클래스의 인스턴스 초기화
    * `자식 클래스` 의 `cocnstructor` 에 정의한 `초기화` 동작을 실행 합니다.

6. 인스턴스 반환
    * `자식 클래스` 의 `constructor` 도 실행 완료되면, 암묵적으로 인스턴스를 `반환` 합니다.



<br /><hr /><br />



## 8-7. 표준 빌트인 생성자 함수 확장

`class` 는 `extends` 를 사용하여 `상속` 을 받을 수 있으며, 이는 `생성자 함수` 도 상속 받을 수 있었습니다.

자바스크립트의 `표준 빌트인 생성자 함수` 도 `[[Construct]]` 를 가지는 `생성자 함수` 입니다.

따라서 `표준 빌트인 생성자 함수` 를 상속받는 `class` 를 정의하여 `표준 빌트인 생성자 함수` 를 확장할 수 있습니다.

<br />

아래의 코드는 자바스크립트가 제공하는 `표준 빌트인 생성자 함수` 인 `Array` 를 확장하는 예시 입니다.

<br />

```javascript
class MyArray extends Array {
  uniq() {
    return this.filter((value, index, self) => self.indexOf(value) === index);
  }

  average() {
    const total = this.reduce((total, value) => {
      return total + value;
    }, 0);

    return total / this.length;
  }
}

const myArray = new MyArray(1, 1, 3, 5, 5);

// MyArray(3): [1, 3, 5]
console.log(myArray.uniq());

// 3
console.log(myArray.average());
```