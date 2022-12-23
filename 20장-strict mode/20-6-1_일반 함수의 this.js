(function() {
  "use strict";

  function myFunction() {
    console.log('this in myFunction(): ', this);
  }

  // "this in myFunction(): undefined"
  myFunction();

  // "this in myFunction(): myFunction {}"
  new myFunction();
}());