# 21장. 빌트인 객체

# 1. 자바스크립트 객체의 분류

자바스크립트의 객체는 크게 3가지로 분류할 수 있습니다.

* 표준 빌트인 객체 (`standard built-in object` / `native object` / `global object`)
  * 자바스크립트의 실행환경에 상관없이 애플리케이션 전역의 공통 기능을 제공 합니다.

* 호스트 객체 (`host object`)
  * 자바스크립트의 실행 환경에 따라 추가로 제공되는 객체 입니다.

* 사용자 정의 객체 (`user-defined object`)
  * 사용자가 직접 정의한 객체를 말합니다.

<br />

여기서 `실행 환경` 이라고 표현한 부분은 자바스크립트가 실행되는 환경을 말합니다.

자바스크립트는 아래 2가지의 환경에서 실행할 수 있으며, 실행 환경에 따라 추가로 제공되는 `호스트 객체 (host objects)` 가 달라집니다.

* `Node.js` 환경
* `브라우저` 환경



<br /><hr /><br />



# 2. 표준 빌트인 객체

자바스크립트는 `표준 빌트인 객체 (standard built-in objects / native objects / global objects)` 를 제공 합니다.

`표준 빌트인 객체` 의 종류는 40여 가지며, 우리가 익숙한 객체들이 포함되어 있습니다.

* `String`
* `Number`
* `Boolean`
* `Function`
* `Symbol`
* `Date`
* `Array`
* `Math`
* `Reflect`
* `JSON`
* 기타 등등..

<br />

`표준 빌트인 객체` 는 다시 2가지로 분류할 수 있습니다.

* `생성자 함수` 객체
* `생성자 함수가 아닌` 객체

<br />

`생성자 함수` 인 `표준 빌트인 객체` 는 인스턴스를 만들 수 있습니다.

그리고 `생성자 함수가 아닌` 객체인 `표준 빌트인 객체` 는 인스턴스를 만들수는 없습니다.

이 두가지의 차이점은 다음과 같습니다.

<br />

|---|생성자 함수인 표준 빌트인 객체|생성자 함수가 아닌 표준 빌트인 객체|
|---:|:---:|:---:|
|`인스턴스 생성` 기능|⭕️|❌|
|`표준 빌트인 객체.prototype` 존재|⭕️|❌|
|`정적 메서드 (static method)` 제공|⭕️|⭕️|

<br />

즉, `표준 빌트인 객체` 중에서 `생성자 함수` 가 아닌 객체는 `[[Caller]]` 가 없는, 함수 아닌 객체 입니다.

그러므로, `정적 메서드 (static method)` 만을 제공하는 유틸리티 기능을 제공 합니다.

<br />

자바스크립트에서 제공하는 `생성자 함수` 가 아닌 `표준 빌트인 객체` 는 3개가 있습니다.

* `Math`
* `Reflect`
* `JSON`



<br /><hr /><br />



# 3. 원시값과 래퍼 객체

위에서 살펴보았던 `표준 빌트인 객체` 에는 각 `원시값` 에 해당하는 객체도 있었습니다.

* `문자열` 과 `String`
* `숫자` 와 `Number`
* `불리언` 과 `Boolean`

<br />

`원시값` 은 객체와는 엄연히 다른 형태의 데이터이며, 우리가 흔히 사용했던 `'Hello World'.toUpperCase()` 처럼 `메서드` 를 사용할 수 없어야 합니다.

자바스크립트 엔진은 `문자열` 과 `숫자`, `불리언` 에 대해서는 다음과 같은 추가 동작을 해줍니다.

<br />

1. `문자열`, `숫자`, `불리언` 원시값을 사용하여 프로퍼티 접근을 하였는가?
    * `YES` 라면, 자바스크립트 엔진은 아래의 동작을 하게 됩니다.

2. `원시값` 에 해당하는 `표준 빌트인 객체` 를 찾습니다. (암묵적으로 `연관 객체` 찾기)
    * `문자열` -> `String`
    * `숫자` -> `Number`
    * `불리언` -> `Boolean`

3. `연관 객체` 를 사용하여 `원시값` 을 갖는 `임시 객체` 를 생성 합니다. (`래퍼 객체` 생성)
    * `연관 객체` 는 `생성자 함수` 이므로, `prototype` 을 가집니다.
    * `원시값` 은 연관 객체의 `인스턴스` 로 대체되며, 이렇게 대체되는 인스턴스를 `래퍼 객체` 라고 합니다.
    * `래퍼 객체` 는 인스턴스 이므로, `연관 객체` 의 `prototype` 을 상속 받게 됩니다.
    * `연관 객체` 에서 상속받은 `인스턴스 메서드` 를 가지게 됩니다.

4. `래퍼 객체` 의 프로퍼티 접근이나 메서드 호출이 끝나면, `래퍼 객체` 를 원래의 `원시값` 으로 되돌립니다.

5. 사용후 다시 `원시값` 으로 대체된 `래퍼 객체` 는 더이상 참조하지 않기 때문에, `가비지 컬렉션` 의 대상이 됩니다.
    * 지금까지의 `래퍼 객체` 동작은 `원시값` 으로 프로퍼티 접근이나 메서드 호출을 할 때마다 수행 됩니다.
    * 그러므로, `원시값` 에 동적 프로퍼티를 추가하여 값을 할당하는 것은, 해당 `문 (statement)` 가 종료되는 순간 존재하지 않게 됩니다.

<br />

```javascript
const client = 'Chocobe';

// `래퍼 객체`.a 에 값을 할당하게 됩니다.
client.a = 'Hello World';

// 위 `문 (statement)` 가 종료 되었으므로, client 는 다시 `원시값` 이 된 시점 입니다.

// client 는 다시 새로운 `래퍼 객체` 로 임시 변환됩니다.
// 그러므로, `client.a` 는 존재하지 않는 프로퍼티 입니다.
// "client.a: undefined"
console.log('client.a: ', client.a);
```

<br />

추가로 `null` 과 `undefined` 타입은 `래퍼 객체` 를 생성하지 않기 때문에, `null` 이나 `undefined` 의 프로퍼티에 접근하려고 하면 에러가 발생 합니다.



<br /><hr /><br />



# 4. 전역 객체

`전역 객체 (global object)` 는 코드를 실행하기 전 단계에서 가장 먼저 생성되는 특수한 객체 입니다.

자바스크립트의 실행 환경에 따라 `전역 객체` 가 달라지며, 실행 환경별 `전역 객체` 는 다음과 같습니다.

* `브라우저` 환경의 전역 객체: `window`
* `Node.js` 환경의 전역 객체: `global`

<br />

모든 자바스크립트 객체 중 가장 먼저 생성되는 `전역 객체` 는 계층적 구조상에서도 `최상위` 객체 입니다.

즉, `전역 객체` 는 어떠한 객체에도 속하지 않은 유일한 객체 입니다.

<br />

자바스크립트가 제공하는 `표준 빌트인 객체 (standard built-in objects)` 와 `호스트 객체 (host objects)` 는 `전역 객체` 에 속하는 `전역 객체 프로퍼티` 입니다.

지금까지 `표준 빌트인 객체` 를 사용할 때, `window.String` 처럼 사용하지 않고, `String` 으로 사용하였는데, 이는 `전역 객체` 의 프로퍼티는 `전역 객체` 를 생략할 수 있기 때문입니다.

<br />

아래의 코드는 `Node.js` 환경에서 다양한 방법으로 `Array` 객체를 생성하는 예시 입니다.

```javascript
(function() {
  const arr0 = [1, 2];
  const arr1 = new Array(10, 20);
  const arr2 = new global.Array(100, 200);
  const arr3 = new globalThis.Array(1000, 2000);

  // "[1, 2]: [1, 2]"
  console.log('[1, 2]: ', arr0);

  // "new Array(10, 20): [10, 20]"
  console.log('new Array(10, 20): ', arr1);

  // "new global.Array(100, 200): [100, 200]"
  console.log('new global.Array(100, 200): ', arr2);

  // "new globalThis.Array(1000, 2000): [1000, 2000]"
  console.log('new globalThis.Array(1000, 2000): ', arr3);
}());
```

<br />

아래의 코드는 `브라우저` 환경에서 다양한 방법으로 `Array` 객체를 생성하는 예시 입니다.

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
        const arr0 = [1, 2];
        const arr1 = new Array(10, 20);
        const arr2 = new window.Array(100, 200);
        const arr3 = new globalThis.Array(1000, 2000);

        // "[1, 2]: [1, 2]"
        console.log('[1, 2]: ', arr0);

        // "new Array(10, 20): [10, 20]"
        console.log('new Array(10, 20): ', arr1);

        // "new window.Array(100, 200): [100, 200]"
        console.log('new window.Array(100, 200): ', arr2);

        // "new globalThis.Array: [1000, 2000]"
        console.log('new globalThis.Array(1000, 2000): ', arr3);
      }());
    </script>
  </body>
</html>
```

<br />

위 코드에서 `Array 표준 빌트인 객체` 에 접근하기 위해 `globalThis.Array` 를 사용한 부분이 있습니다.

`globalThis` 는 자바스크립트의 실행환경에 따라 달라지는 `전역 객체` 의 이름을 하나로 통일한 `전역 객체` 입니다.

`ES11` 에서 추가된 기능이며 표준 사양이므로, 제약 사항 없이 사용할 수 있습니다.

<br />

`표준 빌트인 객체` 와 `호스트 객에` 뿐만 아니라, `전역 객체` 의 프로퍼티가 되는 요소로는 다음과 같습니다.

* `var 키워드` 로 선언한 `전역 변수`
* `암묵적 전역` (선언하지 않은 변수에 값을 할당할 경우)
* `전역 함수`

<br />

```javascript
globalThis.myGlobalFunction = function() {
  return 'called myGlobalFunction';
};

globalThis.myGlobalVar = 'value of myGlobalVar';

(function() {
  implicitGlobal = 'value of implicitGlobal';

  // "globalThis.implicitGlobal: value of implicitGlobal"
  console.log('globalThis.implicitGlobal: ', globalThis.implicitGlobal);

  // "globalThis.myGlobalVar: value of myGlobalVar"
  console.log('globalThis.myGlobalVar: ', globalThis.myGlobalVar);

  // "globalThis.myGlobalFunction(): called myGlobalFunction()"
  console.log('globalThis.myGlobalFunction(): ', globalThis.myGlobalFunction());
}());
```

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
      function myGlobalFunction() {
        return 'called myGlobalFunction()';
      }

      var myGlobalVar = 'value of myGlobalVar';

      (function() {
        implicitGlobal = 'value of implicitGlobal';

        // "globalThis.myGlobalVar: value of myGlobalVar"
        console.log('globalThis.myGlobalVar: ', globalThis.myGlobalVar);

        // "globalThis.implicitGlobal: value of implicitGlobal"
        console.log('globalThis.implicitGlobal: ', globalThis.implicitGlobal);

        // "globalthis.myGlobalFunction(): called myGlobalFunction()"
        console.log('globalThis.myGlobalFunction(): ', globalThis.myGlobalFunction());
      }());
    </script>
  </body>
</html>
```



<br /><hr /><br />



# 5. 빌트인 전역 프로퍼티

`전역 객체 (globalThis / window / global)` 의 프로퍼티를 `빌트인 전역 프로퍼티 (built-in global property)` 라고 합니다.

애플리케이션 전역에서 자유롭게 사용할 수 있습니다.

* `Infinity`
  * `Number` 타입이며 `무한대` 를 의미합니다.

* `NaN`
  * `Number` 타입이며 `숫자가 아님` 을 의미합니다.
  * `Number.NaN` 과 동일합니다.

* `undefined`
  * `초기화 되지 않은 값` 또는 `존재하지 않는 값` 을 의미합니다.



<br /><hr /><br />



# 6. 빌트인 전역 함수

`빌트인 전역 함수 (built-in global function)` 는 `전역 객체 (globalThis / window / global)` 의 메서드 입니다.

`빌트인 전역 함수` 는 다음과 같습니다.

* `eval()`
* `isFinite()`
* `isNaN()`
* `parseFloat()`
* `parseInt()`
* `encodeURI() / decodeURI()`
* `encodeURIComponent() / decodeURIComponent()`



<br /><hr /><br />



## 6-1. eval()

`eval()` 함수는 `인자 (Parameter)` 로 `문자열` 을 받고, 이 문자열을 런타임에 `자바스크립트 코드` 로 해석하여 실행 합니다.

기본적인 동작은 `eval()` 이 호출된 `함수 스코프` 를 동적으로 수정합니다.

즉, `eval()` 에 넘겨준 문자열에 `변수 선언문` 이 있다면, `eval()` 호출된 함수 스코프의 변수가 됩니다.

<br />

```javascript
(function() {
  eval(`
    var myVar = 'value of myVar';
  `);

  // "myVar: value of myVar"
  console.log('myVar: ', myVar);
}());
```

<br />

만약 `eval()` 에 넘겨준 문자열에 `let` 이나 `const` 키워드를 사용한 변수 선언문이 있다면,  `eval()` 을 암묵적으로 `strict mode` 로 실행 시킵니다.

`strict mode` 로 실행된 `eval()` 은 현재 함수 스코프를 변경하지 않고, `새로운 하위 함수 스코프` 를 생성하여 실행 시킵니다.

즉, `eval()` 에서 선언한 변수는 `eval()` 내부에서만 접근할 수 있는 `지역 변수` 가 됩니다.

<br />

```javascript
(function() {
  eval(`
    const arr = [1, 2, 3, 4, 5];
    let total = 0;

    total = arr.reduce((total curValue) => {
      return total + curValue;
    }, 0);
  `);

  // ReferenceError: total is not defined
  console.log('total: ', total);
}());
```

<br />

```javascript
(function() {
  const sumFromEval = eval(`(lhs, rhs) => {
    return lhs + rhs;
  }`);

  const subFromEval = eval(`(lhs, rhs) => {
    return lhs - rhs;
  }`);

  // "sumFromEval(1, 2): 3"
  console.log('sumFromEval(1, 2): ', sumFromEval(1, 2));

  // "subFromEval(10, 3): 7"
  console.log('subFromEval(10, 3): ', subFromEval(10, 3));
}());
```

<br />

문자열을 런타임에 동적으로 실행시킬 수 있는 `eval()` 은 `보완에 매우 취약` 합니다.

이유는 `eval()` 에 넘겨주는 `코드 문자열` 에 사용자가 악의를 가진 코드를 입력할 수 있기 때문입니다.

또한 `eval()` 을 통해 동적으로 실행되는 코드는 자바스크립트 엔진에 의한 `최적화` 를 받지 못합니다.

이러한 이유로 `eval()` 함수는 `사용을 금지` 시 합니다.



<br /><hr /><br />



## 6-2. isFinitie()

`isFinite()` 함수는 `인수 (arguments)` 로 넘겨준 값이 `유한수` 일 경우, `true` 를 반환 합니다.

만약 `인수` 로 넘겨준 값의 타입이 `number` 가 아니라면, `암묵적 타입 변환` 을 한 후 검사를 합니다.

이렇게 `암묵적 타입 변환` 을 한 값이 `NaN` 이라면, 이때에는 `false` 를 반환 합니다.

<br />

주의할 점은 `null` 을 `인자` 로 넘겨주었을 경우, `Number(null) === 0` 이므로 `isFinite(null)` 은 `true` 를 반환합니다.

<br />

또한 `undefined` 를 `인자` 로 넘겨주었을 경우에는 `Number(undefined)` 가 `NaN` 이기 때문에 `isFinite(undefined)` 는 `false` 를 반환합니다.

<br />

```javascript
(function() {
  // "isFinite(0): true"
  console.log('isFinite(0): ', isFinite(0));

  // "isFinite(0e64): true"
  console.log('isFinite(0e64): ', isFinite(0e64));

  // "isFinite('10'): true"
  console.log('isFinite("10"): ', isFinite('10'));

  // "isFinite('Hello World'): false"
  console.log('isFinite("Hello World"): ', isFinite('Hello World'));
  
  // "isFinite(Infinite): false"
  console.log('isFinite(Infinity): ', isFinite(Infinity));

  // "isFinite(-Infinity): false"
  console.log('isFinite(-Infinity): ', isFinite(-Infinity));

  // "isFinite(NaN): false"
  console.log('isFinite(NaN): ', isFinite(NaN));
  
  // "isFinite(null): true"
  console.log('isFinite(null): ', isFinite(null));

  // "isFinite(undefined): false"
  console.log('isFinite(undefined): ', isFinite(undefined));

  // "isFinite(' '): true"
  console.log('isFinite(" "): ', isFinite(' '));

  // "isFinite(''): true"
  console.log('isFinite(""): ', isFinite(''));
}());
```



<br /><hr /><br />



## 6-3. isNaN()

`isNaN()` 함수는 `인수` 로 전달받은 값이 `NaN` 인지 검사를 하며, `인수` 가 `NaN` 으로 평가 된다면, `true` 를 반환합니다.

만약 `인수` 로 넘겨준 값이 `number` 타입이 아니라면, `암묵적 타입 변환` 을 한 후 검사를 합니다.

<br />

```javascript
(function() {
  // "isNaN(0): false"
  console.log('isNaN(0): ', isNaN(0));

  // "isNaN(0e64): false"
  console.log('isNaN(0e64): ', isNaN(0e64));

  // "isNaN('10'): false"
  console.log('isNaN("10"): ', isNaN('10'));

  // "isNaN('Hello World'): true"
  console.log('isNaN("Hello World"): ', isNaN('Hello World'));

  // "isNaN(Infinity): false"
  console.log('isNaN(Infinity): ', isNaN(Infinity));

  // "isNaN(-Infinity): false"
  console.log('isNaN(-Infinity): ', isNaN(-Infinity));

  // "isNaN(NaN): true"
  console.log('isNaN(NaN): ', isNaN(NaN));

  // "isNaN(null): false"
  console.log('isNaN(null): ', isNaN(null));

  // "isNaN(undefined): true"
  console.log('isNaN(undefined): ', isNaN(undefined));

  // "isNaN(' '): false"
  console.log('isNaN(" "): ', isNaN(' '));

  // "isNaN(''): false"
  console.log('isNaN(""): ', isNaN(''));
}());
```



<br /><hr /><br />



## 6-4. parseFloat()

`parseFloat()` 함수는 `인수` 로 받은 값을 `부동 소수점 숫자 (floating point number)` 로 타입 변환 후 반환 합닌다.

<br />

```javascript
(function() {
  // parseFloat('3.14'): 3.14 (number 타입)
  console.log('parseFloat("3.14"): ', parseFloat('3.14'));

  // parseFloat('10.00'): 10 (number 타입)
  console.log('parseFloat("10.00"): ', parseFloat('10.00'));

  // 인수가 `문자열` 이며, `공백` 이 포함되어 있다면, 
  // `첫번째 공백 전` 까지의 문자열만을 parseFloat() 를 적용 합니다.
  // parseFloat('33 44 55'): 33 (number 타입)
  console.log('parseFloat("33 44 55"): ', parseFloat('33 44 55'));
  
  // parseFloat('123 Hello World'): 123 (number 타입)
  console.log('parseFloat("123 Hello World): ', parseFloat('123 Hello World'));

  // `첫번째 공백 전` 까지의 문자열을 `암묵적 타입 변환` 하였을 때, `NaN` 이라면, `NaN` 을 반환 합니다.
  // parseFloat('Hello World 333'): NaN
  console.log('parseFloat("Hello World 333"): ', parseFloat('Hello World 333'));

  // `첫번째 공백 전` 까지의 문자열에 parseFloat() 를 적용시킬 때, 
  // 먼저 `trim()` 을 실행한 후, parseFloat()` 를 적용 시킵니다.
  // parseFloat(' 7 '): 7 (number 타입)
  console.log('parseFloat(" 7 "): ', parseFloat(' 7 '));
}());
```



<br /><hr /><br />



## 6-5. parseInt()

`parseInt()` 는 `인수` 로 받은 값을 `정수` 로 타입 변환 후 반환 합니다.

만약 `인수` 로 받은 값을 `number` 로 `타입 변환` 하여 `정수` 를 반환 합니다.

<br />

```javascript
(function() {
  // parseInt('333'): 333 (number 타입)
  console.log('parseInt("333"): ', parseInt('333'));
}());
```

<br />

`parseInt()` 함수는 `두번째 인자` 로 `진수값` 을 넘겨줄 수 있습니다.

위 코드처럼 `두번째 인자` 를 넘겨주지 않게되면, `10 진수` 로 해석하게 됩니다.

그리고 반환값은 `두번째 인자` 의 `진수값` 에 무관하게 `10진수 값` 으로 반환 합니다.

* 값의 해석은 `두번째 인자` 로 넘겨준 `진수값` 으로 해석하고, 반환값은 다시 `10진수` 로 변환하여 반환하는 방식 입니다.

<br />

```javascript
// '10' 을 대상으로 `진수값` 에 따른 반환값을 확인 합니다.
(function() {
  // parseInt('10', 10): 10
  console.log('parseInt("10"): ', parseInt('10'));

  // parseInt('10', 16): 16
  console.log('parseInt("10", 16): ', parseInt('10', 16));

  // parseInt('10', 8); 8
  console.log('parseInt("10", 8): ', parseInt('10', 8));

  // parseInt('10', 2): 2
  console.log('parseInt("10", 2): ', parseInt('10', 2));
}());
```

<br />

`parseInt()` 함수는 `진수` 로 읽을수는 있지만, 반환값은 `10진수` 입니다.

만약 `number` 타입의 값을 `특정 진수` 로 변환한 결과를 얻고자 한다면, `Number 인스턴스 메서드` 중 `toString(진수값)` 으로 얻을 수 있습니다.

```javascript
// Number 타입 값을 `특정 진수` 로 변환하기
(function() {
  const numberValue = 20;

  // numberValue.toString(): 20
  console.log('numberValue.toString(): ', numberValue.toString());

  // numberValue.toString(10): 20
  console.log('numberValue.toString(10): ', numberValue.toString(10));

  // numberValue.toString(16): 14
  console.log('numberValue.toString(16): ', numberValue.toString(16));

  // numberValue.toString(8): 24
  console.log('numberValue.toString(8): ', numberValue.toString(8));

  // numberValue.toString(2): 10100
  console.log('numberValue.toString(2): ', numberValue.toString(2));
}());
```

<br />

`parseInt()` 를 사용할 때 주의점은 `진수` 를 적용시키고자 할 때, `0b10` 과 같은 `2진수 리터럴` 이나 `0o10` 과 같은 `8진수 리터럴` 은 비정상 동작을 한다는 점 입니다.

때문에 `parseInt()` 의 첫번째 인자에는 `10진수 리터럴` 을 넘겨주고, `진수 변환` 까지 적용하고자 한다면, 반드시 `두번째 인자` 에 `진수값` 을 넘겨주는 형태로 사용하여야 합니다.

<br />

`parseInt()` 의 첫번째 인자로 넘겨준 문자열에 공백이 있다면, `parseInt()` 로 변환되는 대상은 `첫번째 공백` 전까지의 문자열이 됩니다.

그리고 변환 대상이 되는 문자열에는 `trim()` 을 적용한 후, 변환을 합니다.

<br />

만약 `첫번째 문자열` 을 `number` 타입으로 변환할 수 없다면, `NaN` 을 반환합니다.

<br />

```javascript
(function() {
  // parseInt('3.14'): 3
  console.log('parseInt("3.14"): ', parseInt('3.14'));

  // parseInt('10.00'): 10
  console.log('parseInt("10.00"): ', parseInt('10.00'));

  // parseInt('33 44 55'): 33
  console.log('parseInt("33 44 55"): ', parseInt('33 44 55'));

  // parseInt('333 Hello World'): 333
  console.log('parseInt("123 Hello World"): ', parseInt('123 Hello World'));

  // parseInt('Hello World 333'): NaN
  console.log('parseInt("Hello World 333"): ', parseInt('Hello World 333'));

  // parseInt(' 7 '): 7
  console.log('parseInt(" 7 "): ', parseInt(' 7 '));
}());
```



<br /><hr /><br />



# 6-6. encodeURI / decodeURI

사용자가 인터넷을 통해서 원하는 정보를 얻기 위해서는 해당 정보의 위치를 알아야 합니다.

`URI (Uniform Resource Identifier)` 는 인터넷에 있는 자원의 `유일한 주소` 를 의미합니다.

`URI` 의 구성요소는 다음과 같습니다.

* 예시용 전체 주소
  * `https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title`

* URI
  * 자원이 위치한 인터넷상의 `유일한 주소` 이며, `전체 주소` 입니다.
  * 예) `https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title`

* Scheme (Protocol)
  * `http` 또는 `https` 를 의미 합니다.

* Host (Domain)
  * 리소스에 접근하기 위한 호스트명 입니다.
  * 예): `www.github.com`

* Port
  * 리소스에 접근하기 위한 포트번호 입니다.
  * 예): `:8080`

* Path
  * 접근할 리소스가 위치한 상세 경로 입니다.
  * 예) `/Chocobe/`

* Query (Query String)
  * 리소스에 접근하기 위해 접근 대상에게 넘겨주는 추가 정보(Parameter) 입니다.
  * 예) `?first-query=HelloWorld&second-query=333&third-query=초코비`

* Fragment
  * 접근할 리소스 중에서 서브 리소스에 접근하기 위한 서브 리소스 식별자
  * 예) `#title`

<br />

위에서 살펴본 `URI` 는 `URI 문법 형식 표준 RFC3986` 을 준수해야 합니다.

`URI 문법 형식 표준 RFC3986` 에 따르면, 다음과 같은 조건이 있습니다.

> URI 는 `아스키 문자셋` 으로만 구성되어야 하며, 이를 지키지 않을 경우에는 동작하지 않거나 의도치 않은 동작을 하는 문제가 발생할 수 있습니다.

<br />

공백이나 한글, 특수문자와 같은 문자들은 `아스키 문자셋` 에 포함되지 않습니다.

때문에 `URI` 로 사용할 수 없습니다.

이렇게 `URI` 로 사용할 수 없는 문자를 `이스케이프 처리` 하는 것을 `Encoding (인코딩)` 이라고 합니다.

* `이스케이프 처리` 란, 어떠한 시스템에서도 읽을 수 있는 `아스키 문자셋` 으로 변환하는 것을 말합니다.
* `인코딩` 대상에서 `?`, `=`, `&` 문자는 인코딩 대상에서 `제외` 합니다. (인코딩 하지 않는 문자)

<br />

자바스크립트에서는 `Encoding (인코딩)` 을 위해 `encodeURI()` 함수를 제공 합니다.

<br />

```javascript
(function() {
  const FULL_URI = 'https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title';

  const encodingURI = encodeURI(FULL_URI);

  // https://github.com:8080/Chocobe/?first-query=Hello%20World&second-query=333&third-query=%EC%B4%88%EC%BD%94%EB%B9%84#title
  console.log(encodingURI);
}());
```

<br />

이렇게 `인코딩` 된 문자열을 `이스케이프 처리 이전` 으로 복구하는 것을 `Decoding (디코딩)` 이라고 합니다.

자바스크립트에서 제공하는 `디코딩` 함수는 `decodeURI()` 입니다.

<br />

```javascript
(function() {
  const FULL_URI = 'https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title';

  const encodingURI = encodeURI(FULL_URI);

  // https://github.com:8080/Chocobe/?first-query=Hello%20World&second-query=333&third-query=%EC%B4%88%EC%BD%94%EB%B9%84#title
  console.log(encodingURI);

  const decodingURI = decodeURI(encodingURI);

  // https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title
  console.log(decodingURI);
}());
```



<br /><hr /><br />



## 6-7. encodeURIComponent / decodeURIComponent

`encodeURIComponent()` 역시 `인수` 로 전달받는 문자열을 `이스케이프 처리` 를 합니다.

다시말해 문자열을 `인코딩` 하는 함수 입니다.

<br />

`encodeURI()` 함수와 동일한 기능을 하지만, `인코딩` 대상에서 차이점이 있습니다.

`encodeURI()` 는 인코딩을 할 때 `?`, `=`, `&` 문자는 인코딩 하지 않습니다.

반면 `encodeURIComponent()` 는 `모든 문자` 를 인코딩 합니다.

이러한 동작 차이가 있는 이유는 `encodeURIComponent()` 은 `URI` 중 `Query String` 을 인코딩 하기위한 목적을 가졌기 때문입니다.

그러므로, `encodeURIComponent()` 를 사용할 때는 `Query String` 만을 넘겨주는 것이 좋습니다.

<br />

```javascript
(function() {
  const queryString = 'first-query=Hello World&second-query=333&third-query=초코비';
  const encodeURIComponentResult = encodeURIComponent(queryString);
  const encodeURIResult = encodeURI(queryString);

  // first-query%3DHello%20World%26second-query%3D333%26third-query%3D%EC%B4%88%EC%BD%94%EB%B9%84
  console.log('encodeURIComponent(queryString):\n\t', encodeURIComponentResult);

  // first-query=Hello%20World&second-query=333&third-query=%EC%B4%88%EC%BD%94%EB%B9%84
  console.log('encodeURI(queryString):\n\t', encodeURIResult);

  const decodeURIComponentResult = decodeURIComponent(encodeURIComponentResult);
  const decodeURIResult = decodeURI(encodeURIResult);

  // first-query=Hello World&second-query=333&third-query=초코비
  console.log('decodeURIComponent(encodeURIComponentResult):\n\t', decodeURIComponentResult);
  // first-query=Hello World&second-query=333&third-query=초코비
  console.log('decodeURI(encodeURIResult):\n\t', decodeURIResult);
}());
```



<br /><hr /><br />



# 7. 암묵적 전역

자바스크립트는 선언하지 않은 변수에 값을 할당하게 되면 에러를 발생시키지 않고, 동적으로 `전역 프로퍼티` 를 생성하여 정상 동작하도록 합니다.

이러한 현상을 `암묵적 전역 (Implicit Global)` 이라고 합니다.

<br />

`암묵적 전역` 으로 추가된 `전역 프로퍼티` 는 변수가 아닌 `프로퍼티` 의 성격을 갖게 됩니다.

정상적으로 전역 변수를 선언한 경우, 이는 변수이므로 `delete` 연산자를 사용할 수 없습니다.

하지만 `암묵적 전역` 으로 추가된 `전역 프로퍼티` 는 `delete` 연산자를 사용하여 프로퍼티 삭제를 할 수 있습니다.

`전역 변수` 와 `전역 프로퍼티` 의 접근방법이 동일하기 때문에 개발단계의 혼란을 초래할 수 있습니다.

* `전역 변수` 접근 방법: `window.전역_변수명`
* `전역 프로퍼티` 접근 방법: `window.전역_프로퍼티명`

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
      var x = 10;

      function myFunction() {
        y = 20;

        console.log('x + y: ', x + y);
      }
      myFunction();

      // window.x: 10
      console.log('window.x: ', window.x);

      // window.y: 20
      console.log('window.y: ', window.y);

      // x 는 `전역 변수` 이므로 `delete` 연산자가 무시 됩니다.
      delete window.x;
      // window.x: 10
      console.log('window.x: ', window.x);

      // y 는 `암묵적 전역` 으로 생성된, `전역 프로퍼티` 이므로, `delete` 연산자로 `y` 프로퍼티를 삭제 합니다.
      delete window.y;
      // window.y: undefined
      console.log('window.y: ', window.y);
    </script>
  </body>
</html>
```