const strValue = 'Hello World';

// strValue.split(' '): [ 'Hello', 'World' ]
console.log(`strValue.split(' '): ${strValue.split(' ')}`);

// strValue.split(/\s+/): [ 'Hello', 'World' ]
console.log(`strValue.split(/\s+/): ${strValue.split(/\s+/)}`);

// strValue.split(/\s+/).reverse().join(' '): World Hello
console.log(`strValue.split(/\s+/).reverse().join(' '): ${strValue.split(/\s+/).reverse().join(' ')}`);

// strValue.split(/\s+/, 1): [ 'Hello' ]
console.log(`strValue.split(/\s+/, 1): ${strValue.split(/\s+/, 1)}`);
