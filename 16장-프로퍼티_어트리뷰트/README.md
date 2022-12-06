# 16장. 프로퍼티 어트리뷰트

# 1. 내부 슬롯과 내부 메서드

`내부 슬롯` 과 `내부 메서드` 는 자바스크립트 엔진의 내부 로직 입니다.

이는 직접 호출할 수는 없지만, `__proto__` 프로퍼티 처럼 간접적으로 접근할 수 있는 방법은 제공합니다.



<br /><hr /><br />



# 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

객체는 프로퍼티와 값으로 구성되어 있습니다.

각 프로퍼티에는 자바스크립트 엔진이 관리하는 여러 상태값이 있는데, 이 상태값들을 `프로퍼티 어트리뷰트` 라고 합니다.

`프로퍼티 어트리뷰트` 의 표기법은 다음과 같습니다.

```bash
[[프로퍼티 어트리뷰트 명]]
```

<br />

`프로퍼티 어트리뷰트` 에 속하는 요소는 다음과 같습니다.

* `value`: 프로퍼티 값
* `writabale`: 값 갱신 여부
* `enumerable`: 열거 가능 여부
* `configurable`: 재정의 가능 여부

<br />

`프로퍼티 어트리뷰트` 도 `내부 슬롯` 이기 때문에 직접 접근할 수는 없지만, `Object.getOwnPropertyDescriptor()` 메서드를 사용하여 간접적으로 확인할 수 있습니다.

* `Object.getOwnPropertyDescriptor()` 반환 객체 타입: `PropertyDescriptor`

<br />

```javascript
const user = {
  name: "Chocobe",
  age: 36,
};

console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);
// { value: 'Chocobe', writable: true, enumerable: true, configurable: true }

console.log(
  Object.getOwnPropertyDescriptor(user, "age")
);
// { value: 36, writable: true, enumerable: true, configurable: true }

console.log(
  Object.getOwnPropertyDescriptors(user)
);
// { 
//   name: { value: 'Chocobe', writable: true, enumerable: true, configurable: true },
//   age: { value: 36, writable: true, enumerable: true, configurable: true }
// }
```



<br /><hr /><br />



# 3. 데이터 프로퍼티와 접근자 프로퍼티

객체의 프로퍼티는 두가지로 구분할 수 있습니다.

* `데이터 프로퍼티 (Data Property)`
  * `key` 와 `value` 쌍으로 구성된 일반적인 프로퍼티 입니다.

* `접근자 프로퍼티 (Accessor Property)`
  * `접근자 함수(Accessor Function)` 으로 구성된 프로퍼티 입니다.
    * `접근자 함수` 는 자체적으로 값을 가지지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 함수 입니다.



<br /><hr /><br />



## 3-1. 데이터 프로퍼티

`데이터 프로퍼티 (Data Property)` 는 다음과 같은 `프로퍼티 어트리뷰트` 를 갖습니다.

* `[[Value]]`
  * 객체에 `프로퍼티 키` 로 접근할 때 반환되는 `(할당한) 값` 입니다.

* `[[Writable]]`
  * 프로퍼티 값을 변경할 수 있는지 여부를 나타냅니다.
  * `false` 라면, 이 프로퍼티는 `읽기전용 (read only)` 입니다.

* `[[Enumerable]]`
  * 이 프로퍼티가 `열거의 대상` 인지를 나타냅니다.
  * `false` 라면, `for ... in` 이나 `Object.keys()`, `Object.values()` 등의 열거 메서드에서 제외 됩니다.

* `[[Configurable]]`
  * 이 프로퍼티의 재정의 가능 여부를 나타냅니다.
  * `false` 라면, `프로퍼티 삭제` 와 `프로퍼티 어트리뷰트 변경` 이 금지 됩니다.
  * 만약 `[[Writable]]` 이 `true` 라면, `[[Value]]` 변경과 `[[Writable]]` 을 `false` 로 바꾸는 것은 가능합니다.

<br />

`Object.getOwnPropertyDescriptor()` 를 사용하여, `데이터 프로퍼티` 와 매칭을 시켜보면 다음과 같습니다.

```javascript
const user = {
  name: "Chocobe",
  age: 36,
};

const namePropertyDescriptor = Object.getOwnPropertyDescriptor(user, "name");
/**
 * [[Value]]: "Chocobe"
 * [[Writable]]: true
 * [[Enumerable]]: true
 * [[Configurable]]: true
 */
```

<br />

위에서 살펴본 것처럼 `데이터 프로퍼티` 의 `프로퍼티 어트리뷰트` 의 기본값은 다음과 같습니다.

* `[[Value]]`: 프로퍼티에 할당한 값
* `[[Writable]]`: `true`
* `[[Enumerable]]`: `true`
* `[[Configurable]]`: `true`

<br />

그리고 객체에 `동적` 으로 추가한 프로퍼티도, 위와 같은 값으로 초기화 됩니다.

```javascript
const user = {
  name: "Chocobe",
  age: 36,
};

user.job = "FrontEnd Dev";

const jobPropertyDescriptor = Object.getOwnPropertyDescriptor(user, "job");
/**
 * [[Value]]: "FrontEnd Dev"
 * [[Writable]]: true
 * [[Enumerable]]: true
 * [[Configurable]]: true
 */
```



<br /><hr /><br />



## 3-2. 접근자 프로퍼티

`접근자 프로퍼틴 (Accessor Property)` 는 자체적인 값을 갖지 않습니다.

대신 `다른 데이터 프로퍼티의 값` 을 읽거나 저장할 수 있는 `접근자 함수 (Accessor Function)` 으로 구정되어 있습니다.

<br />

`접근자 함수` 는 `get` 과 `set` 이 있으며, 각각의 `프로퍼티 어트리뷰트` 는 `[[Get]]` 과 `[[Set]]` 입니다.

`접근자 함수` 를 통해 값을 참조하게 되면, `[[Get]]` 에 정의한 함수의 `반환값` 이 참조값으로 나오고, 값을 저장(할당) 하게 되면 `[[Set]]` 에 정의한 함수가 호출됩니다.

<br />

`접근자 함수` 는 객체의 프로퍼티 앞에 `get` 또는 `set` 을 추가하여 정의할 수 있습니다.

```javascript
const user = {
  firstName: "Kim",
  lastName: "Chocobe",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(fullName) {
    [this.firstName, this.lastName] = fullName.split(" ");
  }
};

// "Kim Chocobe"
console.log(user.fullName);

user.fullName("Hello World");

// "Hello World"
console.log(user.fullName);

// "Hello"
console.log(user.firstName);

// "World"
console.log(user.lastName);
```

<br />

`데이터 프로퍼티` 와 `접근자 프로퍼티` 는 `프로퍼티 어트리뷰트` 의 구조가 다릅니다.

|데이터 프로퍼티|접근자 프로퍼티|
|---|---|
|`[[Value]]`|`[[Get]]`|
|`[[Writable]]`|`[[Set]]`|
|`[[Enumerable]]`|`[[Enumerable]]`|
|`[[Configurable]]`|`[[Configurable]]`|
