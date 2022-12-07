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



<br /><hr /><br />



# 4. 프로퍼티 정의

`프로퍼티 정의` 란, 새로운 프로퍼티를 정의하거나, 기존의 프로퍼티를 재정의하는 것을 말합니다.

`Object.defineProperty()` 메서드를 사용하여 `프로퍼티 정의` 를 할 수 있습니다.

<br />

```javascript
const user = {};

Object.defineProperty(user, "firstName", {
  value: "Kim",
  writable: true,
  enumerable: true,
  configurable: true,
});
console.log(Object.getOwnPropertyDescriptor(user, "firstName"));
// { value: "Kim", writable: true, enumerable: true, configurable: true }

Object.defineProperty(user, "lastName", {
  value: "Chocobe",
});
console.log(Object.getOwnPropertyDescriptor(user, "lastName"));
// { value: "Chocobe", writable: false, enumerable: false, configurable: false }

// lastName 프로퍼티의 [[Configurable]] 은 false 이므로, 프로퍼티 삭제 키워드인 delete 는 무시 됩니다.
delete user.lastName;

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.firstName} ${lastName}`;
  },

  set(fullName) {
    // lastName 의 [[Writable]] 은 false 이므로, 할당 연산자는 무시 됩니다.
    [this.firstName, this.lastName] = fullName.split(" ");
  },

  enumerable: false,
  configurable: false,
});
console.log(user.fullName); // "Kim Chocobe";

user.fullName = "Hello World";
console.log(user.fullName); // "Hello Chocobe";
```

<br />

복수의 프로퍼티 정의를 한번에 하고자 한다면, `Object.defineProperties()` 를 사용할 수 있습니다.

<br />

```javascript
const client = {};

Object.defineProperties(client, {
  firstName: {
    value: "Lucid",
    writable: true,
    enumerable: true,
    configurable: true,
  },

  lastName: {
    value: "Moon",
  },

  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },

    set(fullName) {
      [this.firstName, this.lastName] = fullName.split(" ");
    },

    enumerable: true,
    configurable: true,
  },
});
console.log(client);
// { firstName: "Lucid", fullName: [Getter/Setter] }

console.log(client.fullName); // "Lucid Moon"
```



<br /><hr /><br />



# 5. 객체 변경 방지

객체는 재할당 없이, 특정 프로퍼티를 대상으로 `수정`, `삭제` 가 가능하고, 프로퍼티의 `추가`, `삭제` 도 가능 합니다.

자바스크립트에는 객체를 변경하지 못하도록 방지하는 메서드를 제공합니다.

|구분|메서드|프로퍼티 `추가`|프로퍼티 `삭제`|프로퍼티 `값 읽기`|프로퍼티 `값 쓰기`|`프로퍼티 어트리뷰트 재정의`|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|객체 확장 금지|`Object.preventExtensions`|❌|⭕|⭕|⭕|⭕|
|객체 밀봉|`Object.seal`|❌|❌|⭕|⭕|❌|
|객체 동결|`Object.freeze`|❌|❌|⭕|❌|❌|



<br /><hr /><br />



## 5-1. 객체 확장 금지 (`Object.preventExtensions`)

객체의 확장을 금지 시키는 메서드 입니다.

`Object.preventExtensions` 를 적용한 객체에는 `프로퍼티` 를 `추가` 할 수 없게 됩니다.

이는 `프로퍼티 동적 추가` 나 `ObJect.defineProperty()` 모두 금지되는 것 입니다.

<br />

만약 특정 객체의 확장 가능 여부를 알고 싶다면, `Object.isExtensible()` 로 알 수 있습니다.

<br />

```javascript
const user = {
  name: "Kim",
};
console.log(Object.isExtensible(user)); // true

Object.preventExtensions(user);
console.log(Object.isExtensible(user)); // false

// user 는 `객체 확장 금지` 이므로, `동적 프로퍼티 추가` 를 무시 합니다.
user.email = "kyw05171@gmail.com";
console.log(user); // { name: "Kim" }

delete user.name;
console.log(user); // {}

// TypeError 발생
Object.defineProperty(user, "phone", {
  value: "123-1234-5678",
  writable: true,
  enumerable: true,
  configurable: true,
});
```



<br /><hr /><br />



## 5-2. 객체 밀봉 (`Object.seal`)

`Object.preventExtensions (객체 확장 금지)` 에서 좀 더 강하게 객체의 변경을 금지하는 방법 입니다.

`Object.seal` 메서드를 통해 적용할 수 있으며, 프로퍼티의 값을 `읽기` 와 `쓰기` 만 가능해 집니다.

<br />

객체가 밀봉 상태인지 알고자 한다면, `Object.isSealed()` 로 알 수 있습니다.

그리고 밀봉된 객체의 모든 프로퍼티는, `프로퍼티 어트리뷰트` 중 `[[Configurable]]` 이 `false` 가 됩니다.

<br />

```javascript
const user = {
  name: "Kim",
};
console.log(Object.isSealed(user)); // false

Object.seal(user);
console.log(Object.isSealed(user)); // true

user.name = "Chocobe";
console.log(user); // { name: "Chocobe" }

// `동적 프로퍼티 추가` 는 무시 됩니다.
user.phone = "123-1234-5678";
console.log(user); // { name: "Chocobe" }

// `프로퍼티 삭제` 도 무시 됩니다.
delete user.name;
console.log(user); // { name: "Chocobe" }

// TypeError 발생
Object.defineProperty(user, "email", {
  value: "kyw05171@gmail.com",
  writable: true,
  enumerable: true,
  configurable: true,
});
```



<br /><hr /><br />



## 5-3. 객체 동결 (`Object.freeze`)

가장 강하게 객체의 변경을 금지하는 방법 입니다.

`Object.freeze` 로 객체를 동결시킬 수 있으며, 동결된 객체는 프로퍼티의 값을 `읽기` 만 가능 합니다.

<br />

만약 객체의 동결 여부를 알고 싶다면, `Object.isFrozon()` 으로 알 수 있습니다.

동결된 객체의 모든 프로퍼티는, `프로퍼티 어트리뷰트` 중 `[[Writable]]` 과 `[[Configurable]]` 이 `false` 가 됩니다.

<br />

```javascript
const user = {
  name: "Kim",
};
console.log(Object.isFrozen(user)); // false

Object.freeze(user);
console.log(Object.isFrozen(user)); // true

// 프로퍼티 `값 변경` 은 무시 됩니다.
user.name = "Chocobe";
console.log(user); // { name: "Kim" }

// `동적 프로퍼티 추가` 는 무시 됩니다.
user.phone = "123-1234-5678";
console.log(user); // { name: "Kim" }

// `프로퍼티 삭제` 도 무시 됩니다.
delete user.name;
console.log(user); // { name: "Kim" }

// TypeError 발생
Object.defineProperty(user, "email", {
  value: "kyw05171@gmail.com",
  writable: true,
  enumerable: true,
  configurable: true,
});
```



<br /><hr /><br />



## 5-4. 불변 객체

자바스크립트에서 제공하는 `객체 변경 방지` 메서드 들은 모두 `얕은 변경 방지` 입니다.

중첩 객체 전체에 변경 방지를 적용하기 위해서는, 직접 구현해야 합니다.