const arr = [1, 2, 3];
arr.push(10, 20);

// [1, 2, 3, 10, 20]
console.log(arr);

const newArr = [...arr, 300];

// [1, 2, 3, 10, 20, 300]
console.log(newArr);