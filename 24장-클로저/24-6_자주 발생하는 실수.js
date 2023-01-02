const myFunctions = [];

// var 키워드로 선언한 변수는 `함수 레벨 스코프` 를 따릅니다.
// 그러므로, `var i` 는 전역변수가 됩니다.
for (var i = 0; i < 3; i++) {
  // 차후 이 함수를 호출하면, 이 시점의 `전역변수 i` 의 값을 반환합니다.
  myFunctions[i] = function() {
    // 항상 3 반환
    return i;
  };
}

for (var j = 0; j < 3; j++) {
  console.log(myFunctions[j]());
  // 3
  // 3
  // 3
}



console.log('');



const yourFunctions = [];

// let 이나 const 키워드로 선언한 변수는 `블록 레벨 스코프` 를 따릅니다.
// 그러므로, for 반복문이 반복할 때마다 생성하는 `블록 레벨 스코프` 에 `let x` 가 선언 됩니다.
for (let x = 0; x < 3; x++) {
  // 생성하는 함수의 `[[Environment]]` 는 `for 반복문` 이 반복할 때마다 생성하는 `블록 레벨 스코프` 를 참조합니다.
  yourFunctions[x] = function() {
    return x;
  };
}

for (let y = 0; y < 3; y++) {
  console.log(yourFunctions[y]());
  // 0
  // 1
  // 2
}