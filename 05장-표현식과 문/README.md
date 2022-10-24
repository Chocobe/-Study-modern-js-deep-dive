# 05장. 표현식과 문

# 1. 값

값은 어떤 식의 결과를 말합니다.

프로그램에서는 `여떤 식` 을 가리켜 `표현식 (express)` 라고 하며, `표현식 (express)` 를 연산하는 행위를 `평가 (evaluation)` 이라고 합니다.

그리고 `표현식 (express)` 의 `평가 (evaluation)` 결과를 `값 (value)` 라고 합니다.

<br />

아래와 같은 코드가 있을 때, `변수` 에 저장되는 데이터는 `표현식 (express)` 가 아닌, `평가 (evaluation)` 결과 `값 (value)` 입니다.

```javascript
const value = 10 + 20; // 변수 value 에 30 이라는 number 타입 데이터를 대입
```

<br />

주의할 점은, 저장된 데이터는 `데이터 타입` 에 따라 다르게 해석 됩니다.

아래의 코드는 `2진수값` 을 `Number` 타입과 `String` 타입으로 해석한 결과 입니다.

```typescript
const numberValue = 0b01000001;
const stringValue = String.fromCharCode(numberValue);

console.log("numberValue: ", numberValue); // 65
console.log("stringValue: ", stringValue); // "A"
```



<br /><hr /><br />



# 2. 리터럴

`리터럴 (Literal)` 값은 자연어 자체의 값을 말합니다.

즉, 사람이 인지하는 정수값 그대로의 값 또는 문자열, null, undefined, object, function, RegExp 등을 지칭합니다.



<br /><hr /><br />



# 3. 표현식

결과 `값 (value)` 을 만들기 위해, `표현식 (express)` 를 사용합니다.

`표현식 (express)` 는 `10 + 20` 과 같은 `식` 이 될 수도 있고, 단순 `리터럴 (Literal)` 이 될 수도 있습니다.

정리하면, `표현식 (express)` 는 `값 (value)` 로 `평가 (evaluation)` 될 수 있는 모든 `문 (statement)` 를 지칭 합니다.

<br />

아래의 코드는 모두 `표현식 (express)` 의 예시 입니다.

```javascript
// 리터럴 표현식
10;
"Hello World";

let sum;
let person = {
  name: "chocobe",
};

// 식별자 표현식
sum;
person.name;

function myFunc() {
  // do something...
}

// 함수 표현식
myFunc();
```



<br /><hr /><br />



# 4. 문

프로그램을 작성할 때, 다양한 변수와 함수, 값 들을 사용하게 됩니다.

이렇게 프로그램을 구성하는 `최소 실행 단위` 를 `문 (statement)` 이라고 합니다.

아래의 코드는 `문 (statement)` 하나를 나타냅니다.

```javascript
const result = 20 + 10;
```

<br />

`문 (statement)` 은 가장 작은 단위로 나눌 수 있는데, 이를 `토큰 (Token)` 이라고 합니다.

키워드, 식별자, 연산자, 리터럴, 세미콜론, 마침표 등 가장 작은 단위의 `문법적 의미` 를 나타냅니다.

위 코드에 존재하는 모든 `토큰 (Token)` 을 나열하면 다음과 같습니다.

* `const`
* `result`
* `=`
* `20`
* `+`
* `10`
* `;`

이렇듯 `문 (statement)` 는 프로그램의 `최소 실행 단위` 를 의미하므로, `명령문` 이라고도 하며, `문 (statement)` 또는 `명령문` 을 실행하면, 해당 동작이 수행 됩니다.



<br /><hr /><br />



# 5. 세미콜론과 세미콜론 자동 삽입 기능

`세미콜론` 은 `문 (statement)` 의 `종료` 를 나타냅니다.

자바스크립트는 `세미콜론` 이 없어도 자동으로 붙여서 해석해 줍니다.

공식적으로는 `세미콜론` 을 붙이는 것을 권장 합니다.



<br /><hr /><br />



# 6. 표현식인 문과 표현식이 아닌 문

모든 `문 (statement)` 가 `표현식 (express)` 는 아닙니다.

`문 (express)` 지만, `평가 (evaluation)` 결과가 `값 (value)` 일 경우에만 `표현식인 문` 이 됩니다.

예를 들어 변수 선언만 할 경우, 이는 `값 (value)` 가 아닌, 메모리 확보에 해당하는 `명령문` 이므로, `표현식인 문` 은 아닙니다.

```javascript
// 표현식이 아닌 문
let something;

// 표현식인 문 (=== 할당문)
let someValue = 10;

// 표현식인 문 (=== 할당문)
const sum = (a, b) => a + b;
```