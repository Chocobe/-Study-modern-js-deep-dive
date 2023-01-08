const arr = [1, 2];

const newArr1 = arr.concat(3, 4, [5, 6]);

// [1, 2, 3, 4, 5, 6]
console.log(newArr1);

const newArr2 = newArr1.concat([[100, 200], [[1000, 2000, 3000]]]);

// [1, 2, 3, 4, 5, 6, [100, 200], [[1000, 2000, 3000]]]
console.log(newArr2);