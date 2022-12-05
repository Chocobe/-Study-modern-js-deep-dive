var x = "global";

function myFunc() {
  console.log(x);
  var x = "local";
}

myFunc();
console.log(x);