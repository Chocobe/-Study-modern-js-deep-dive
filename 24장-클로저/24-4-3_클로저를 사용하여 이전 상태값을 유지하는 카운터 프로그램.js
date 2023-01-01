const increase = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  // 클로저 (Closure)
  return function() {
    return ++countValue;
  };
}());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3