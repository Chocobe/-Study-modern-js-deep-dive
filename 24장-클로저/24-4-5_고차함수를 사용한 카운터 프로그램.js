// increaser() 와 decreaser() 가 서로 다른 상위 렉시컬 환경을 가지는 문제점을 가집니다.
function createCounter(aux) {
  // 자유변수 (Free Variable)
  let countValue = 0;

  return function() {
    countValue = aux(countValue);
    return countValue;
  };
}

// 보조 함수
function increase(value) {
  return ++value;
}

function decrease(value) {
  return --value;
}

const increaser = createCounter(increase);
console.log(increaser());
console.log(increaser());
console.log(increaser());

const decreaser = createCounter(decrease);
console.log(decreaser());
console.log(decreaser());
console.log(decreaser());



console.log('');



// 클로저와 고차함수를 사용한 함수형 프로그래밍으로 구현한 카운터 프로그램 완성형
const perfectCounter = (function() {
  // 자유 변수 (Free Variable)
  let countValue = 0;

  return function(aux) {
    countValue = aux(countValue);
    return countValue;
  };
}());

console.log(perfectCounter(increase)); // 1
console.log(perfectCounter(increase)); // 2
console.log(perfectCounter(increase)); // 3

console.log(perfectCounter(decrease)); // 2
console.log(perfectCounter(decrease)); // 1
console.log(perfectCounter(decrease)); // 0