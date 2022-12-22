const Vector = (function() {
  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }

  return Vector;
}());

const myVector = new Vector(11, 22);

const box = {
  width: 300,
  height: 400,

  __proto__: myVector,
};

console.log('box.x: ', box.x);
console.log('box.y: ', box.y);
console.log('box.width: ', box.width);
console.log('box.height: ', box.height);

console.log('Object.getPrototypeOf(box) === myVector: ', Object.getPrototypeOf(box) === myVector);
console.log('box instanceof Vector: ', box instanceof Vector);
console.log('box instanceof Object: ', box instanceof Object);

