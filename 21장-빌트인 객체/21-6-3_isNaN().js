(function() {
  // "isNaN(0): false"
  console.log('isNaN(0): ', isNaN(0));

  // "isNaN(0e64): false"
  console.log('isNaN(0e64): ', isNaN(0e64));

  // "isNaN('10'): false"
  console.log('isNaN("10"): ', isNaN('10'));

  // "isNaN('Hello World'): true"
  console.log('isNaN("Hello World"): ', isNaN('Hello World'));

  // "isNaN(Infinity): false"
  console.log('isNaN(Infinity): ', isNaN(Infinity));

  // "isNaN(-Infinity): false"
  console.log('isNaN(-Infinity): ', isNaN(-Infinity));

  // "isNaN(NaN): true"
  console.log('isNaN(NaN): ', isNaN(NaN));

  // "isNaN(null): false"
  console.log('isNaN(null): ', isNaN(null));

  // "isNaN(undefined): true"
  console.log('isNaN(undefined): ', isNaN(undefined));

  // "isNaN(' '): false"
  console.log('isNaN(" "): ', isNaN(' '));

  // "isNaN(''): false"
  console.log('isNaN(""): ', isNaN(''));
}());