const Rect = (function() {
  function Rect(width, height) {
    this.width = width;
    this.height = height;
    this.getArea = function() {
      return this.width * this.height;
    };
  }

  return Rect;
}());

const rect1 = new Rect(2, 3);
const rect2 = new Rect(10, 20);

// rect1.getArea(): 6
console.log('rect1.getArea(): ', rect1.getArea());

// rect2.getArea(): 200
console.log('rect2.getArea(): ', rect2.getArea());


console.log('');


const rect3 = Rect(3, 4);
// TypeError 발생
console.log(rect3.getArea());