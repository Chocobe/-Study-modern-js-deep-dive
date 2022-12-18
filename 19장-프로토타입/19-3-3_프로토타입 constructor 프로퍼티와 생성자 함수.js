function Person(name, age) {
  this.name = name;
  this.age = age;
}

const me = new Person("Chocobe", 36);
console.log(me.__proto__.constructor);
console.log(me.constructor);
console.log(Person === me.constructor);
console.log(Person === me.__proto__.constructor);
console.log(me.__proto__.constructor === me.constructor);