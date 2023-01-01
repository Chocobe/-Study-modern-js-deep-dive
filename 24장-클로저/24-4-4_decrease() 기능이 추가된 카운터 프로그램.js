// increase() 와 decrease() 메서드를 가지는 카운터 객체 생성
const counter = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  return {
    increase() {
      return ++countValue;
    },
    decrease() {
      return --countValue;
    },
  };
}());

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.increase()); // 3

console.log(counter.decrease()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0



console.log('');



const CounterConstructor = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  // 생성자 함수
  function CounterConstructor() {
    // this.countValue = 0; 으로 프로퍼티 지정 시, countValue 는 `은닉` 되지 않기 때문에, 자유변수 (Free Variable) 을 사용합니다.
  }

  CounterConstructor.prototype.increase = function() {
    return ++countValue;
  };

  CounterConstructor.prototype.decrease = function() {
    return --countValue;
  };

  return CounterConstructor;
}());

const myCounter = new CounterConstructor();

console.log(myCounter.increase());
console.log(myCounter.increase());
console.log(myCounter.increase());

console.log(myCounter.decrease());
console.log(myCounter.decrease());
console.log(myCounter.decrease());