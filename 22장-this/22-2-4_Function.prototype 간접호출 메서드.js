(function() {
  function getThisBinding() {
    return this;
  }
  
  const myThisArg = {
    myValue: 333,
  };
  
  // getThisBinding(): global
  console.log('getThisBindidng(): ', getThisBinding());
  
  // getThisBinding.apply(myThisArg): { myValue: 333 }
  console.log('getThisBInding.apply(myThisArg): ', getThisBinding.apply(myThisArg));
  
  // getThisBinding.call(myThisArg): { myValue: 333 }
  console.log('getThisBinding.call(myThisArg): ', getThisBinding.call(myThisArg));
}());


console.log('');


(function() {
  function getThisBindingAndArguments() {
    return [this, arguments];
  }

  const myThisArg = {
    myValue: 'Hello World',
  };

  /**
   * getThisBindingAndArguments.apply(myThisArg, 'firstParam', 'secondParam'): [
   *  { myValue: 'Hello World' }, 
   *  { 
   *    '0': 'firstParam', 
   *    '1': 'secondParam',
   *  },
   * ]
   **/
  console.log(
    'getThisBindingAndArguments.apply(myThisArg, ["firstParam", "secondParam"]): ', 
    getThisBindingAndArguments.apply(myThisArg, ['firstParam', 'secondParam'])
  );

  /**
   * getThisBindingAndArguments.call(myThisArg, 'firstParam', 'secondParam'): [
   *  { myValue: 'Hello World' }, 
   *  { 
   *    '0': 'firstParam', 
   *    '1': 'secondParam',
   *  },
   * ]
   **/
  console.log(
    'getThisBindingAndArguments.call(myThisArg, "firstParam", "secondParam"): ',
    getThisBindingAndArguments.call(myThisArg, 'firstParam', 'secondParam')
  );
}());


console.log('');


(function() {
  function getThisBindingAndArguments() {
    return [this, arguments];
  }

  const myThisArg = {
    myValue: 'value of myValue',
  };

  // getThisBindingAndArguments: [Function: bound getThisBindingAndArguments]
  console.log(
    'getThisBindingAndArguments.bind(myThisArg, "firstParam", "secondParam"): ',
    getThisBindingAndArguments.bind(myThisArg, 'firstParam', 'secondParam')
  );

  /**
   * getThisBindingAndArguments.bind(myThisArg, 'firstParam', 'secondParam')(): [
   *  { myValue: 'value of myValue' },
   *  [
   *    '0': 'firstParam',
   *    '1': 'secondParam',
   *  ],
   * ]
   **/
  console.log(
    'getThisBindingAndArguments.bind(myThisArg, "firstParam", "secondParam"): ',
    getThisBindingAndArguments.bind(myThisArg, 'firstParam', 'secondParam')()
  );
}());


console.log('');


(function() {
  const chocobe = {
    name: 'Chocobe',
    doSomethingAfterThrottling(callback) {
      // 1. callback 함수의 this 를 bind() 로 지정
      setTimeout(callback.bind(this), 1000);

      // 2. 중첩함수의 this 를 bind() 로 지정
      const innerFunction = (function() {
        // innerFunction() - this.name: Chocobe
        console.log(`innerFunction() - this.name: ${this.name}`);
      }).bind(this);

      innerFunction();
    },
  };

  chocobe.doSomethingAfterThrottling(function() {
    // Hello, Callback! I'm Chocobe
    console.log(`Hello, Callback! I'm ${this.name}`);
  });
}());