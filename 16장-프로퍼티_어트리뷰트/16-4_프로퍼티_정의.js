/**
 * Object.defineProperty() 예시
 */
const user = {};

Object.defineProperty(user, "firstName", {
  value: "Kim",
  writable: true,
  enumerable: true,
  configurable: true,
});
console.log(Object.getOwnPropertyDescriptor(user, "firstName"));

Object.defineProperty(user, "lastName", {
  value: "Chocobe",
});
console.log(Object.getOwnPropertyDescriptor(user, "lastName"));

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

delete user.lastName;
console.log(user.lastName);

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },

  set(fullName) {
    [this.firstName, this.lastName] = fullName.split(' ');
  },
  enumerable: true,
  configurable: true,
});
console.log(Object.getOwnPropertyDescriptor(user, "fullName"));
console.log(user.fullName);

user.fullName = "Hello World";
console.log(user.fullName);



/**
 * Object.defineProperties() 예시
 */
const client = {};

Object.defineProperties(client, {
  firstName: {
    value: "Lucid",
    writable: true,
    enumerable: true,
    configurable: true,
  },

  lastName: {
    value: "Moon",
  },

  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },

    set(fullName) {
      [this.firstName, this.lastName] = fullName.split(" ");
    },

    enumerable: true,
    configurable: true,
  },
});
console.log(client);
console.log(client.fullName);