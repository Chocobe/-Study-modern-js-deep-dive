# 06장. 데이터 타입

`데이터 타입` 은 `값의 종류` 를 나타내기 위한 방법 입니다.

`숫자 1` 과 `문자 "1"` 을 `타입` 으로 구분하는 이유는, 각 타입별 연산과 처리 방법에 필요하기 때문입니다.

<br />

`타입` 은 `총 7가지` 이며, 크게 나누면 `2가지` 로 구분할 수 있습니다.

* `객체 타입`
* `원시 타입`
  * `number`
  * `string`
  * `boolean`
  * `undefined`
  * `null`
  * `symbol`



<br /><hr /><br />



# 1. 숫자 타입

자바스크립트의 `number` 타입은 `부동 소수점` 형식 입니다.

그리고 `진수` 에 대한 구분도 하지 않기 때문에, 모든 `number` 타입은 `10진수` 로 해석하는 특징이 있습니다.

<br />

특정 숫자값을 표현하는 `유한한 값` 이외에도 다음과 같은 특별한 값을 표현할 수도 있습니다.

* `Infinite`: 양의 무한대
* `-Infinite`: 음의 무한대
* `NaN`: 숫자가 아님을 표현



<br /><hr /><br />



# 2. 문자열 타입

`string` 타입은 텍스트 데이터를 표현 합니다.

자바스크립트에서 `string` 타입은 `원시 타입` 에 속하기 때문에, `불변성` 을 가지는 `리터럴` 값 입니다.



<br /><hr /><br />



# 3. 템플릿 리터럴

`string` 타입 데이터를 나타내기 위한 방법중 하나 입니다.

일반적인 `string` 타입 값은 `"값"` 또는 `'값'` 의 형식으로 나타냅니다.

`템플릿 리터럴` 은 기존의 `string` 과는 다르게, `런타임` 에서 `string` 으로 변환되는 처리방식을 가집니다.

<br />

다음은 `템플릿 리터럴` 의 특징 입니다.

* 멀티 라인 입력

```javascript
const value = `
  Hello,
  World
`;
```

<br />

* 표현식 삽입

```javascript
const name = "KIM";
const value = `Hello, ${name}`;
```

<br />

* 태그드 템플릿

```javascript
/**
 * @param { string } strings
 * @param { string } bgColor
 */
const styleMixins = (strings, bgColor) => {
  const styles = strings[0];
  const ending = strings[1].trim() || ";";

  const color = 
    (bgColor === "#000")
      ? "#fff" 
      : (bgColor === "#fff")
        ? "#000"
        : "inherit";

  return `
    ${styles} ${bgColor}${ending}
    color: ${color};
  `.replace(/\s{2,}/g, "\n  ");
};

const styleInstance = styleMixins`
  font-size: 20px;
  font-weight: 900;
  background-color: ${"#000"};
`;
```