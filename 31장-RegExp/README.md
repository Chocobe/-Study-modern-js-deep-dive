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

`플래그` 는 정규 표현식의 `검색 방식` 을 설정하는 방법 입니다.

`플래그` 의 종류는 총 6가지이며 주로 사용하는 플래그는 다음과 같습니다.

|플래그|의미|상세|
|:---:|:---:|:---:|
|i|ignore case|대소문자 구분을 하지 않음|
|g|global|패턴과 일치하는 모든 문자열을 전역 검사|
|m|multi line|개행 문자가 있어도 검색을 계속|



<br /><hr /><br />



# 5. 패턴

## 5-1. 문자열 검색

정규 표현식은 `패턴` 과 `플래그` 로 이루어져 있습니다.

생성한 정규 표현식은 `RegExp` 메서드를 사용하여 결과를 얻을 수 있습니다.

<br />

아래의 코드는 `"is"` 문자열 검색 패턴에 각각의 `플래그` 를 지정한 예시 입니다.

<br />

```javascript
const strValue = 'Is this all there is?';

const regExp = /is/;
/**
 * [
 *    'is',
 *    index: 5
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExp.exec(strValue));

const regExpI = /is/i;
/**
 * [
 *    'Is',
 *    index: 0,
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExpI.exec(strValue));

const regExpIG = /is/ig;
/**
 * [
 *    'Is',
 *    index: 0,
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExpIG.exec(strValue));

/**
 * [ 'Is', 'is', 'is' ]
 */
console.log(strValue.match(regExpIG));
```



<br /><hr /><br />



## 5-2. 임의의 문자열 검색

`.` 은 `와일드 카드` 이며 임의의 문자열 1개를 의미 합니다.

<br />

```javascript
const strValue = 'Is this all there is?';

// 임의의 문자 3개인 패턴
const regExp = /.../g;

/**
 * [ 'Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?' ]
 */
console.log(strValue.match(regExp));
```



<br /><hr /><br />



## 5-3. 반복 검색

임의의 문자 3개로 이루어진 문자열을 탐색 할 때, 와일드 카드 `.` 3개로 만들 수 있었습니다.

```javascript
const regExp = /.../;
```

<br />

이렇게 반복되는 패턴의 경우, 반복 횟수를 지정할 수 있습니다.

* `{m, n}`
    * 최소 `m` 개 일치
    * 최대 `n` 개 일치

* `{m}`
    * 최소 `m` 개 일치
    * 최대 `m` 개 일치

* `{m,}`
    * 최소 `m` 개 이상 일치

* `+`
    * 최소 `1` 개 이상 일치
    * `{1,}` 과 동일

* `?`
    * 최소 `0` 개 일치
    * 최대 `1` 개 일치
    * `{0,1}` 과 동일

* `*`
    * 최소 `0` 개 일치
    * `{0,}` 과 동일

<br />

```javascript
const strValue = 'A AA B BB Aa Bb AAA';

const regExp1 = /A{1,2}/g;
/** [ 'A', 'AA', 'A', 'AA', 'A' ] */
console.log(strValue.match(regExp1));

const regExp2 = /A{1}/g;
/** [ 'A', 'A', 'A', 'A', 'A', 'A', 'A', ] */
console.log(strValue.match(regExp2));

const regExp3 = /A{2,}/g;
/** [ 'AA', 'AAA' ] */
console.log(strValue.match(regExp3));

const regExp4 = /A+/g;
/** [ 'A', 'AA', 'A', 'AAA' ] */
console.log(strValue.match(regExp4));

const regExp5 = /A?/g;
/**
 * [
 *    'A', '',
 *    'A', 'A', '',
 *    '', '',
 *    '', '', '',
 *    'A', '', '',
 *    '', '', '',
 *    'A', 'A', 'A', '',
 * ]
 */
console.log(strValue.match(regExp5));

const regExp6 = /A*/g;
/**
 * 'A', '',  
 * 'AA', '',
 * '', '',  
 * '', '', '',
 * 'A', '', '',
 * '', '', '',   
 * 'AAA', ''
 */
console.log(strValue.match(regExp6));
```


<br /><hr /><br />



## 5-4. OR 검색

정규 표현식의 `OR` 는 두가지로 표현할 수 있습니다.

아래는 `A 또는 B` 라는 패턴을 나타냅니다.

* `/A|B/`
* `/[AB]/`

<br />

```javascript
const strValue = 'A AA B BB Aa Bb';

const regExp1 = /A|B/g;
/**
 * [
 *    'A', 'A', 'A',
 *    'B', 'B', 'B',
 *    'A', 'B',
 * ]
 */
console.log(strValue.match(regExp1));

const regExp2 = /[AB]/g;
/**
 * [
 *    'A', 'A', 'A',
 *    'B', 'B', 'B',
 *    'A', 'B',
 * ]
 */
console.log(strValue.match(regExp2));
```

<br />

`|` 는 단순히 `OR` 기능만을 하지만, `[]` 는 문자의 범위까지 지정할 수 있습니다.

범위를 지정할 때는 `[범위시작문자-범위마지막문자]` 형태로 사용합니다.

예를 들어 `A 또는 B 또는 C` 패턴을 만든다면, 다음과 같습니다.

```javascript
const strValue2 = 'AA BB 12,345';

// A 또는 B 또는 C
const regExp3 = /[A-C]/g;
/** [ 'A', 'A', 'B', 'B' ] */
console.log(strValue2.match(regExp3));

const regExp4 = /[A-Za-z]/g;
/** [ 'A', 'A', 'B', 'B', ] */
console.log(strValue2.match(regExp4));
```

<br />

```javascript
const strValue2 = 'AA BB 12,345';

const regExp5 = /[0-9]/g;
/** [ '1', '2', '3', '4', '5' ] */
console.log(strValue2.match(regExp5));

const regExp6 = /[0-9,]+/g;
/** [ '12,345' ] */
console.log(strValue2.match(regExp6));

const regExp7 = /[\d,]+/g;
/** [ '12,345' ] */
console.log(strValue2.match(regExp7));

const regExp8 = /[\D,]+/g;
/** [ 'AA BB ', ',' ] */
console.log(strValue2.match(regExp8));
```

<br />

```javascript
const strValue3 = 'Aa Bb 12,345 !@#$%^&*()_-+=`~';

const regExp9 = /[\w,]+/g;
/** [ 'Aa', 'Bb', '12,345', '_' ] */
console.log(strValue3.match(regExp9));

const regExp10 = /[\W,]+/g;
/** [ ' ', ' ', ',', ' !@#$%^&*()', '-+=`~' ] */
console.log(strValue3.match(regExp10));
```



<br /><hr /><br />



## 5-5. NOT 검색

`OR` 패턴을 위해 사용하였던 `[]` 에는 `NOT` 을 표현할 수 있습니다.

`[]` 내부에 `^` 를 사용할 경우, `^문자` 에서 `문자` 는 `NOT문자` 의 의미를 갖게 됩니다.

<br />

```javascript
const strValue = 'AA BB 12 Aa Bb';

const regExp1 = /[^A-Za-z ]+/g;
/** [ '12' ] */
console.log(strValue.match(regExp1));

const regExp2 = /[^0-9]+/g;
/** ['AA BB ', ' Aa Bb'] */
console.log(strValue.match(regExp2));
```



<br /><hr /><br />



## 5-6. 시작 위치로 검색

`[]` 밖의 `^` 는 `문자열의 시작` 을 의미 합니다.

<br />

```javascript
const strValue = 'https://github.com/Chocobe';

const regExp = /^https/g;
/** [ 'https' ] */
console.log(strValue.match(regExp));
```



<br /><hr /><br />



## 5-7. 마지막 위치로 검색

`$` 는 `문자열의 마지막` 을 의미 합니다.

<br />

```javascript
const strValue = 'https://github.com';

const regExp = /com$/g;
/** [ 'com' ] */
console.log(strValue.match(regExp));
```



<br /><hr /><br />



# 6. 자주 사용하는 정규표현식

## 6-1. 특정 단어로 시작하는지 검사

`[]` 밖에 있는 `^` 는 `문자열의 시작` 을 나타냅니다.

그러므로 다음과 같은 패턴으로 문자열의 시작을 패턴화 할 수 있습니다.

<br />

```javascript
const strValue = 'https://github.com/Chocobe';

const regExp1 = /^https?:\/\//g;
// regExp1.test(strValue): true
console.log('regExp1.test(strValue): ', regExp1.test(strValue));

const regExp2 = /^(http|https):\/\//g;
// regExp2.test(strValue): true
console.log('regExp2.test(strValue): ', regExp2.test(strValue));
```



<br /><hr /><br />



## 6-2. 특정 단어로 끝나는지 검사

`$` 를 사용하면 특정 패턴으로 끝나는지 검사할 수 있습니다.

<br />

```javascript
const strValue = 'https://github.com/Chocobe';

const regExp = /Chocobe$/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 6-3. 숫자로만 이루어진 문자열인지 검사

`^` 와 `$` 를 사용하여 문자열의 시작과 끝의 패턴을 지정 합니다.

그리고 문자열의 구성을 `\d+` 를 사용하여 숫자 1개 이상으로 표현한다면, 문자열이 숫자로만 이루어져 있는지 검사할 수 있습니다.

<br />

```javascript
const strValue = '12345';

const regExp = /^\d+$/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 6-4. 하나 이상의 공백으로 시작하는지 검사

`\s` 는 공백을 의미 합니다.

공백은 여러가지 표현방법이 있으므로, 모든 종류의 공백을 패턴으로 사용할 때 `\s` 를 사용 합니다.

<br />

`\s` 는 모든 공백 문자열을 가리키는데, 이는 다음과 같이 표현할 수도 있습니다.

```javascript
const regExp = /[\t\r\n\v\f]/;
```

<br />

```javascript
const strValue = ' Hello World';

const regExp = /^[\s]+/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 6-5. 아이디로 사용 가능한지 검사

아이디로 `알파벳` 과 `숫자` 만으로 이루어지고, 최소 4자리, 최대 10자리의 문자열을 허용한다면, 다음과 같은 정규 표현식을 사용할 수 있습니다.

<br />

```javascript
const strValue = 'Hello333';

const regExp = /^[A-Za-z0-9]{4,10}$/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 6-6. 메일 주소 형식에 맞는지 검사

```javascript
const strValue = 'kyw05171@gmail.com';

const regExp = /[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 6-7. 핸드폰 번호 형식에 맞는지 검사

```javascript
const strValue = '010-1234-5678';

const regExp = /^\d{3}-\d{3,4}-\d{4}/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
```



<br /><hr /><br />



## 6-8. 특수 문자 포함 여부 검사

`알파벳`, `숫자`, `공백`, `한글` 이 아닌 문자열을 `특수기호` 로 볼 수 있습니다.

이를 정규 표현식으로 나타내면 다음과 같습니다.

<br />

```javascript
const strValue = '~`!@#$%^&*()+-=|';

const regExp = /^[^\w\d\sㄱ-힣]+$/g;
console.log('regExp.test(strValue): ', regExp.test(strValue));
```
