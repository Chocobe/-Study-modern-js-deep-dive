// Array.isArray() === true 인 경우
console.log(
  'Array.isArray([]): ',
  Array.isArray([])
);

console.log(
  'Array.isArray([1, 2, 3]): ',
  Array.isArray([1, 2, 3])
);

console.log(
  'Array.isArray(new Array())',
  Array.isArray(new Array())
);



console.log(' ');



// Array.isArray() === false 인 경우
console.log(
  'Array.isArray(): ',
  Array.isArray()
);

console.log(
  'Array.isArray({}): ',
  Array.isArray({})
);

console.log(
  'Arrary.isArray(null): ',
  Array.isArray(null)
);

console.log(
  'Array.isArray(undefined): ',
  Array.isArray(undefined)
);

console.log(
  'Array.isArray(1): ',
  Array.isArray(1)
);

console.log(
  'Array.isArray("Hello World"): ',
  Array.isArray('Hello World')
);

console.log(
  'Array.isArray(true): ',
  Array.isArray(true)
);

console.log(
  'Array.isArray(false): ',
  Array.isArray(false)
);

// 유사 배열 객체 (Array-Like Object) 도 false 입니다.
console.log(
  'Array.isArray({ 0: "Hello", 1: "World", length: 2 }): ',
  Array.isArray({ 0: "Hello", 1: "World", length: 2 })
);