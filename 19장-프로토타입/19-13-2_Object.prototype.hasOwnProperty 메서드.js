const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// "Object.prototype.hasOwnProperty.call(chocobe, 'name'): true"
console.log('Object.prototype.hasOwnProperty.call(chocobe, "name"): ', Object.prototype.hasOwnProperty.call(chocobe, 'name'));

// "Object.prototype.hasOwnProperty.call(chocobe, 'age'): true"
console.log('Object.prototype.hasOwnProperty.call(chocobe, "age"): ', Object.prototype.hasOwnProperty.call(chocobe, 'age'));

// "Object.prototype.hasOwnProperty.call(chocobe, 'toString'): false"
console.log('Object.prototype.hasOwnProperty.call(chocobe, "toString"): ', Object.prototype.hasOwnProperty.call(chocobe, 'toString'));
