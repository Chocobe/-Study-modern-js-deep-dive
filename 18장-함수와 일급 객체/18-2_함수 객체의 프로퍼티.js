function Box(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

const descriptors = Object.getOwnPropertyDescriptors(Box);
console.log(descriptors);