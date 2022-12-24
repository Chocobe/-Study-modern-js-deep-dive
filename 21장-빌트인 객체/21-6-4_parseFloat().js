(function() {
  // parseFloat('3.14'): 3.14 (number 타입)
  console.log('parseFloat("3.14"): ', parseFloat('3.14'));

  // parseFloat('10.00'): 10 (number 타입)
  console.log('parseFloat("10.00"): ', parseFloat('10.00'));

  // 인수가 `문자열` 이며, `공백` 이 포함되어 있다면, 
  // `첫번째 공백 전` 까지의 문자열만을 parseFloat() 를 적용 합니다.
  // parseFloat('33 44 55'): 33 (number 타입)
  console.log('parseFloat("33 44 55"): ', parseFloat('33 44 55'));
  
  // parseFloat('123 Hello World'): 123 (number 타입)
  console.log('parseFloat("123 Hello World): ', parseFloat('123 Hello World'));

  // `첫번째 공백 전` 까지의 문자열을 `암묵적 타입 변환` 하였을 때, `NaN` 이라면, `NaN` 을 반환 합니다.
  // parseFloat('Hello World 333'): NaN
  console.log('parseFloat("Hello World 333"): ', parseFloat('Hello World 333'));

  // `첫번째 공백 전` 까지의 문자열에 parseFloat() 를 적용시킬 때, 
  // 먼저 `trim()` 을 실행한 후, parseFloat()` 를 적용 시킵니다.
  // parseFloat(' 7 '): 7 (number 타입)
  console.log('parseFloat(" 7 "): ', parseFloat(' 7 '));
}());