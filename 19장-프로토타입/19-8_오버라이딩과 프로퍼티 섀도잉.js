const User = (function() {
  function User(name, age) {
    this.name = name;
    this.age = age;
  }

  User.prototype.sayGreeting = function() {
    console.log(`Hello, I'm ${this.name} and ${this.age}`);
  };

  return User;
}());

// 프로토타입 프로퍼티로 접근 됩니다.
const chocobe = new User('Chocobe', 36);
chocobe.sayGreeting();

// 인스턴스 프로퍼티로 접근 됩니다. (프로퍼티 섀도잉 (Property Shadowing))
chocobe.sayGreeting = function() {
  console.log(`*** Hello, I'm ${this.name} and ${this.age} ***`);
};
chocobe.sayGreeting();

// 인스턴스 프로퍼티는 delete 키워드로 삭제 가능 합니다.
delete chocobe.sayGreeting;
chocobe.sayGreeting();

// 프로토타입 프로퍼티는 인스턴스에서 삭제할 수 없습니다. (무시 됩니다.)
delete chocobe.sayGreeting;
chocobe.sayGreeting();

// 프로토타입 프로퍼티를 삭제하려면, 해당 생성자 함수의 prototype 에서 삭제해야 합니다.
delete User.prototype.sayGreeting;
console.log('chocobe.sayGreeting: ', chocobe.sayGreeting);