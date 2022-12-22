const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

const chocobe = new Person('Chocobe', 36);

// '"name" in chocobe: true'
console.log('"name" in chocobe: ', 'name' in chocobe);

// '"age" in chocobe: true'
console.log('"age" in chocobe: ', 'age' in chocobe);

// '"address" in chocobe: false'
console.log('"address" in chocobe: ', 'address' in chocobe);

// '"toString" in chocobe: true'
console.log('"toString" in chocobe: ', 'toString' in chocobe);

// "Reflect.has(chocobe, 'name'): true"
console.log("Reflect.has(chocobe, 'name'): ", Reflect.has(chocobe, 'name'));

// "Reflect.has(chocobe, 'age'): true"
console.log('Reflect.has(chocobe, "age"): ', Reflect.has(chocobe, 'age'));

// "Reflect.has(chocobe, 'address'): false"
console.log('Reflect.has(chocobe, "address"): ', Reflect.has(chocobe, 'address'));

// "Reflect.has(chocobe, 'toString'): true"
console.log('Reflect.has(chocobe, "toString"): ', Reflect.has(chocobe, 'toString'));
