# 32장. String

# 1. String 생성자 함수

`String` 은 문자열을 다루기 위한 자바스크립트의 표준 빌트인 객체 입니다.

문자열은 두가지 방법으로 만들 수 있습니다.

* `new String('문자열')`
* `'문자열'`

<br />

`new String('문자열')` 을 사용하여 문자열을 생성하면, `String 래퍼 객체` 가 생성 됩니다.

일반적으로는 `'문자열'` 형식으로 문자열을 생성 합니다.

<br />

만약 `new` 키워드 없이 `String(값)` 으로 사용한다면, `String` 타입이 아닌 데이터를 `String` 으로 `명시적 형변환` 할 수 있습니다.



<br /><hr /><br />



# 2. length 프로퍼티

문자열은 내부에 `length` 프로퍼티를 가지고 있습니다.

`length` 프로퍼티는 해당 문자열의 `길이` 값을 가집니다.

`String` 은 각 문자의 `인덱스` 번호에 `문자` 가 할당된 객체 형식이며 `length` 프로퍼티를 가지는 `유사배열` 입니다.



<br /><hr /><br />



# 3. String 메서드

`유사배열` 인 `String` 의 모든 요소의 `writable` 프로퍼티 어트리뷰트는 `false` 입니다.

즉, `String` 자체를 수정할 수는 없는 `읽기 전용 (readonly)` 입니다.

그래서 `String.prototype` 으로 제공하는 메서드는 월본 배열을 직접 수정하지 않고, 새로운 배열을 생성하여 반환하는 `Accessor Method` 입니다.



<br /><hr /><br />



## 3-1. String.prototype.indexOf

`인수` 로 넘겨준 문자열이 원본 문자열에 위치하는 `인덱스 번호` 를 반환 합니다.

만약 원본 문자열에서 찾지 못한다면, `-1` 을 반환 합니다.

<br />

`String.prototype.indexOf` 의 반환값이 `-1` 이라면, 원본 문자열에 없다는 뜻이 됩니다.

`String.prototype.includes` 을 사용하면 좀 더 가독성을 높일 수 있습니다.

<br />

```javascript
const strValue = 'Hello World';

const index = strValue.indexOf('Wor');
// index: 6
console.log('index: ', index);

// String.prototype.includes('wor'): true
console.log(`String.prototype.includes('Wor'): ${strValue.includes('Wor')}`);
```



<br /><hr /><br />



## 3-2. String.prototype.search

`String.prototype.indexOf` 처럼 `인덱스 번호` 를 반환 합니다.

차이점은 `인자` 에 넘겨주는 값을 `문자열` 이 아닌 `RegExp` 입니다.

만약, `RegExp` 에 일치하는 문자열이 없다면 `-1` 을 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

const regExp = /[^\s]+/g;
// strValue.search(regExp): 0
console.log('strValue.search(rgExp): ', strValue.search(regExp));
```



<br /><hr /><br />



## 3-3. String.prototype.indexOf

`인수` 로 넘겨준 문자열이 원본 문자열에 포함되었는지 여부를 `boolean` 으로 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.includes('Hello'): true
console.log(`strValue.includes('Hello'): ${strValue.includes('Hello')}`);
```



<br /><hr /><br />



## 3-4. String.prototype.startsWith

원본 문자열이 `인수` 로 넘겨준 문자열로 시작하는지 여부를 `boolean` 으로 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.startsWith('He '): true
console.log(`strValue.startsWith('He'): ${strValue.startsWith('He')}`);
```



<br /><hr /><br />



## 3-5. String.prototype.endsWith

원본 문자열이 `인수` 로 넘겨준 문자열로 끝나는지 여부를 `boolean` 으로 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.endsWith('ld'): true
console.log(`strValue.endsWith('ld'): ${strValue.endsWith('ld')}`);
```



<br /><hr /><br />



## 3-6. String.prototype.charAt

`인수` 로 `인덱스 번호` 를 넘겨주며, 해당 위치의 `문자` 를 반환 합니다.

만약 `인수` 로 넘겨준 `인덱스 번호` 가 원본 문자열의 길이를 초과할 경우, `빈 문자열` 을 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.charAt(3): l
console.log(`strValue.charAt(3): ${strValue.charAt(3)}`);
```



<br /><hr /><br />



## 3-7. String.prototype.substring

원본 문자열에서 `부분 문자열` 을 추출하는 메서드 입니다.

넘겨주는 `인자` 는 다음과 같습니다.

* 첫번째 인자: `시작 인덱스`
* 두번째 인자: `마지막 인덱스(미포함)`

<br />

각 `인자` 의 인덱스 번호는 `String.prototype.indexOf` 또는 `String.prototype.search` 와 조합하여 활용도를 높일 수 있습니다.

<br />

만약 `인수 < 0` 이라면, `0` 으로 보정 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.substring(1, strValue.search(/\s/)): ello
console.log(`strValue.substring(1, strValue.search(/\s/)): ${strValue.substring(1, strValue.search(/\s/))}`);
```



<br /><hr /><br />



## 3-8. String.prototype.slice

`String.prototype.substring` 과 동일한 메서드로, 부분 문자열을 추출 합니다.

차이점은 `인수 < 0` 일 경우, 문자열의 끝에서 부터 `역순` 으로 적용합니다.

<br />

```javascript
const strValue = 'Hello World';
const startIndex = strValue.search(/\w\s/);

// strValue.slice(startIndex, -2): o Wor
console.log(`strValue.slice(startindex, -2): ${strValue.slice(startIndex, -2)}`);
```



<br /><hr /><br />



## 3-9. String.prototype.toUpperCase

원본 문자열을 `모두 대문자` 로 변경한 문자열을 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.toUpperCase(): HELLO WORLD
console.log(`strValue.toUpperCase(): ${strValue.toUpperCase()}`);
```



<br /><hr /><br />



## 3-10. String.prototype.toLowerCase

원본 문자열을 `모두 소문자` 로 변경한 문자열을 반환 합니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.toLowerCase(): hello world
console.log(`strValue.toLowerCase(): ${strValue.toLowerCase()}`);
```



<br /><hr /><br />



## 3-11. String.prototype.trim

원본 문자열의 `앞` 또는 `뒤` 에 있는 `모든 공백` 을 제거한 문자열을 반환 합니다.

<br />

```javascript
const strValue = '   Hello Wowrld  \n';

// strValue.trim(): Hello World
console.log(`strValue.trim(): ${strValue.trim()}`);
```



<br /><hr /><br />



## 3-12. String.prototype.repeat

원본 문자열을 `반복 연결` 한 문자열을 반환 합니다.

`인수` 로 넘겨준 `정수` 만큼 `반복 연결` 하며, `음수` 를 넘겨줄 경우 `RangeError` 를 발생시킵니다.

<br />

```javascript
const strValue = '🚀';

// strValue.repeat(3): 🚀🚀🚀
console.log(`strValue.repeat(3): ${strValue.repeat(3)}`);
```



<br /><hr /><br />



## 3-13. String.prototype.replace

원본 문자열에서 특정 문자열을 변경하여 생성한 결과를 반환 합니다.

`인자` 는 2개를 받으며 다음과 같습니다.

* 첫번째 인자: 검색 대상 `문자열` 또는 `RegExp`
* 두번째 인자: `치환 문자열` 또는 `치환 함수`

<br />

```javascript
/** @param { string } str */
function snakeToCamel(str) {
  return str.replace(/_[a-z]/g, match => {
    return match[1].toUpperCase();
  });
}

/** @param { string } str */
function camelToSnake(str) {
  return str.replace(/.[A-Z]/g, match => {
    return `${match[0]}_${match[1].toLowerCase()}`;
  });
}

// snakeToCamel(snakeValue): helloWorld
console.log(`snakeToCamel('hello_world'): ${snakeToCamel('hello_world')}`);

// camelToSnake('helloWorld'): hello_world
console.log(`camelToSnake('helloWorld'): ${camelToSnake('helloWorld')}`);
```



<br /><hr /><br />



## 3-14. String.prototype.split

`첫번째 인수` 로 넘겨준 `문자열` 또는 `RegExp` 를 `구분자` 로 사용하여, 원본 문자열을 분리한 `배열` 을 반환 합니다.

만약 `두번째 인수` 에 `정수` 를 넘겨준다면, 반환되는 `배열` 의 `길이` 를 지정할 수 있습니다.

<br />

```javascript
const strValue = 'Hello World';

// strValue.split(' '): [ 'Hello', 'World' ]
console.log(`strValue.split(' '): ${strValue.split(' ')}`);

// strValue.split(/\s+/): [ 'Hello', 'World' ]
console.log(`strValue.split(/\s+/): ${strValue.split(/\s+/)}`);

// strValue.split(/\s+/).reverse().join(' '): World Hello
console.log(`strValue.split(/\s+/).reverse().join(' '): ${strValue.split(/\s+/).reverse().join(' ')}`);

// strValue.split(/\s+/, 1): [ 'Hello' ]
console.log(`strValue.split(/\s+/, 1): ${strValue.split(/\s+/, 1)}`);
```
