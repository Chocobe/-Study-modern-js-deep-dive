(function(arg0, arg1) {
  'use strict';

  arg0 = 'Hello World';
  arg1 = ['value of index 0', 'value of index 1'];

  console.log(arguments);
}(
  "first initial arg", 
  { a: 'value of a', b: 'value of b' }
));
