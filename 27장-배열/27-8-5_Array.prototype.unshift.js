const arr = [3, 4, 5];
arr.unshift(1, 2);

// [1, 2, 3, 4, 5];
console.log(arr);

const newArr = [-1, 0, ...arr];

// [-1, 0, 1, 2, 3, 4, 5]
console.log(newArr);