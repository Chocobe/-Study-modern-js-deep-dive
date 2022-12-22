const chocobe = {
  name: 'Chocobe',
  age: 36,

  __proto__: {
    email: 'kyw05171@gmail.com',
  },
};

// Object.keys()
// "Object.keys(chocobe): ['name', 'age']"
console.log('Object.keys(chocobe): ', Object.keys(chocobe));

// Object.values();
// "Object.values(chocobe): ['Chocobe', 36]"
console.log('Object.values(chocobe): ', Object.values(chocobe));

// Object.entries();
// "Object.entries(chocobe): [['name', 'Chocobe'], ['age', 36]]"
console.log('Object.entities(chocobe): ', Object.entries(chocobe));
