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