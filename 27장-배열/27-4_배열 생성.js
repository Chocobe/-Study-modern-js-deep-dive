// 1. 배열 리터럴
const arr0 = [1, 2, 3];



console.log(' ');



// 2. Array 생성자 함수
// 2-1. 인수가 1개 이고 Number 타입일 경우 => 희소 배열 생성
const sparseArr = new Array(3);

// sparseArr.length: 3
console.log('sparseArr.length: ', sparseArr.length);

// [ <3 empty items> ]
console.log(sparseArr);




// 2-2. 그 외의 인수를 넘겨줄 경오 => 밀집 배열 생성
const denseArr = new Array(1, 2, 3);

// denseArr.length: 3
console.log('denseArr.length: ', denseArr.length);

// [1, 2, 3]
console.log(denseArr);



console.log(' ');



// 3. Array.of
const denseArr2 = Array.of(3);

// denseArr2.length: 1
console.log('denseArr2.length: ', denseArr2.length);

// [3]
console.log(denseArr2);



console.log(' ');



// 4. Array.from
// 4-1. 유사 배열 객체 (Array-Like Object) 또는 이터러블 객체 (Iterable Object)
const arr1 = Array.from({
  length: 3,
  0: 'A',
  1: 'B',
  2: 'C',
});

// arr1.length: 3
console.log('arr1.length: ', arr1.length);

// ['A', 'B', 'C']
console.log(arr1);




// 4-2. 두번째 인수로 callback 사용
const arr2 = Array.from(
  { length: 3 },
  (_, i) => i * 100
);

// arr2.length: 3
console.log('arr2.length: ', arr2.length);

// [0, 100, 200]
console.log(arr2);