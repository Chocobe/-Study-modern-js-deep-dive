# 28장. Number

# 1. Number 생성자 함수

`Number` 는 자바스크립트의 숫자 타입 `표준 빌트인 객체` 입니다.

`new Number(숫자)` 를 호출 시, `Number 인스턴스` 를 생성할 수 있습니다.

이렇게 생성된 인스턴스는 `숫자` 를 담고 있는 `Number 래퍼 객체` 를 반환하게 됩니다.

<br />

만약 `new` 키워드 없이, `Number(숫자)` 를 호출하게 되면, 래퍼 객체가 아닌 `숫자 데이터` 를 반환하게 됩니다.

그래서 일반적으로 `String` 을 `Number` 로 타입 변환할 때, `Number('333')` 형식으로 사용합니다.

<br />

```javascript
const strNum = '333';
const parsedNum = Number(strNum);

// typeof parsedNum: number
console.log('typeof parsedNum: ', typeof parsedNum);
```



<br /><hr /><br />



# 2. Number 프로퍼티

## 2-1. Number.EPSILON

1보다 큰 숫자 중 `가장 작은 값` 과 `1` 의 차이값을 나타냅니다.

부동소수점 연산에서 발생하는 연산값에 오차가 발생하는데, 이러한 오차를 보정하는 기능으로 사용할 수 있습니다.

아래의 코드는 `0.1 + 0.2` 연산에서 발생한 오차로 인해 `0.3` 과 일치하지 않는 코드 입니다.

<br />

```javascript
const a = 0.1;
const b = 0.2;

const result = a + b;

console.log('result === 0.3: ', result === 0.3);
```

`Number.EPSILON` 을 사용하여 부동소수점 연산의 오차값을 확인하면 `0.1 + 0.2` 가 `0.3` 과 같다는 검사를 할 수 있습니다.

```javascript
const a = 0.1;
const b = 0.2;

const result = a + b;

function isEqualNumber(value, expectValue) {
  const diff = Math.abs(value - expectValue);

  return diff < Number.EPSILON;
}

// isEqualNumber(result, 0.3): true
console.log('isEqualNumber(result, 0.3): ', isEqualNumber(result, 0.3));
```



<br /><hr /><br />



## 2-2. Number.MAX_VALUE

`Number.MAX_VALUE` 는 자바스트립트에서 나타낼 수 있는 `가장 큰 숫자` 를 가집니다.



<br /><hr /><br />



## 2-3. Number.MIN_VALUE

`Number.MIN_VALUE` 는 자바스크립트에서 나타낼 수 있는 `가장 작은 숫자` 를 가집니다.



<br /><hr /><br />



## 2-4. Number.MAX_SAFE_INTEGER

`Number.MAX_SAFE_INTEGER` 는 자바스크립트에서 `안전하게` 표현할 수 있는 `가장 큰 숫자` 를 가집니다.



<br /><hr /><br />



## 2-5. Number.MIN_SAFE_INTEGER

`Number.MIN_SAFE_INTEGER` 는 자바스크립트에서 `안전하게` 표현할 수 있는 `가장 작은 숫자` 를 가집니다.



<br /><hr /><br />



## 2-6. Number.POSITIVE_INFINITY

`Number.POSITIVE_INFINITY` 는 `양의 무한대` 를 나타내며, `Infinity` 와 같습니다.



<br /><hr /><br />



## 2-7. Number.NEGATIVE_INFINITY

`Number.NEGATIVE_INFINITY` 는 `음의 무한대` 를 나타내며, `-Infinity` 와 같습니다.



<br /><hr /><br />



## 2-8. Number.NaN

`Number.NaN` 은 `숫자가 아님` 을 나타냅니다.

`window.NaN` 과 동일한 의미를 가집니다.

주의할 점은 `NaN` 과 `NaN` 을 `===` 로 비교 연산할 경우, `false` 로 평가 됩니다.

<br />

```javascript
// NaN === NaN: false
console.log('NaN === NaN: ', NaN === NaN);
```



<br /><hr /><br />



# 3. Number 메서드

## 3-1. Number.isFinite

`인수` 로 넘겨준 값이 `유한수` 일 경우, `true` 를 반환하는 메서드 입니다.

<br />

`빌트인 전역 함수 isFinite` 과는 다음과 같은 차이점이 있습니다.

||Number.isFinite(인수)|window.isFinite(인수)|
|:---:|:---:|:---:|
|암묵적 타입 변환 여부|❌|⭕️|

<br />

암묵적 타입 변환 여부를 확인하기 위해, `인수` 로 `String` 을 넘겨주면 다음과 같은 결과를 얻게 됩니다.

<br />

```javascript
const strNum = '333';

// Number.isFinite(strNum): false
console.log('Number.isFinite(strNum): ', Number.isFinite(strNum));

// isFinite(strNum): true
console.log('isFinite(strNum): ', isFinite(strNum));
```



<br /><hr /><br />



## 3-2. Number.isInteger

`Number.isInteger` 메서드는 `인수` 가 `정수` 일 때 `true` 를 반환 합니다.

주의할 점은 `인수` 를 `암묵적 타입 변환` 하지 않습니다.



<br ><hr /><br />



## 3-3. Number.isNaN

`Number.isNaN` 메서드는 `인수` 가 `Number 타입` 일 경우 `true` 를 반환 합니다.

`빌트인 전역 함수 isNaN` 과는 차이가 있는데, `인수` 를 `암묵적 타입 변환` 여부 입니다.

<br />

`Number.isNaN` 은 `인수` 를 `암묵적 타입 변환` 하지 않기 때문에, `Number` 타입이 아니면 `false` 를 반환합니다.

그리고 `빌트인 전역 함수 isNaN` 은 `인수` 를 `암묵적 타입 변환` 하기 때문에, `Number 타입 변환` 가능할 경우 `true` 를 반환합니다.



<br /><hr /><br />



## 3-4. Number.isSafeInteger

`인수` 가 `안전한 정수` 일 경우 `true` 를 반환합니다.

<br />

```javascript
// Number.isSafeInteger(0): true
console.log('Number.isSafeInteger(0): ', Number.isSafeInteger(0));

// Number.isSafeInteger(10_000_000_000): true
console.log('Number.isSafeInteger(10_000_000_000): ', Number.isSafeInteger(10_000_000_000));

// Number.isSafeInteger(0.1): false
console.log('Number.isSafeInteger(0.1): ', Number.isSafeInteger(0.1));

// Number.isSafeInteger('333'): false
console.log('Number.isSafeInteger("333"): ', Number.isSafeInteger('333'));

// Number.isSafeInteger(Infinity): false
console.log('Number.isSafeInteger(Infinity): ', Number.isSafeInteger(Infinity));
```



<br /><hr /><br />



## 3-5. Number.prototype.toExponential

`인수` 로 전달한 `전체 자리수` 가 되도록 하며, 해당 값을 `지수 표기법` 으로 나타낸 `String` 을 반환합니다.



<br /><hr /><br />



## 3-6. Number.prototype.toFixed

`인수` 로 넘겨준 소수점 이하 자리에서 `반올림` 하여, `String` 으로 반환합니다.



<br /><hr /><br />



## 3-7. Number.prototype.toPrecision

`인수` 로 전달한 값을 `전체 자리수` 가 되도록 `반올림` 하여 `String` 으로 반환합니다.

만약, `인수` 인 `전체 자리수` 를 초과한다면, `지수 표기법` 으로 나타냅니다.



<br /><hr /><br />



## 3-8. Number.prototype.toString

`인수` 로 전달한 `진법` 으로 변환하여 `String` 으로 반환합니다.

`인수` 를 `생략` 한다면, `10진법` 으로 반환합니다.
