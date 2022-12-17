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



## 3-2. 