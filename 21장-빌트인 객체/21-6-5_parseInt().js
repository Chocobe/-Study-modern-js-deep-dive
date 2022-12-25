(function() {
  // parseInt('333'): 333 (number 타입)
  console.log('parseInt("333"): ', parseInt('333'));
}());


console.log('');


// '10' 을 대상으로 `진수값` 에 따른 반환값을 확인 합니다.
(function() {
  // parseInt('10', 10): 10
  console.log('parseInt("10"): ', parseInt('10'));

  // parseInt('10', 16): 16
  console.log('parseInt("10", 16): ', parseInt('10', 16));

  // parseInt('10', 8); 8
  console.log('parseInt("10", 8): ', parseInt('10', 8));

  // parseInt('10', 2): 2
  console.log('parseInt("10", 2): ', parseInt('10', 2));
}());


console.log('');


// Number 타입 값을 `특정 진수` 로 변환하기
(function() {
  const numberValue = 20;

  // numberValue.toString(): 20
  console.log('numberValue.toString(): ', numberValue.toString());

  // numberValue.toString(10): 20
  console.log('numberValue.toString(10): ', numberValue.toString(10));

  // numberValue.toString(16): 14
  console.log('numberValue.toString(16): ', numberValue.toString(16));

  // numberValue.toString(8): 24
  console.log('numberValue.toString(8): ', numberValue.toString(8));

  // numberValue.toString(2): 10100
  console.log('numberValue.toString(2): ', numberValue.toString(2));
}());


console.log('');


(function() {
  // parseInt('3.14'): 3
  console.log('parseInt("3.14"): ', parseInt('3.14'));

  // parseInt('10.00'): 10
  console.log('parseInt("10.00"): ', parseInt('10.00'));

  // parseInt('33 44 55'): 33
  console.log('parseInt("33 44 55"): ', parseInt('33 44 55'));

  // parseInt('333 Hello World'): 333
  console.log('parseInt("123 Hello World"): ', parseInt('123 Hello World'));

  // parseInt('Hello World 333'): NaN
  console.log('parseInt("Hello World 333"): ', parseInt('Hello World 333'));

  // parseInt(' 7 '): 7
  console.log('parseInt(" 7 "): ', parseInt(' 7 '));
}());