# 09장. 타입 변환과 단축 평가

# 1. 타입 변환이란

자바스크립트의 모든 값에는 `타입` 이 있습니다.

이 `타입` 에 따라 값을 읽고 처리하는 방법이 달라질 수 있습니다.

<br />

`타입 변환` 에는 두가지 방식이 있습니다.

* `명시적 타입 변환(Explicit Coercion)` or `타입 캐스팅(Type Casting)`
  * 개발자가 의도적으로 `타입` 을 변환 시키는 방식 입니다.

* `암묵적 타입 변환(Implicit Coercion)` or `타입 강제 변환(Type Coercion)`
  * 자바스크립트 엔진에 의해, `암묵적` 으로 `타입이 자동으로 변환` 되는 방식 입니다.



<br /><hr /><br />



# 2. 암묵적 타입 변환

자바스크립트는 값을 평가할 때, `문맥` 에 맞도록 `암묵적 타입 변환` 을 합니다.

이는 가급적 에러를 발생시키지 않도록 자바스크립트를 만들었기 때문 입니다.



<br /><hr /><br />



# 2-1. 문자열 타입으로 변환

`문자열 연결 연산자` 로 사용되는 `+` 연산자는, 문자열이 아닌 피연산자를 `문자열` 로 `암묵적 타입 변환 (Explicit Coercion)` 을 합니다.

<br />

```javascript
const num = 1;
const str = "2";

console.log(num + str); // "12"
```



<br /><hr /><br />



# 2-2. 숫자 타입으로 변환

사칙연산 중 `+` 연산자를 제외한 `-`, `*`, `/` 는 `피연산자` 를 `숫자 타입` 으로 `암묵적 타입 변환` 을 합니다.

만약 `피연산자` 를 `숫자 타입` 으로 변환할 수 없는 경우에는 `NaN` 으로 변환 됩니다.

<br />

```javascript
console.log(3 - "1"); // 2
console.log(3 * "2"); // 6
console.log(3 / "6"); // 0.5
console.log("3" < 0); // false
console.log("3" > 0); // true

console.log(NaN > 0); // false
console.log(NaN < 0); // false
console.log(undefined < 0); // false
console.log(undefined > 0); // false
```



<br /><hr /><br />



# 2-3. 불리언 타입으로 변환

`조건식` 이 필요한 부분이 `boolean` 타입이 아닐 경우, `boolean` 타입으로 `암묵적 타입 변환 (Explicit Coercion)` 을 합니다.

이는 `if 문` 이나 `삼항 연산자`, `for 문` 같은 곳에서 발생 합니다.

<br />

아래의 값들은 `Falsy` 값들이며, 이 값들 이외의 값들은 `Truthy` 로 `암묵적 타입 변환 (Explicit Coercion)` 을 합니다.

* `undefined`
* `null`
* `0`
* `NaN`
* `""`



<br /><hr /><br />



# 3. 명시적 타입 변환

개발자가 의도적으로 `타입을 변경하는 방식` 입니다.



<br /><hr /><br />



# 4. 단축 평가

## 4-1. 논리 연산자를 사용한 단축 평가

`논리 연산자` 중에는 `논리합 (||)` 과 `논리곱 (&&)` 이 있습니다.

`논리합 (||)` 과 `논리곱 (&&)` 은 2개의 피연산자 중 `어느 한 쪽으로 평가` 되는 특징을 가지고 있습니다.

```javascript
console.log("Hello" && "World"); // "World"
console.log("Hello" || "World"); // "Hello"
```

<br />

그리고 위 예시처럼 `논리합 (||)` 과 `논리곱 (&&)` 은 논리연산의 결과가 되는 `피연산자` 를 타입 변환 없이 `그대로` 반환 합니다.



<br /><hr /><br />



# 4-2. 옵셔널 체이닝 연산자

`null` 이나 `undefined` 가 아닐 경우에만 해당 객체의 `프로퍼티에 접근` 하는 연산자 입니다.

```javascript
const str = "";
console.log(str?.length); // 0
```



<br /><hr /><br />



# 4-3. null 병합 연산자

`좌항` 의 객체가 `null` 이나 `undefined` 일 때만 `우항` 의 객체를 반환하는 연산자 입니다.

```javascript
const str = "" ?? "null 병합의 우항";
console.log(str); // ""
```