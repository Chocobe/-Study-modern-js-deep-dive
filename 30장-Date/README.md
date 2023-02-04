# 30장. Date

`Date` 는 `날짜` 에 대한 `표준 빌트인 객체` 입니다.

날짜는 `UTC (세계 협정시)` 를 기준으로 한 값입니다.

`KST (한국 표준시)` 는 `UTC` 에 `9시간` 을 더한 값이 됩니다.

그러므로 `UTC 01:00` 은 `KST 10:00` 이 됩니다.



<br /><hr /><br />



# 1. Date 생성자 함수

## 1-1. new Date()

넘겨주는 `인수` 없이 `new Date()` 를 호출하게 되면, 현재 날짜와 시간을 가지는 `Date 인스턴스` 를 생성합니다.



<br /><hr /><br />



## 1-2. new Date(milliseconds)

`인수` 로 `정수 1개` 를 넘겨주는 방식이며, `인수` 를 `milliseconds` 로 사용하게 됩니다.

전달받은 `인수` 는 `1970년 1월 1일 00:00` 으로부터 경과한 `milliseconds` 로 연산되며, 연산된 결과를 가지는 `Date 인스턴스` 를 생성 합니다.

<br />

```javascript
const myDate = new Date(1000 * 60 * 60);

// 1970-01-01T01:00:00.000Z
console.log('myDate: ', myDate);
```



<br /><hr /><br />



## 1-3. new Date(dateString)

`인수` 로 `문자열` 을 넘겨주면, `인수` 를 `날짜 문자열` 로 사용하게 됩니다.

넘겨주는 `인수` 는 `Date.parse` 메서드가 해석할 수 있는 형식이 되어야 합니다.

<br />

주의할 점은 `인수` 로 넘겨준 `날짜 문자열` 은 `local` 이 적용되기 때문에 `KST` 로 해석됩니다.

그러므로, `new Date(dateString)` 의 결과값은 `UTC` 값으로 나타나게 되며, `console.log` 로 값을 확인하면 `-9 시간` 이 적용된 값이 출력 됩니다.

```javascript
// 입력한 dateString 은 KST 로 해석됩니다.
const myDate1 = new Date('2023-01-20 10:25:30');

// 2023-01-20T01:25:30.000Z
// => console.log 에 출력된 값은 UTC 입니다.
console.log('myDate1: ', myDate1);



// 입력한 dateString 은 KST 로 해석됩니다.
const myDate2 = new Date('2023/02/03 14:10:55');

// 2023-02-03T05:10:55.000Z
// => console.log 에 출력된 값은 UTC 입니다.
console.log('myDate2: ', myDate2);
```



<br /><hr /><br />



## 1-4. new Date(year, month, [, day, hour, minute, second, millisecond])

`인수` 로 `정수 2개 이상` 을 넘겨줄 경우, 순서대로 `년`, `월`, `일`, `시`, `분`, `초`, `밀리초` 로 해석하여 `Date 인스턴스` 를 생성 합니다.

<br />

주의할 점은 인수로 넘겨준 시간값은 `Locale` 이 적용된 `KST` 로 인식되는 것 입니다.



<br /><hr /><br />



# 2. Date 메서드

## 2-1. Date.now

`1970년 1월 1일 00:00:00(UTC)` 를 기준으로 현재 시간까지 경과한 `밀리초` 를 반환 합니다.



<br /><hr /><br />



## 2-2. Date.parse

`Date.now` 처럼 경과한 `밀리초` 를 반환하며, 경과 지점을 `인수` 로 넘겨줍니다.

`인수` 의 형식은 `new Date(dateString)` 에서 넘겨주는 인수인 `dateString` 과 동일한 형식이 되어야 합니다.



<br /><hr /><br />



## 2-3. Date.UTC

`new Date(year, month [, day, hour, minute, second, millisecond])` 와 동일한 방식의 `Date` 객체 생성 방식 입니다.

`Date.UTC` 에 넘겨주는 `인수` 역시 동일하며, 차이점은 `인수` 를 `UTC` 로 인식하는 것 입니다.



<br /><hr /><br />



## 2-4. Date.prototype.getFullYear

`년도` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-5. Date.prototype.setFullYear

`년도` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-6. Date.prototype.getMonth

`월` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-7. Date.prototype.setMonth

`월` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-8. Date.prototype.getDate

`일` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-9. Date.prototype.setDate

`일` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-10. Date.prototype.getDay

`요일` 값의 `GETTER` 메서드 입니다.

반환되는 값은 `0 ~ 6` 의 `정수` 입니다.



<br /><hr /><br />



## 2-11. Date.prototype.getHours

`시` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-12. Date.prototype.setHours

`시` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-13. Date.prototype.getMinutes

`분` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-14. Date.prototype.setMinutes

`시` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-15. Date.prototype.getSeconds

`초` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-16. Date.prototype.setSeconds

`초` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-17. Date.prototype.getMilliseconds

`밀리초` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-18. Date.prototype.setMilliseconds

`밀리초` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-19. Date.prototype.getTime

`1970년 1월 1일 00:00:00(UTC)` 로 부터 경과한 `밀리초` 값의 `GETTER` 메서드 입니다.



<br /><hr /><br />



## 2-20. Date.prototype.setTime

`1970년 1월 1일 00:00:00(UTC)` 로 부터 경과한 `밀리초` 값의 `SETTER` 메서드 입니다.



<br /><hr /><br />



## 2-21. Date.prototype.getTimezoneOffset

`Date 인스턴스` 의 `UTC` 를 기준으로 `KST (Locale 적용 시간)` 의 `차이값` 을 `분 단위` 로 반환 합니다.

즉, `KST` 는 `UTC + 9시간` 이므로, `UTC - KST === -9시간` 이 됩니다.

<br />

```javascript
const today = new Date();

const timezoneOffset = today.getTimezoneOffset();
const timezoneOffsetHours = timezoneOffset / 60;

// timezoneOffsethours: -9
console.log('timezoneOffsetHours: ', timezoneOffsetHours);
```



<br /><hr /><br />



## 2-22. Date.prototype.toDateString

`Date 인스턴스` 의 `날짜` 를 사람이 읽을 수 있는 `문자열` 로 반환 합니다.

주의할 점은 `시간` 을 제외한 `날짜` 만을 반환하는 것 입니다.



<br /><hr /><br />



## 2-23. Date.prototype.toTimeString

`Date 인스턴스` 의 `시간` 을 사람이 읽을 수 있는 `문자열` 로 반환 합니다.

`날짜` 를 제외한 `시간` 만을 나타냅니다.



<br /><hr /><br />



## 2-24. Date.prototype.toISOString

`ISO 8601` 형식의 `문자열` 을 반환 합니다.

`ISO 8601` 형식은 다음과 같습니다.

* 한국 표준시 2023년 2월 4일 10시 30분 15초: `2023-02-04T01:30:15.000Z`

<br />

주의할 점은 `UTC + 0` 의 값을 반환하는 것 입니다.



<br /><hr /><br />



## 2-25. Date.prototype.toLocaleString

`인수` 로 전달한 `Locale` 이 적용된 `날짜와 시간` 을 `문자열` 로 반환 합니다.

`인수` 를 생략할 경우, 현재 실행중인 시스템의 Locale 이 적용 됩니다.



<br /><hr /><br />



## 2-26. Date.prototype.toLocaleTimeString

`인수` 로 전달한 `Locale` 이 적용된 `시간` 을 `문자열` 로 반환 합니다.

`인수` 를 생략한 경우, 현재 실행중인 시스템의 Locale 이 적용 됩니다.



<br /><hr /><br />



## 3. Date를 활용한 시계 예제

매 초, 현재 날짜와 시간을 출력하는 예시 코드 입니다.

<br />

```javascript
const dayList = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

(function printNow() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const dayIndex = today.getDay();
  const day = dayList[dayIndex];

  const originHours = today.getHours();
  const originMinutes = today.getMinutes();
  const originSeconds = today.getSeconds();

  const hours = parseHours(originHours);
  const minutes = parseMinuteSeconds(originMinutes);
  const seconds = parseMinuteSeconds(originSeconds);

  const amPm = getAmPm(originHours);

  const dateString = `${year}년 ${month}월 ${date}일 (${day}) - ${hours}시 ${minutes}분 ${seconds}초 ${amPm}`;
  console.log(dateString);

  setTimeout(printNow, 1000);
}());

function getAmPm(hours) {
  return hours > 12
    ? 'pm'
    : 'am';
}

function parseHours(hours) {
  const parsedHours = hours % 12;

  return parsedHours < 10
    ? `0${parsedHours}`
    : parsedHours;
}

function parseMinuteSeconds(value) {
  return value < 10
    ? `0${value}`
    : value;
}
```
