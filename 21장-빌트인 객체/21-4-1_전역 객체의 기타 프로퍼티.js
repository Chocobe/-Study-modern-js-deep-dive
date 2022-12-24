globalThis.myGlobalFunction = function() {
  return 'called myGlobalFunction';
};

globalThis.myGlobalVar = 'value of myGlobalVar';

(function() {
  implicitGlobal = 'value of implicitGlobal';

  // "globalThis.implicitGlobal: value of implicitGlobal"
  console.log('globalThis.implicitGlobal: ', globalThis.implicitGlobal);

  // "globalThis.myGlobalVar: value of myGlobalVar"
  console.log('globalThis.myGlobalVar: ', globalThis.myGlobalVar);

  // "globalThis.myGlobalFunction(): called myGlobalFunction()"
  console.log('globalThis.myGlobalFunction(): ', globalThis.myGlobalFunction());
}());