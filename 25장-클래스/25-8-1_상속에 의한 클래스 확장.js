const Animal = (function() {
  function Animal(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  Animal.prototype.eat = function() {
    return 'eat';
  }

  Animal.prototype.move = function() {
    return 'move';
  }

  return Animal;
}());

const Bird = (function() {
  function Bird() {
    Animal.apply(this, arguments);
  }

  Bird.prototype = Object.create(Animal.prototype);
  Bird.prototype.constructor = Bird;
  Bird.prototype.fly = function() {
    return 'fly';
  };

  return Bird;
}());

const bird = new Bird(11, 22);

// eat
console.log(bird.eat());

// move
console.log(bird.move());

// fly
console.log(bird.fly());

// { age: 11, weight: 22 }
console.dir(bird);



console.log(' ');



class Animal2 {
  age;
  weight;

  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return 'eat';
  }

  move() {
    return 'move';
  }
}

class Bird2 extends Animal2 {
  fly() {
    return 'fly';
  }
}

const secondBird = new Bird2(33, 44);

// eat
console.log(secondBird.eat());

// move
console.log(secondBird.move());

// fly
console.log(secondBird.fly());

// { age: 33, weight: 44 }
console.log(secondBird);