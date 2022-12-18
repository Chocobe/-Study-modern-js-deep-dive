console.log('Person === Person.prototype.constructor: ', Person === Person.prototype.constructor);
console.log('Person.prototype === (new Person()).__proto__: ', Person.prototype === (new Person()).__proto__);
console.log('Object === Person.prototype.__proto__.constructor: ', Object === Person.prototype.__proto__.constructor);
console.log('Object.prototype === Person.prototype.__proto__: ', Object.prototype === Person.prototype.__proto__);
console.log('Object.prototype === (new Person()).__proto__.__proto__: ', Object.prototype === (new Person()).__proto__.__proto__);

function Person() {
  // initialize
}