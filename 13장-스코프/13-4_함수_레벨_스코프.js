function myFunctionLevelScope() {
  var x = "initial Value";

  if (true) {
    var x = "altered value from if() block";
  }

  console.log(x);
}
myFunctionLevelScope();



function myBlockLevelScope() {
  let x = "initial Value";

  if  (true) {
    let x = "altered value from if() block";
  }

  console.log(x);
}
myBlockLevelScope();