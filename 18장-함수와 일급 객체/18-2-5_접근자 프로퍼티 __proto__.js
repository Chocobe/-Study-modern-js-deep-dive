function myFunction() {
  // do somethins
  console.log(__proto__);
}
myFunction();
console.log(myFunction.hasOwnProperty('hello'));

myFunction.hello = "Hello World";
console.log(myFunction.hasOwnProperty('hello'));

const myObject = {
  myValue: "Hello, My Value",
};
console.log(myObject.hasOwnProperty('myValue'));
console.log(myObject.hasOwnProperty('__proto__'));