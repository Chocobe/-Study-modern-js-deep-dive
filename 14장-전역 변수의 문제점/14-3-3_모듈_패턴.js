const Counter = (function() {
  let count = 0;

  const increase = () => ++count;
  const decrease = () => --count;
  const getCount = () => count;

  return {
    increase,
    decrease,
    getCount,
  };
}());

console.log(Counter.getCount());

Counter.increase();
console.log(Counter.getCount());

Counter.decrease();
Counter.decrease();
console.log(Counter.getCount());