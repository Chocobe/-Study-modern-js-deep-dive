const Person = 'Person String Value';

{
  // 현재 블록 스코프를 평가할 때, Person 식별자를 평가 합니다. (식별자 선언 단계)
  // let, const 처럼 class 도 `초기화 단계` 이전에 참조하게 되면 `ReferenceError` 를 발생 시킵니다.
  console.log('Person: ', Person);

  class Person {
    //
  }
}