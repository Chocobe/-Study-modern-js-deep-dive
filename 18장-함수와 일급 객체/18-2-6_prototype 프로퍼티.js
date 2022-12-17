function Box(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
console.log(Box.hasOwnProperty("prototype"));
console.log(Box.prototype);

const myObject = {
  myValue: "Hello World",
};
console.log(myObject.prototype);
