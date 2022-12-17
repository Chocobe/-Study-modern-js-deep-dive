function Circle(radius) {
  this.radius = radius;
  this.getArea = () => {
    return Math.PI * this.radius ** 2;
  };
}
// sayGreeting() 메서드가 각각의 객체 메모리에 할당되어 있습니다.
const smallCircle = new Circle(3);
console.log(smallCircle.getArea());
const bigCircle = new Circle(20);
console.log(bigCircle.getArea());

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
Rect.prototype.getArea = function() {
  return this.width * this.height;
};

const smallRect = new Rect(0, 0, 2, 4);
console.log(smallRect.getArea());
const bigRect = new Rect(100, 100, 10, 3);
console.log(bigRect.getArea());