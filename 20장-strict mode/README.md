# 20장. strict mode

# 1. strict mode란?

자바스크립트는 문법에 대해 매우 관대한 언어 입니다.

아래의 코드는 선언하지 않은 변수 `x` 에 값을 할당하고 접근하는 문법적으로 문제가 되는 코드 입니다.

<br />

```javascript
function myFunction() {
  someValue = 3;
}

myFunction();

// "someValue: 3"
console.log('someValue: ', someValue);
```

<br />

`someValue` 는 선언하지 않은 변수지만, `myFunction()` 에서 값을 할당하고 있습니다.

자바스크립트 엔진은 현재 `함수 스코프` 에서 변수 선언문을 찾지 못하면, 상위 스코프에서 해당 변수의 선언문을 찾고, 이를 최상위 함수 스코프까지 올라가서 찾게 됩니다.

위 코드에서는 최상위 함수 스코프인 전역 스코프에서도 `someValue` 의 변수 선언문을 찾을 수 없습니다.

<br />

이러한 경우, 자바스크립트 엔진은 `암묵적` 으로 `전역 변수 someValue` 를 생성하고, 해당 코드에서 에러가 발생하지 않도록 합니다.

이러한 자바스크립트 엔진의 동작을 `암묵적 전역 (Implicit Global)` 이라고 합니다.

<br />

`암묵적 전역 (Implicit Global)` 현상은 개발자가 의도하지 않은 동작이기 때문에, `오류의 원인` 이 됩니다.

그래서 이러한 자바스크립트 엔진의 관대한 동작을 좀 더 엄격하게 하기 위한 방법으로 `ES5` 버전에서 `strict mode` 가 추가 되었습니다.

<br />

자바스크립트에서 지원해주는 `strict mode` 는 위 코드처럼 문제의 원인이 될 수 있는 코드에서 에러를 발생시켜 줍니다.

`strict mode` 에서 에러를 발생시키는 코드는 다음과 같습니다.

* 오류를 발생시킬 가능성이 높은 코드
* 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드

<br />

`strict mode` 의 엄격한 동작에 추가로 `코딩 컨벤션` 까지 적용하고자 한다면, `ESLint` 와 같은 `린트 도구` 를 사용할 수 있습니다.

`린트 도구` 는 `정적 코드 분석` 기능을 제공하기 때문에 런타임 이전 시점, 다시말해 코드를 실행하기 전부터 `오류의 원인` 을 `리포팅` 해줍니다.



<br /><hr /><br />



# 2. strict mode 의 적용

`strict mode` 의 범위는 다음과 같이 지정할 수 있습니다.

* 전역 스코프
* 함수 스코프

<br />

`strict mode` 를 적용하는 키워드는 `'use strict';` 이며, 아래와 같이 적용시킵니다.

<br />

```javascript
"use strict";

// ... 이하 프로그램 코드 ...
```

<br />

아래의 코드는 `전역 스코프` 에 적용한 `strict mode` 입니다.

<br />

```javascript
"use strict";

function myFunction() {
  // ReferenceError: someValue is not defined
  someValue = 3;
}

myFunction();
```

<br />

아래의 코드는 `함수 스코프` 에 적용한 `strict mode` 입니다.

<br />

```javascript
function myFunction() {
  "use strict";

  someValue = 3;
}

myFunction();
```



<br /><hr /><br />



# 3. 전역에 strict mode 를 적용하는 것은 피하자

`strict mode` 는 `<script />` 단위로 적용 됩니다.

그래서 `전역에 strict mode` 를 적용하는 경우, 모든 `<script />` 에 `strict mode` 를 적용지 못하여, `strict mode` 와 `non-strict mode` 가 혼용되는 상황이 생길 수 있습니다.

이러한 경우는 라이브러리를 사용할 경우, 해당 라이브러리가 `non-strict mode` 로 구현되어 있을 때 발생할 수 있습니다.

<br />

이렇게 `strict mode` 와 `non-strict mode` 를 혼용하게 되면, `오류를 발생` 시킬 수 있기 때문에, `전역 strict` 는 피해야 합니다.

만약, `전역 strict mode` 를 사용하고 싶다면, 코드 전체를 `즉시 실행 함수 (IIF)` 로 묶고, 해당 함수의 선두에 `'use strict';` 를 명시하도록 합니다.

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
      (function() {
        "use strict";

        function myFunction() {
          const someValue = 3;

          return someValue;
        }

        // "return value of myFunction() is 3"
        console.log(`return value of myFunction() is ${myFunction()}`);
      }());
    </script>
  </body>
</html>
```



<br /><hr /><br />



# 4. 함수 단위로 strict mode 를 적용하는 것도 피하자

`strict mode` 를 `함수 단위` 로도 적용할 수 있습니다.

하지만 모든 함수의 선두에 `'use strict';` 를 명시하는 것은 매우 번거롭고 누락될 여지도 큽니다.

만약 `strict mode` 인 함수 내부에서 `non-strict mode` 함수를 호출한다면, 이 역시 `오류를 발생` 시킬 수 있게 됩니다.

<br />

이러한 이유로 각각의 함수에 개별로 `strict mode` 를 적용하는 것도 바람직하지 못합니다.

그러므로, 위에서 살펴본 것과 같이 코드 전체를 `즉시 실행 함수 (IIF)` 로 묶고, 이 함수에 `strict mode` 를 적용시키는 것이 바람직합니다.



<br /><hr /><br />



# 5. strict mode 가 발생시키는 에러

`strict mode` 를 적용했을 때, 대표적으로 아래와 같은 에러를 마주할 수 있습니다.

1. `암묵적 전역` 사용
  * 선언하지 않은 변수를 참조할 경우 발생하는 에러 입니다.

2. 변수, 함수, 매개변수의 삭제 (`delete` 키워드의 잘못된 사용)
  * `delete` 연산자를 변수나 함수, 매개변수에 사용하면 발생하는 에러 입니다.

3. 매개변수 이름의 중복
  * 동일한 스코프에 변수를 `중복 선언` 할 경우 발생하는 에러 입니다.

4. with 문의 사용
  * `with 문` 에 전달한 객체를 `스코프 체이` 에 추가하는 기능 입니다.
  * `with 문` 의 `블록 내부` 에서는 전달한 객체를 마치 전역처럼 사용할 수 있게 됩니다.
  * 성능과 가독성이 나빠지는 문제점이 있습니다.
  * `with 문` 을 사용하는 것 자체로 에러가 발생 합니다.



<br /><hr /><br />



# 6. strict mode 적용에 의한 변화

## 6-1. 일반 함수의 this

`strict mode` 에서 함수를 `일반 함수 ([[Caller]])` 로 호출하게 되면, 해당 함수 스코프의 `this` 는 `undefined` 가 바인딩 됩니다.

에러는 발생하지 않지만, `this` 를 통한 프로퍼티 접근은 `ReferenceError` 가 발생 합니다.

<br />

```javascript
(function() {
  'use strict';

  function myFunction() {
    console.log('this is myFunction(): ', this);
  }

  // "this is myFunction(): undefined"
  myFunction();

  // "this is myFunction(): myFunction() {}"
  new myFunction();
}());
```



<br /><hr /><br />



## 6-2. arguments 객체

함수는 `인자 (Parameter)` 를 정의할 수 있습니다.

만약 `정의된 인자` 보다 많은 개수의 `인수 (arguments)` 를 넘겨주면, `함수 스코프` 의 `arguments 객체` 를 통해서 실제로 전달받은 모든 인수에 접근할 수 있습니다.

`strict mode` 에서는 함수에 전달한 `인수 (arguments)` 를, 함수 내부에서 `값을 재할당` 하였을 경우에 `arguments 객체` 에는 반영되지 않습니다.

<br />

```javascript
(function(arg0, arg1) {
  'use strict';

  arg0 = 'Hello World';
  arg1 = ['value of index 0', 'value of index 1'];

  /** 실행 결과
   * [Arguments] {
   *    '0': 'first initial arg',
   *    '1': { a: 'value of a', b: 'value of b' }
   *  }
   * }
   **/
  console.log(arguments);
}(
  'first initial arg',
  { a: 'value of a', b: 'value of b' }
));
```

<br />

주의할 점은 인수가 `객체` 일 때, `객체의 프로퍼티` 값을 변경하는 것은 `arguments` 에 반영 됩니다.

이유는 `인수의 값` 이 `객체의 참조값` 이기 때문입니다.

<br />

```javascript
(function(objArg) {
  'use strict';

  objArg.a = 'Hello';
  objArg.b = 'World';

  /** 실행 결과
   * [Arguments] {
   *    a: 'Hello',
   *    b: 'World'
   * }
   **/
  console.log(arguments);
}({
  a: 'initial value of a',
  b: 'initial value of b',
}));
```
