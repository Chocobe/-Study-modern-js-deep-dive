const user = {
  name: "Kim",
};
console.log(Object.isSealed(user));

Object.seal(user);
console.log(Object.isSealed(user));
console.log(Object.getOwnPropertyDescriptor(user, "name"));

user.name = "Chocobe";
console.log(user);

delete user.name;
console.log(user);

user.phone = "123-1234-5678";
console.log(user);

// TypeError 발생
// Object.defineProperty(user, "email", {
//   value: "kyw05171@gmail.com",
//   writable: true,
//   enumerable: true,
//   configurable: true,
// });
