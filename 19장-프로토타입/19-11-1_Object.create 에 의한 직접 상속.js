let obj = Object.create(null);

// "Object.getPrototypeOf(obj): null"
console.log('Object.getPrototypeOf(obj): ', Object.getPrototypeOf(obj));



obj = Object.create(Object.prototype);

// Object.getPrototypeOf(obj) === Object.prototype: true
console.log('Object.getPrototypeOf(obj) === Object.prototype: ', Object.getPrototypeOf(obj) === Object.prototype);



obj = Object.create(Object.prototype, {
  myValue: {
    value: 3,
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

// "obj.myValue: 3"
console.log('obj.myValue: ', 3);

// "Object.getPrototypeOf(obj) === Object.prototype: true"
console.log('Object.getPrototypeOf(obj) === Object.prototype: ', Object.getPrototypeOf(obj) === Object.prototype);



const myObj = {
  someValue: 123,
};
obj = Object.create(myObj);

// "obj.someValue: 123"
console.log('obj.someValue: ', obj.someValue);

// "Object.getPrototypeOf(obj) === myObj: true"
console.log('Object.getPrototypeOf(obj) === myObj: ', Object.getPrototypeOf(obj) === myObj);



const Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;
}());

obj = Object.create(Person.prototype);
obj.name = 'Chocobe';

// "obj.name: Chocobe"
console.log('obj.name: ', obj.name);

// "Object.getPrototypeOf(obj) === Person.prototype: true"
console.log('Object.getPrototypeOf(obj) === Person.prototype: ', Object.getPrototypeOf(obj) === Person.prototype);



obj = Object.create(null);
obj.myValue = 3;

// Object.prototype.hasOwnProperty() 를 call() 로 간접 호출
// "Object.prototype.hasOwnProperty.call(obj, 'myValue'): true"
console.log('Object.prototype.hasOwnProperty.call(obj, "myValue"): ', Object.prototype.hasOwnProperty.call(obj, 'myValue'));
