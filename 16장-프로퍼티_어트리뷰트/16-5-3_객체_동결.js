const user = {
  name: "Kim",
};
console.log(Object.isFrozen(user));

Object.freeze(user);
console.log(Object.isFrozen(user));
console.log(Object.getOwnPropertyDescriptor(user, "name"));

user.name = "Chocobe";
console.log(user);

user.email = "kyw05171@gmail.com";
console.log(user);

delete user.name;
console.log(user);

// TypeError 발생
// Object.defineProperty(user, "phone", {
//   value: "123-1234-5678",
//   writable: true,
//   enumerable: true,
//   configurable: true,
// });