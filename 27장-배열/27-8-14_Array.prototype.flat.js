const arr = [
  1, 
  [10, 20], 
  [
    [100, 200, 300], 
    [400, 500],
  ], 
  [
    [
      [-1, -2], 
      [-3, -4],
      [-5, -6, -7],
    ],
  ],
];

// 1. 첫번째 인수를 생략하면
// => 인수의 기본값 `1` 에 대한 동작을 합니다.
// => 평탄화 1회 수행
const result1 = arr.flat();

/**
[
  1, 
  10, 
  20, 
  [100, 200, 300], 
  [400, 500], 
  [
    [-1, -2], 
    [-3, -4], 
    [-5, -6, -7]
  ]
]
 */
console.log(result1);



console.log(' ');



// 2. 첫번째 인수를 넘겨주면
// => 넘겨준 값만큼 재귀하여 `평탄화` 동작을 합니다.
const result2 = arr.flat(2)

/**
[
  1, 
  10, 
  20, 
  100, 
  200, 
  300, 
  400, 
  500, 
  [-1, -2], 
  [-3, -4], 
  [-5, -6, -7]
]
 */
console.log(result2);



console.log(' ');



// 3. 첫번째 인수에 `Infinite` 를 넘겨준 경우
// => `모든 중첩 함수` 를 `평탄화` 합니다.
const result3 = arr.flat(Infinity);

/**
[
  1, 
  10, 
  20, 
  100, 
  200, 
  300, 
  400, 
  500, 
  -1, 
  -2, 
  -3, 
  -4, 
  -5,
  -6,
  -7
]
 */
console.log(result3);