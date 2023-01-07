class MyArray extends Array {
  uniq() {
    return this.filter((value, index, self) => self.indexOf(value) === index);
  }

  average() {
    const total = this.reduce((total, value) => {
      return total + value;
    }, 0);

    return total / this.length;
  }
}

const myArray = new MyArray(1, 1, 3, 5, 5);

// MyArray(3): [1, 3, 5]
console.log(myArray.uniq());

// 3
console.log(myArray.average());