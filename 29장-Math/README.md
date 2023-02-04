# 29장. Math

`Math` 는 생성자 함수가 아닌 `표준 빌트인 객체` 이며, 상수와 메서드로 구성되어 있습니다.



<br /><hr /><br />



# 1. Math 프로퍼티

## 1-1. Math.PI

원주율 `파이(PI)` 값을 나타냅니다.



<br /><hr /><br />



# 2. Math 메서드

## 2-1. Math.abs

`인수` 로 넘겨준 값의 `절대값` 을 반환 합니다.



<br /><hr /><br />



## 2-2. Math.round

`인수` 로 넘겨준 값을 `반올림` 한 `정수` 를 반환 합니다.



<br /><hr /><br />



## 2-3. Math.ceil

`인수` 로 넘겨준 값의 `소수점` 을 `올림` 한 `정수` 를 반환 합니다.



<br /><hr /><br />



## 2-4. Math.floor

`인수` 로 넘겨준 값의 `소수점` 을 `버림` 한 `정수` 를 반환 합니다.



<br /><hr /><br />



## 2-5. Math.sqrt

`인수` 로 넘겨준 값의 `제곱근` 을 반환 합니다.



<br ><hr /><br />



## 2-6. Math.random

`임의의 난수` 를 반환 합니다.



<br /><hr /><br />



## 2-7. Math.pow

`거듭 제곱값` 을 계산하는 메서드 입니다.

* 첫번째 인자: 밑수 (base)
* 두번째 인자: 지수 (exponential)

<br />

`Math.pow` 메서드는 `지수 연산자` 로 사용하면 가독성을 높일 수 있습니다.

<br />

```javascript
// Math.pow(2, 8): 256
console.log('Math.pow(2, 8): ', Math.pow(2, 8));

// 2 ** 8: 256
console.log('2 ** 8: ', 2 ** 8);
```



<br /><hr /><br />



## 2-8. Math.max

전달한 모든 `인수` 중에서 `가장 큰 수` 를 반환 합니다.

`Number` 로 구성된 `배열` 의 요소 중, 가장 큰 수를 구할 때, `Math.max` 와 `스프레드 문법` 을 사용하면 쉽게 구할 수 있습니다.

<br />

```javascript
const arr = [1, 8, 120, 250, 333];

// 333
console.log(Math.max(...arr));
```



<br /><hr /><br />



## 2-9. Math.min

전달한 모든 `인수` 중에서 `가장 작은 수` 를 반환 합니다.

<br />

`Math.max` 처럼 `Number` 로 구성된 배열 요소중, 가장 작은값을 구할 때, `Math.min` 과 `스프레드 문법` 을 활용할 수 있습니다.

<br />

```javascript
const arr = [2, 8, 120, 250, 333];

// 2
console.log(Math.min(...arr));
```
