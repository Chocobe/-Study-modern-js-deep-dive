const arr = [1, 2, 3];

// 1. 첫번째 인수를 생략한 경우
// => ',' 를 구분자로 사용하여, 모든 요소를 하나의 문자열로 반환 합니다.
const result1 = arr.join();

// 1,2,3
console.log(result1);



console.log(' ');



// 2. 첫번째 인수에 문자열을 넘겨준 경우
// => 인수로 받은 문자열을 Seperator(구분자) 로 사용하여, 모든 요소를 하나의 문자열로 반환 합니다.
const result2 = arr.join('(구분자)');

// 1(구분자)2(구분자)3
console.log(result2);