// 동적 상속을 위한 상태값
let isPlant = true;

// 생성자 함수
const Plant = (function() {
  function Plant() {
    //
  }

  return Plant;
}());

// class
class Animal {
  //
}

// `생성자 함수` 를 상속받은 `class`
class DynamicExtendedClass extends (isPlant ? Plant : Animal) {
  //
}

const plantInstance = new DynamicExtendedClass();

// plantInstance instanceof Plant: true
console.log(
  'plantInstance instanceof Plant: ',
  plantInstance instanceof Plant
);

// plantInstance instanceof DynamicExtendedClass: true
console.log(
  'plantInstance instanceof DynamicExtendedClass: ',
  plantInstance instanceof DynamicExtendedClass
);

// plantInstance instanceof Animal: false
console.log(
  'plantInstance instanceof Animal: ',
  plantInstance instanceof Animal
);



console.log(' ');



isPlant = false;
const animalInstance = new DynamicExtendedClass();

// animalInstance instanceof Animal: false
console.log(
  'animalInstance instanceof Animal: ',
  animalInstance instanceof Animal
);

console.log(
  'animalInstance instanceof Plant: ',
  animalInstance instanceof Plant
);