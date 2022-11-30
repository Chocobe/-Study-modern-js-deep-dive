const a = 3 + Number("숫자 아님");
console.log(a);

const isNaN1 = Number.isNaN(a);
console.log(isNaN1);

const isNaN2 = Object.is(a, NaN);
console.log(isNaN2);