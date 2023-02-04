// Number.isSafeInteger(0): true
console.log('Number.isSafeInteger(0): ', Number.isSafeInteger(0));

// Number.isSafeInteger(10_000_000_000): true
console.log('Number.isSafeInteger(10_000_000_000): ', Number.isSafeInteger(10_000_000_000));

// Number.isSafeInteger(0.1): false
console.log('Number.isSafeInteger(0.1): ', Number.isSafeInteger(0.1));

// Number.isSafeInteger('333'): false
console.log('Number.isSafeInteger("333"): ', Number.isSafeInteger('333'));

// Number.isSafeInteger(Infinity): false
console.log('Number.isSafeInteger(Infinity): ', Number.isSafeInteger(Infinity));
