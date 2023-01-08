const arr = [1, 2, 3, 4, 5];

// 1. 첫번째 인수만 넘겨줄 경우
// => 배열 전체에서 `특정 값` 이 있는지 검사 합니다.
const result1 = arr.includes(3);

// true
console.log(result1);



console.log(' ');



// 2. 두번째 인수까지 넘겨준 경우
// => `시작 인덱스` 부터 배열 끝까지 `특정 값` 이 있는지 검사 합니다.
const result2 = arr.includes(3, 3);

// false
console.log(result2);