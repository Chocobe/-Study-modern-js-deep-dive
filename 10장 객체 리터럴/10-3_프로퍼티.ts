const myObj: {
  [key: string]: string;
} = {
  a: "Hello",
  'b': "World",
  "c": "Hello World",
  'my-key-0': "My Value 0",
  "my-key-1": "My Value 1",
  ['my-key-2']: "My Value 2",
  ["my-key-3"]: "My Value 3",
};

myObj["my-key-4"] = "My Value 4";

console.log(myObj);