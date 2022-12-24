(function() {
  const arr0 = [1, 2];
  const arr1 = new Array(10, 20);
  const arr2 = new global.Array(100, 200);
  const arr3 = new globalThis.Array(1000, 2000);
  
  // "[1, 2]: [1, 2]"
  console.log('[1, 2]: ', arr0);

  // "new Array(10, 20): [10, 20]"
  console.log('new Array(10, 20): ', arr1);

  // "new global.Array(100, 200): [100, 200]"
  console.log('new global.Array(100, 200): ', arr2);

  // "new globalthis.Array(1000, 2000): [1000, 2000]"
  console.log('new globalThis.Array(1000, 2000): ', arr3);
}());
