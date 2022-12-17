# 17장. 생성자 함수에 의한 객체 생성

# 1. Object 생성자 함수

`new Object()` 를 사용하여 빈 객체를 생성할 수 있습니다.

이 방법은 객체 리터럴 방식으로 생성하는 방법과 동일한 결과를 만듭니다.

그래서 특별한 이유가 없다면, 유용한 방법은 아닙니다.



<br /><hr /><br />



# 2. 생성자 함수

## 2-1. 객체 리터럴에 의한 객체 생성 방식의 문제점

`객체 리터럴` 에 의해 객체를 생성하는 경우, 동일한 프로퍼티와 메서드를 가진 객체를 생성할 때마다, 동일한 정의를 해야하는 문제가 있습니다.

```javascript
const box1 = {
  x: 0,
  y: 0,
  width: 100,
  height: 200,

  getArea() {
    return this.width * this.height;
  },
};

const box2 = {
  x: 100,
  y: 200,
  width: 300,
  height: 200,

  getArea() {
    return this.width * this.height;
  },
};
```



<br /><hr /><br />



## 2-2. 생성자 함수에 의한 객체 생성 방식의 장점

`생성자 함수` 는 객체(인스턴스) 를 생성하기 위한 `템플릿 (class)` 로 객체를 생성하는 방법 입니다.

이 방법은 동일한 구종의 객체를 간편하게 만들 수 있습니다.

```javascript
function Box(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  getArea = function() {
    return this.width * this.height;
  };
}

const box1 = new Box(0, 0, 100, 200);
const box2 = new Box(100, 200, 300, 200);
```

<br />

위 코드에서 `Box` 함수는 일반 함수와 동일하게 정의되었지만, 이 함수를 호출할 때 `new` 키워드와 함께 호출하게 되면, 생성자 함수로 동작하게 됩니다.



<br /><hr /><br />



## 2-3. 생성자 함수의 인스턴스 생성 과정

생성자 함수는 크게 3가지 기능을 합니다.

`new` 연산자와 함께 `생성자 함수` 를 호출하게 되면, `암묵적` 으로 생성자 함수로써 동작하게 됩니다.

* 인스턴스 생성
* 생성된 인스턴스 초기화
* 결과 인스턴스 반환



<br /><hr /><br />

### 2-3-1. 인스턴스 생성과 this 바인딩

`생성자 함수` 를 통해 객체 생성을 실행하면, 가장 먼저 객체를 생성 합니다.

그리고 생성한 객체를 `this` 에 바인딩을 하게 됩니다.

즉, 실제 코드를 실행하는 `Run Time (런타임)` 이전 시점에 `this` 에 바인딩 되게 됩니다.

<br />

```javascript
function Box(x, y, width, height) {
  // 1. 암묵적으로 인스턴스 생성 및 this 바인딩 완료 시점
  console.log(this);
}
```


<br /><hr /><br />



### 2-3-2. 인스턴스 초기화

두번째 과정으로 `생성자 함수` 에 정의한 코드를 한줄씩 실행합니다.

이렇게 실행하는 `생성자 함수` 내부의 코드는 초기화 과정을 정의한 것 입니다.

```javascript
function Box(x, y, width, height) {
  // 1. 암묵적으로 인스턴스 생성 및 this 바인딩 완료 시점
  console.log(this);

  // 2. 초기화
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.getArea = function() {
    return this.width * height;
  };
}
```


<br /><hr /><br />



## 2-3-3. 인스턴스 반환

초기화가 완료된 인스턴스를 암묵적으로 반환 합니다.

만약 생성자 함수에 `return 문` 이 있다면, 명시한 `return 객체` 를 반환하게 됩니다.

다만, 명시한 `return` 문이 `객체를 반환` 할때만 해당하며, `리터럴을 반환` 하게 된다면, `무시` 하고, 생성한 인스턴스를 반환합니다.

그러므로, `생성자 함수` 내부에는 `return 문` 을 반드시 `생략` 해야 합니다.

```javascript
function Box1(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  return 123; // return문 무시
}
const box1 = new Box1(0, 0, 100, 200);
console.log(box1); // { x: 0, y: 0, width: 100, height: 200 }

function Box2(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  return {
    myReturnValue: 123,
  };
}
const box2 = new Box2(0, 0, 100, 200);
console.log(box2); // { myReturnValue: 123 }

function Box3(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
const box3 = new Box3(0, 0, 100, 200);
console.log(box3); // { x: 0, y: 0, width: 100, height: 200 }
```



<br /><hr /><br />



## 2-4. 내부 메서드 `[[call]]` 과 `[[constructor]]`

함수도 객체 입니다.

그래서 함수는 객체가 가지는 모든 `내부 메서드` 를 가지며, 추가로 `내부 메서드` 를 가집니다.

<br />

모든 함수는 `[[call]]` 내부 메서드를 가집니다.

그리고 `생성자 함수` 로 호출할 수 있는 함수는 `[[construct]]` 내부 메서드를 추가로 가집니다.

정리하면 다음과 같습니다.

* 함수 공통 내부 메서드
    * `[[call]]`: `callable` 함수 객체라고 합니다.
* 생성자 함수만 가지는 내부 메서드
    * `[[construct]]`: `constructor` 함수 객체라고 합니다.
* 생성자 함수가 아닌 경우
    * `non-constructor` 함수 객체라고 합니다.



<br /><hr /><br />



## 2-5. constructor 와 non-constructor 의 구분

자바스크립트 엔진은 `함수의 정의 방식` 에 따라, `constructor` 와 `non-constructor` 로 구분 합니다.

`constructor` 로 해석하는 함수 정의 방식은 다음과 같습니다.

* `함수 선언문`
* `함수 표현식`

<br />

만약 아래의 함수 정의 방식으로 만든다면, 이 함수는 `non-constructor` 로 해석 합니다.

* `화살표 함수`
* `메서드 축약 표현`

<br />

```javascript
// (constructor 로 해석) 함수 선언문
function myFunction1() {
  // ... do something
}
new myFunction1(); // ⭕️

// (constructor 로 해석) 함수 표현식
const myFunction2 = function() {
  // ...do something
}
new MyFunction2(); // ⭕️

// (non-constructor 로 해석) 화살표 함수
const myFunction3 = () => {
  // ...do something
}
new myFunction3(); // ❌

// (non-constructor 로 해석) 메서드 축약 표현
const obj = {
  myMethod() {
    // ...do something
  },
};
new MyMethod(); // ❌
```



<br /><hr /><br />



## 2-6. new 연산자

일반 함수와 생성자 함수는 형식적인 차이가 없습니다.

다만, `new` 연산자와 함께 호출 하였는가에 따라 동작이 달라지게 됩니다.

* `new` 함수() 호출: `[[construct]]` 를 호출하게 되며, `생성자 함수` 로 동작하게 됩니다.
* 함수() 호출: `[[call]]` 을ㄹ 호출하게 되며, `일반 함수` 로 동작하게 됩니다.

<br />

문법적으로는 일반 함수와 생성자 함수가 동일하기 때문에, 일반적으로 `코드 컨벤션` 으로 구분합니다.

* 생성자 함수: `function PascalCase()`
* 일반 함수: `function camelCase()`



<br /><hr /><br />



## 2-7. new.target

함수는 두가지 방식으로 호출할 수 있었습니다.

* 일반 함수로 호출
* 생성자 함수로 호출

<br />

만약 `생성자 함수` 로 호출되기를 원한다면, 해당 함수 내부에서 `new.target` 으로 분기 처리할 수 있습니다.

함수 내부에서 `new.target` 을 호출하면, 호출 방식에 따라 값을 얻을 수 있습니다.

* 생성자 함수로 호출한 함수 내부 new.target: `함수 자신`
* 일반 함수로 호출한 함수 내부 new.target: `undefined`

<br />

함수 호출 방식을 강제하고 싶다면, `스코프 세이프 생성자 패턴 (Scope-Safe Constructor Pattern)` 을 사용할 수 있습니다.

```javascript
function Box(x, y, width, height) {
  if (!new.target) {
    return new Box(x, y, width, height);
  }

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

const box1 = Box(0, 0, 100, 200);
console.log(box1); // { x: 0, y: 0, width: 100, height: 200 }

const box2 = new Box(100, 200, 300, 200);
console.log(box2); // { x: 100, y: 200, width: 300, height: 200 }
```

<br />

위 코드와 동일한 방법이며, `EI` 처럼 `new.target` 을 지원하지 않는 경우에는 다음과 같이 구현할 수 있습니다.

```javascript
function Box(x, y, width, height) {
  if (!(this instanceof Box)) {
    return new Box(x, y, width, height);
  }

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

const box1 = Box(0, 0, 100, 200);
console.log(box1); // { x: 0, y: 0, width: 100, height: 200 }

const box2 = new Box(100, 200, 300, 200);
console.log(box2); // { x: 100, y: 200, width: 300, height: 200 }
```
