const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());
const chocobe = new Person('Chocobe', 36);
console.log('chocobe instanceof Person: ', chocobe instanceof Person);



const isInstanceof = (instance, constructor) => {
  const prototype = Object.getPrototypeOf(instance);

  if (prototype === null) return false;

  return prototype === constructor.prototype || 
    isInstanceof(prototype, constructor);
};
console.log('isInstanceof(chocobe, Person): ', isInstanceof(chocobe, Person));
console.log('isInstanceof(chocobe, Object): ', isInstanceof(chocobe, Object));
console.log('isInstanceof(chocobe, Array): ', isInstanceof(chocobe, Array));
