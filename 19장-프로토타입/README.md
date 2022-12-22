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



<br /><hr /><br />



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



<br /><hr /><br />



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
* `[[Construct]]`: 객체(인스턴스) 를 생성한 `생성자 함수`
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



<br /><hr /><br />



# 7. 프로토타입 체인

객체는 `[[Prototype]]` 내부 슬롯을 통해서 `상속` 을 받을 수 있습니다.

아래 코드의 `Person` 생성자 함수에는 `hasOwnProperty()` 메서드를 정의하지 않았지만, `Object` 로 부터 상속받았기 때문에 정상적으로 사용할 수 있습니다.

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Chocobe');
console.log(me.hasOwnProperty('name')); // true
```

<br />

자바스크립트는 객체의 프로퍼티를 찾을 때, 다음과 같은 순서로 동작합니다.

1. 객체 내부에서 프로퍼티를 찾습니다.
2. 없다면, `객체.__proto__ (프로토타입)` 에서 프로퍼티를 찾습니다.
3. 여기에도 없다면, `객체.__proto__.__proto__` 에서 프로퍼티를 찾습니다.
  * `객체.__proto__.__proto__ === Object.prototype`

<br />

위 과정처럼 객체의 프로퍼티를 찾기위해 `프로토타입` 을 순차적으로 거슬러 올라가 프로퍼티를 검색하는 방식을 `프로토타입 체인` 이라고 합니다.

`me.hasOwnProperty()` 메서드가 정의된 곳은 `Object` 입니다.

`Object` 는 모든 객체의 최상위 부모이며, `프로토타입 체인의 종점 (End of Prototype Chain)` 이라고 합니다.

<br />

자바스크립트의 `프로토타입 체인 (Prototype Chain)` 은 객체의 `상속` 과 `프로퍼티 검색` 을 위한 메커니즘 입니다.

<br />

그리고 `프로토타입 체인 (Prototype Chain)` 과 협력 관계인 `스코프 체인 (Scope Chain)` 이 있는데, `스코프 체인 (Scope Chain)` 은 객체, 변수, 함수 와 같은 `식별자 검색` 을 위한 메커니즘 입니다.

정리하면 다음과 같습니다.

`스코프 체인 (Scope Chain)` 에서 `식별자 검색` 을 통해서 식별자를 찾고, 식별자의 프로퍼티에 접근한다면 `프로토타입 체인 (Prototype Chain)` 을 통해서 `프로퍼티 검색` 을 합니다.



<br /><hr /><br />



# 8. 오버라이딩과 프로퍼티 섀도잉

객체를 통해 접근할 수 있는 프로퍼티는 자신의 프로퍼티와 `상속` 받은 `프로토타입` 에 있는 프로퍼티 입니다.

이 프로퍼티를 구분하면 다음과 같습니다.

* 인스턴스가 소유한 프로퍼티: `인스턴스 프로퍼티`
* 프로퍼티가 소유한 프로퍼티: `프로토타입 프로퍼티`

<br />

`프로토타입 프로퍼티` 와 동일한 이름으로 `인스턴스 프로퍼티` 를 추가할 수 있습니다.

이렇게 추가한 프로퍼티에 접근하면, 이전에 살펴본 `프로토타입 체인 (Prototype Chain)` 메커니즘으로 프로퍼티를 검색 합니다.

가장 먼저 검색하는 위치는 `인스턴스` 이며, 여기서 찾고자 하는 프로퍼티를 찾게 됩니다.

이렇게 찾은 프로퍼티는 `프로토타입 프로퍼티` 에도 있지만, `인스턴스 프로퍼티` 에서 찾았으므로, `인스턴스 프로퍼티` 를 참조하게 됩니다.

결과적으로 `프로토타입 프로퍼티` 는 `인스턴스 프로퍼티` 에 의해 `가려지는 현상` 이 나타나며, `오버라이딩 (Overriding)` 이 됩니다.

<br />

이렇게 `인스턴스 프로퍼티` 로 `오버라이딩 (Overring)` 이 되는 현상을 `프로퍼티 섀도잉 (Property Shadowing)` 이라고 합니다.

주의할 점으로 `프로퍼티 섀도잉 (Property Shadowing)` 은 `프로토타입 프로퍼티` 를 덮어 씌우는 것이 아닌, 단지 `프로토타입 프로퍼티` 이름과 동일한 `인스턴스 프로퍼티` 가 추가된 것입니다.

<br />

```javascript
const User = (function() {
  function User(name, age) {
    this.name = name;
    this.age = age;
  }

  User.prototype.sayGreeting = function() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  };

  return User;
}());

const chocobe = new User('Chocobe', 36);
// 프로토타입 프로퍼티의 sayGreeting() 이 호출됩니다.
// "Hello, I'm Chocobe and 36"
chocobe.sayGreeting();

chocobe.sayGreeting = function() {
  console.log(`*** Hello, I'm ${this.name} and ${this.age} ***`);
};
// 인스턴스 프로퍼티의 sayGreeting() 이 호출됩니다.
// "*** Hello, I'm Chocobe and 36 ***"
chocobe.sayGreeting();
```

<br />

위 코드를 통해 `인스턴스` 를 통해서 `프로토타입 체인 (Prototype Chain)` 메커니즘으로 `프로퍼티 검색` 을 확인할 수 있었습니다.

그리고 `프로토타입 프로퍼티` 와 동일한 이름으로 `인스턴스 프로퍼티` 를 추가하면 `프로퍼티 섀도잉 (Property Shadowing)` 이 되었습니다.

만약 프로퍼티를 `변경` 또는 `삭제` 한다면, `인스턴스` 에서는 오직 `인스턴스 프로퍼티` 만 가능 합니다.

`프로토타입 프로퍼티` 를 `변경` 또는 `삭제` 하고자 한다면, `생성자 함수.prototype` 으로 직접 접근하여야 합니다.

<br />

```javascript
const User = (function() {
  function User(name, age) {
    this.name = name;
    this.age = age;
  }

  User.sayGreeting = function() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  };

  return User;
}());

const chocobe = new User('Chocobe', 36);
chocobe.sayGreeting = function() {
  console.log(`*** Hello, I'm ${this.name} and ${this.age}`);
};

// 인스턴스 프로퍼티의 sayGreeting() 이 호출됩니다.
// "*** Hello, I'm Chocobe and 36 ***"
chocobe.sayGreeting();

// 인스턴스 프로퍼티인 sayGreeting 프로퍼티를 삭제 합니다.
delete chocobe.sayGreeting;

// 프로토타입 프로퍼티의 sayGreeting() 이 호출됩니다.
// "Hello, I'm Chocobe and 36"
chocobe.sayGreeting();

// 인스턴스를 통해서 프로토타입 프로퍼티는 변경 or 삭제 할 수 없습니다.
// Error 발생
delete chocobe.sayGreeting;

// 프로토타입 프로퍼티를 삭제하려면 해당 생성자함수의 prototype 에 직접 접근해야 합니다.
delete User.prototype.sayGreeting;

console.log(chocobe.sayGreeting); // undefined
```



<br /><hr /><br />



# 9. 프로토타입의 교체

객체의 프로토타입은 동적으로 변경할 수 있습니다.

이는 객체의 `상속` 을 `동적으로 변경` 할 수 있다는 의미를 가집니다.



<br /><hr /><br />



## 9-1. 생성자 함수에 의한 프로토타입 교체

아래 코드에서 `Person` 생성자 함수는 `prototype` 이 `객체 리터럴` 로 교체 됩니다.

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype = {
    sayGreeting() {
      console.log(`Hello, I'm ${this.name} and ${this.age}`);
    },
  };

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// "Hello, I'm Chocobe and 36"
chocobe.sayGreeting();

// [Function: Object]
console.log('chocobe.constructor: ', chocobe.constructor);
```

<br />

`Person` 생성자 함수의 `prototype` 을 교체한 결과, `Person` 인스턴스의 `constructor` 는 `Object` 가 되었습니다.

교체한 `prototype` 은 `객체 리터럴` 이기 때문에, `constructor` 가 `Person` 이 아닌 `Object` 로 변경된 현상 입니다.

만약 `prototype` 을 변경하면서 기존의 `constructor` 를 그대로 유지하고 싶다면, `constructor` 를 직접 지정해 주면 됩니다.

<br />

```javascript
const Client = (function() {
  function Client(name, email) {
    this.name = name;
    this.email = email;
  }

  Client.prototype = {
    constructor: Client,
    sayHello() {
      console.log(`안녕하세요, 저는 ${this.name} 이고 Email은 ${this.email} 입니다.`);
    },
  };

  return Client;
}());

const kim = new Client('Kim', 'kyw05171@gmail.com');

// "안녕하세요, 저는 Kim 이고 Email 은 kyw05171@gmail.com 입니다."
kim.sayHello();

// "kim.constructor: [Function: Client]"
console.log(`kim.constructor: ${kim.constructor}`);
```



<br /><hr /><br />



## 9-2. 인스턴스에 의한 프로토타입의 교체

객체의 프로토타입은 `객체.__proto__` 또는 `Object.getPrototypeOf(객체)` 를 통해서 얻을 수 있습니다.

그리고 객체의 프로토타입을 임의로 교체할 수도 있습니다.

* `객체.__proto__ = { /* new prototype */ }`
* `Object.setPrototypeOf(객체, { /* new prototype */ })`

<br />

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

Object.setPrototypeOf(chocobe, {
  sayGreeting() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  },
});

// "Hello, I'm Chocobe and 36"
chocobe.sayGreeting();

// "chocobe.constructor: [Function: Object]"
console.log('chocobe.constructor: ', chocobe.constructor);
```

<br />

인스턴스의 `프로토타입 교체` 역시 `constructor` 를 명시하지 않았다면, `Object` 를 생성자 함수로 갖게 됩니다.

아래의 코드는 변질된 `constructor` 를 원래의 생성자 함수로 명시해 줍니다.

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const kim = new Person('Kim', 20);

Object.setPrototype(kim, {
  constructor: Person,
  sayHello() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  },
});

// "Hello, I'm Kim and 20"
kim.sayHello();

// "kim.constructor: [Function: Person]"
console.log('kim.constructor: ', kim.constructor);
```

<br />

인스턴스의 `프로토타입` 도 새로운 객체로 교체할 수 있었습니다.

하지만 이렇게 인스턴스의 `프로토타입` 을 교체하는 것은 구현의 번거로움과 코드 복잡성을 올리기 때문에, 가급적 사용하지 않는 것을 권장 합니다.



<br /><hr /><br />



# 10. instanceof 연산자

`instanceof` 연산자는 `prototype` 을 검사하는 이항 연산자 입니다.

`instanceof` 를 기준으로 좌변에는 `객체`, 우변에는 `생성자 함수` 를 위치 시킵니다.

우변에 위치한 생성자 함수의 `prototype` 이 좌변 객체의 `__proto__` 와 동일한지를 `프로토타입 체이닝 (Prototype Chaining)` 으로 대조하며, 동일한 경우가 있다면 `true` 를 반환 합니다.

<br />

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// "chocobe instanceof Person: true"
console.log('chocobe instanceof Person: ', chocobe instanceof Person);
```

<br />

주의할 점은 `instanceof` 연산자의 기능이 특정 객체의 `constructor` 를 검사하는 것이 아닌, `[[Prototype]]` 을 검사하는 부분 입니다.

`instanceof` 연산자는 아래의 코드처럼 재귀 형식으로 `[[Prototype]]` 을 검사하도록 구현되어 있습니다.

<br />

```javascript
const isInstanceof = (instance, constructor) => {
  const prototype = Object.getPrototypeOf(instance);

  if (prototype === null) return false;

  return prototype === constructor.prototype ||
    isInstanceof(prototype, constructor);
};

const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// chocobe instanceof Person: true
console.log('chocobe instanceof Person: ', chocobe instanceof Person);

// "isInstanceof(chocobe, Person): true"
console.log('isInstanceof(chocobe, Person): ', isInstanceof(chocobe, Person));

// "isInstanceof(chocobe, Object): true"
console.log('isInstanceof(chocobe, Object): ', isInstanceof(chocobe, Object));

// "isInstanceof(chocobe, Array): false"
console.log('isInstanceof(chocobe, Array): ', isInstanceof(chocobe, Array));
```



<br /><hr /><br />



# 11. 직접 상속

## 11-1. Object.create 에 의한 직접 상속

`Object.create` 메서드는 객체를 생성하되, `prototype` 을 명시적으로 지정하여 생성하는 기능을 가집니다.

객체를 생성하면서 적용할 `프로토타입` 을 직접 지정하므로, 직접 상속으로 객체를 생성하게 됩니다.

<br />

`Object.create` 메서드의 프로퍼티는 다음과 같습니다.

* 첫번째 인자: 생성할 객체의 `프로토타입` 으로 지정할 객체
* 두번째 인자: 생성할 객체의 `키: PropertyDescriptor객체` 로 구성된 객쳋

<br />

아래 코드는 `Object.create()` 를 사용하여 객체를 생성 합니다.

```javascript
// obj 의 프로토타입 체인 종점은 null 이 됩니다.
let obj = Object.create(null);

// "Object.getPrototypeOf(obj): null"
console.log('Object.getPrototypeOf(obj): ', Object.getPrototypeOf(obj));



// obj 의 프로토타입은 Object.prototype 이 됩니다.
obj = Object.create(Object.prototype);

// obj = {} 과 동일한 결과가 됩니다.
console.log('Object.getPrototypeOf(obj) === Object.prototype: ', Object.getPrototypeOf(obj) === Object.prototype);



// obj = { myValue: 3 } 과 동일한 결과가 됩니다.
obj = Object.create(Object.prototype, {
  myValue: {
    value: 3,
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

// "obj.myValue: 3"
console.log('obj.myValue: ', obj.myValue);

// "Object.getPrototypeOf(obj) === Object.prototype: true"
console.log('Object.getPrototypeOf(obj) === Object.prototype: ', Object.getPrototypeOf(obj) === Object.prototype);



// myObj 의 [[Prototype]] 은 myObj 가 됩니다.
const myObj = {
  someValue: 123,
};
obj = Object.create(myObj);

// "obj.someValue: 123"
console.log('obj.someValue: ', obj.someValue);

// "Object.getPrototypeOf(obj) === myObj: true"
console.log('Object.getPrototypeOf(obj) === myObj: ', Object.getPrototypeOf(obj) === myObj);



// obj 의 [[Prototype]] 은 Person.prototype 이 됩니다.
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

obj = Object.create(Person.prototype);
obj.name = 'Chocobe';
obj.age = 36;

//"obj.name: Chocobe"
console.log('obj.name: ', obj.name);

// "Object.getPrototypeOf(obj) === Person.prototype: true"
console.log('Object.getPrototypeOf(obj) === Person.prototype: ', Object.getPrototypeOf(obj) === Person.prototype);
```

<br />

`ESLint` 에서는 `Object.prototype.빌트인_메서드` 를 특정 객체가 직접 호출하는 것을 권장하지 않습니다.

이유는 `Object.create()` 처럼 객체의 `프로토타입` 에 `Object.prototype` 이 아닌 경우에는 에러를 발생시키기 때문 입니다.

만약 `Object.prototype.빌트인_메서드` 를 사용할 경우에는 다음과 같이 `call()` 을 사용한 간접 호출을 권장 합니다.

<br />

```javascript
const obj = Object.create(null);
obj.myValue = 3;

// "Object.prototype.hasOwnProperty.call(obj, 'myValue'): true"
console.log('Object.prototype.hasOwnProperty.call(obj, "myValue"): ', Object.prototype.hasOwnProperty.call(obj, 'myValue'));
```



<br /><hr /><br />



## 11-2. 객체 리터럴 내부에서 __proto__ 에 의한 직접 상속

객체의 직접 상속을 하기 위해, `Object.create()` 를 살펴 보았습니다.

`Object.create()` 으로 객체를 생성할 경우, 생성할 객체의 프로퍼티를 정의하는 부분에서 번거로움이 많습니다.

* `Object.create()` 의 `두번째 인자` 로 넘겨주는 `PropertyDescriptor` 로 정의 방식

<br />

그래서 ES6 에 추가된 `객체 리터럴 내부의 __proto__ 프로퍼티` 를 통해 직접 상속을 사용하면, `Object.create()` 의 번거로움을 해소할 수 있습니다.

<br />

```javascript
const Vector = (function() {
  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }

  return Vector;
}());

const myVector = new Vector(11, 22);

const box = {
  width: 300,
  height: 400,

  __proto__: myVector,
};

// "box.x: 11"
console.log('box.x: ', box.x);

// "box.y: 22"
console.log('box.y: ', box.y);

// "box.width: 300"
console.log('box.width: ', box.width);

// "box.height: 400"
console.log('box.height: ', box.height);

// "Object.getPrototypeOf(box) === myVector: true"
console.log('Object.getPrototypeOf(box) === myVector: ', Object.getPrototypeOf(box) === myVector);

// "box instanceof Vector: true"
console.log('box instanceof Vector: ', box instanceof Vector);

// "box instanceof Object: true"
console.log('box instanceof Object: ', box instanceof Object);
```



<br /><hr /><br />



# 12. 정적 프로퍼티/메서드

상속을 구현할 때, 생성자 함수의 `prototype` 에 프로퍼티/메서드를 정의 하였습니다.

이렇게 정의한 프로퍼티/메서드는 생성자 함수로 생성한 객체를 통해 접근할 수 있습니다.

<br />

만약 생성자 함수가 소유한 프로퍼티/메서드를 정의하게 되면, 생성자 함수를 통해서 직접 호출해서 사용하는 `정적 프로퍼티/메서드` 가 됩니다.

`정적 프로퍼티/메서드` 는 생성자 함수가 소유하기 때문에, 생성자 함수가 생성한 객체를 통해서는 접근할 수 없다는 특징이 있습니다.

<br />

만약 생성자 함수의 `prototype` 에 정의한 메서드 내부에서 `this` 를 사용하지 않는다면, 이 메서드는 `정적 프로퍼티/메서드` 로 변경할 수 있습니다.

<br />

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;

    // 인스턴스 메서드
    this.sayHello = function() {
      console.log(`Hello, I'm ${this.name} and ${this.age}`);
    };
  }

  // 정적 메서드
  Person.staticSayHello = function() {
    console.log('[static] Hello!');
  };

  return Person;
}());

// "[static] Hello!"
Person.staticSayHello();

const chocobe = new Person('Chocobe', 36);

// "Hello, I'm Chocobe and 36"
chocobe.sayHello();
```



<br /><hr /><br />



# 13. 프로퍼티 존재 확인

## 13-1. in 연산자

`in` 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인하는 연산자 입니다.

주의할 점은 `프로토타입 채인 (Prototype Chain)` 전체를 검사하기 때문에, 객체가 상속받은 프로퍼티까지 검사 대상이 된다는 부분 입니다.

<br />

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// '"name" in chocobe: true'
console.log('"name" in chocobe: ', 'name' in chocobe);

// '"age" in chocobe: true'
console.log('"age" in chocobe: ', 'age' in chocobe);

// '"address" in chocobe: false'
console.log('"address" in chocobe: ', 'address' in chocobe);

// '"toString" in chocobe: true'
console.log('"toString" in chocobe: ', 'toString' in chocobe);

// "Reflect.has(chocobe, 'name'): true"
console.log("Reflect.has(chocobe, 'name'): ", Reflect.has(chocobe, 'name'));

// "Reflect.has(chocobe, 'age'): true"
console.log('Reflect.has(chocobe, "age"): ', Reflect.has(chocobe, 'age'));

// "Reflect.has(chocobe, 'address'): false"
console.log('Reflect.has(chocobe, "address"): ', Reflect.has(chocobe, 'address'));

// "Reflect.has(chocobe, 'toString'): true"
console.log('Reflect.has(chocobe, "toString"): ', Reflect.has(chocobe, 'toString'));
```



<br /><hr /><br />



## 13-2. Object.prototype.hasOwnProperty 메서드

`Object.prototype.hasOwnProperty()` 메서드를 통해서도 프로퍼티가 존재하는지 확인할 수 있습니다.

`in 연산자` 와는 다르게, 객체 고유의 프로퍼티일 경우에만 `true` 를 반환하고, 없는 프로퍼티거나 상속받은 프로퍼티일 경우에는 `false` 를 반환 합니다.

<br />

```javascript
const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// "Object.prototype.hasOwnProperty.call(chocobe, 'name'): true"
console.log('Object.prototype.hasOwnProperty.call(chocobe, "name"): ', Object.prototype.hasOwnProperty.call(chocobe, 'name'));

// "Object.prototype.hasOwnProperty.call(chocobe, 'age'): true"
console.log('Object.prototype.hasOwnProperty.call(chocobe, "age"): ', Object.prototype.hasOwnProperty.call(chocobe, 'age'));

// "Object.prototype.hasOwnProperty.call(chocobe, 'toString'): false"
console.log('Object.prototype.hasOwnProperty.call(chocobe, "toString"): ', Object.prototype.hasOwnProperty.call(chocobe, 'toString'));
```



<br /><hr /><br />



# 14. 프로퍼티 열거

## 14-1. for ... in 문

`for ... in 문` 은 객체의 모든 프로퍼티를 순회하면서 `열거 (Enumeration)` 합니다.

`in 연산자` 처럼 객체가 `상속받은 모든 프로퍼티를 포함` 하는 특징이 있습니다.

즉, `프로토타입 체이닝 (Prototype Chaining)` 의 종점까지 모든 프로퍼티가 대상이 됩니다.

<br />

다만, `프로퍼티 어트리뷰트 (Property Attribute)` 중 `[[Enumerable]]: true` 인 프로퍼티만 열거 대상이 됩니다.

예를 들어, `Object.prototype.toString` 메서드는 `[[Enumerable]]: false` 이기 때문에 `for ... in 문` 의 열거에는 제외됩니다.

<br />

```javascript
// for ... in 문으로 순회 시, 프로토타입의 프로퍼티도 열거 대상이 됩니다.
const chocobe = {
  name: 'Chocobe',
  age: 36,

  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

for (const key in chocobe) {
  console.log(`key: "${key}"`);
}
// "name"
// "age"
// "email"
```

<br />

만약 객체 자체의 프로퍼티만 열거하고 싶다면, `Object.prototype.hasOwnProperty()` 메서드로 확인하여야 합니다.

```javascript
const chocobe = {
  name: 'Chocobe',
  age: 36,

  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

for (const key in chocobe) {
  if (Object.prototype.hasOwnProperty.call(chocobe, key)) {
    console.log(`객체 자체의 프로퍼티 키: "${key}"`);
  }
}
// "name"
// "age"
```

<br />

객체의 프로퍼티는 `프로퍼티 어트리뷰트` 를 가집니다.

`프로퍼티 어트리뷰트` 중 `[[Enumerable]]: false` 인 프로퍼티는 `for ... in 문` 의 열거 대상에서 제외 됩니다.

<br />

```javascript
const kim = {
  name: 'Kim',
  age: 36,

  __proto__: Object.defineProperty({}, 'email', {
    value: 'kyw05171@gmail.com',
    writable: true,
    enumerable: false,
    configurable: true,
  }),
};

for (const key in kim) {
  console.log(`key: "${key}"`);
}
// "name"
// "age"
```

<br />

객체의 프로퍼티 키가 `Symbol` 인 경우도, 열거에서 제외 됩니다.

<br />

```javascript
const symbolKey = Symbol();

const lucidMoon = {
  name: 'Lucid Moon',
  age: 36,

  [symbolKey]: 'value of Symbol key',
};

for (const key in lucidMoon) {
  console.log(`key: "${key}"`);
}
// "name"
// "age"
```

<br />

지금까지 살펴본 `for ... in 문` 은 열거할 때, 프로퍼티의 순서는 보장하지 않습니다.

그리고 `배열` 도 객체이므로 `for ... in 문` 으로 열거할 수 있지만, 사용을 권장하지는 않습니다.

대신 `for 문` 이나 `for ... of 문` 을 권장 합니다.



<br /><hr /><br />



## 14-2. Object.keys/values/entities 메서드

`for ... in 문` 으로 객체의 프로퍼티를 열거할 경우, 객체 자신의 고유한 프로퍼티만을 열거하기 위한 추가적인 처리가 필요 하였습니다.

* `Object.prototype.hasOwnProperty()` 검사

<br />

만약 상속받은 프로퍼티가 아닌, 객체 자신의 고유한 프로퍼티만을 열거하고 싶다면, 아래의 메서드 사용을 권장 합니다.

* `Object.keys(객체)`: 객체 자신의 고유 프로퍼티 이름을 열거
* `Object.values(객체)`: 객체 자신의 고유 프로퍼티에 속하는 값을 열거
* `Object.entries(객체)`: 객체 자신의 고유 프로퍼티에 속하는 `[키, 값]` 순서쌍을 열거

<br />

```javascript
// Object.keys(객체)
// : 객체 자신의 고유 프로퍼티 이름을 열거 합니다.

const chocobe = {
  name: 'Chocobe',
  age: 36,

  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

// "Object.keys(chocobe): ['name', 'age']"
console.log('Object.keys(chocobe): ', Object.keys(chocobe));
```

<br />

```javascript
// Object.values(객체)
// : 객체 자신의 고유 프로퍼티에 속하는 값을 열거 합니다.

const kim = {
  name: 'Kim',
  age: 36,

  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

// "Object.values(kim): ['Kim', 36]"
console.log('Object.values(kim): ', Object.values(kim));
```

<br />

```javascript
// Object.entries(객체)
// : 객체 자신의 고유 프로퍼티에 속하는 [키, 값] 순서쌍을 열거 합니다.

const lucidMoon = {
  name: 'Lucid Moon',
  age: 36,
  
  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

// "Object.entries(lucidMoon): [['name', 'Lucid Moon'], ['age', 36]]"
console.log('Object.entries(lucidMoon): ', Object.entries(lucidMoon));
```
