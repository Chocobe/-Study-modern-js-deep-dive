function add(a, b) {
  return a + b;
}
console.log(add(1, 2));

const sub = function _sub(a, b) {
  return a - b;
};
console.log(sub(10, 3));

const mul = function(a, b) {
  return a * b;
};
console.log(mul(3, 7));

console.log(div(10, 2));
function div(a, b) {
  return a / b;
}

const myCalc = new Function('a', 'b', 'return a + b');
console.log(`Use BuiltInFunction: ${myCalc(10, 20)}`);

function doSome(name, age) {
  console.log(arguments);
}
doSome("Chocobe", 36, "FrontEnd");

(function() {
  console.log("IIF: Immediately Invoked Function");
}());

function myPrint(num) {
  if (num < 1) return;

  console.log(num);
  myPrint(num - 1);
}
myPrint(10);

// HOF
function repeat(value, callback) {
  for (let i = 0; i < value; i++) {
    callback(i);
  }
}

function print(value) {
  console.log(value);
}
repeat(5, print);

function printOdd(value) {
  if (value % 2 === 1) console.log(value);
}
repeat(5, printOdd);