// 카운터 상태값 (전역 변수)
let countValue = 0;

const increase = function() {
  return ++countValue;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3

// 카운터 상태값은 전역 변수 이므로, 어디서나 임의의 값으로 변경할 수 있는 문제점을 가지고 있습니다.
countValue = 0;
console.log(increase()); // 1