// 1. `인수` 를 넘겨주지 않으면,
// => 원본 배열을 `얕은 복사` 한 새로운 배열을 반환 합니다.
const arr1 = [1, 2, 3, 4, 5];
const result1 = arr1.slice();

// [1, 2, 3, 4, 5]
console.log(result1);



console.log(' ');



// 2. `첫번째 인수` 만 넘겨줄 경우
// => `시작 인덱스` 부터 모든 요소를 `얕은 복사` 한 새로운 배열을 반환 합니다.
const arr2 = [1, 2, 3, 4, 5];
const result2 = arr2.slice(2);

// [3, 4, 5]
console.log(result2);



console.log(' ');



// 3. `첫번째 인수` 와 `두번째 인수` 모두 넘겨줄 경우
// => 넘겨준 인덱스 범위에 해당하는 요소들을 새로운 배열로 반환 합니다.
// => (`두번째 인수` 에 해당하는 인덱스 요소는 포함되지 않습니다.)
const arr3 = [1, 2, 3, 4, 5];
const result3 = arr3.slice(1, 3);

// [2, 3]
console.log(result3);