# 08장. 제어문

# 1. 블록문

`블록문 (block statement / compound statement)` 는 0개 이상의 `문 (statement)` 를 `중괄호 {}` 로 묶는 문법 입니다.

자바스크립트는 `블록문` 을 하나의 실행 단위로 취급하며, 일반적으로 제어문이나 함수를 정의할 때 사용합니다.

<br />

`블록문` 자체로 `문의 종결` 을 나타내기 때문에, `세미콜론 (;)` 은 사용하지 않습니다.



<br /><hr /><br />



# 2. 조건문

`boolean` 값으로 평가될 수 있는 표현식의 `결과값 (true / false)` 에 따라 실행할 코드 블록을 결정하는 문법 입니다.

* `if ~ else if ~ else`
* `switch ~ case`

<br />

`if 문` 조건식의 평가 결과값이 `boolean` 값이 아닐 경우, 자바스크립트는 `암묵적 타입 변환` 을 하여 `boolean` 값으로 강제 변환 한 후 실행 합니다.



<br /><hr /><br />



# 3. 반복문

`조건식` 이 `true` 라면 블록을 실행하고, `조건식` 이 `false` 가 될 때까지 이 과정을 반복하는 문법 입니다.



<br /><hr /><br />



# 4. break 문

`레이블 문 (Label statement)` 또는 `반복문` 블록을 탈출하는 키워드 입니다.

`레이블 문 (Label statement)` 란 `식별자가 붙은 문(statement)` 를 말하며, `switch ~ case` 의 `case` 와 같은 문법 입니다.

<br />

중첩된 `for()` 문에서 조건에 의해 `최상의 for()` 문을 종료하고자 할 때, `레이블 문 (Label statement)` 를 사용할 수 있습니다.

아래는 `레이블 문 (Label statement)` 예시 코드 입니다.

<br />

```javascript
outerLoop: for (let i = 0; i < 3; i++) {
  for(let j = 0; j < 3; j++) {
    const sum = i + j;

    // sum 이 3보다 크면, 외부 for() 문을 탈출 합니다.
    if (sum > 3) break outerLoop;

    console.log("[i, j, sum]: ", [i, j, sum]);
  }
}
```

<br />

주의할 점은 가독성이 나빠지기 때문에, 사용을 권장하지는 않습니다.



<br /><hr /><br />



# 5. continue 문

`continue 문` 을 만나게 되면, 현재 시점에서 실행을 중단하고, `반복문의 증감식` 으로 코드 흐름을 이동 시킵니다.