var x = 1;

function firstFunc() {
  var x = 10;

  secondFunc();
}

function secondFunc() {
  console.log(x);
}

firstFunc(); // 1
secondFunc(); // 1