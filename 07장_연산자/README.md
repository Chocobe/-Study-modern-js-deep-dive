# 07장. 연산자

`연산자 (Operator)` 는 하나 이상의 `표현식 (express)` 를 대상으로 `연산 결과값` 을 만듭니다.

이 때, 연산의 대상이 되는 `표현식 (express)` 를 `피연산자 (Operand)` 라고 합니다.

즉, `피연산자 (Operand)` 와 `연산자 (Operator)` 의 조합이 값으로 평가되는 `표현식 (express)` 가 되어야 합니다.



<br /><hr /><br />



# 1. 산술 연산자 (Arithmetic Operator)

`피연산자 (Operand)` 를 대상으로 `수학적 계산` 을 합니다.

만약, `수학적 계산` 이 불가능한 경우, `NaN` 을 반환합니다.

## 1-1. 이항 산술 연산자

`2개의 피연산자 (Operand)` 를 산술 연산하는 연산자 입니다.

```javascript
const a = 3 + 7;
```



<br /><hr /><br />



## 1-2. 단항 산술 연산자

`1개의 피연산자 (Operand)` 를 산술 연산하는 연산자 입니다.

`피연산자 (Operand)` 의 값을 `1` 증가 또는 감소 시키는 연산을 하게 됩니다.

이 때, `연산자 (Operator)` 의 위치에 따라, 연산 순서가 달라집니다.

* `전위 연산자 (Prefix Operator)`: 증/감 연산을 먼저 한 후, 다른 연산을 수행 합니다.
  * `++a`
  * `--a`

* `후위 연산자 (Postfix Operator)`: 다른 연산을 수행한 후, 마지막에 `피연산자 (Operand)` 를 증/감 합니다.
  * `a++`
  * `a--`

<br />

```javascript
// 전위 연산자 (Prefix Operator)
let a = 1;

console.log(++a); // 2
console.log(--a); // 1

console.log(a); // 1
```

<br />

```javascript
// 후위 연산자 (Postfix Operator)
let a = 1;

console.log(a++); // 1
console.log(a--); // 2

console.log(a); // 1
```



<br /><hr /><br />



## 1-3. 문자열 연결 연산자

`+` 연산자는 `문자열` 과 함께 사용할 경우, `문자열 병합` 연산을 합니다.

```javascript
const name = "Chocobe";
const num = 1;

const result = name + num;
console.log(result); // "Chocobe1"
```



<br /><hr /><br />



# 2. 할당 연산자 (Assignment Operator)

`우항` 에 있는 피연산자의 결과값을 `좌항의 변수` 에 `할당` 합니다.

```javascript
const a = 3 + 7;
```

<br />

결과적으로 `좌항의 변수` 에 값을 `할당` 하고, `좌항의 변수` 자체를 평가하므로, `할당 연산자 (Assignment Operator)` 도 `표현식인 문` 에 속합니다.



<br /><hr /><br />



# 3. 비교 연산자

두개의 `피연산자 (Operand)` 를 비교한 결과값을 `boolean` 타입인 `true` 또는 `false` 를 반환하는 `연산자 (Operator)` 입니다.



<br /><hr /><br />



## 3-1. 동등/일치 비교 연산자

자바스크립트는 `같다` 라는 평가를 `동등` 과 `일치` 두가지로 합니다.

* `동등 비교`: 비교 연산전, 두 연산자를 `암묵적 타입 변환` 으로 타입을 일치시킨 후, `비교` 합니다.
  * 기호: `==`
  * `숫자 3` 과 `문자 3` 을 `==` 비교 시, `true`

* `일치 비교`: 두 연산자의 `타입` 과 `값` 모두 같은지 `비교` 합니다.
  * 기호: `===`
  * `숫자 3` 과 `문자3` 을 `===` 비교 시, `false`

<br />

`NaN` 은 `값이 없음` 에 해당하는 `number 타입` 값입니다.

자바스크립트에서 유일하게 자기 자신과 일치하지 않는 값이므로, 만약 `NaN` 인지 확인하기 위해서는 다음과 같은 코드를 사용해야 합니다.

<br />

```javascript
const a = 3 + Number("숫자 아님");
console.log(a); // NaN

const isNaN1 = Number.isNaN(a);
console.log(isNaN1); // true

const isNaN2 = Object.is(a, NaN);
console.log(isNaN2); // true
```



<br /><hr /><br />



## 3-2. 대소 관계 비교 연산자

`number` 타입인 두 피연산자의 `크기` 를 비교 합니다.

<br />

```javascript
const a = 3;
const b = 7;

console.log(a < b); // true
console.log(a <= b); // true

console.log(a > b); // false
console.log(a >= b); // false
```



<br /><hr /><br />



# 4. 삼항 조건 연산자 (Ternary Operator)

`조건식` 의 결과에 따라 `반환값` 을 결정하는 연산자 입니다.

```javascript
const a = 3;
const b = 7;

const result = a < b ? "참" : "거짓";

console.log(result); // "참"
```



<br /><hr /><br />



# 5. 논리 연산자 (Logical Operator)

두개의 피연산자에 `논리 연산` 을 합니다.

* `NOT (부정)` 연산자인 `!` 는 대상 피연산자를 `boolean` 타입으로 `암묵적 타입 변환` 을 합니다.

```javascript
const a = true;
const b = false;

console.log(a && b); // false
console.log(a || b); // true
console.log(!a); // false
console.log(!b); // true
```



<br /><hr /><br />



# 6. ~~쉼표 연산자~~

~~가장 왼쪽 피연산자 부터 차례로 평가한 후, 마지막 피연산자를 반환 합니다.~~



<br /><hr /><br />



# 7. 그룹 연산자

피연산자를 `소괄호 ()` 로 묶어서 `그룹 연산자` 를 만듭니다.

`그룹 연산자` 는 자신의 피연산자를 가장 먼저 평가하게 됩니다.

그래서 `연산의 우선순위` 를 지정하기 위해 사용합니다.

<br />

```javascript
const a = 3 * 7 + 1;
const b = 3 * (7 + 1);

console.log(a); // 22
console.log(b); // 24
```



<br /><hr /><br />



# 8. typeof 연산자

피연산자의 `데이터 타입` 을 `문자열` 로 반환 합니다.

`typeof` 연산자가 반환하는 값은 아래 목록의 값만 존재 합니다.

그리고 주의할 점은 `null` 은 `"object"` 를 반환합니다.

* `"string"`
* `"number"`
* `"boolean"`
* `"undefined"`
* `"symbol"`
* `"object"`
* `"function"`

<br />

```javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 1); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol("MySymbol")); // "symbol"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof new Date()); // "object"
console.log(typeof function() {}); // "function"

console.log(typeof null); // "object"
```



<br /><hr /><br />



# 9. 지수 연산자

좌항의 피연산자를 `밑 (Base)` 로 하고, 우항의 피연산자를 `지수 (Exponent)` 로 하는 `거듭 제곱 연산자` 압니다.

<br />

```javascript
const a = 3 ** 2;
console.log(a); // 9

const b = (-3) ** 2;
console.log(b); // 9

const c = 2 ** -2;
console.log(c); // 0.25

let d = 5;
d **= 2;
console.log(d); // 25
```



<br /><hr /><br />



# 10. 그 외의 연산자

* `?.`: 옵셔널 체이닝 연산자
* `??`: null 병합 연산자
* `delete`: 프로퍼티 삭제 연산자
* `new`: 생성자 객체 생성 연산자
* `instanceof`: 생성자 인스턴스 판별 연산자
* `in`: 프로퍼티 존재 확인 연산자



<br /><hr /><br />



# 11. 연산자의 부수 효과

대부분의 연산자는 다른 코드에 영향을 주지 않지만, 아래의 3가지 연산자는 `부수효과 (Side Effect)` 를 가집니다.

* `할당 연산자`: `=`
* `증/감 연산자`: `++`, `--`
* `프로퍼티 삭제 연산자`: `delete`



<br /><hr /><br />



# 12. 연산자 우선순위

연산자는 `우선순위` 에 의해, 연산을 합니다.

다양한 연산자들을 함께 사용할 경우에는, `그룹 연산자 ()` 를 사용하여 `명시적으로 우선순위를 표시` 하는 것이 좋습니다.



<br /><hr /><br />



# 13. 연산자 결합 순서

연산자를 기준으로 좌항과 우항 중, 어느쪽을 먼저 평가할 것인지에 대한 순서 입니다.