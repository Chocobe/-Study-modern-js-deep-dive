// String 과 Object 의 관계
console.log('--- String 과 Object 의 관계 ---')
console.log('String === String.prototype.constructor: ', String === String.prototype.constructor);
console.log('String.prototype === "Hello World".__proto__: ', String.prototype === "Hello World".__proto__);
console.log('Object === String.prototype.__proto__.constructor: ', Object === String.prototype.__proto__.constructor);
console.log('Object.prototype === String.prototype.__proto__: ', Object.prototype === String.prototype.__proto__);
console.log('Object.prototype === "Hello World".__proto__.__proto__: ', Object.prototype === "Hello World".__proto__.__proto__);

// Array 와 Object 의 관계
console.log('\n--- Array 와 Object 의 관계 ---');
console.log('Array === Array.prototype.constructor: ', Array === Array.prototype.constructor);
console.log('Array.prototype === [].__proto__: ', Array.prototype === [].__proto__);
console.log('Object === Array.prototype.__proto__.constructor: ', Object === Array.prototype.__proto__.constructor);
console.log('Object.prototype === Array.prototype.__proto__: ', Object.prototype === Array.prototype.__proto__);
console.log('Object.prototype === [].__proto__.__proto__: ', Object.prototype === [].__proto__.__proto__);