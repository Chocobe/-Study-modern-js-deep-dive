const user = {
  name: "Chocobe",
  age: 36,
};

console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);
console.log(
  Object.getOwnPropertyDescriptor(user, "age")
);

console.log(
  Object.getOwnPropertyDescriptors(user)
);

user.job = "FrontEnd Dev";
const jobPropertyDescriptor = Object.getOwnPropertyDescriptor(user, "job");
console.log(jobPropertyDescriptor);