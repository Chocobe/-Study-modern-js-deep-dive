const a = 0.1;
const b = 0.2;

const result = a + b;

// result === 0.3: false
console.log('result === 0.3: ', result === 0.3);

function isEqualNumber(value, expectValue) {
  const diff = Math.abs(value - expectValue);

  return diff < Number.EPSILON;
}

console.log('isEqualNumber(result, 0.3): ', isEqualNumber(result, 0.3));
