const LENGTH = 10_000_000;
const arr = [];

console.time('Array performance test');

for (let i = 0; i < LENGTH; i++) {
  arr[i] = i;
}

// 277.529ms
console.timeEnd('Array performance test');



console.log(' ');



const obj = {};

console.time('Object performance test');

for (let i = 0; i < LENGTH; i++) {
  obj[i] = i;
}

// 357.415ms
console.timeEnd('Object performance test');