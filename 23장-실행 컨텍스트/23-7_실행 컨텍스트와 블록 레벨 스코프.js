var x = 1;


if (true) {
  var x = 3;
}

// x: 3
console.log('x: ', x);

const y = 10;
let z = 100;

if (true) {
  const y = 30;
  let z = 300;
}

// y: 10
console.log('y: ', y);

// z: 100
console.log('z: ', z);