const key = Symbol("myKey");

type MyObj = {
  [key]?: string;
}

const myObj: MyObj = {};
myObj[key] = "Hello World";

console.log("myObj[key]: ", myObj[key]);