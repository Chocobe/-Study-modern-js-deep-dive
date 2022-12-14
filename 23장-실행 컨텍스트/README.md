# 23장. 실행 컨텍스트

`실행 컨텍스트 (Execution Context)` 는 자바스크립트의 동작 원리를 담고 있는 핵심 개념 입니다.

`실행 컨텍스트 (Execution Context)` 를 이해함으로써 얻게되는 개념은 다음과 같습니다.

* `스코프 기반` 으로 `식별자`와 `식별자에 바인딩된 값` 을 관리하는 방법
* `호이스팅 (Hoisting)` 이 발생하는 이유
* `클로저 (Closure)` 의 동작 방식
* `태스크 큐 (Task Queue)` 와 함께 동작하는 `이벤트 헨들러` 와 `비동기 처리` 의 동작 방식



<br /><hr /><br />



# 1. 소스코드의 타입

지금부터 `소스코드` 에는 `실행 가능한 코드(Executable Code)` 라는 의미를 부여 하겠습니다.

자바스크립트는 `소스코드 (실행 가능한 코드)` 를 `4가지` 로 분류하고 있습니다.

* 전역 코드
* 함수 코드
* eval 코드
* module 코드

<br />

`소스코드 (실행 가능한 코드)` 를 `4가지` 로 분류하는 이유는 각각의 `실행 컨텍스트 (Execution Context)` 를 생성하는 과정과 관리 내용이 다르기 때문 입니다.

<br />

* 전역 코드
  * 전역 코드의 평가가 시작되면 `전역 실행 컨텍스트` 를 생성한 후, 아래의 과정들을 진행하며, 생성된  `전역 스코프` 는 `전역 실행 컨텍스트` 가 관리하게 됩니다.
  * `전역 변수` 를 관리하기 위해, 최상위 스코프인 `전역 스코프` 를 생성 합니다.
  * 전역 변수를 전역 객체의 프로퍼티에 바인딩 합니다.
  * 전역 함수를 전역 객체의 메서드로 바인딩 합니다.

* 함수 코드
  * 함수 코드의 평가가 시작되면 `함수 실행 컨텍스트` 를 생성한 후, 아래의 과정들을 진행하며, 생성된 `지역 스코프` 는 `함수 실행 컨텍스트` 가 관리하게 됩니다.
  * `지역 변수`, `매개변수`, `arguments 객체` 를 관리하기 위해, `지역 스코프` 를 생성 합니다.
  * `지역 스코프` 를 `스코프 체인` 의 일원으로 연결 합니다.

* eval 코드
  * `strick mode (엄격 모드)` 에서만 해당 합니다.
  * eval 코드의 평가가 시작되면, `eval 실행 컨텍스트` 를 생성한 후, 아래의 과정 진행하며, 생성된 `eval 자신만의 스코프` 는 `eval 실행 컨텍스트` 가 관리하게 됩니다.
  * `eval 자신만의 스코프` 를 생성 합니다.

* module 코드
  * 모듈 코드의 평가가 시작되면, `모듈 실행 컨텍스트` 를 생성한 후, 아래의 과정들을 진행하며, 생성된 `모듈 스코프` 는 `모듈 실행 컨텍스트` 가 관리하게 됩니다.
  * module 별로 `독립적인 모듈 스코프` 를 생성 합니다.

<br />

이를 `소스코드` 와 `실행 컨텍스트` 의 관계로 나타내면 다음과 같습니다.

<br />

```bash
•   전역 코드  ───> 평가 ───> `전역 실행 컨텍스트` 및 `전역 스코프` 생성
•   함수 코드  ───> 평가 ───> `함수 실행 컨텍스트` 및 `지역 스코프` 생성
•  eval 코드  ───> 평가 ───> `eval 실행 컨텍스트` 및 `eval 스코프` 생성
* module 코드 ───> 평가 ───> `모듈 실행 컨텍스트` 및 `모듈 스코프` 생성
```



<br /><hr /><br />



# 2. 소스코드의 평가와 실행

자바스크립트 엔진은 소스코드를 2개의 과정으로 나누어 처리 합니다.

* 평가 과정
* 실행 과정 (런타임))



<br /><hr /><br />



## 2-1. 평가 과정

먼저 `실행 컨텍스트` 를 만듭니다.

그리고 변수나 함수 `선언문` 만을 먼저 실행하여 변수나 함수를 생성 합니다.

생성된 변수나 함수는 `식별자` 를 `키값` 으로 사용하여 `실행 컨텍스트` 가 관리하는 `스코프` 에 등록 합니다.

<br />

아래 코드의 `평가 과정` 에서는 `var x;` 만 실행하여, 변수 `x` 를 `실행 컨텍스트` 가 관리하는 `스코프` 에 등록 합니다.

그리고 등록 대상이 `변수` 일 경우에는 `undefined` 로 초기화 하며, `함수` 일 경우에는 `Function 객체` 로 초기화 합니다.

<br />

```javascript
var x;
x = 3;
```



<br /><hr /><br />



## 2-2. 실행 과정 (런타임)

`선언문` 을 제외한 소스코드를 순차적으로 실행 시킵니다.

이는 `평가 과정` 에서 `모든 선언문` 을 `실행 컨텍스트` 가 관리하는 `스코프` 에 등록해 두었기 때문입니다.

이렇게 `실행한 결과` 는 다시 `실행 컨텍스트` 가 관리하는 `스코프` 에 재등록(값 갱신) 합니다.

<br />

아래 코드의 `실행 과정` 에서는 `x = 3;` 만 실행하고, 실행 결과는 `실행 컨텍스트` 가 관리하는 `스코프` 에 다시 등록 합니다.

<br />

이렇게 `실행 과정` 에서 변수나 함수를 참조할 때, 해당 참조값은 `실행 컨텍스트` 가 관리하는 `스코프` 에서부터 검색합니다.

만약 `현재 스코프` 에서 참조값을 찾지 못하였다면, `스코프 체인` 을 통해 `상위 스코프 전체` 에서 검색하게 됩니다.



<br /><hr /><br />



# 3. 실행 컨텍스트의 역할

`실행 컨텍스트` 는 아래의 요소로 구성되어 있습니다.

* `스코프`
  * 변수, 함수, class 등의 `식별자` 를 등록하고 관리 합니다.

* `함수 실행 순서 내부 메커니즘`
  * 코드의 실행 순서를 관리 합니다.

<br />

그리고 `스코프` 와 `함수 실행 순서 내부 메커니즘` 은 아래의 요소로 관리 합니다.

* `렉시컬 환경`
  * `스코프` 를 관리 합니다.

* `실행 컨텍스트 스택`
  * `함수 실행 순서` 를 관리하는 메커니즘 입니다.

<br />

아래의 예시 코드를 통해 `소스코드` 를 어떻게 `평가` 하고 `실행` 하는지 순차적으로 살펴보겠습니다.

```javascript
// 전역 변수 선언
const x = 10;
const y = 20;

// 함수 정의
// window.myGlobalFUnction() {} 이 등록 됩니다.
function myGlobalFunction(a) {
  // 지역 변수 선언
  const x = 300;
  const y = 400;

  // 메서드 호출
  console.log(a + x + y);
}

// 함수 호출
myGlobalFunction(1000);

// 메서드 호출
console.log(x + y);
```

<br />

위 코드를 실행하는 단계를 먼저 살펴보면 다음과 같습니다.

1. 전역 코드 평가
  * `전역 코드` 를 실행하기 위한 준비 과정 입니다.
  * 전역 스코프의 `선언부` 를 먼저 실행 합니다.
  * 선언된 `전역 변수` 와 `전역 함수` 는 `전역 스코프` 에 등록 됩니다.
    * 만약 `전역 변수` 를 `var` 로 선언하였다면, `전역 객체` 의 `프로퍼티` 로 등록 됩니다.
    * 만약 `전역 함수` 를 `함수 선언문` 으로 선언하였다면, `전역 객체` 의 `메서드` 로 등록 됩니다.

2. 전역 코드 실행
  * `전역 코드 평가` 가 끝난 후 실행되는 과정이며, `전역 코드` 의 `런타임` 시점 입니다.
  * `전역 변수` 에 값을 할당하거나, `전역 함수` 를 호출 합니다.
  * 만약 `전역 함수` 를 호출하였다면, 실행중인 전역 코드를 중지하고, 호출한 `전역 함수` 로 진입 합니다.

3. 함수 코드 평가
  * 함수 호출에 의해 함수 내부로 진입하게 되면, 시작되는 과정 입니다.
  * 함수 코드를 실행하기 위한 준비 과정 입니다.
  * `매개변수` 와 `지역변수` 선언문을 먼저 실행 합니다.
  * 함수 스코프의 `arguments 객체` 를 생성하여, `지역 스코프` 에 등록합니다.
  * `this` 바인딩도 결정됩니다.

4. 함수 코드 실행
  * `함수 코드 평가` 가 끝난 후 실행되는 과정이며, 이 시점이 `지역 스코프` 의 `런타임` 입니다.
  * `매개변수`, `지역변수`에 값을 할당합니다.
  * `myGlobalFunction()` 내부의 `console` 객체를 찾습니다.
    * `console` 객체는 `전역 객체` 의 `프로퍼티` 로 존재하며, 이를 `스코프 체인` 을 통해서 찾습니다.
    * 실제로는 `console` 은 `전역 객체의 프로퍼티` 로 등록된 상태이며, 이를 통해 알 수 있는 점은 다음과 같습니다.
      * `전역 객체 프로퍼티` 는 마치 `전역 변수` 처럼 전역 스코프를 통해서 검색이 가능해야 위 동작을 할 수 있습니다.

<br />

아래의 코드를 통해 `var` 를 사용한 `전역 변수 선언` 과 `전역 함수 선언문` 이 `전역 스코프` 뿐만 아니라, `전역 객체` 에도 등록되는 현상을 확인할 수 있습니다.

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
      // 전역 스코프의 전역 변수 myValue 로 등록됨
      // 추가로 
      // 전역객체의 전역 프로퍼티 myValue 로 등록됨
      var myValue = 3;
      const myConstValue = 'Const Value';

      console.group('var 를 사용한 전역 변수 선언');
      console.log('(전역 스코프) myValue: ', myValue);
      console.log('(전역 객체) window.myValue: ', window.myValue);
      console.groupEnd();

      function myFunction(groupMessage) {
        console.log(groupMessage);
      }

      myFunction('(전역 스코프) called myFunction from GlobalScope');
      window.myFunction('(전역 객체) called myFunction from globalObject');

      console.log('myConstValue: ', myConstValue);
      // 전역 객체의 프로퍼티에는 등록되지 않기 때문에
      // "window.myConstValue: undefined" 
      console.log('window.myConstValue: ', window.myConstValue);
    </script>
  </body>
</html>
```



<br /><hr /><br />



# 4. 실행 컨텍스트 스택

`3. 실행 컨텍스트의 역할` 에서 자바스크립트 엔진이 어떻게 코드를 평가하고 실행하는지 살펴보았습니다.

이번에는 `실행 컨텍스트 스택` 개념과 함께 코드의 평가와 실행 흐름을 살펴보겠습니다.

<br />

자바스크립트 엔진의 코드 평가와 실행은 다음과 같은 흐름을 가집니다.

1. 코드 평가
  * 코드에 존재하는 모든 변수 선언문과 함수 선언문 을 먼저 실행

2. 평가한 코드 실행
  * 선언문을 제외한 나머지 코드를 순차적으로 실행

<br />

`코드 평가` 를 시작하면 자바스크립트 엔진은 먼저 `실행 컨텍스트` 를 생성 합니다.

그리고 코드내에 존재하는 모든 `변수 선언문` 과 `함수 선언문` 만을 먼저 실행 합니다.

각 선언문을 실행하면 해당 변수와 함수는 `실행 컨텍스트` 에 등록됩니다.

<br />

그리고 생성했던 `실행 컨텍스트` 를 `실행 컨텍스트 스택` 에 `추가 (push)` 합니다.

이로써 평가단계를 마치고 실행단계를 실행 합니다.

`자바스크립트의 첫 실행` 시에는 `전역 코드` 를 대상으로 위 과정을 수행하고, `함수 호출` 시에는 `함수 코드` 를 대상으로 위 과정을 수행 합니다.

<br />

`실행 컨텍스트 스택` 은 `스택` 자료구조 이므로 `후입선축: LIFO (Last In First Out)` 방식으로 동작하게 됩니다.

<br />

평가단계를 마친 코드는 다음 과정으로 `실행 과정` 을 통해 나머지 코드를 실행합니다.

이 때, `함수 호출부` 가 있다면 `함수 코드 평가` 와 `함수 코드 실행` 을 하게 됩니다.

<br />

`함수 호출부` 에 의해 새로운 `함수 평가` 단계가 되면, 해당 함수에 대한 `실행 컨텍스트` 를 생성하며, `선언문` 을 `실행 컨텍스트` 에 등록 합니다.

그리고 `실행 컨텍스트 스택` 에 `등록 (push)` 합니다.

<br />

즉, 자바스크립트 엔진은 `전역 코드 실행` 과 `함수 호출` 에 대해, `실행 컨텍스트` 를 생성하고 `실행 컨텍스트 스택` 에 등록하는 방식으로 동작합니다.

만약 `함수 실행` 을 모두 마쳤다면, `실행 컨텍스트 스택` 에서 `최상위 실행 컨텍스트` 를 `제거 (pop)` 합니다.

* `스택` 자료구조 이므로, `최상위 실행 컨텍스트` 가 현재 실행중인 실행 컨텍스트가 되기 때문 입니다.

<br />

정리하면 다음과 같습니다.

* `실행 컨텍스트 스택` 은 `코드의 실행 순서` 를 관리 합니다.
* 실행 컨텍스트 스택의 `최상위 실행 컨텍스트` 는 현재 실행중인 실행 컨텍스트이며, 이를 `실행중인 실행 컨텍스트 (Running Execution Context)` 라고 합니다.



<br /><hr /><br />



# 5. 렉시컬 환경

지금까지 `실행 컨텍스트` 가 `식별자` 와 `식별자에 바인딩된 값`, `스코프` 를 관리한다고 하였습니다.

`실행 컨텍스트` 내부에는 `렉시컬 환경 (Lexical Environment)` 가 있으며, 실제로는 `렉시컬 환경 (Lexical Environment)` 의 역할 입니다.

그리고 `렉시컬 환경 (Lexical Environment)` 는 `{ 키: 값 }` 을 갖는 객체 형태의 `스코프 (전역, 함수, 블록 스코프)` 를 생성합니다.

이렇게 생성된 `스코프` 가 실제로 `식별자` 와 `식별자에 바인딩된 값` 을 관리하게 됩니다.

<br />

`렉시컬 환경 (Lexical Environment)`, 즉 `스코프` 의 구조는 다음과 같습니다.

* `환경 레코드 (Environment Record)`
* `외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)`

<br />

`환경 레코드 (Environment Record)` 는 `식별자` 에 대한 관리를 하며, 다음과 같은 역할을 합니다.

* `식별자` 관리
* `식별자에 바인딩된 값` 관리

<br />

`외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)` 는 다음과 같은 역할을 합니다.

* 현재 `실행 컨텍스트` 를 생성한 `상위 코드의 렉시컬 환경` 에 접근하기 위한 `참조값` 을 가집니다.
* `스코프 체인` 이 현재 스코프에서 상위 스코프 방향으로 식별자를 탐색하는 이유가 바로 `외부 렉시컬 환경 참조` 를 사용하기 때문이며, `스코프 체인` 은 현재 스코프에서 상위 스코프 방향으로 연결된 `단방향 연결 리스트` 입니다.



<br /><hr /><br />



# 6. 실행 컨텍스트의 생성과 식별자 검색 과정

<!-- 지금까지 살펴 보았던 `실행 컨텍스트` 와 `스코프` 의 흐름을 좀 더 구체적으로 살펴보겠습니다. -->

이번에는 `실행 컨텍스트` 의 생성과 `식별자` 를 어떻게 검색하는지, 이를 통해 자바스크립트 코드의 동작 흐름을 살펴 보겠습니다.

<br />

```javascript
// 전역 변수 x 선언
// 전역 객체의 프로퍼티 x 등록
var x = 1;

// 전역 변수 y 선언
const  y = 2;

// 전역 함수 foo() 선언
// 전역 객체의 메서드 foo() 로 등록
function foo(a) {
  // foo() 함수 스코프의 지역 변수 x 선언
  var x = 3;

  // foo() 함수 스코프의 지역 변수 y 선언
  const y = 4;

  // foo() 함수 스코프의 지역 함수 bar() 선언
  function bar(b) {
    // bar() 함수 스코프의 지역 변수 z 선언
    const z = 5;
    console.log(a + b + x + y + z);
  }

  // foo() 함수 스코프으이 지역 함수 bar() 호출
  bar(10);
}

// 전역 스코프 함수이며 전역 객체의 메서드인 foo() 호출
foo(20); // 42
```

<br />

위 코드를 실행하면, 다음과 같은 흐름으로 자바스크립트 코드를 실행시킵니다.

1. 전역 객체 생성
2. 전역 코드 평가
    1. 전역 `실행 컨텍스트` 생성
    2. 전역 `렉시컬 환경` 생성
        1. 전역 `환경 레코드` 생성
            1. `객체 환경 레코드` 생성
            2. `선언적 환경 레코드` 생성
        2. `this` 바인딩
        3. `외부 렉시컬 환경` 에 대한 `참조` 결정
3. 전역 코드 실행
4. `foo()` 함수 코드 평가
    1. 함수 `실행 컨텍스트` 생성
    2. 함수 `렉시컬 환경` 생성
        1. 함수 `환경 레코드` 생성
        2. `this` 바인딩
        3. `외부 렉시컬 환경` 에 대한 `참조` 결정
5. `foo()` 함수 코드 실행
6. `bar()` 함수 코드 평가
7. `bar()` 함수 코드 실행
    1. `console` 식별자 검색
    2. `console` 객체에서 `log()` 메서드 검색
    3. `표현식 평가` (`a + b + x + y + z`)
    4. `console.log()` 메서드 호출
8. `bar()` 함수 코드 실행 종료
9. `foo()` 함수 코드 실행 종료
10. 전역 코드 실행 종료



<br /><hr /><br />



## 6-1. 전역 객체 생성

* 자바스크립트를 처음 실행하면, 전역 코드를 `평가하기 전` 에 `전역 객체` 를 생성 합니다.
* 전역 객체도 `Object.prototype` 을 상속 받습니다.
    * 즉, `전역 객체` 도 `프로토타입 체인 (Prototype Chain)` 의 일원이 됩니다.



<br /><hr /><br />



## 6-2. 전역 코드 평가

`전역 실행 컨텍스트` 를 생성하고 `환경` 을 구성하는 단계 입니다.



<br /><br />



## 6-2-1. 전역 실행 컨텍스트 생성

* 비어있는 `전역 실행 컨텍스트 (Global Execution Context)` 를 생성 합니다.
* 생성된 `전역 실행 컨텍스트` 를 `실행 컨텍스트 스택` 에 `추가 (push)` 합니다.
    * `실행 컨텍스트 스택` 에 처음 추가된 객체이며, `최상위 실행 컨텍스트` 가 됩니다.



<br /><br />



## 6-2-2. 전역 렉시컬 환경 생성

* `전역 렉시컬 환경 (Global Lexical Environment)` 를 생성 합니다.
* 생성한 `전역 렉시컬 환경` 을 `전역 실행 컨텍스트` 에 바인딩 합니다.


<br /><br />


## 6-2-2-1. 전역 환경 레코드 생성

`전역 환경 레코드 (Global Environment Record)` 는 `전역 스코프` 역할을 합니다.

좀 더 구체적으로 보면, 다음과 같은 요소를 제공 합니다.

* 전역 스코프
* 빌트인 전역 프로퍼티
* 빌트인 전역 함수
* 표준 빌트인 객체

<br />

자바스크립트의 `최상위 스코프` 역할을 하는 `전역 환경 레코드 (Global Environment Record)` 는 두가지 요소로 구성되어 있으며, 아래의 순서로 생성 합니다.

1. `객체 환경 레코드 (Object Environment Record)` 생성
2. `선언적 환경 레코드 (Declarative Environment Record)` 생성

<br />

첫번째로 `객체 환경 레코드 (Object Environment Record)` 를 살펴보겠습니다.

`전역 객체` 의 `객체 환경 레코드` 에는 `bindingObject` 라는 객체와 연결되게 됩니다.

`bindingObject` 는 자바스크립트를 실행하였을 때 가장 먼저 생성하였던 `전역 객체` 입니다.

`var 로 선언한 전역 변수` 와 `함수 선언문으로 생성한 전역 함수` 는 현재 과정에서 `bindingObject` 의 프로퍼티와 메서드가 됩니다.

결과적으로, 전역 객체에 직접 바인딩하지 않아도 `전역 객체` 에 `var 로 선언한 전역 변수` 와 `함수 선언문으로 생성한 전역 함수` 가 현재 과정을 통해서 전역 객체의 프로퍼티와 메서드가 되는 것 입니다.

그리고 현재 과정에서 수행한 `선언문 처리` 는 자바스크립트의 `호이스팅` 현상이 나타나는 지점 입니다.

<br />

두번째로 `선언적 환경 레코드 (Declaration Environment Record)` 를 살펴보겠습니다.

이 단계에서는 `let` 이나 `const` 로 선언한 변수를 `선언적 환경 레코드 (Declaration Environment Record)` 에 등록하고 앞으로 관리하게 됩니다.

`let` 이나 `const` 로 선언한 변수는 `전역 객체` 의 프로퍼티가 되지 못하는 이유가 바로 `객체 환경 레코드` 에 등록 및 관리되는 것이 아닌, `선언적 환경 레코드` 에 등록되고 관리되기 때문 입니다.

추가로 `const` 로 선언한 변수는 `선언 단계` 와 `초기화 단계` 가 분리되어 있으므로, `런타임` 에서 `const 변수 선언문` 에 도달하기 전까지는 `일시적 사각지대 (Temporal Dead Zone: TDZ)` 에 빠지게 됩니다.

* `일시적 사각지대 (Temporal Dead Zone: TDZ)`: 변수가 선언된 `스코프 시작지점` 부터 `변수 선언문` 이전 까지는, `런타임` 에서 해당 변수를 참조할 수 없는 구간을 말합니다.
* `let` 과 `const` 키워드로 선언한 변수도 `var 변수` 와 동일하게 `호이스팅` 현상은 발생 합니다.
    * `선언 단계` 는 호이스팅이 되지만, `초기화 단계` 는 런타임에서 해당 `선언문` 에 도달하기 전까지 실행되지 않은 상태이기 때문에 `일시적 사각지대 (Temporal Dead Zone: TDZ)` 이 나타나는 것 입니다.
    * `let` 과 `const` 로 선언한 변수를 선언문 전에 참조하면 `에러` 를 발생 시킵니다.
        * 만약 `let` 과 `const` 로 선언한 변수에 `호이스팅` 현상이 없다면, 아래의 코드는 에러가 아닌 동일한 이름의 전역 변수를 참조해야 하지만, `let` 과 `const` 로 선언한 변수도 `호이스팅` 이 발생하므로, `에러` 를 발생 시킵니다.

<br />

```javascript
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
      var x = 1;

      function myFunction() {
        // const 로 선언한 지역변수 x 의 선언문 이전에 참조하는 상태
        // ReferenceError 발생
        // => let, const 변수에 `호이스팅 (Hoistin)` 현상이 없다면, 에러가 아닌 `전역 변수 x` 를 참조하게 됩니다.
        console.log('x: ', x);

        const x = 333;
      }

      myFunction();
    </script>
  </body>
</html>
```


<br /><br />


## 6-2-2-2. this 바인딩

`this 바인딩` 은 `전역 환경 레코드` 와 `함수 환경 레코드` 에만 존재 합니다.

이전 단계에서 생성하였던 `객체 환경 레코드` 와 `선언적 환경 레코드` 에서는 `this 바인딩` 이 없습니다.

<br />

`전역 환경 레코드` 에는 `[[GlobalThisValue]]` 내부 슬롯이 있으며, 여기에 `전역 객체` 가 바인딩 됩니다.

그리고 전역 코드에서 `this` 를 참조하게 되면, `전역 환경 레코드` 의 `[[GlobalThisValue]]` 에 바인딩된 `전역 객체` 를 반환하게 됩니다.


<br /><br />


## 6-2-2-3. 외부 렉시컬 환경에 대한 참조 결정

`외부 렉시컬 환경에 대한 참조 (Outer Lexical Environment Reference)` 는 현재 평가중인 소스코드를 포함하고 있는, 외부 소스코드의 `렉시컬 환경 (Lexical Environment)` 을 가리킵니다.

`렉시컬 환경` 을 가리킨다는 것은, 해당 `렉시컬 환경` 에 속한 `환경 레코드` 를 참조하게 되고, 이 `환경 레코드` 의 프로퍼티인 `스코프` 를 참조하게 된다는 것입니다.

즉, `외부 렉시컬 환경에 대한 참조` 를 통해 `상위 스코프` 를 참조할 수 있게 됩니다.

* 이렇게 상위 스코프를 참조하는 구조에 의해 `스코프 체인 (Scope Chain)` 이 형성되고, 상위 스코프 방향으로만 참조할 수 있는 `단방향 연결 리스트` 구조를 갖게 됩니다.

<br />

지금까지 전역 소스코드를 `평가` 하면서 구성한 `전역 실행 컨텍스트` 를 `interface` 로 도식화하면 다음과 같습니다.

<br />

```typescript
// 전역 객체
interface GlobalObject {
  // 1. 전역 프로퍼티
  // 2. 전역 메서드
}

// 객체 환경 레코드
interface ObjectEnvironmentRecord {
  bindingObject: GlobalObject;
}

// 선언적 환경 레코드
interface DeclarativeEnvironmentRecord {
  //
}

// 전역 환경 레코드
interface GlobalEnvironmentRecord {
  // (아래 2개를 묶어서) 전역 스코프 역할
  // `전역 var 변수` 와 `함수 선언문으로 생성한 전역 함수` 를 관리 
  ObjectEnvironmentRecord: ObjectEnvironmentRecord;
  // `let` 이나 `const` 로 선언한 변수를 관리
  DeclarativeEnvironmentRecord: DeclarativeEnvironmentRecord;

  // 스코프 체인
  this: GlobalObject;

  // 추가로 아래의 요소를 가집니다.
  // 1. 빌트인 전역 프로퍼티
  // 2. 빌트인 전역 함수
  // 3. 표준 빌트인 객체
}

// 전역 렉시컬 환경
interface GlobalLexicalEnvironment {
  environmentRecord: GlobalEnvironmentRecord;

  // 최상위 실행 컨텍스트이므로, OuterLexicalEnvironmentReference 는 null 입니다.
  OuterLexicalEnvironmentReference: null;
};

// 전역 실행 컨텍스트
interface GlobalExecutionContext {
  // 전역 렉시컬 환경
  lexicalEnvironment: GlobalLexicalEnvironment;
}
```



<br /><hr /><br />



## 6-3. 전역 코드 실행

* `전역 코드 평가` 에서 수행하였던, `선언문` 처리 코드는 제외하고 나머지 전역 코드를 순차대로 실행 합니다.
* `변수` 나 `함수` 를 참조하게 되면, 선언된 식별자인지 확인 하며, 이를 `식별자 결정 (Identifier Resolution)` 이라고 합니다.
  * `식별자 결정` 은 현재 스코프에서 부터 진행합니다.
  * 현재 스코프에 해당 식별자가 없다면, 상위 스코프에서 찾습니다.
  * 전역 스코프는 `최상위 스코프` 이므로, 여기서 식별자를 찾지 못한다면 `ReferenceError` 를 발생 시킵니다.
* 전역 코드를 실행하는 중, `함수 호출부` 를 만나면, 전역 코드의 실행을 현재 실행 위치에서 일시정지 합니다.
* 호출한 `함수 내부` 에 `코드 제어권` 을 넘겨주며, `코드 제어권` 으로 `함수 코드 평가` 와 `함수 코드 실행` 과정을 실행 합니다.



<br /><hr /><br />



## 6-4. foo() 함수 코드 평가

`함수 코드 평가` 도 `전역 코드 평가` 와 유사한 흐름으로 동작하게 됩니다.

1. 함수 `실행 컨텍스트` 생성
2. 함수 `렉시컬 환경` 생성
    1. 함수 `환경 레코드` 생성
    2. `this` 바인딩
    3. `외부 렉시컬 환경` 에 대한 `참조` 결정


<br /><br />


## 6-4-1. 함수 실행 컨텍스트 생성

`함수 코드 평가` 단계가 시작되면, `함수 실행 컨텍스트` 를 생성 합니다.

그리고 이후 단계들을 통해 `함수 렉시컬 환경` 이 모두 `완성` 되면, `실행 컨텍스트 스택` 에 `추가 (push)` 되며, 추가된 현재 함수의 `함수 실행 컨텍스트` 가 `실행중인 실행 컨텍스트 (Running Execution Context)` 가 됩니다.


<br /><br />


## 6-4-2. 함수 렉시컬 환경 생성

`함수 렉시컬 환경` 을 생성하고, 현재 함수의 `실행 컨텍스트` 에 바인딩 합니다.


<br /><br />


## 6-4-2-1. 함수 환경 레코드 생성

`함수 환경 레코드 생성` 단계도 `전역 환경 레코드 생성` 과 역할면에서는 동일하며, `함수 환경 레코드` 가 관리하는 요소가 `전역 함수 레코드` 가 관리하는 요소와 달라집니다.

`함수 환경 레코드` 는 다음과 같은 요소를 `등록` 하고 `관리` 합니다.

* 매개변수
* 함수의 `arguments` 객체
* 함수 내부에서 선언한 `지역 변수`
* 함수 내부에서 선언한 `중첨 함수`


<br /><br />


## 6-4-2-2. this 바인딩

`전역 렉시컬 환경` 에는 `[[GlobalThisValue]]` 내부슬롯이 있었습니다.

`함수 렉시컬 환경` 는 대신에 `[[ThisValue]]` 내부슬롯을 가집니다.

`[[ThisValue]]` 내부슬롯에 바인딩되는 `this 객체` 는, 이 함수를 `호출한 방식` 에 따라 결정 됩니다.


<br /><br />


## 6-4-2-3. 외부 렉시컬 환경에 대한 참조 결정

현재 함수 정의가 `평가된 시점에 실행중인`(현재 함수를 정의한) `실행 컨텍스트` 의 `렉시컬 환경` 의 `참조값` 이 할당 됩니다.

위 예시코드에서 `foo()` 함수를 대상으로 살펴보는 중이며, `foo()` 함수를 `정의` 하고 있는 스코프는 `전역 스코프` 이므로, `전역 렉시컬 환경` 에 대한 `참조값` 이 `foo()` 함수의 `외부 렉시컬 환경에 대한 참조` 에 할당 됩니다.

<br />

이렇게 함수 자신이 정의된 상위 스코프의 `렉시컬 환경` 에 대한 `참조값` 을, 함수 자신의 `[[Environment]]` 내부슬롯에 저장하게 됩니다.

`외부 렉시컬 환경에 대한 참조값` 을 함수 자신의 `[[Environment]]` 에 저장하는 메커니즘에 의해, `클로저 (Closure)` 현상이 나타나게 됩니다.

<br />

지금까지 함수 소스코드를 `평가` 하면서 구성한 `함수 실행 컨텍스트` 를 `interface` 로 도식화하면 다음과 같습니다.

<br />

```typescript
// 전역 객체
interface GlobalObject {
  // 1. 전역 프로퍼티
  // 2. 전역 메서드
}

// 객체 환경 레코드
interface ObjectEnvironmentRecord {
  bindingObject: GlobalObject;
}

// 선언적 환경 레코드
interface DeclarativeEnvironmentRecord {
  //
}

// 전역 환경 레코드
interface GlobalEnvironmentRecord {
  // (아래 2개를 묶어서) 전역 스코프 역할
  // `전역 var 변수` 와 `함수 선언문으로 생성한 전역 함수` 를 관리 
  ObjectEnvironmentRecord: ObjectEnvironmentRecord;
  // `let` 이나 `const` 로 선언한 변수를 관리
  DeclarativeEnvironmentRecord: DeclarativeEnvironmentRecord;

  // 스코프 체인
  this: GlobalObject;

  // 추가로 아래의 요소를 가집니다.
  // 1. 빌트인 전역 프로퍼티
  // 2. 빌트인 전역 함수
  // 3. 표준 빌트인 객체
}

// 전역 렉시컬 환경
interface GlobalLexicalEnvironment {
  environmentRecord: GlobalEnvironmentRecord;

  // 최상위 실행 컨텍스트이므로, OuterLexicalEnvironmentReference 는 null 입니다.
  OuterLexicalEnvironmentReference: null;
};

// // 전역 실행 컨텍스트
// interface GlobalExecutionContext {
//   // 전역 렉시컬 환경
//   lexicalEnvironment: GlobalLexicalEnvironment;
// }

// foo 함수 환경 레코드
interface foo_FunctionEnvironmentRecord {
  // 매개변수
  a: any;

  // 함수의 인수 관리 객체
  arguments: object;

  // var x 로 선언한 지역 변수
  x: any;
  // const y 로 선언한 지역 변수
  y: any;

  // 내부함수 function bar()
  bar: Function;
}

// foo 함수 렉시컬 환경
interface foo_LexicalEnvironment {
  environmentRecord: foo_FunctionEnvironmentRecord;
  this: GlobalObject;
  outerLexicalEnvironmentReference: GlobalLexicalEnvironment;
}

// foo 함수 실행 컨텍스트
interface foo_ExecutionContext {
  lexicalEnvironment: foo_LexicalEnvironment;
}
```



<br /><hr /><br />



## 6-5. foo() 함수 코드 실행

`전역 코드 실행` 과정과 같이 `함수 코드 실행` 과정에서도 `런타임` 이 시작하는 단계 입니다.

함수 내부의 코드를 순차적으로 실행하며, `식별자 참조` 가 있을 경우, `식별자 결정` 메커니즘을 수행 합니다.

<br />

`전역 코드 실행` 에서의 `식별자 결정` 과 동일한 동작을 하므로, `현재 함수` 의 `렉시컬 환경` 에서 부터 `식별자 검색` 을 실행 합니다.

현재 렉시컬 환경에 해당 `식별자` 가 있다면, 이 식별자를 사용하게 됩니다.

만약 현재 렉시컬 환경에서 `식별자` 를 찾지 못하였다면, `외부 렉시컬 환경에 대한 참조` 를 통하셔 `상위 렉시컬 환경` 에서 `식별자 검색` 을 합니다.

이 과정은 `식별자` 를 찾을 때 까지 하며, 만약 `최상위 렉시컬 환경` 에서도 찾지 못하였다면, `ReferenceError` 를 발생 시킵니다.



<br /><hr /><br />



## 6-6. bar() 함수 코드 평가

`foo() 함수 코드 평가` 와 동일한 동작을 합니다. 

`bar()` 함수가 정의된 `상위 렉시컬 환경` 은 `foo()` 함수 이므로, `bar()` 함수의 `외부 렉시컬 환경에 대한 참조값` 은 `foo()` 함수의 `렉시컬 환경` 에 대한 `참조값` 이 할당 됩니다.



<br /><hr /><br />



## 6-7. bar() 함수 코드 실행

`foo() 함수 코드 실행` 과 동일한 동작을 하므로, `식별자 결정` 메커니즘 역시 동일한 방식으로 실행 됩니다.

<br />

`bar()` 함수의 내부에서 `console.log(a + b + x + y + z)` 가 있습니다.

이 코드를 실행하기 위해서는 다음과 같은 과정이 필요 합니다.

1. `console` 객체에 대한 `식별자 결정` 하기
2. `console` 객체를 찾았다면, `console` 객체에서 `log()` 메서드 검색하기
3. 매개변수에 작성된 `표현식` 평가하기
4. `console.log(표현식_결과값)` 으로 메서드 호출하기


<br /><br />


## 6-7-1. console 객체에 대한 식별자 결정 하기

이전에 살펴본 것과 같이, `식별자 결정` 은 `렉시컬 환경` 에서 수행 합니다.

`렉시컬 환경` 에는 `외부 렉시컬 환경에 대한 참조값` 이 있으며, `외부 렉시컬 환경에 대한 참조값` 으로 `스코프 체인` 을 형성 합니다.

그러므로 현재 실행중인 함수인 `bar()` 함수의 `렉시컬 환경`, 즉 `bar() 함수 스코프` 에서 `console` 객체를 검색합니다.

<br />

`bar()` 함수의 `렉시컬 환경` 에는 `console` 객체에 대한 `선언문` 이 없으므로, `bar()` 함수의 `렉시컬 환경` 에 있는 `외부 렉시컬 환경에 대한 참조값` 을 통해 `상위 렉시컬 환경` 에서 `console` 객체를 찾기 시작합니다.

여기서 `상위 렉시컬 환경` 은 `bar()` 함수가 `정의된`, `foo()` 함수의 `렉시컬 환경` 이 됩니다.

<br />

`foo()` 함수의 `렉시컬 환경` 에서도 `console` 을 찾을 수 없었으므로, `foo()` 함수의 `외부 렉시컬 환경에 대한 참조값` 을 따라, `상위 스코프` 에서 `console` 객체를 검색하게 됩니다.

* `클로저 (Closure)` 현상의 핵심인 `외부 렉시컬 환경에 대한 참조값` 을 한번 더 강조하며, `외부 렉시컬 환경에 대한 참조값` 은 `foo()` 함수가 `정의` 된 `렉시컬 환경` 입니다.

<br />

`foo()` 함수의 `상위 스코프` 는 `전역 렉시컬 환경` 이므로, `전역 렉시컬 환경` 에서 `console` 객체를 검색하게 됩니다.

<br />

`전역 렉시컬 환경` 은 아래와 같이 두가지로 구성되어 있습니다.

* 객체 환경 레코드
* 선언적 환경 레코드

<br />

`console` 객체는 `전역 렉시컬 환경` 의 `객체 환경 레코드` 의 `bindingObject (전역 객체)` 에서 찾을 수 있습니다.

* `식별자` 검색은 `렉시컬 환경` 에 속한 `this 바인딩` 을 사용하는 것이 아닙니다.
* `식별자` 검색은 `렉시컬 환경` 에 속한 `환경 레코드` 에서 검색합니다.


<br /><br />


## 6-7-2. log 메서드 검색

`식별자 결정` 을 통해서 `console` 객체를 찾은 시점 입니다.

이번에는 `console` 객체에서 `log()` 메서드를 찾습니다.

객체의 프로퍼티나 메서드를 검색할 때는 해당 객체가 `직접 소유한` 프로퍼티와 메서드를 먼저 찾습니다.

만약 찾는 `식별자` 가 없다면, 해당 객체의 `프로토타입 체인 (Prototype Chain)` 을 통해서 `최상위 프로토타입` 까지 검색하게 됩니다.

<br />

`log()` 메서드는 `console` 객체가 직접 소유한 메서드 이므로, `log()` 메서드를 찾을 수 있습니다.


<br /><br />


## 6-7-3. 표현식 a + b + x + y + z 의 평가

`console.log()` 에 넘겨주는 표현식인 `a + b + x + y + z` 를 평가 합니다.

각 `식별자` 는 지금까지와 마찬가지로, `스코프 체인` 에서 검색합니다.

즉, `현재 렉시컬 환경` 에서 검색을 시작하여 `외부 렉시컬 환경에 대한 참조값` 을 통해 `상위 렉시컬 환경` 에서 검색을 합니다.

<br />

이렇게 검색한 각 `식별자` 의 위치는 다음과 같습니다.

* `a`: `foo()` 함수의 렉시컬 환경
* `b`: `bar()` 함수의 렉시컬 환경
* `x`: `foo()` 함수의 렉시컬 환경
* `y`: `foo()` 함수의 렉시컬 환경
* `z`: `bar()` 함수의 렉시컬 환경


<br /><br />


## 6-7-4. console.log 메서드 호출

`console.log()` 메서드에 `인수` 로 넘겨주는 `a + b + x + y + z` 표현식을 평가합니다.

평가 결과 `42` 를 `console.log(인수)` 에 넘겨주며 메서드 호출을 합니다.



<br /><hr /><br />



# 6-8. bar 함수 종료

`bar()` 함수를 끝까지 실행 완료 하였다면, `bar()` 함수를 종료 합니다.

함수를 종료할 때, 이 함수를 평가하면서 생성하였던 `함수 실행 컨텍스트` 를 `실행 컨텍스트 스택` 에서 `제거(pop)` 합니다.

<br />

이 때 `bar()` 함수의 `실행 컨텍스트` 가 `실행 컨텍스트 스택` 에서 `제거 (pop)` 되었지만, `bar()` 함수의 `렉시컬 환경` 까지 바로 제거되지는 않습니다.

이는 `가비지 컬렉터` 에 의해 `메모리` 에서 제거될 때, `bar()` 함수의 `렉시컬 환경` 이 제거되게 되며, 이는 `bar()` 함수의 `렉시컬 환경` 을 아무도 참조하고 있지 않을때만 수행 됩니다.

즉, `bar()` 함수는 종료 되었지만 `bar()` 함수의 `렉시컬 환경` 을 누군가가 참조하고 있다면, `bar()` 함수의 `렉시컬 환경` 은 계속 유지됩니다.

<br />

정리하면 다음과 같습니다.

1. 함수 종료
2. 해당 함수의 `실행 컨텍스트` 를 `실행 컨텍스트 스택` 에서 `제거(pop)`
3. 만약 해당 함수의 `렉시컬 환경` 을 아무도 참조하지 않는다면, `가비지 컬렉터` 에 의해 `메모리` 에서도 `제거`

<br />

`bar()` 함수의 `실행 컨텍스트` 가 `실행 컨텍스트 스택` 에서 `제거 (pop)` 되면, 다음 순서인 `foo()` 함수의 `실행 컨텍스트` 가 `최상위 실행 컨텍스트` 가 되며, `foo()` 함수를 재개합니다.



<br /><hr /><br />



# 6-9. foo 함수 코드 실행 종료

`foo()` 함수가 종료되면, `foo()` 함수의 `실행 컨텍스트` 는 `실행 컨텍스트 스택` 에서 `제거 (pop)` 됩니다.

그리고 다음 `실행 컨텍스트` 이자 `마지막 실행 컨텍스트` 인 `전역 실행 컨텍스트` 가 재개됩니다.



<br /><hr /><br />



# 6-10. 전역 코드 실행 종료

전역 코드를 모두 실행한 뒤, 전역 코드를 종료 합니다.

그리고 `전역 실행 컨텍스트` 를 `실행 컨텍스트 스택` 에서 `제거 (pop)` 합니다.

이로써 `실행 컨텍스트 스택` 에는 아무것도 없게 되며, 프로그램을 종료 합니다.



<br /><hr /><br />



# 7. 실행 컨텍스트와 블록 레벨 스코프

`var로 선언한 변수` 는 `함수 레벨 스코프 (Function Level Scope)` 를 따릅니다.

이는 `if 문` 이나 `for 문` 과 같은 블록에 대한 스코프 구분을 하지 않는 것 입니다.

그러므로 아래 코드처럼 중첩된 블록에 `var x` 를 선언하여도, 이는 `중복 선언` 으로 동작하게 됩니다.

<br />

```javascript
var x = 1;

if (true) {
  var x = 3;
}

console.log('x: ', x); // x: 3
```

<br />

`let` 과 `const` 로 선언한 변수는 `블록 레벨 스코프 (Block Level Scope)` 를 따릅니다.

그래서 블록 내부에 선언한 `let` 또는 `const` 변수는 `var 변수` 와는 다르게 동작 합니다.

<br />

```javascript
const x = 10;
let y = 30;

if (true) {
  const x = 100;
  let y = 300;
}

// x: 10
console.log('x: ', x);

// y: 30
console.log('y: ', y);
```

<br />

`let` 과 `const` 변수가 `블록 레벨 스코프 (Block Level Scope)` 를 따르는 이유는 다음과 같습니다.

* `if 문` 이나 `for 문` 처럼 `블록` 을 가지는 코드를 실행하면, `블록 레벨 스코프` 를 생성해야 합니다.
* 이를 위해 새로운 `렉시컬 환경` 을 만들고, 여기에는 `선언적 렉시컬 환경` 이 속해 있습니다.
* `선언적 렉시컬 환경` 은 현재 블록에서 선언한 변수를 등록하고 관리 합니다.
* 그리고 `선언적 렉시컬 환경` 의 `외부 렉시컬 환경에 대한 참조값` 으로 현재 블록이 정의된 렉시컬 환경에 대한 참조값이 할당됩니다.
* 블록 내에 선언한 `let` 이나 `const` 변수는, 현재 블록을 위해 생성한 `렉시컬 환경` 의 `환경 레코드` 의 `선언적 환경 레코드` 에 등록되므로, 이 변수에 값을 할당하는 것은 `외부 스코프` 즉, `외부 렉시컬 환경` 에 등록된 변수에는 영향을 줄 수 없습니다.

<br />

정리하면 `if 문` 이나 `for 문` 처럼 `블록` 을 실행하게 되면, 해당 블록에 대한 새로운 `렉시컬 환경` 을 생성하고, 여기에 속한 `환경 레고크` 의 `선언적 환경 레코드` 에는 `let` 이나 `const` 로 선언한 변수가 등록되기 때문입니다.
