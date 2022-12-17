# 18장. 함수와 일급 객체

# 1. 일급 객체

`값` 으로 `평가` 되는 요소를 `일급 객체` 라고 합니다.

자바스크립트의 `함수` 도 값으로 사용 가능하기 때문에 `일급 객체` 입니다.

<br />

그리고 함수는 일반 객체에는 없는 공유한 프로퍼티를 소유합니다.


<br /><hr /><br />



# 2. 함수 객체의 프로퍼티

자바스크립트의 `함수` 는 `객체` 입니다.

그래서 `객체` 가 가지는 모든 `프로퍼티` 를 가집니다.

여기에 추가로 함수는 `추가 프로퍼티` 를 가집니다.

<br />

이는 `Object.getOwnPropertyDescriptors()` 로 확인할 수 있습니다.

```javascript
function Box(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

const descriptors = Object.getOwnPropertyDescriptors(Box);
console.log(descriptors);
// { length: {...}, name: {...}, arguments: {...}, caller: {...}, prototype: {...} }
```

<br />

여기서 중요한 점은 `Descriptor` 중, `prototype` 은 `Object.prototype` 객체의 프로퍼티를 상속받은 것 입니다.



<br /><hr /><br />



## 2-1. arguments 프로퍼티

함수 객체에는 `arguments` 프로퍼티가 있습니다.

`arguments` 프로퍼티에는 함수를 호출할 때 넘겨 주었던, `모든 인수 (argument)` 가 담겨 있습닌다.

이는 함수 정의에서 명시했던 `인자 (Parameter)` 를 초과한 값들도 암묵적으로 모두 보관하는 특징이 있습니다.

그러므로, 함수 객체의 `arguments` 는 `함수 스코프` 의 `지역 변수` 로 사용할 수 있습니다.

```javascript
function add (lhs, rhs) {
  console.log(arguments);
  return lhs + rhs;
}

console.log(add(1, 2));
// [Arguments] { 0: 1, 1: 2}
// 3

console.log(add(100, 200, 300));
// [Arguments] { 0: 100, 1: 200, 2: 300 }
// 300
```

<br />

함수의 `arguments` 는 `유사 배열 (like-array)` 이며, 각 `key값` 은 전달받은 `인수 (argument)` 의 순서를 의미 합니다.

<br />

`arguments` 처럼 `가변 인자 함수` 를 구현하고자 한다면, `ES6` 에 도입된 `Rest 파라미터` 를 사용해도 동일한 결과를 얻을 수 있습니다.

```javascript
function add(...args) {
  console.log(args);
  return args.reduce((total, value) => {
    return total + value;
  }, 0);
}

console.log(add(1, 2, 3, 4, 5));
// [Arguments]: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }
// 15
```



## 2-2. caller 프로퍼티

함수 객체의 프로퍼티 중, `caller` 프로퍼티는 함수 자신을 호출한 `상위 스코프 함수` 를 가리킵니다.

`caller` 프로퍼티는 `비표준 프로퍼티` 이므로, 사용하지 않는것이 좋습니다.



<br /><hr /><br />



## 2-3. length 프로퍼티

함수 객체의 `length` 프로퍼티는 함수를 정의할 때 `선언한 매개변수(parameter) 개수` 입니다.

이는 `arguments.length` 와는 다르므로, 정확한 의도를 가지고 사용해야 합니다.

* 함수 객체의 `length` 프로퍼티: 함수 정의에 선언한 매개변수 개수
* 함수 객체의 `arguments.length`: 함수 호출 시, 넘겨준 실제 `인수(arguments) 개수`



<br /><hr /><br />



## 2-4. name 프로퍼티

함수 객체의 이름을 나타냅니다.

이는 `기명 함수` 일 경우에만 해당하며, `무명 함수` 에서는 `anonymousFunc` 가 들어 있습니다.



<br /><hr /><br />



## 2-5. __proto__ 접근자 프로퍼티

자바스크립트의 모든 객체는 `[[Prototype]]` 내부 슬롯을 가집니다.

내부 슬롯이므로 직접 접근은 불가능 하지만, `__proto__ 접근자 프로퍼티` 를 통해서 접근할 수 있습니다.

만약 객체에 특정 프로퍼티가 있는지 확인하고 싶다면, `객체.hasOwnProperty('키값')` 으로 확인할 수 있습니다.

주의할 점은 상속받은 프로퍼티는 `hasOwnProperty()` 에서 `false` 를 반환합니다.

* `__proto__` 역시 상속받은 프로퍼티 이므로, `hasOwnProperty('__proto__')` 를 호출하면 `false` 를 반환 합니다.

```javascript
function myFunction() {
  console.log(__proto__);
}
myFunction(); // {}
console.log(myFunction.hasOwnProperty("hello")); // false

myFunction.hello = "Hello World";
console.log(myFunction.hasOwnProperty("hello")); // true

const myObject = {
  myValue: "Hello, My Value",
};
console.log(myObject.hasOwnProperty("myValue")); // true
console.log(myObject.hasOwnProperty("__proto__")); // false
```


<br /><hr /><br />



## 2-6. prototype 프로퍼티

오직 `생성자 함수` 만 소유하는 프로퍼티 입니다.

`일반 객체` 와 `non-constructor` 함수에서는 `prototype` 프로퍼티가 없습니다.

<br />

```javascript
function Box(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
console.log(Box.prototype); // {}
console.log(Box.hasOwnProperty("prototype")); // true;

const Box2 = (x, y, width, height) => {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};
console.log(Box2.hasOwnProperty("prototype")); // false

const myObject = {
  myValue: "Hello World",
};
console.log(myObject.hasOwnProperty("prototype")); // false
```
