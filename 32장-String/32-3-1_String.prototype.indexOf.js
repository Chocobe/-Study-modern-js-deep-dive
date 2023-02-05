const strValue = 'Hello World';

const index = strValue.indexOf('Wor');
// index: 6
console.log('index: ', index);

// String.prototype.includes('wor'): true
console.log(`String.prototype.includes('Wor'): ${strValue.includes('Wor')}`);
