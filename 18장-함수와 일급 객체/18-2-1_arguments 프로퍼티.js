function add(lhs, rhs) {
  console.log(arguments);
  return lhs + rhs;
}

console.log(add(1, 2));

console.log(add(100, 200, 300));


function add2(...args) {
  console.log(arguments);
  return args.reduce((total, value) => {
    return total + value;
  }, 0);
}

console.log(add2(1, 2, 3, 4, 5));
