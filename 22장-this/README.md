# 22장. this

# 1. this 키워드

객체는 `프로퍼티` 와 `메서드` 를 하나의 논리단위로 묶은 복합적인 자료구조 입니다.

* 프로퍼티: 객체의 상태 (statement)
* 메서드: 객체의 동작 (behavior)

<br />

객체의 메서드는 자신이 속한 객체의 동작을 담당하며, 객체의 동작에 따른 `상태 변화` 를 반영시킬 수 있어야 합니다.

이를 위해서는 메서드 내부에서 `메서드가 속한 객체` 를 `참조` 할 수 있어야 합니다.

이렇게 메서드 자신이 속한 객체를 참조할 수 있는 특수한 식별자가 `this` 입니다.

<br />

`this` 가 가리키는 객체가 결정되는 시점은 `함수` 또는 `메서드` 를 호출하는 시점 입니다.

* 여기서 메서드 뿐만 아니라 `함수` 까지 언급한 이유는, `생성자 함수` 내부에서의 `this` 도 같은 맥락의 특수한 식별자이기 때문 입니다.

즉, `this` 에 어떤 객체가 바인딩 될 것인가는 `함수 호출 방식` 에 의해 `동적` 으로 결정 됩니다.

<br >

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <script>
      // 1. 전역 스코프에서의 this
      // this: window
      console.log('this: ', this);

      // 2. 일반 함수 내부에서의 this
      function myFunction() {
        // myFunction() - this: window
        console.log('myFunction() - this: ', this);
      }
      myFunction();

      // 3. 객체의 메서드에서의 this
      const chocobe = {
        name: 'Chocobe',
        sayGreeting() {
          // 객체.메서드() - this: { name: 'Chocobe', sayGreeting(): f }
          console.log('객체.메서드() - this: ', this);
        },
      };
      chocobe.sayGreeting();

      // 4. 생성자 함수 내부에서의 this
      const User = (function() {
        function User(name, age) {
          this.name = name;
          this.age = age;

          // 생성자 함수 내부 - this: User { name: 'Kim', age: 36 }
          console.log('생성자 함수 내부 - this: ', this);
        }

        return User;
      }());
      const kim = new User('Kim', 36);

      // 5. strict mode 함수 내부에서의 this
      function myStrictModeFunction() {
        "use strict";

        // myStrictModeFunction() - this: undefined
        console.log('myStrictModeFunction() - this: ', this);
      }
      myStrictModeFunction();
    </script>
  </body>
</html>
```



<br /><hr /><br />



# 2. 함수 호출 방식과 this 바인딩

`this` 바인딩은 `함수 호출 방식` 에 의해, 호출 시점에 `동적` 으로 결정 됩니다.

자바스크립트의 함수는 다양한 방법으로 호출할 수 있으며, 다음과 같습니다.

* 일반 함수로 호출
* 메서드로 호출
* 생성자 함수로 호출
* Function.prototype 의 간접 호출 방식으로 호출
  * Function.prototype.apply
  * Function.prototype.call
  * Function.prototype.bind



<br /><hr /><br />



## 2-1. 일반 함수 호출

`일반 함수 호출` 방식으로 함수를 호출하게 되면, `this` 에는 `window` 가 바인딩 되게 됩니다.

함수 호출 방식은 다양하며, 아래와 같은 호출 방식이 있습니다.

* 일반 함수 -> 함수로 호출
  * this: `window`
* 객체의 메서드 -> 메서드로 호출
  * this: `메서드가 속한 객체`
* 객체의 메서드 -> (메서드 호출 방식이 아닌) 함수로 호출
  * this: `window`
* 중첩 함수 -> 함수로 호출
  * this: `window`
* (화살표 함수가 아닌) callback 함수 -> 함수로 호출
  * this: `window`
* (화살표 함수) callback 함수 -> 함수로 호출
  * this: `(callback 을 정의한) 메서드가 속한 객체`

<br />

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <script>
      // 1. 일반 함수 -> 함수 호출
      function normalFunction() {
        // normalFunction() - this: window
        console.log('normalFunction() - this: ', this);
      }
      normalFunction();


      console.log('');
      
      
      var myValue = 111;

      const myObj = {
        myValue: 333,
        myObjMethod() {
          // (메서드 -> 메서드로 호출 - this: { myValue: 333, myObjMethod: f })
          console.log('(메서드 -> 메서드로 호출 - this: ', this);
          // this.myValue: 333
          console.log('\tthis.myValue: ', this.myValue);

          // 2. 중첩 함수 -> 함수 호출
          function innerFunction() {
            // innerFunction() - this: window
            console.log('innerFunction() - this: ', this);
            // this.myValue: 111
            console.log('\tthis.myValue: ', this.myValue);
          }
          innerFunction();

          // 3. (화살표 함수가 아닌) callback 함수 -> 함수 호출
          setTimeout(function() {
            // (화살표 함수가 아닌) callback() - this: window
            console.log('(화살표 함수가 아닌) callback() - this: ', this);
            // this.myValue: 111
            console.log('\tthis.myValue: ', this.myValue);
          }, 1000);
        }
      };
      myObj.myObjMethod();

      // 4. 객체의 method -> 함수로 호출
      const yourObj = {
        myValue: 777,
        yourObjMethod() {
          // (메서드 -> 메서드 호출 방식이 아닌 함수로 호출 - this: window)
          console.log('(메서드 - 메서드가 아닌 함수로 호출 - this: ', this);
          // this.myValue: 111
          console.log('\tyourObjMethod() - this: ', this.myValue);
        },
      };
      const yourObjMethodRef = yourObj.yourObjMethod;
      yourObjMethodRef();
    </script>
  </body>
</html>
```

<br />

위 예시 중에서, `callback` 함수의 경우, `화살표 함수` 를 `callback` 으로 넘겨 주었을 경우에는, `callback 을 정의하고 있는 메서드` 가 `속한 객체` 가 `this` 에 바인딩 됩니다.

<br />

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <script>
      // 5. callback 함수를 `화살표 함수` 로 정의 -> 함수 호출 - this: someObj
      const someObj = {
        myValue: 1234,
        someObjMethod() {
          setTimeout(() => {
            // (화살표 함수) callback() - this: { myValue: 1234, someObjMethod: f }
            console.log('(화살표 함수) callback() - this: ', this);
            // myValue: 1234
            console.log('\tthis.myValue: ', this.myValue);
          }, 2000);
        },
      };
      someObj.someObjMethod();
    </script>
  </body>
</html>
```

<br />

위 코드에서 살펴본 것과 같이, `객체의 메서드` 를 `메서드 호출 방식` 으로 호출하였을 때 `this` 는, `메서드가 속한 객체` 가 바인딩 됩니다.

이 메서드를 기준으로 `중첩 함수` 또는 `callback 함수` 는 중첩함수를 돕기위한 목적의 `헬퍼 함수` 입니다.

돕기 위한 목적의 `헬퍼 함수` 는 `메서드의 this` 와 동일한 객체를 바라보아야 정상적인 헬퍼 기능을 할 수 있습니다.

하지만 `중첩 함수` 와 `(화살표 함수가 아닌) callback 함수` 내부의 `this` 는 `window` 가 되기 때문에, 정상적인 `헬퍼 함수` 기능을 할 수 없게 됩니다.

이러한 문제를 해결하기 위해, `Function.prototype` 을 통해서 `간접 호출` 방법을 제공하며, 이를 통해서 `this 바인딩` 을 `일치` 시킬 수 있습니다.

* `Function.prototype.apply`
* `Function.prototype.call`
* `Function.prototype.bind`



<br /><hr /><br />



## 2-2. 메서드 호출

메서드는 객체의 행동을 위한 함수를 지칭하며, 객체의 `프로퍼티 값` 이 `함수` 인 형태를 말합니다.

메서드 내부의 `this` 는 다음과 같습니다.

* `메서드를 소유한 객체`: ❌
* `메서드를 호출한 객체`: ⭕️

<br />

객체는 `프로퍼티` 에 값을 가질 수 있는데, `프로퍼티 값` 에 할당된 값이 `함수의 참조값` 인 것입니다.

즉, `메서드` 를 소유한 것은 `this` 바인딩에 영향을 주는 것이 아닙니다.

실제로 `메서드` 를 `호출한 객체` 가 주체가 되며, `호출한 객체` 가 `this` 에 바인딩 되는 것 입니다.

그러므로, `하나의 함수` 를 `서로 다른 객체` 에서 `호출` 한다면, 이 함수 내부에서 접근하는 `this` 는 각각 호출한 객체가 됩니다.

<br />

```javascript
const chocobe = {
  name: 'Chocobe',
  getName() {
    return this.name;
  },
};
// chocobe.getName(): Chocobe
console.log('chocobe.getName(): ', chocobe.getName());

const kim = {
  name: 'Kim',
  getName: chocobe.getName,
};
// kim.getName(): Kim
console.log('kim.getName(): ', kim.getName());

const { getName } = chocobe;
// getName(): undefined
console.log('getName(): ', getName());

const Person = (function() {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.getName = chocobe.getName;

  return Person;
}());

const lucidMoon = new Person('Lucid Moon');
// lucidMoon.getName(): Lucid Moon
console.log('lucidMoon.getName(): ', lucidMoon.getName());

// Person.prototype.getName(): undefined
console.log('Person.prototype.getName(): ', Person.prototype.getName());

Person.prototype.name = "value of Person's name property";
// Person.prototype.getName(): value of Person's name property
console.log('Person.prototype.getName(): ', Person.prototype.getName());
```



<br /><hr /><br />



