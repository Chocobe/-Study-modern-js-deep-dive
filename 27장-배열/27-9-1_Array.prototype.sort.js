// 1. Array.prototype.sort() 의 기본 정렬 방식의 문제점
const arr1 = [2, 10, 1];
arr1.sort();

// [1, 10, 2];
console.log(arr1);



console.log(' ');



// 2. sort() 의 정렬 방식을 결정하는 `보조 함수`
const arr2 = [2, 10, 1];

// 오름차순 정렬
arr2.sort((a, b) => a - b);
// [1, 2, 10]
console.log(arr2);

// 내림차순 정렬
arr2.sort((a, b) => b - a);
// [10, 2, 1]
console.log(arr2);



console.log(' ');



// 3. 배열의 요소들이 객체일 경우, sort() 로 정렬
const arr3 = [
  { id: 10, name: 'Kim' },
  { id: 2, name: 'LucidMoon' },
  { id: 1, name: 'Chocobe' },
];

// 오름차순 정렬
arr3.sort((a, b) => a.id - b.id);
/**
 * [
 *  { id: 1, name: 'Chocobe' },
 *  { id: 2, name: 'LucidMoon' },
 *  { id: 10, name: 'Kim' }
 * ]
 **/
console.log(arr3);

// 내림차순 정렬
arr3.sort((a, b) => b.id - a.id);
/**
 * [
 *  { id: 10, name: 'Kim' }
 *  { id: 2, name: 'LucidMoon' },
 *  { id: 1, name: 'Chocobe' },
 * ]
 **/
console.log(arr3);