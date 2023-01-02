# 24장. 클로저

자바스크립트에는 `클로저 (Closure)` 개념이 있습니다.

`클로저 (Closure)` 는 함수 내부에 선언된 `중첩 함수` 가 자신이 선언된 상위 함수에 정의된 식별자에 접근할 수 있는 현상 입니다.

`클로저 (closure)` 개념은 `함수형 프로그래밍 언어` 에서 사용되는 개념 입니다.

자바스크립트는 `객체지향 프로그래밍 패러다임` 뿐만 아니라 `함수형 프로그래밍 패러다임` 도 따르는 `멀티 패러다임 프로그래밍 언어` 이므로, 함수형 프로그래밍에서 사용하는 개념과 동일한 `클로저 (Closure)` 개념을 가집니다.

<br />

`클로저 (Closure)` 는 `렉시컬 환경 (Lexical Environment)` 와 깊은 관련이 있습니다.

그래서 `클로저 (Closure)` 를 이해하기 위해, `함수가 선언된 렉시컬 환경` 과 함께 살펴보겠습니다.



<br /><hr /><br />



# 1. 렉시컬 스코프

모든 함수는 스코프를 가집니다.

스코프의 역할은 `렉시컬 환경` 이 담당하게 되며, 이는 `렉시컬 환경` 에 속한 `외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)` 를 통해서 스코프 현상이 나타납니다.

<br />

`외부 렉시컬 환경에 대한 참조` 는 함수를 호출하면 진행되는 과정인 `함수 평가` 단계에서 결정 됩니다.

이 시점에 `외부 렉시컬 환경에 대한 참조` 에는 호출한 `함수가 정의된 환경 (위치)`, 즉, 함수가 정의된 곳의 `렉시컬 환경` 에 대한 참조값이 할당됩니다.

그러므로 함수의 `렉시컬 스코프` 는 변하지 않는 `정적 스코프` 입니다.

<br />

정리하면 다음과 같습니다.

`렉시컬 스코프` 란, 함수가 정의된 곳의 `렉시컬 환경` 입니다.

다시말해, `렉시컬 스코프` 는 함수의 `렉시컬 환경` 에 있는 `외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)` 를 말합니다.



<br /><hr /><br />



# 2. 함수 객체의 내부 슬롯 [[Environment]]

자바스크립트는 `평가` 와 `실행` 과정을 통해 동작하게 됩니다.

소스코드를 처음 실행하면, 다음과 같은 흐름으로 실행 됩니다.

1. 전역 객체 생성
2. 전역 코드 평가
    1. 전역 실행 컨텍스트 생성
    2. 전역 렉시컬 환경 생성
        1. 객체 환경 레코드 생성

<br />

`3-1. 객체 환경 레코드 생성` 단계가 되면, `var 변수` 와 `함수 선언문 정의` 를 실행합니다.

이 시점의 `함수 선언문 정의` 는 `Function 객체` 를 생성하고 `전역 객체의 메서드` 및 `전역 함수` 로 등록만 합니다.

이렇게 생성된 `Function 객체` 에는 실제 함수 정의는 없지만, 이 `Function 객체` 가 생성될 때 `실행중이었던 렉시컬 환경` 에 대한 `참조값` 을 `[[Environment]]` 내부슬롯에 저장하게 됩니다.

즉, 전역 코드 평가 단계에서 `함수 선언문 정의` 에 대한 `Function 객체` 를 생성하고, 생성한 `함수 객체` 의 내부슬롯인 `[[Environment]]` 에 현재 실행중인 `렉시컬 환경` 에 대한 참조값을 저장하게 됩니다.

<br />

현재 시점은 아직 함수를 호출한 것이 아닌, 전역 `코드 평가` 단계 입니다.

이후 전역 `코드 실행` 과정이 되고, 실제 함수 호출부를 실행하게 되면, 이때 비로소 `함수 코드 평가` 를 하게 됩니다.

그리고 처음 `Function 객체` 를 생성하면서 `[[Environment]]` 내부슬롯에 저장해 두었던 `렉시컬 환경 참조값` 을 `외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)` 에 할당합니다.

<br />

함수의 `[[Environment]]` 내부슬롯과 `외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)` 를 고려하여, 아래의 예시코드가 실행되는 흐름을 표현하면 다음과 같습니다.

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
      const x = 1;

      function myFunction() {
        const x = 10;
        yourFunction();
      }

      // 이 함수의 렉시컬 스코프는 `전역 객체` 의 `렉시컬 환경` 입니다.
      // 호출 방식에 영향없이, 렉시컬 스코프에 의해 상위 스코프인 `전역 렉시컬 환경` 에서 `변수 x` 를 찾게 됩니다.
      function yourFunction() {
        console.log(x);
      }

      myFunction(); // 1
      yourFunction(); // 1
    </script>
  </body>
</html>
```

<br />

1. 전역 객체 생성 (`window`)
2. 전역 코드 평가
    1. 전역 실행 컨텍스트 생성
    2. 전역 렉시컬 환경 생성
        1. 환경 레코드 생성
            1. 객체 환경 레코드 생성
                1. `function myFunction()` 에 대한 `Function 객체` 생성
                    * [[Environment]] 에 `전역 렉시컬 환경` 에 대한 참조값 저장
                2. `function yourFunction()` 에 대한 `Function 객체` 생성
                    * `[[Environment]]` 에 `전역 렉시컬 환경` 에 대한 참조값 저장
            2. 선언적 환경 레코드 생성
        2. this 바인딩 (`[[GlobalThisValue]]`)
        3. 외부 렉시컬 환경에 대한 참조값 저장 (`null`)
3. 전역 코드 실행
    1. `myFunction()` 호출부 실행
        1. `myFunction()` 의 `함수 코드 평가`
            1. 함수 실행 컨텍스트 생성
            2. 함수 렉시컬 환경 생성
                1. 환경 레코드 생성
                2. this 바인딩
                3. 외부 렉시컬 환경에 대한 참조값 저장
                    * 현재 함수 코드에 대한 `Function 객체` 는 생성되어 있는 상태
                    * `Function 객체` 의 내부슬롯 `[[Environment]]` 에 저장된 `상위 렉시컬 환경` 에 대한 참조값을 `여기 (외부 렉시컬 환경에 대한 참조)` 에 할당



<br /><hr /><br />



# 3. 클로저와 렉시컬 환경

함수는 생명주기가 있습니다.

* 함수 호출
    1. 함수 코드 평가
    2. 함수 코드 실행

<br />

함수 내부에 함수를 정의한 경우, 이 함수를 `중첩함수 (내부함수)` 라고 하며, `중첩함수` 가 정의된 함수를 `외부함수` 라고 합니다.

일반적으로는 `중첩함수` 의 생명주기가 끝난 후, `외부함수` 의 생명주기가 끝납니다.

<br />

만약 `외부함수` 에서 `중첩함수` 를 `반환` 하게 되면, `중첩함수` 는 `외부함수` 의 생명주기보다 더 길게 남을 수 있으며, `중첩함수` 에서 `외부함수` 의 변수를 참조할 수 있게 되믄데, 이러한 `중첩함수` 를 `클로저 (Closure)` 라고 합니다.

<br />

`클로저 (Closure)` 를 정리하면 다음과 같습니다.

* `중첩함수` 가 `외부함수` 의 생명주기보다 길게 유지되며,
* `중첩함수` 가 `외부함수` 에 선언한 지역 변수를 참조하는 경우

<br />

아래의 코드에서 `innerFunction()` 은 `중첩함수` 가 되고, `outerFunction()` 은 `외부함수` 가 됩니다.

<br />

```javascript
const x = 1;

function outerFunction() {
  const x = 10;

  const innerFunction = function() {
    // outerFunction() 에 선언한 지역변수 x 를 참조
    console.log(x);
  };

  return innerFunction;
}

const innerFunction = outerFunction();
// 외부함수 outerFunction() 의 생명주기는 종료

// 중첩함수 innerFunction() 의 생명주기는 유지
innerFunction(); // 10

// 그러므로 innerFunction() 은 `클로저 (Closure)` 입니다.
```

<br />

생명주기가 끝난 함수에서 선언한 `지역변수` 는, 이 함수의 생명주기가 끝날때 함께 제거 됩니다.

하지만, `클로저 (Closure)` 는 생명주기가 끝난 `외부함수` 에 선언된 `지역변수` 를 참조할 수 있는데, 이는 `실행 컨텍스트` 의 제거와 `렉시컬 환경` 의 소멸이 일치하지 않기 때문입니다.

자바스크립트의 `가비지 컬렉터` 는 `참조되지 않는 대상` 만을 제거 합니다.

그러므로 `클로저 (Closure)` 의 내부슬롯 `[[Environment]]` 에서 참조중인 `외부함수` 의 `렉시컬 환경` 은 `가비지 컬렉터` 의 대상에서 제외되고, 소멸하지 않습니다.

<br />

정리하면 다음과 같습니다.

1. `외부함수` 는 `클로저 (Closure)` 를 반환하고 생명주기를 마칩니다.
2. `외부함수` 의 `실행 컨텍스트` 는 `실행 컨텍스트 스택` 에서 제거 됩니다.
* `클로저 (Closure)` 의 내부슬롯 `[[Environment]]` 에서 `외부함수` 의 `렉시컬 환경` 을 참조하고 있으므로, `외부함수` 의 `렉시컬 환경` 은 유지됩니다.

<br />

모든 함수는 `[[Environment]]` 내부슬롯을 가지고 있으므로, 모든 함수를 `클로저 (Closure)` 로 볼 수도 있지만, `브라우저 최적화` 동작까지 적용시키면, `클로저 (Closure)` 에 대한 정의를 축소시킬 수 있습니다.


<br /><br />


## 자바스크립트에서 사용하는 클로저(Closure) 대상

지금까지 살펴본 `클로저 (Closure)` 의 가장 큰 특징은, `외부함수` 에 정의된 `지역변수` 를 참조할 수 있는 것 이었습니다.

이렇게 `클로저 (Closure)` 가 `상위 렉시컬 환경 (=== 렉시컬 스코프)` 에 선언된 `지역변수` 를 참조할 때, 이 지역변수를 `자유변수 (Free Variable)` 이라고 합니다.

<br />

자바스크립트에서 `클로저 (Closure)` 에 속하는 함수는 다음과 같은 특징을 가질 경우 입니다.

* `클로저 (Closure)` 는 `상위 렉시컬 환경 (=== 렉시컬 스코프)` 보다 생명주기가 길어야 합니다.
* `클로저 (Closure)` 는 `자유변수` 를 사용해야 합니다.

<br />

위 두가지 조건을 만족하는 함수에 대해, 자바스크립트에서는 `클로저 (Closure)` 라고 합니다.



<br /><hr /><br />



# 4. 클로저의 활용

함수형 프로그래밍 언어에서 `클로저 (Closure)` 를 사용하는 목적이 있습니다.

`클로저 (Closure)` 는 `상태 (State)` 가 의도치 않게 변경되지 않도록 방지하기 위한, `은닉 (Information Hiding)` 을 목적으로 사용합니다.

이는 `상태 (State)` 를 바꿀 수 있는 방법을 `특정 함수` 에만 허용하는 방법이 되며, 이렇게 지정한 방법이 아닌 함수는 `상태 (State)` 를 바꿀 수 없도록 합니다.

그러므로 `클로저 (Closure)` 는 `특정 함수` 를 사용하지 않으면 `상태 (State)` 를 바꿀 수 없도록, 안전한 `상태 변경` 과 `상태 유지` 를 위해 사용 합니다.

<br />

`클로저 (Closure)` 사용 여부에 따른 `상태 (State)` 를 `은닉 (Information Hiding)` 이 어떻게 되는지, 카운터 프로그램 코드를 통해 살펴보겠습니다.

<br />

## 4-1. 전역 상태 (전역 변수) 를 사용한 카운터 프로그램

아래의 코드는 `전역 상태 (전역 변수)` 를 사용하여 카운터값을 관리합니다.

때문에 카운터값을 어디서나 임의의 값으로 변경할 수 있게 되며, 이는 카운터 프로그램으로써 의도치 않은 동작이 될 수 있습니다.

<br />

```javascript
// 카운터 상태값 (전역 변수)
let countValue = 0;

// 카운터 상태 변경 함수
const increase = function() {
  return ++countValue;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3

// 카운터 상태값은 전역 변수 이므로, 어디서나 임의의 값으로 변경할 수 있는 문제점을 가지고 있습니다.
countValue = 0
console.log(increase()); // 1
```



<br /><hr /><br />



## 4-2. 전역 상태 => 지역 변수 로 변경한 카운터 프로그램

위 코드의 문제점은 `상태 (State)` 가 `전역 변수` 이기 때문에, 어디서나 임의의 값으로 바꿀 수 있다는 것 이었습니다.

`전역 변수` 였던 `상태 (State)` 를 `함수` 의 `지역 변수` 로 수정해 보면, 다음과 같습니다.

<br />

```javascript
function increase() {
  // 함수를 호출할 때마다 새로운 `렉시컬 환경` 을 생성,
  // 즉, `함수 코드 평가` 과정에서 지역변수 countValue 를 생성하고,
  // `함수 코드 실행` 과정에서 0으로 초기화 합니다.
  let countValue = 0;

  return ++countValue;
}

// increase() 함수를 호출할 때마다, 새로운 렉시컬 환경을 생성하게 됩니다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1
```

<br />

위 코드에서는 `상태 (State)` 를 바꾸기 위해서는 오직 `increase()` 함수를 통해서만 가능하도록 되었습니다.

하지만, `increase()` 를 호출할 때마다, `상태 (State)` 도 새롭게 생성되기 때문에 `이전 상태값` 을 유지할 수 없는 문제점이 있습니다.



<br /><hr /><br />



## 4-3. 클로저를 사용하여 이전 상태값을 유지하는 카운터 프로그램

위 코드는 `increase()` 를 호출할 때마다 `상태 (State)` 를 새로 생성하고 있습니다.

이유는 `increase()` 의 지역변수로 `상태 (State)` 를 관리하고 있기 때문입니다.

`이전 상태값` 을 유지하기 위해서는 `increase()` 에서 선언한 `countValue` 를 `상위 렉시컬 환경` 에서 선언하는 것 입니다.

즉, `increase()` 함수를 `클로저 (Closure)` 로 만들고, 카운터 상태값은 `자유 변수 (Free Variable)` 로 만드는 방법 입니다.

<br />

```javascript
const increase = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  // 클로저 (Closure)
  return function() {
    return ++countValue;
  };
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

<br />

이처럼 `클로저 (Closure)` 를 사용하면, `상태 (State)` 변경을 `특정 함수` 호출에 의해서만 가능하도록 구현할 수 있습니다.



<br /><hr /><br />



## 4-4. decrease() 기능이 추가된 카운터 프로그램

`decrease()` 기능이 추가된 카운터 프로그램을 구현하면 다음과 같습니다.

`increase()` 와 `decrease()` 가 동일한 `자유 변수 (Free Variable)` 을 참조하도록 구현하기 위해, `카운터 객체 생성` 방식으로 구현하게 됩니다.

<br />

```javascript
// increase() 와 decrease() 메서드를 가지는 카운터 객체 생성
const counter = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  return {
    increase() {
      return ++countValue;
    },
    decrease() {
      return --countValue;
    },
  };
}());

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.increase()); // 3

console.log(counter.decrease()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

<br />

위 코드는 `increase()` 와 `decrease()` 메서드를 가진 객체를 반환 합니다.

즉, 카운터 객체를 생성하는 동작이므로, `생성자 함수` 로 변경할 수 있습니다.

<br />

```javascript
const CounterConstructor = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  // 생성자 함수
  function CounterConstructor() {
    // this.countValue = 0; 으로 프로퍼티 지정 시, countValue 는 `은닉` 되지 않기 때문에, 자유변수 (Free Variable) 을 사용합니다.
  }

  CounterConstructor.prototype.increase = function() {
    return ++countValue;
  };

  CounterConstructor.prototype.decrease = function() {
    return --countValue;
  };

  return CounterConstructor;
}());

const myCounter = new CounterConstructor();

console.log(myCounter.increase());
console.log(myCounter.increase());
console.log(myCounter.increase());

console.log(myCounter.decrease());
console.log(myCounter.decrease());
console.log(myCounter.decrease());
```



<br /><hr /><br />



## 4-5. 고차함수를 사용한 카운터 프로그램

위에서 구현한 방식의 카운터 프로그램은 `클로저 (Closure)` 와 `객체지향` 방식으로 구현한 결과 입니다.

`함수형 프로그래밍` 방식으로 구현한다면, `클로저 (Closure)` 와 `고차함수 (HOF: Higher Order Function)` 를 활용합니다.

<br />

```javascript
function createCounter(aux) {
  // 자유변수 (Free Variable)
  let countValue = 0;

  return function() {
    countValue = aux(countValue);
    return countValue;
  };
}

// 보조 함수
function increase(value) {
  return ++value;
}

function decrease(value) {
  return --value;
}

// increaser() 와 decreaser() 의 상위 렉시컬 환경은 서로 다릅니다.
const increaser = createCounter(increase);
const decreaser = createCounter(decrease);

console.log(increaser()); // 1
console.log(increaser()); // 2
console.log(increaser()); // 3

console.log(decreaser()); // -1
console.log(decreaser()); // -2
console.log(decreaser()); // -3
```

<br />

위 코드의 문제점은 `increaser()` 와 `decreaser()` 의 `상위 렉시컬 환경` 이 다르다는 것 입니다.

때문에 `increaser()` 가 참조하는 `자유변수 (Free Variable)` 과 `decreaser()` 가 참조하는 `자유변수 (Free Variable)` 은 서로 다른 변수이며, 상태값은 개별로 관리하게 됩니다.

이러한 현상이 발생한 이유는 다음과 같습니다.

* 서로 다른 함수가 `동일한 상위 렉시컬 환경` 을 가져야 합니다.
* 이를 위해서는 `자유변수 (Free Variable)` 이 선언된 함수는 `최초 1회` 만 호출되어야 합니다.
* `상위 렉시컬 환경` 에 해당하는 함수는 `인수` 로 `함수` 를 받는 `고차함수 (HOF: Higher Order Function)` 을 `클로저 (Closure)` 로 반환해야 합니다.
* 값 증가, 값 감소 와 같은 상태값 변경은 `클로저 (Closure)` 에 `인수` 로 넘겨주는 `보조 함수` 로 정의합니다.

<br />

아래의 코드는 `클로저 (Closure)` 와 `고차함수 (HOF: Higher Order Function)` 를 사용하여 정상적인 증가, 감소 기능을 제공하는 카운터 프로그램 입니다.

<br />

```javascript
// 클로저와 고차함수를 사용한 함수형 프로그래밍으로 구현한 카운터 프로그램 완성형
const perfectCounter = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  return function(aux) {
    countValue = aux(countValue);
    return countValue;
  };
}());

// 보조 함수
function increase(value) {
  return ++value;
}

function decrease(value) {
  return --value;
}

console.log(perfectCounter(increase)); // 1
console.log(perfectCounter(increase)); // 2
console.log(perfectCounter(increase)); // 3

console.log(perfectCounter(decrease)); // 2
console.log(perfectCounter(decrease)); // 1
console.log(perfectCounter(decrease)); // 0
```



<br /><hr /><br />



# 5. 캡슐화와 정보 은닉

`캡슐화 (Encapsulation)` 은 객체에 `상태 (State)` 와 `메서드 (Method)` 를 하나로 묶는것을 말합니다.

`캡슐화` 를 하는 목적은, 외부에 비공개할 `상태` 나 `메서드` 를 객체 내부에 숨기기 위해서 입니다.

<br />

`객체지향 프로그래밍 언어` 에서는 객체의 상태나 메서드를 숨기기 위해 `접근자` 키워드를 제공 합니다.

* `public`: 공개
* `protected`: 같은 패키지 내부에서는 접근 가능
* `private`: 비공개

<br />


자바스크립트는 이러한 `접근자` 키워드를 제공하지는 않습니다.

그래서 `클로저 (Closure)` 를 사용하여 `private` 처럼 `비공개` 처리를 할 수 있습니다.

앞서 살펴보았던 카운터 프로그램의 `countValue` 처럼 `자유변수 (Free Variable)` 이 `private state (비공개 상태)` 가 됩니다.

<br />

하지만 `클로저 (Closure)` 와 `생성자 함수` 의 `prototype` 에 `메서드`를 구현하여 `캡슐화` 를 하면, 인스턴스의 메서드에서 `잘못된 상태값` 을 참조하는 문제가 있습니다.

아래의 코드는 의도치 않은 동작을 하는 `prototype` 의 메서드 예시 입니다.

<br />

```javascript
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
```

<br />

위 코드에서 볼 수 있듯이, `생성자 함수` 의 `prototype` 을 사용하여 `메서드` 를 `상속` 받도록 구현하게 되면, 헤당 메서드에서 참조하는 `자유변수 (Free Variable)` 의 상태값이 모두 공통으로 묶여버리는 문제가 발생 합니다.

이는 `생성자_함수.prototype.메서드` 의 `렉시컬 스코프` 를 모든 인스턴스가 공유하기 때문 입니다.

즉, `자유변수 (Free Variable)` 이 선언된 `렉시컬 스코프` 가 동일하기 때문에, 새로운 인스턴스를 생성할 때마다, `자유변수 (Free Variable)` 에 재할당되며 발생하는 현상 입니다.

<br />

정리하면 다음과 같습니다.

* `생성자 함수` 의 `상태 (State)` 나 `메서드 (Method)` 를 `캡슐화 (Encapsulation)` 하기 위한 방법으로, `자유변수 (Free Variable)` 를 사용할 수는 없습니다.
* 자바스크립트는 완벽한 `정보 은닉 (Information Hiding)` 을 제공하지는 않습니다.



<br /><hr /><br />



# 6. 자주 발생하는 실수

`for 반복문` 에는 반복 조건을 위한 `식별자` 를 선언하여 사용합니다.

일반적으로는 `i` 를 사용 합니다.

<br />

아래의 코드는 `for 반복문` 의 `식별자` 를 선언할 때 `var` 키워드를 사용하고, `for 반복문` 내부에서 함수를 만드는 경우 입니다.

<br />

```javascript
const myFunctions = [];

// var 키워드로 선언한 변수는 `함수 레벨 스코프` 를 따릅니다.
// 그러므로, `var i` 는 전역변수가 됩니다.
for (var i = 0; i < 3; i++) {
  // 차후 이 함수를 호출하면, 이 시점의 `전역변수 i` 의 값을 반환합니다.
  myFunctions[i] = function() {
    // 항상 3 반환
    return i;
  };
}

for (var j = 0; j < 3; j++) {
  console.log(myFunctions[j]());
  // 3
  // 3
  // 3
}
```

<br />

`for 문` 의 반복문일 시작할 때마다, `블록 레벨 스코프` 를 생성합니다.

그리고 `블록 레벨 스코프` 를 따르는 `let` 키워드로 `식별자` 를 선언하게 되면, `let 변수` 는 `for 문` 이 반복할 때마다 생성하는 새로운 `블록 레벨 스코프` 에 선언되게 됩니다.

그러므로 `for 문` 내부에서 생성한 함수의 `[[Environment]]` 가 참조하는 각각의 `렉시컬 스코프 (상위 스코프)` 에 `let 변수` 가 선언되며, 우리가 의도했던 동작을 하게 됩니다.

<br />

```javascript
const yourFunctions = [];

// let 이나 const 키워드로 선언한 변수는 `블록 레벨 스코프` 를 따릅니다.
// 그러므로, for 반복문이 반복할 때마다 생성하는 `블록 레벨 스코프` 에 `let x` 가 선언 됩니다.
for (let x = 0; x < 3; x++) {
  // 생성하는 함수의 `[[Environment]]` 는 `for 반복문` 이 반복할 때마다 생성하는 `블록 레벨 스코프` 를 참조합니다.
  yourFunctions[x] = function() {
    return x;
  };
}

for (let y = 0; y < 3; y++) {
  console.log(yourFunctions[y]());
  // 0
  // 1
  // 2
}
```