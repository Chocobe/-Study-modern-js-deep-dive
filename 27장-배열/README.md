# 27장. 배열

`배열` 은 여러개의 값을 `순차적` 으로 나열한 자료구조 입니다.

`배열` 에 속하게 되는 값을 `요소 (Element)` 라고 합니다.

자바스크립트에는 `배열` 이라는 `타입` 은 존재하지 않고, `배열` 도 `객체` 타입 입니다.

<br />

```javascript
const myArray = ['banana', 'apple', 'orange'];

// typeof myArray: object
console.log(
  'typeof myArray: ',
  typeof myArray
);
```

<br />

`배열` 도 `객체` 이지만 이를 별도의 `배열` 이라고 분류하는 이유는 `객체` 에는 없고 `배열` 에만 있는 특징 때문입니다.

* `배열` 의 요소는 `순서` 를 가집니다.
* `배열` 에는 요소의 개수를 나타내는 `length` 프로퍼티가 있습니다.



<br /><hr /><br />



# 2. 자바스크립트 배열은 배열이 아니다

자바스크립트의 배열의 타입은 `객체` 라고 하였습니다.

이는 일반적인 프로그래밍 언어의 `배열` 과는 다른 특징 입니다.

배열은 크게 2가지로 구분하는데, `밀집 배열 (Dense Array)` 와 `희소 배열 (Sparse Array)` 로 구분할 수 있습니다.

<br />

* `밀집 배열 (Dense Array)`
    * 모든 요소가 `동일한 데이터 타입` 을 가집니다.
    * 각 요소가 위치한 메모리 주소는 `연속된 주소값` 을 가집니다.
    * 배열의 요소에 접근할 때, 속도가 빠릅니다.
    * 배열에 요소를 `추가` 또는 `삭제` 할 때, 속도가 느립니다.

* `희소 배열 (Sparse Array)`
    * 각 요소가 서로 `다른 데이터 타입` 을 가질 수 있습니다.
    * 각 요소가 차지하는 `메모리 크기` 가 다를 수 있습니다.
    * 각 요소가 `연속되지 않은` 메모리 주소를 가질 수 있습니다.
    * 배열의 요소에 접근할 때, 속도가 느립니다.
    * 배열의 요소를 `추가` 또는 `삭제` 할 때, 속도가 빠릅니다.

<br />

자바스크립트의 `배열` 은 `밀집 배열 (Dense Array)` 와 `희소 배열 (Sparse Array)` 을 모두 제공 합니다.

그래서 아래와 같은 특징을 갖게 됩니다.

* `배열` 도 `객체` 타입 입니다.
* `일반 객체` 에 추가적인 특성을 가집니다.
    * 요소의 `순서를 보장` 합니다.
    * `배열` 에 속한 `요소의 개수` 를 나타내는 `length` 프로퍼티를 가집니다.
* 각 요소의 메모리 크기는 서로 다를 수 있습니다.
* 각 요소의 메모리 주소가 연속되지 않을 수 있습니다.

<br />

자바스크립트의 배열은 객체이지만, 실제 사용할 때 `객체` 가 아닌 `배열` 을 사용하는 목적은 다음과 같습니다.

* 요소의 순서를 보장합니다.
* 요소의 개수를 나타내는 `length` 프로퍼티를 제공 합닌다.
* 배열 요소를 검색할 때, 자바스크립트 엔진의 `배열 요소 검색` 에 대해 `최적화` 가 되어 있어서, 객체의 프로퍼티 검색보다 빠릅니다.

<br />

아래의 코드는 자바스크립트의 `배열 요소 검색` 과 `객체 프로퍼티 검색` 속도를 비교합니다.

<br />

```javascript
const LENGTH = 10_000_000;
const arr = [];

console.time('Array performance test');

for (let i = 0; i < LENGTH; i++) {
  arr[i] = i;
}

// 277.529ms
console.timeEnd('Array performance test');



console.log(' ');



const obj = {};

console.time('Object performance test');

for (let i = 0; i < LENGTH; i++) {
  obj[i] = i;
}

// 357.415ms
console.timeEnd('Object performance test');
```

<br />

자바스크립트의 `배열 요소` 와 `객체 프로퍼티` 삽입 속도를 비교한 결과, 배열의 요소 검색이 더 빠른것을 알 수 있습니다.

* 배열의 요소 삽입에 걸린 시간: `277.529ms`
* 객체의 프로퍼티 삽입에 걸린 시간: `357.415ms`



<br /><hr /><br />



# 3. length 프로퍼티와 희소 배열

자바스크립트 배열의 요소가 모두 `동일한 타입` 이고, `연속된 인덱스` 에 위치한다면, `밀집 배열 (Dense Array)` 로 생성 합니다.

만약 요소 중 하나라도 타입이 다르거나, 연속된 인덱스가 아닌 요소가 있다면 `희소 배열 (Sparse Array)` 를 생성 합니다.

<br >

배열 요소의 개수를 나타내는 `length` 프로퍼티는 `밀집 배열 (Dense Array)` 에서만 `정확한 개수를 보장` 합니다.

자바스크립트에서 `희소 배열 (Sparse Array)` 를 허용하지만, 배열을 사용할 때는 `밀집 배열 (Dense Array)` 를 사용할 것을 권장 합니다.



<br /><hr /><br />



# 4. 배열 생성

배열을 생성하는 방법은 4가지가 있습니다.

* 배열 리터럴로 생성
* Array 생성자 함수로 생성
* Array.of() 메서드로 생성
* Array.from() 메서드로 생성



<br /><hr /><br />



## 4-1. 배열 리터럴

배열을 의미하는 `[]` 를 사용하여 배열을 생성할 수 있습니다.

<br />

```javascript
const arr = [1, 2, 3];
```



<br /><hr /><br />



## 4-2. Array 생성자 함수

배열 생성자 함수인 `Array` 를 사용하여 배열을 생성할 수 있습니다.

`Array 생성자 함수` 는 `new` 를 사용하지 않아도 내부에서 `new.target` 처리를 하고 있기 때문에, `new Array()` 와 `Array()` 가 동일하게 배열을 생성 합니다.

<br />

`Array 생성자 함수` 를 사용할 때 주의할 점은 `인수가 1개` 이며 `Number` 타입일 경우 입니다.

`인수가 1개` 이며 `Number` 타입을 `Array 생성자 함수` 의 `인수` 로 넘겨주면, `인수` 는 배열의 `length` 가 되며, 생성된 각 요소는 `undefined` 인 배열을 생성합니다.

이렇게 생성된 배열은 `undefined` 인 요소가 있는 `희소 배열 (Sparse Array)` 입니다.

<br />

```javascript
// 인수가 1개 이고 Number 타입일 경우 => 희소 배열 생성
const sparseArr = new Array(3);

// sparseArr.length: 3
console.log('sparseArr.length: ', sparseArr.length);

// [ <3 empty items> ]
console.log(sparseArr);




// 그 외의 인수를 넘겨줄 경오 => 밀집 배열 생성
const denseArr = new Array(1, 2, 3);

// denseArr.length: 3
console.log('denseArr.length: ', denseArr.length);

// [1, 2, 3]
console.log(denseArr);
```



<br /><hr /><br />



## 4-3. Array.of

`Array 생성자 함수` 와 동일한 방식으로 배열을 생성 합니다.

차이점은 `Array.of()` 에 넘겨준 `인수가 1개` 이고 `Number` 타입 이더라도, `해당 인수를 요소값` 으로 갖는 배열을 생성 합니다.

<br />

```javascript
const denseArr2 = Array.of(3);

// denseArr2.length: 1
console.log('denseArr2.length: ', denseArr2.length);

// [3]
console.log(denseArr2);
```



<br /><hr /><br />



## 4-4. Array.from

`Array.from()` 메서드를 사용하면, `유사 배열 객체 (Array-Like Object)` 또는 `이터러블 객체 (Iterable Object)` 를 `인수` 로 사용하여 배열을 생성할 수 있습니다.

그리고 `두번째 인자` 에 `callback` 을 넘겨줄 수 있는데, `callback` 을 통해 각 요소의 값을 생성할 수 있습니다.

<br />

```javascript
// 유사 배열 객체 (Array-Like Object) 또는 이터러블 객체 (Iterable Object)
const arr1 = Array.from({
  length: 3,
  0: 'A',
  1: 'B',
  2: 'C',
});

// arr1.length: 3
console.log('arr1.length: ', arr1.length);

// ['A', 'B', 'C']
console.log(arr1);



// 두번째 인수로 callback 사용
const arr2 = Array.from(
  { length: 3 },
  (_, i) => i * 100
);

// arr2.length: 3
console.log('arr2.length: ', arr2.length);

// [0, 100, 200]
console.log(arr2);
```



<br /><hr /><br />



# 5. 배열 요소의 참조

배열의 특정 요소에 접근하기 위해서는 `대괄호 표기법 []` 을 사용합니다.

배열도 객체이므로, 객체의 `대괄호 표기법 []` 과 동일한 방법 입니다.



<br /><hr /><br />



# 6. 배열 요소의 추가와 갱신

배열의 특정 인덱스에 값을 할당하여, 배열 요소를 `추가` 또는 `갱신` 을 할 수 있습니다.

주의할 점은, 만약 배열의 현재 `length` 값 보다 `큰 값의 인덱스` 에 값을 할당하면, `희소 배열 (Sparse Array)` 로 바뀝니다.



<br /><hr /><br />



# 7. 배열 요소 삭제

배열도 객체이기 때문에 `delete` 연산자를 사용하여 특정 요소를 `삭제` 할 수 있습니다.

다만, `delete` 연산자를 사용하여 요소를 삭제하면, `희소 배열 (Sparse Array)` 로 바뀝니다.

`희소 배열 (Sparse Array)` 로 만들지 않기 위해, `Array.prototype.splice()` 메서드를 사용하여 특정 요소를 삭제하는 것을 권장 합니다.

<br />

```javascript
const myArray = [1, 2, 3];

myArray.splice(1, 1);

// [1, 3]
console.log(myArray);
```



<br /><hr /><br />



# 8. 배열 메서드

`Array` 는 유틸리티로 `정적 메서드` 와 `인스턴스 메서드` 를 제공 합니다.

이러한 유틸리티 메서드는 두가지로 분류할 수 있습니다.

* `Mutator Method`: 배열 원본을 직접 변경 합니다.
* `Accessor Method`: 배열 원본에는 영향이 없고, 새로운 배열을 생성하여 메서드 결과를 반환 합니다.

<br />

`Mutator Method` 는 배열 원본에 직접 영향을 주기 때문에 `부수효과 (Side-Effect)` 를 가지므로, 사용시 주의해야 합니다.



<br /><hr /><br />



## 8-1. Array.isArray

`Array` 의 `정적 메서드` 입니다.

`인수` 로 넘겨준 값이 `Array` 라면 `true` 를 반환 합니다.

만약 `인수` 가 `유사 배열 객체 (Array-Like Object)` 일 경우, `Array` 는 아니므로 `false` 를 반환합니다.

<br />

```javascript
// Array.isArray() === true 인 경우
console.log(
  'Array.isArray([]): ',
  Array.isArray([])
);

console.log(
  'Array.isArray([1, 2, 3]): ',
  Array.isArray([1, 2, 3])
);

console.log(
  'Array.isArray(new Array())',
  Array.isArray(new Array())
);



console.log(' ');



// Array.isArray() === false 인 경우
console.log(
  'Array.isArray(): ',
  Array.isArray()
);

console.log(
  'Array.isArray({}): ',
  Array.isArray({})
);

console.log(
  'Arrary.isArray(null): ',
  Array.isArray(null)
);

console.log(
  'Array.isArray(undefined): ',
  Array.isArray(undefined)
);

console.log(
  'Array.isArray(1): ',
  Array.isArray(1)
);

console.log(
  'Array.isArray("Hello World"): ',
  Array.isArray('Hello World')
);

console.log(
  'Array.isArray(true): ',
  Array.isArray(true)
);

console.log(
  'Array.isArray(false): ',
  Array.isArray(false)
);

// 유사 배열 객체 (Array-Like Object) 도 false 입니다.
console.log(
  'Array.isArray({ 0: "Hello", 1: "World", length: 2 }): ',
  Array.isArray({ 0: "Hello", 1: "World", length: 2 })
);
```



<br /><hr /><br />



## 8-2. Array.prototype.indexOf

배열에서 `특정 요소` 의 `index` 를 반환 합니다.

만약 `특정 요소` 가 복수개 존재한다면, 가장 먼저 찾은 `index` 를 반환 합니다.

그리고 배열에 `특정 요소` 가 없다면, `-1` 을 반환 합니다.

<br />

```javascript
const arr = [1, 2, 3, 3, 4];

// arr.indexOf(1): 0
console.log(
  'arr.indexOf(1): ',
  arr.indexOf(1)
);

// arr.indexOf(3): 2
console.log(
  'arr.indexOf(3): ',
  arr.indexOf(3)
);

// arr.indexOf(10): -1
console.log(
  'arr.indexOf(10): ',
  arr.indexOf(10)
);
```



<br /><hr /><br />



## 8-3. Array.prototype.push

`인수` 로 넘겨받은 모든 값들을 `배열의 마지막 요소` 로 추가 합니다.

`Array.prototype.push` 는 원본 배열을 직접 변경하는 `Mutator Method` 이며, 성능면에서 좋지 않습니다.

그래서 배열의 마지막에 요소를 추가하고자 할 때는 `스프레드 문법` 을 사용하는 것이 좋습니다.

* `스프레드 문법` 은 원본 배열에도 영향이 없어서, 좀 더 안전한 배열 가공 방법 입니다.

<br />

```javascript
const arr = [1, 2, 3];
arr.push(10, 20);

// [1, 2, 3, 10, 20]
console.log(arr);

const newArr = [...arr, 300];

// [1, 2, 3, 10, 20, 300]
console.log(newArr);
```



<br /><hr /><br />



## 8-4. Array.prototype.pop

배열의 `마지막 요소` 를 `제거` 하고, 제거한 요소를 `반환` 합니다.

`Array.prototype.pop` 은 원본 배열을 직접 변경하는 `Mutator Method` 입니다.

<br />

```javascript
const arr = [1, 2, 3];

const resultOfPop = arr.pop();

// 3
console.log(resultOfPop);
```



<br /><hr /><br />



## 8-5. Array.prototype.unshift

`인수` 로 넘겨받은 모든 값을 배열의 `선두` 에 `추가` 합니다.

`Array.prototype.unshift` 는 원본 배열을 직접 변경하는 `Mutator Method` 입니다.

이 메서드 대신 `스프레드 문법` 을 사용하는 것을 권장 합니다.

<br />

```javascript
const arr = [3, 4, 5];
arr.unshift(1, 2);

// [1, 2, 3, 4, 5];
console.log(arr);

const newArr = [-1, 0, ...arr];

// [-1, 0, 1, 2, 3, 4, 5]
console.log(newArr);
```



<br /><hr /><br />



## 8-6. Array.prototype.shift

배열의 `첫번째 요소` 를 `제거` 하고, 제거한 요소를 `반환` 합니다.

`Array.prototype.shift` 는 원본 배열을 직접 변경하는 `Mutator Method` 입니다.

<br />

```javascript
const arr = [3, 4, 5];

const resultOfShift = arr.shift();

// 3
console.log(resultOfShift);
```



<br /><hr /><br />



## 8-7. Array.prototype.concat

`인수` 로 전달받은 모든 값들을 배열의 `마지막 요소` 로 추가한 `새로운 배열` 을 반환 합니다.

원본 배열에 영향을 주지 않는 `Accessor Method` 입니다.

`Array.prototype.push` 와 `Array.prototype.unshift` 처럼 요소를 추가하는 메서드입니다.

`Array.prototype.concat` 메서드의 특징으로는 `인수` 에 배열을 넘겨주면, 배열을 `해체` 하여 추가하는 방식으로 동작 합니다.

* `인수` 가 `고차 배열` 일 경우, `고차 배열` 전체를 해체하지는 않고, `1차 배열` 만 해체 합니다.

<br />

배열의 요소를 추가하는 메서드이므로, 일관된 코드를 위해 `스프레드 문법` 으로 사용하는 것을 권장 합니다.

<br />

```javascript
const arr = [1, 2];

const newArr1 = arr.concat(3, 4, [5, 6]);

// [1, 2, 3, 4, 5, 6]
console.log(newArr1);

const newArr2 = newArr1.concat([[100, 200], [[1000, 2000, 3000]]]);

// [1, 2, 3, 4, 5, 6, [100, 200], [[1000, 2000, 3000]]]
console.log(newArr2);
```



<br /><hr /><br />



## 8-8. Array.prototype.splice

배열의 중간에 위치한 요소를 `삭제` 하거나 `추가` 할 수 있는 메서드 입니다.

`Array.prototype.splice` 는 원본 배열을 직접 수정하는 `Mutator Method` 입니다.

<br />

`인자` 는 총 3가지가 있습니다.

* 첫번째 인자: 시작 인덱스
* 두번째 인자: 삭제할 요소 개수
* 세번째 인자: `스프레드 문법` 으로 넘겨주며, `시작 인덱스` 에 추가할 요소

<br />

`Array.prototype.splice` 는 `삭제한 요소` 를 `배열` 로 `반환` 합니다.

그리고 넘겨준 `인수` 에 따라 다양한 활용을 할 수 있습니다.

<br />

```javascript

// 1. 첫번째 인수만 넘겨줄 경우
// => `시작 인덱스` 부터 모든 요소를 `삭제` 합니다.
const arr1 = [1, 2, 3];
arr1.splice(0);

// []
console.log(arr1);



console.log(' ');



// 2. 두번째 인수까지만 넘겨줄 경우
// => `시작 인덱스` 부터 `삭제할 개수` 만큼 `삭제` 합니다.
const arr2 = [1, 2, 3, 4, 5];
arr2.splice(1, 2);

// [1, 4, 5]
console.log(arr2);



console.log(' ');



// 3. 인수를 3개 이상 넘겨줄 경우
// => `시작 인덱스` 에서 `삭제할 개수` 만큼 삭제한 후, `세번째 인수` 부터 `나머지 인수` 를 배열에 `추가` 합니다.
const arr3 = [1, 2, 3, 4, 5];
arr3.splice(1, 3, 200, 300, 400);

// [1, 200, 300, 400, 5]
console.log(arr3);
```



<br /><hr /><br />



## 8-9. Array.prototype.slice

배열의 특정 인덱스 범위의 요소를 복사하여, `새로운 배열` 로 `반환` 합니다.

`Arry.prototype.slice` 는 원본 배열에 영향을 주지 않는 `Accessor Method` 입니다.

주의할 점은 `반환` 되는 배열의 요소는 `얕은 복사 (Shallow Copy)` 된 값 입니다.

<br />

`인자` 는 총 2개 입니다.

* 범위 시작 인덱스
* 범위 끝 인덱스 (마지막 요소의 인덱스에 포함되지 않습니다.)

<br />

```javascript
// 1. `인수` 를 넘겨주지 않으면,
// => 원본 배열을 `얕은 복사` 한 새로운 배열을 반환 합니다.
const arr1 = [1, 2, 3, 4, 5];
const result1 = arr1.slice();

// [1, 2, 3, 4, 5]
console.log(result1);



console.log(' ');



// 2. `첫번째 인수` 만 넘겨줄 경우
// => `시작 인덱스` 부터 모든 요소를 `얕은 복사` 한 새로운 배열을 반환 합니다.
const arr2 = [1, 2, 3, 4, 5];
const result2 = arr2.slice(2);

// [3, 4, 5]
console.log(result2);



console.log(' ');



// 3. `첫번째 인수` 와 `두번째 인수` 모두 넘겨줄 경우
// => 넘겨준 인덱스 범위에 해당하는 요소들을 새로운 배열로 반환 합니다.
// => (`두번째 인수` 에 해당하는 인덱스 요소는 포함되지 않습니다.)
const arr3 = [1, 2, 3, 4, 5];
const result3 = arr3.slice(1, 3);

// [2, 3]
console.log(result3);
```



<br /><hr /><br />



## 8-10. Array.prototype.join

배열의 모든 요소를 `문자열로 변환` 하여, `하나의 문자열` 로 합쳐서 `반환` 합니다.

`Array.prototype.join` 은 원본 배열에 영향을 주지 않는 `Accessor Method` 입니다.

`첫번째 인수` 로 `구분자 (Seperator)` 를 넘겨줄 수 있으며, 생략하게 되면 `','` 를 구분자로 사용합니다.

<br />

```javascript
const arr = [1, 2, 3];

// 1. 첫번째 인수를 생략한 경우
// => ',' 를 구분자로 사용하여, 모든 요소를 하나의 문자열로 반환 합니다.
const result1 = arr.join();

// 1,2,3
console.log(result1);



console.log(' ');



// 2. 첫번째 인수에 문자열을 넘겨준 경우
// => 인수로 받은 문자열을 Seperator(구분자) 로 사용하여, 모든 요소를 하나의 문자열로 반환 합니다.
const result2 = arr.join('(구분자)');

// 1(구분자)2(구분자)3
console.log(result2);
```



<br /><hr /><br />



## 8-11. Array.prototype.reverse

배열 요소의 순서를 `거꾸로` 변경 합니다.

`Array.prototype.reverse` 는 원본 배열을 직접 수정하는 `Mutator Method` 입니다.

<br />

```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();

// [5, 4, 3, 2, 1]
console.log(arr);
```



<br /><hr /><br />



## 8-12. Array.prototype.fill

`첫번째 인수` 로 받은 값으로 배열의 모든 요소를 채웁니다.

즉, 모든 값을 하나로 통일하는 기능이 됩니다.

`Array.prototype.fill` 은 원본 배열을 직접 수정하는 `Mutator Method` 입니다.

<br />

`인수` 는 총 3가지가 있습니다.

* 첫번째 인수: 채우기로 사용할 값
* 두번째 인수: 채우기 시작 인덱스
* 세번째 인수: 채우기 종료 인덱스

<br />

```javascript
// 1. 첫번째 인수만 넘겨준 경우
// => `채우기 값` 으로 모든 요소의 값을 변경 합니다.
const arr1 = [1, 2, 3];
arr1.fill('&');

// ['&', '&', '&']
console.log(arr1);



console.log(' ');



// 2. 두번째 인수까지 넘겨준 경우
// => `시작 인덱스` 부터 마지막 요소까지 `채우기 값` 으로 요소의 값을 변경 합니다.
const arr2 = [1, 2, 3, 4, 5];
arr2.fill('&', 3);

// [1, 2, 3, '&', '&']
console.log(arr2);



console.log(' ');



// 3. 세번째 인수까지 넘겨준 경우
// => `시작 인덱스` 부터 '종료 인덱스` 까지 `채우기 값` 으로 요소의 값을 변경 합니다.
const arr3 = [1, 2, 3, 4, 5];
arr3.fill('&', 2, 4);

// [1, 2, '&', '&', 5]
console.log(arr3);
```



<br /><hr /><br />



## 8-13. Array.prototype.includes

배열에 `특정 값` 이 있는지 검사하여 `Boolean` 을 반환 합니다.

* 첫번째 인수: 검색할 `값`
* 두번째 인수: 검색 `시작 인덱스`

<br />

`Array.prototype.indexOf()` 를 사용하여도 배열에 `특정 값` 이 있는지 검사할 수 있었습니다.

하지만 `NaN` 은 `NaN !== NaN` 이라는 특수한 `타입` 이라서, `indexOf()` 로는 확인할 수 없습니다.

때문에 `ES7` 에서 도입되었으며, 좀 더 직관적인 가독성을 만들 수 있습니다.

<br />

```javascript
const arr = [1, 2, 3, 4, 5];

// 1. 첫번째 인수만 넘겨줄 경우
// => 배열 전체에서 `특정 값` 이 있는지 검사 합니다.
const result1 = arr.includes(3);

// true
console.log(result1);



console.log(' ');



// 2. 두번째 인수까지 넘겨준 경우
// => `시작 인덱스` 부터 배열 끝까지 `특정 값` 이 있는지 검사 합니다.
const result2 = arr.includes(3, 3);

// false
console.log(result2);
```



<br /><hr /><br />



## 8-14. Array.prototype.flat

중첩 배열을 재귀적으로 `평탄화` 해줍니다.

`Array.prototype.flat` 는 원본 배열에 영향을 주지 않는 `Access Method` 입니다.

<br />

`인수` 는 1개를 받으며, `평탄화 재귀 횟수` 입니다.

`인수` 를 넘겨주지 않으면, `기본값` 으로 `1` 이 되며, `평탄화` 동작을 `1회` 만 수행 합니다.

만약 `인수` 에 `Infinity` 를 넘겨주면, `모든 중첩` 을 `평탄화` 합니다.

<br />

```javascript
const arr = [
  1, 
  [10, 20], 
  [
    [100, 200, 300], 
    [400, 500],
  ], 
  [
    [
      [-1, -2], 
      [-3, -4],
      [-5, -6, -7],
    ],
  ],
];

// 1. 첫번째 인수를 생략하면
// => 인수의 기본값 `1` 에 대한 동작을 합니다.
// => 평탄화 1회 수행
const result1 = arr.flat();

/**
[
  1, 
  10, 
  20, 
  [100, 200, 300], 
  [400, 500], 
  [
    [-1, -2], 
    [-3, -4], 
    [-5, -6, -7]
  ]
]
 */
console.log(result1);



console.log(' ');



// 2. 첫번째 인수를 넘겨주면
// => 넘겨준 값만큼 재귀하여 `평탄화` 동작을 합니다.
const result2 = arr.flat(2)

/**
[
  1, 
  10, 
  20, 
  100, 
  200, 
  300, 
  400, 
  500, 
  [-1, -2], 
  [-3, -4], 
  [-5, -6, -7]
]
 */
console.log(result2);



console.log(' ');



// 3. 첫번째 인수에 `Infinite` 를 넘겨준 경우
// => `모든 중첩 함수` 를 `평탄화` 합니다.
const result3 = arr.flat(Infinity);

/**
[
  1, 
  10, 
  20, 
  100, 
  200, 
  300, 
  400, 
  500, 
  -1, 
  -2, 
  -3, 
  -4, 
  -5,
  -6,
  -7
]
 */
console.log(result3);
```



# 9. 배열 고차 함수

자바스크립트의 함수는 값으로 평가되는 `일급 객체` 입니다.

함수를 `인자` 로 받거나, `반환` 하는 함수를 `고차 함수 (HOC: Higher Order Function)` 이라고 합니다.

<br />

`고차 함수` 는 `함수형 프로그래밍 페러다임` 에서 사용하는 패턴이며, `고차 함수` 를 사용하는 목적은 다음과 같습니다.

* `불변성 (Immutable)` 을 지향 합니다.
    * 함수 외부의 데이터를 변경하는 `부수효과 (Side Effect)` 를 피할 수 있습니다.
* `순수 함수 (Pure Function)` 과 `보조 함수 (Helper Function)` 의 조합으로 구현하게 됩니다.
* `조건문` 과 `반복문` 을 최대한 제거하여, `로직의 흐름` 을 파악하기 쉽게 만들 수 있습니다.

<br />

자바스크립트의 배열 `빌트인 객체` 인 `Array.prototype` 에는 다양한 `고차 함수` 메서드를 제공하고 있습니다.



<br /><hr /><br />



# 9-1. Array.prototype.sort

`Array.prototype.sort` 는 배열의 모든 요소를 `정렬` 시키는 메서드 입니다.

`Array.prototype.sort` 는 원본 배열을 직접 수정하는 `Mutator Method` 입니다.

<br />

`sort()` 메서드에 `인수` 를 넘겨주지 않으면 `기본 정렬 방식` 으로 동작하며, 이는 `오름차순 정렬` 입니다.

정렬을 위해 각 요소를 비교하는 값은 `유니코드` 를 사용합니다.

그래서 `[2, 10, 1]` 을 `기본 정렬 방식` 으로 실행하면 다음과 같이 의도했던 오름차순이 아닌, 잘못된 정렬이 되어 버립니다.

<br />

```javascript
// 1. Array.prototype.sort() 의 기본 정렬 방식의 문제점
const arr1 = [2, 10, 1];
arr1.sort();

// [1, 10, 2];
console.log(arr1);
```

<br />

때문에 `sort()` 메서드를 사용할 때는 값을 비교하는 `보조 함수 (Helper Function)` 을 `인수` 로 넘겨주어야 합니다.

`인수` 로 넘겨주는 `보조 함수` 는 2개의 인수를 받으며, 반환값에 따라 정렬을 실행 합니다.

반환값과 정렬 동작은 다음과 같습니다.

* `1` 반환 시, `첫번째 인수` 와 `두번째 인수` 의 순서를 바꿉니다.
* `0` 또는 `-1` 일 경우, 그대로 유지 합니다.

<br />

```javascript
const arr2 = [2, 10, 1];

// 오름차순 정렬
arr2.sort((a, b) => a - b);
// [1, 2, 10]
console.log(arr2);

// 내림차순 정렬
arr2.sort((a, b) => b - a);
// [10, 2, 1]
console.log(arr2);
```

<br />

배열의 요소가 `Number` 타입이 아닌, `객체` 라면 다음과 같이 특정 프로퍼티를 비교하여 정렬할 수 있습니다.

<br />

```javascript
const arr3 = [
  { id: 10, name: 'Kim' },
  { id: 2, name: 'LucidMoon' },
  { id: 1, name: 'Chocobe' },
];

// 오름차순 정렬
arr3.sort((a, b) => a.id - b.id);
/**
 * [
 *  { id: 1, name: 'Chocobe' },
 *  { id: 2, name: 'LucidMoon' },
 *  { id: 10, name: 'Kim' }
 * ]
 **/
console.log(arr3);

// 내림차순 정렬
arr3.sort((a, b) => b.id - a.id);
/**
 * [
 *  { id: 10, name: 'Kim' }
 *  { id: 2, name: 'LucidMoon' },
 *  { id: 1, name: 'Chocobe' },
 * ]
 **/
console.log(arr3);
```



<br /><hr /><br />



## 9-2. Array.prototype.forEach

`for 문` 을 사용하여 배열을 순회할 경우, 반복을 위한 변수를 선언하게 되지만, `Array.prototype.forEach` 를 사용하면, 변수 선언 없이 배열 전체를 순회할 수 있습니다.

`Array.prototype.forEach` 는 원본 배열에 영향을 주지 않는 `Access Method` 입니다.

<br />

`forEach()` 도 내부에는 `for 문` 을 사용하지만 이를 `내부에 은닉` 함으로써, `forEach()` 를 사용하는 입장에서는 반복할 동작만을 작성하게 됩니다.

이로인해 `변수의 사용` 을 `억제` 하게 되며, 가독성을 높일 수 있습니다.

<br />

`forEach()` 는 배열 순회 도중에 멈출 수 없습니다.

`for()` 는 `break` 또는 `continue` 를 사용하여 반복을 제어할 수 있지만, `forEach()` 에는 적용되지 않는 특징이 있습니다.

그래서 성능적으로는 `forEach()` 가 비교적 좋지 않지만, 배열 요소가 대단히 많지 않거나 시간이 오래 걸리지 않는다면, `forEach()` 를 사용하여 가독성을 높이는 것을 권장합니다.



<br /><hr /><br />