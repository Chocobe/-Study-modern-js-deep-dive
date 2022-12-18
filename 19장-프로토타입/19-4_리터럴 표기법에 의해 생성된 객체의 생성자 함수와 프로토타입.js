const obj1 = new Object();
const obj2 = {};
console.log(obj1.constructor === obj2.constructor);

const func1 = new Function('lhs', 'rhs', 'return lhs + rhs');
const func2 = function(lhs, rhs) {
  return lhs + rhs;
};
console.log(func1.constructor === func2.constructor);

const arr1 = new Array();
const arr2 = [];
console.log(arr1.constructor === arr2.constructor);

const regExp1 = new RegExp('[a-z]');
const regExp2 = /[a-z]/;
console.log(regExp1.constructor === regExp2.constructor);