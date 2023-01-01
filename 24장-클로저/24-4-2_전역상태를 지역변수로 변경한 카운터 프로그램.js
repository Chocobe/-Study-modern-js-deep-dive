function increase() {
  // 함수를 호출할 때마다 새로운 `렉시컬 환경` 을 생성,
  // 즉, `함수 코드 평가` 과정에서 지역변수 countValue 를 생성하고,
  // `함수 코드 실행` 과정에서 0으로 초기화 합니다.
  let countValue = 0;

  return ++countValue;
}

// increase() 함수를 호출할 때마다, 새로운 렉시컬 환경을 생성하게 됩니다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1