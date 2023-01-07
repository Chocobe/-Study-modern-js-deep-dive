class Base {
  // constructor 를 생략하였다면, 암묵적으로 생성될 constructor 형태
  constructor() {}
}

class Child extends Base {
  // 자식 클래스의 constructor 를 생략하면, 암묵적으로 아래와 같은 constructor 가 생성 됩니다.
  constructor(...args) {
    super(...args);
  }
}