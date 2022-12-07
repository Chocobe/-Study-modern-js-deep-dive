const user = {
  name: "Kim",
};
console.log(Object.isExtensible(user));

Object.preventExtensions(user);
console.log(Object.isExtensible(user));

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
// console.log(user);