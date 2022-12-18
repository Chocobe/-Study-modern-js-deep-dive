# 19장. 프로토타입

자바스크립트는 멀티 패러다임 프로그래밍 언어 입니다.

* 명령형
* 함수형
* 프로토타입 기반의 객체지향 프로그래밍

<br />

`ES6` 에서 `class` 문법이 추가 되었는데, 이는 단순히 기존의 객체 생성 방식의 새로운 문법이 아닌, `새로운 객체 생성 메커니즘` 입니다.

* `class` 는 기존의 `생성자 함수` 에서는 제공하지 않는 기능도 제공 합니다.



<br /><hr /><br />



# 1. 객체지향 프로그래밍

객체지향 프로그래밍은 `객체의 집합` 으로 프로그램을 표현하려는 프로그래밍 페러다임 입니다.

객체는 우리가 프로그램으로 표현하고자 하는 `사람`, `동물`, `자동차` 와 같은 요소를 말하며, 표현하고자 하는 객체의 무수히 많은 `속성 (Property)` 중, 프로그램에 필요한 요소만을 추출하여 표현하는 것을 `추상화 (Abstraction)` 이라고 합니다.

<br />

객체의 속성에는 여러가지 값이 올 수 있는데, 이를 `상태값 (State)` 라고 합니다.

우리는 이 상태값에 따라 동일한 형식의 객체를 구분할 수 있습니다.

```javascript
// name 이 "Kim" 인 객체
const client1 = {
  name: "Kim",
};

// name 이 "Lee" 인 객체
const client2 = {
  name:; "Lee",
};
```

<br />

그리고 객체는 자신만의 동작을 가지며, 이를 `메서드 (Method)` 라고 합니다.

<br />

정리하면, 객체지향 프로그래밍의 객체는 `상태 (State)` 와 `동작 (Method)` 를 묶은 `복합적인 자료구조` 를 말합니다.

```javascript
function Client(name) {
  this.name = name;
  this.sayGreeting = () => {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const chocobe = new Client("Chocobe");
chocobe.sayGreeting(); // "Hello, I'm Chocobe"

const kim = new Client("Kim");
kim.sayGreeting(); // "Hello, I'm Kim"
```



<br /><hr /><br />



# 2. 상속과 프로토타입

`상속` 은 특정 객체의 `프로퍼티` 나 `메서드` 를 상속받아 사용하는 방식 입니다.

이는 `중복 코드` 를 제거해 주므로, 개발 비용을 줄여 줍니다.

그리고 자바스크립트의 프로토타입 특성에 의해, 1개의 부모객체에 있는 `프로퍼티` 나 `메서드` 를 공동으로 참조하게 되므로, 메모리를 절약할 수 있습니다.

결과적으로 공통된 코드와 리소스를 제거하므로써, 성능을 향상시킬 수 있습니다.

<br />

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getArea = () => {
    return Math.PI * this.radius ** 2;
  };
}

// sayGreeting() 메서드가 각각의 객체 메모리에 할당되어 있습니다.
const smallCircle = new Circle(3);
const bigCircle = new Circle(20);
```

<br />

위 코드는 `생성자 함수` 를 사용하여, 여러개의 객체를 생성하고 있습니다.

문제점은 `getArea()` 메서드는 모든 객체가 동일하지만, 각각의 메모리를 차지하고 있는 것 입니다.

<br />

`getArea()` 메서드는 부모 객체 메모리에 한번만 할당하고, 자식 객체는 이 메서드를 참조하는 형태로 만들면, 중복 사용하는 메모리를 모두 제거할 수 있습니다.

```javascript
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수의 prototype 에 정의하였으므로, Circle 인스턴스는 모두 동일한 메모리 위치의 getArea() 메서드를 참조 합니다.
Circle.prototype = function() {
  return Math.PI * this.radius ** 2;
};

const smallCircle = new Circle(3);
console.log(smallCircle.getArea());
const bigCircle = new Circle(4);
console.log(gitCircle.getArea());
```



<br /><hr /><br />



# 3. 프로토타입 객체

prototype 은 객체 간 상속을 구현하기 위해 사용합니다.

모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 가지며, `prototype 참조값` 이 할당되어 있습니다.



<br /><hr /><br />



## 3-1. __proto__ 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 `[[Prototype]]` 에 간접적으로 접근할 수 있습니다.

`[[Prototype]]` 을 `데이터 프로퍼티` 가 아닌 `접근자 프로퍼티` 로 제공하는 이유는 다음과 같습니다.

* prototype 은 `단방향 연결 리스트` 로 구현되어야 하기 때문
* 부모와 자식이 `순환참조 (Circular Reference)` 가 되면, `무한 루프` 에 빠지기 때문

<br />

`__proto__` 접근자 프로퍼티를 통해서 `[[Prototype]]` 에 접근하는 것도 권장하지는 않습니다.

만약 정말 필요한 경우라면, `Object` 의 `static method` 를 사용하는 것이 좋습니다.

* `__proto__ 접근`: `Object.getPrototypeOf(객체)`
* `__proto__ 변경`: `Object.setPrototypeOf(원본객체, Prototype으로_사용할_객체)`



<br /><hr /><br />



## 3-2. 함수 객체의 prototype 프로퍼티

`__proto__` 는 모든 객체가 가지는 `[[Prototype]]` 접근자 프로퍼티 였습니다.

`prototype` 프로퍼티는 오직 `생성자 함수` 만 가지는 접근자 프로퍼티 입니다.

`생성자 함수` 가 소유하는 `prototype` 프로퍼티에는, 생성자 함수가 `생성할 인스턴스의 프로토타입` 을 가리킵니다.

그러므로, `일반 객체`나 `non-constructor 함수` 에는 `prototype` 프로퍼티가 존재하지 않습니다.

<br />

즉, 다음과 같은 관계가 됩니다.
* `(생성자 함수).prototype === (new 생성자함수()).__proto__`

<br />

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
console.log(Person.hasOwnProperty('prototype')); // true

const person = new Person('Chocobe', 36);
console.log(person.hasOwnProperty('prototype')); // false

console.log(Person.prototype === person.__proto__); // true
```



<br /><hr /><br/>



## 3-3. 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 생성자 함수의 `prototype` 에는 `constructor` 프로퍼티가 있습니다.

`constructor` 프로퍼티에는 `생성자 함수` 를 가리키며, 생성한 `인스턴스` 의 `__proto__` 에 `constructor` 로 연결됩니다.

<br />

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const me = new Person('Chocobe', 36);
console.log(Person === me.__proto__.constructor); // true
```

<br />

위 코드처럼 `__proto__.constructor` 를 통해, 인스턴스를 생성한 `생성자 함수` 를 참조할 수 있습니다.

그리고 `__proto__.constructor` 는 `인스턴스.constructor` 로 축약하여 접근할 수도 있습니다.

즉, `__proto__` 를 생략하고 `constructor` 에 바로 접근할 수도 있습니다.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const me = new Person('Chocobe', 36);

console.log(me.__proto__.constructor === Person); // true
console.log(me.constructor === Person); // true
console.log(me.__proto__.constructor === me.constructor); // true
```



# 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

객체(인스턴스) 를 만들기 위한 방법은 2가지가 있습니다.

* `객체 리터럴` 로 생성
* `생성자 함수` 로 생성

<br />

```javascript
const obj1 = new Object();

const obj2 = {};
```

<br />

이렇게 생성한 객체(인스턴스) 는 서로 다른 방법으로 생성하였지만, 생성 결과는 동일하게 보아도 무방 합니다.

이는 자바스크립트 내부 동작에서 차이는 있지만, 결과적으로 `객체(인스턴스).constructor` 가 동일하게 바인딩 되기 때문입니다.

<br />

아래 코드를 통해 객체 `리터럴로 생성한 constructor` 와 `생성자 함수로 생성한 constructor` 가 `동일함` 을 알 수 있습니다.

<br />

```javascript
const obj1 = new Object();
const obj2 = {};
console.log(obj1.constructor === obj2.constructor); // true

const func1 = new Function('lhs', 'rhs', 'return lhs + rhs');
const func2 = function(lhs, rhs) {
  return lhs + rhs;
};
console.log(func1.constructor === func2.constructor); // true

const arr1 = new Array();
const arr2 = [];
console.log(arr1.constructor === arr2.constructor); // true

const regExp1 = new RegExp('[a-z]');
const regExp2 = /[a-z]/;
console.log(regExp1.constructor === regExp2.constructor); // true
```



# 5. 프로토타입의 생성 시점

앞에서 살펴본 바와 같이 `객체 리터럴` 로 생성한 객체와 `생성자 함수` 로 생성한 객체는 `동일한 constructor` 를 가진다는 것을 확인 하였습니다.

즉, 모든 객체는 `생성자 함수와 연결` 되게 됩니다.

<br />

이렇게 연결되는 생성자 함수의 `prototype` 은 `생성자 함수가 생성되는 시점` 에 생성됩니다.

`prototype` 이 생성되는 시점을 알아보기 위해, 다음과 같이 생성자 함수를 구분해 보겠습니다.

* 사용자 정의 생성자 함수
* 빌트인 생성자 함수 (자바스크립트가 기본 제공 - ex: Object, Array, ...)



<br /><hr /><br/>



## 5-1. 사용자 정의 생성자 함수와 프로토타입 생성 시점

자바스크립트 엔진이 `생성자 함수` 로 해석하는 경우는 다음과 같았습니다.

* 함수 선언문
* 함수 표현식

<br />

이렇게 만든 함수는 `[[Construct]]` 프로퍼티를 가지며, `[[Construct]]` 프로퍼티는 `함수 객체를 생성하는 시점` 에 생성됩니다.

그리고 `[[Construct]]` 가 생성된다는 것은, 생성자 함수의 `prototype` 도 생성된다는 것입니다.

* 생성자 함수의 `constructor` 는 `prototype` 의 하위 프로퍼티 입니다.

<br />

`함수 객체를 생성하는 시점` 에 대해 알아보겠습니다.

`함수 선언문` 은 `호이스팅 (Hoisting)` 에 의해, `런타임 이전` 에 생성됩니다.

그러므로 `함수 선언문` 으로 정의한 `사용자 정의 생성자 함수` 의 `prototype` 과 `constructor` 는 런타임 시점 이전에 생성 됩니다.

<br />

아래 코드를 통해 `사용자 정의 생성자 함수` 와 `Object` 의 관계를 `prototype` 과 `constructor` 대조로 확인할 수 있습니다.

```javascript
// Person === Person.prototype.constructor: true
console.log('Person === Person.prototype.constructor: ', Person === Person.prototype.constructor);

// Person.prototype === (new Person()).__proto__: true
console.log('Person.prototype === (new Person()).__proto__: ', Person.prototype === (new Person()).__proto__);

// Object === Person.prototype.__proto__.constructor: true
console.log('Object === Person.prototype.__proto__.constructor: ', Object === Person.prototype.__proto__.constructor);

// Object.prototype === Person.prototype.__proto__: true
console.log('Object.prototype === Person.prototype.__proto__: ', Object.prototype === Person.prototype.__proto__);

// Object.prototype === (new Person()).__proto__.__proto__: true
console.log('Object.prototype === (new Person()).__proto__.__proto__: ', Object.prototype === (new Person()).__proto__.__proto__);

function Person() {
  // ...initialize
}
```



<br /><hr /><br />



## 5-2. 빌트인 생성자 함수와 프로토타입 생성 시점

`빌트인 생성자 함수` 는 자바스크립트의 전역 객체가 생성되는 시점에 생성 됩니다.

`빌트인 생성자 함수` 가 생성되는 시점에 `prototype` 과 `constructor` 도 함께 생성 됩니다.

우리가 작성한 코드는 전역 객체가 생성된 후에 실행되므로, `빌트인 생성자 함수` 는 이미 생성된 이후가 됩니다.

<br />

아래 코드는 빌트인 생성자 함수 중, `String` 과 `Array` 를 사용하여 `prototype` 과 `constructor` 를 대조합니다.

<br />

```javascript
// String 과 Object 의 관계

// String === String.prototype.constructor: true
console.log('String === String.prototype.constructor: ', String === String.prototype.constructor);

// String.prototype === "Hello World".__proto__: true
console.log('String.prototype === "Hello World".__proto__: ', String.prototype === "Hello World".__proto__);

// Object === String.prototype.__proto__.constructor: true
console.log('Object === String.prototype.__proto__.constructor: ', Object === String.prototype.__proto__.constructor);

// Object.prototype === String.prototype.__proto__: true
console.log('Object.prototype === String.prototype.__proto__: ', Object.prototype === String.prototype.__proto__);

// Object.prototype === "Hello World".__proto__.__proto__: true
console.log('Object.prototype === "Hello World".__proto__.__proto__: ', Object.prototype === "Hello World".__proto__.__proto__);
```

<br />

```javascript
// Array 와 Object 의 관계

// Array === Array.prototype.constructor: true
console.log('Array === Array.prototype.constructor: ', Array === Array.prototype.constructor);

// Array.prototype === [].__proto__: true
console.log('Array.prototype === [].__proto__: ', Array.prototype === [].__proto__);

// Object === Array.prototype.__proto__.constructor: true
console.log('Object === Array.prototype.__proto__.constructor: ', Object === Array.prototype.__proto__.constructor);

// Object.prototype === Array.prototype.__proto__: true
console.log('Object.prototype === Array.prototype.__proto__: ', Object.prototype === Array.prototype.__proto__);

// Object.prototype === [].__proto__.__proto__: true
console.log('Object.prototype === [].__proto__.__proto__: ', Object.prototype === [].__proto__.__proto__);
```

<br />

지금까지 살펴본 `사용자 정의 생성자 함수` 와 `빌트인 생성자 함수` 의 내부슬롯을 정리하면 다음과 같습니다.

* `[[Prototype]]`: 객체(인스턴스) 를 생성한 `생성자 함수` 정보
  * 간접 접근 방법: `인스턴스.__proto__`
* `[[Constructor]]`: 객체(인스턴스) 를 생성한 `생성자 함수`
  * 간접 접근 방법: `인스턴스.__proto__.constructor`
* 모든 생성자 함수의 `prototype.__proto__` 는 `Object.prototype` 을 상속 받음
* 모든 생성자 함수의 `prototype.__proto__.constructor` 는 `Object`



<br /><hr /><br />



# 6. 객체 생성 방식과 프로토타입의 결정

자바스크립트는 다음과 같은 객체 생성 방식이 있습니다.

* 객체 리터럴 (`{ [key: string]: any }`)
* Object 생성자 함수 (`new Object()`)
* 생성자 함수 (`new String('initial value')`)
* `Object.create()` 메서드
* `class`



<br /><hr /><br />



## 6-1. 객체 리터럴에 의해 생성됭 객체의 프로토타입

지금까지 살펴본것과 같이, `객체 리터럴` 방식으로 생성한 객체(인스턴스) 의 프로토타입은 `Object.prototype` 이었습니다.

<br />

```javascript
const obj = {
  myValue: 'Hello World',
};

// obj.__proto__ === Object.prototype: true
console.log('obj.__proto__ === Object.prototype: ', obj.__proto__ === Object.prototype);
```



<br /><hr /><br />



## 6-2. Object 생성자 함수에 의해 생성된 객체의 프로토타입

`객체 리터럴` 로 생성한 객체(인스턴스) 와 `new Object()` 로 생성한 객체(인스턴스) 는 동일한 결과를 만듭니다.

차이점은 `new Object()` 로 객체(인스턴스) 를 만들때는, 먼저 `new Object()` 로 `빈 객체(인스턴스) 를 생성한 후`, `프로퍼티를 추가` 해야 합니다.

<br />

```javascript
const obj = new Object();
obj.myValue = 'Hello World';

// obj.__proto__ === Object.prototype: true
console.log('obj.__proto__ === Object.prototype: ', obj.__proto__ === Object.prototype);
```



<br /><hr /><br />



## 6-3. 생성자 함수에 의해 생성된 객체의 프로토타입

생성자 함수에는 `prototype` 이 존재하였습니다.

`prototype` 에는 `constructor` 프로퍼티가 존재하였고, `constructor` 에는 `생성자 함수` 가 바인딩 되어 있었습니다.

그리고 생성자 함수의 `prototype` 은 객체(인스턴스) 의 `__proto__` 에 바인딩되며, 상속 받는 결과가 됩니다.

<br />

만약 생성자 함수의 `prototype` 에 프로퍼티를 추가한다면, 이 생성자 함수로 생성한 모든 객체(인스턴스) 는 해당 프로퍼티를 사용할 수 있게 됩니다.

<br />

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayGreeting = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const kim = new Person('Kim');
const chocobe = new Person('Chocobe');

// "Hello, I'm Kim"
kim.sayGreeting();

// "Hello, I'm Chocobe"
chocobe.sayGreeting();

// kim.sayGreeting === chocobe.sayGreeting: true
console.log('kim.sayGreeting === chocobe.sayGreeting: ', kim.sayGreeting === chocobe.sayGreeting);
```

<br />

위 코드의 마지막부분을 보면 `kim.sayGreeting` 과 `chocobe.sayGreeting` 이 `동일한 메서드` 임을 알 수 있습니다.

즉, `sayGreeting` 메서드는 `Person` 생성자 함수의 `prototype` 에 딱 한번 정의된 것이므로, 객체(인스턴스) 의 개수와 무관하게 `오직 1개` 만 존재하게 됩니다.