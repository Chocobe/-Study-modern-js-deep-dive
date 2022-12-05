var x = "global";

function myFunc() {
  var x = "local";
  console.log(x);
}
myFunc();
console.log(x);
