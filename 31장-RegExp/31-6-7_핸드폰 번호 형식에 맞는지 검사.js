const strValue = '010-1234-5678';

const regExp = /^\d{3}-\d{3,4}-\d{4}/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));
