const chocobe = {
  name: 'Chocobe',
  age: 36,

  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

for (const key in chocobe) {
  console.log(`key: "${key}"`);
}
console.log('');

for (const key in chocobe) {
  if (Object.prototype.hasOwnProperty.call(chocobe, key)) {
    console.log(`객체 자체의 프로퍼티 키: "${key}"`);
  }
}
console.log('');



const kim = {
  name: 'Kim',
  age: 36,

  __proto__: Object.defineProperty({}, 'email', {
    value: 'kyw05172@gmail.com',
    writable: true,
    enumerable: false,
    configurable: true,
  }),
};

console.log(
  Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(kim),
    'email'
  )
);

for (const key in kim) {
  console.log(`key: "${key}"`);
}
console.log('');



const symbolKey = Symbol();
const lucidMoon = {
  name: 'Lucid Moon',
  age: 33,

  [symbolKey]: 'value of Symbol key',
};

// "lucidMoon[symbolKey]: value of Symbol key"
console.log('lucidMoon[symbolKey]: ', lucidMoon[symbolKey]);

for (const key in lucidMoon) {
  console.log(`key: "${key}"`);
}