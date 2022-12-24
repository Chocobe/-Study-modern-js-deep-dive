(function() {
  // `strict mode` 가 아닌 `eval()`
  // 현재 함수 스코프를 런타임에 동적으로 수정 합니다.
  eval(`
    var myVar = 'value of myVar';
  `);

  // "myVar: value of myVar"
  console.log('myVar: ', myVar);
}());



(function() {
  // eval() 의 인자로 넘겨준 `코드 문자열` 에 `let` 이나 `const` 사용시, 암묵적으로 `strict mode` 가 됩니다.
  // `strict mode` 에서 `eval()` 은 자체적은 `함수 스코프` 를 생성하여 실행 됩니다.
  eval(`
    const arr = [1, 2, 3, 4, 5];
    let total = 0;

    total = arr.reduce((total, curValue) => {
      return total + curValue;
    }, 0);
  `);

  // ReferenceError: total is not defined
  // console.log('total: ', total);
}());

(function() {
  const sumFromEval = eval(`(lhs, rhs) => {
    return lhs + rhs;
  }`);

  const subFromEval = eval(`(lhs, rhs) => {
    return lhs - rhs;
  }`);

  // "sumFromEval(1, 2): 3"
  console.log('sumFromEval(1, 2): ', sumFromEval(1, 2));

  // "subFromEval(10, 3): 7"
  console.log('subFromEval(10, 3): ', subFromEval(10, 3));
}());