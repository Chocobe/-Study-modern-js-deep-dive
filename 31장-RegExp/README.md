# 31장. RegExp

# 1. 정규 표현식이란?

`정규 표현식 (Regular Expression)` 이란 `일정한 패턴` 을 가진 `문자열의 집합` 을 표현하기 위한 `형식 언어 (Formal language)` 입니다.

정규 표현식은 문자열을 대상으로 `패턴 매칭 기능` 을 제공합니다.

`패턴 매칭 기능` 을 사용하면 문자열이 패턴과 일치하는지 여부를 검사하거나, 특정 패턴의 문자열을 찾거나, 특정 패턴의 문자열을 치환할 수 있습니다.



<br /><hr /><br />



# 2. 정규 표현식의 생성

정규 표현식 객체를 생성하는 방법은 두가지가 있습니다.

* 정규 표현식 리터럴
* RegExp 생성자 함수

<br />

두가지 모두 동일한 결과로 정규식 객체를 생성 합니다.

차이점은 `RegExp 생성자 함수` 를 사용하면 `동적` 으로 `RegExp` 를 생성할 수 있습니다.

<br />

```javascript
const strValue = 'Is this all there is?';

const regExp1 = /is/i;
// regExp1.test(strValue): true
console.log('regExp1.test(strValue): ', regExp1.test(strValue));

const regExp2 = new RegExp('is', 'i');
// regExp2.test(strValue); true
console.log('regExp2.test(strValue): ', regExp2.test(strValue));

const strPattern = 'is';
const regExp3 = new RegExp(strPattern, 'i');
// regExp3.test(strValue): true
console.log('regExp3.test(strValue): ', regExp3.test(strValue));
```



<br /><hr /><br />



# 3. RegExp 메서드

`RegExp` 를 사용할 수 있는 메서드는 다음과 같습니다.

* RegExp.prototype
    * RegExp.prototype.test
    * RegExp.prototype.exec

* String.prototype
    * String.prototype.match
    * String.prototype.replace
    * String.prototype.search
    * String.prototype.split



<br /><hr /><br />



## 3-1. RegExp.prototype.exec

`RegExp.prototype.exec` 는 `인수` 로 넘겨준 `문자열` 을 대상으로 `정규 표현식 패턴` 을 `검새` 합니다.

검색한 결과는 `배열` 로 반환하며, 검색 결과가 없다면 `null` 을 반환 합니다.

주의할 점은 `g 플래그` 를 사용하여도 `첫번째 매칭` 에 대한 결과만 반환 합니다.

<br />

```javascript
const strValue = 'Is this all there is?';

const regExp1 = /is/;
/**
 * [
 *    'is',
 *    index: 5,
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExp1.exec(strValue));
```



<br /><hr /><br />



## 3-2. RegExp.prototype.test

`RegExp.prototype.test` 역시 `인수` 로 넘겨준 `문자열` 에서 `정규 표현식 패턴` 을 `검색` 합니다.

`RegExp.prototype.exec` 와 다른점은 검색 결과 여부에 대해 `boolean` 값을 반환하는 것 입니다.

<br />

```javascript
const strValue = 'Is this all there is?';

const regExp = /is/;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 3-3. String.prototype.match

`String.prototype.match` 메서드도 `RegExp.prototype.exec` 와 유사한 동작을 하며, 검사 결과로 `배열` 을 반환 합니다.

`String.prototype.match` 에 `인수` 로 `RegExp` 를 넘겨주는 방식으로 사용하며, `g 플래그` 여부에 따라 반환하는 `배열` 의 값이 달라집니다.

* `g 플래그` 미사용: `RegExp.prototype.exec` 와 동일한 형태의 `배열` 반환
* `g 플래그` 사용: `정규 표현식 패턴` 에 일치하는 `문자열` 만으로 구성된 `배열` 반환

<br />

```javascript
const strValue = 'Is this all there is?';

const regExp1 = /is/;
/**
 * [
 *    'is',
 *    index: 5
 *    input: 'Is this all there is?',
 *    group: undefined,
 * ]
 */
console.log(strValue.match(regExp1));

const regExp2 = /is/g;
// ['is', 'is']
console.log(strValue.match(regExp2));
```



<br /><hr /><br />



# 4. 플래그

