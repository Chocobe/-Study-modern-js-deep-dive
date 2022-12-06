const user = {
  firstName: "Kim",
  lastName: "Chocobe",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(fullName) {
    [this.firstName, this.lastName] = fullName.split(" ");
  },
};

console.log(user.fullName);

user.fullName = "Hello World";
console.log(user.fullName);
console.log(user.firstName);
console.log(user.lastName);

console.log(
  Object.getOwnPropertyDescriptor(user, "fullName")
);