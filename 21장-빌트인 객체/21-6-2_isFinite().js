(function() {
  // "isFinite(0): true"
  console.log('isFinite(0): ', isFinite(0));

  // "isFinite(0e64): true"
  console.log('isFinite(0e64): ', isFinite(0e64));

  // "isFinite('10'): true"
  console.log('isFinite("10"): ', isFinite('10'));

  // "isFinite('Hello World'): false"
  console.log('isFinite("Hello World"): ', isFinite('Hello World'));
  
  // "isFinite(Infinite): false"
  console.log('isFinite(Infinity): ', isFinite(Infinity));

  // "isFinite(-Infinity): false"
  console.log('isFinite(-Infinity): ', isFinite(-Infinity));

  // "isFinite(NaN): false"
  console.log('isFinite(NaN): ', isFinite(NaN));
  
  // "isFinite(null): true"
  console.log('isFinite(null): ', isFinite(null));

  // "isFinite(undefined): false"
  console.log('isFinite(undefined): ', isFinite(undefined));

  // "isFinite(' '): true"
  console.log('isFinite(" "): ', isFinite(' '));

  // "isFinite(''): true"
  console.log('isFinite(""): ', isFinite(''));
}());