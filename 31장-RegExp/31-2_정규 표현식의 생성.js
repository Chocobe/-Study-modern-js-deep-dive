const strValue = 'Is this all there is?';

const regExp1 = /is/i;
// regExp1.test(strValue): true
console.log('regExp1.test(strValue): ', regExp1.test(strValue));

const regExp2 = new RegExp('is', 'i');
// regExp2.test(strValue); true
console.log('regExp2.test(strValue): ', regExp2.test(strValue));

const strPattern = 'is';
const regExp3 = new RegExp(strPattern, 'i');
// regExp3.test(strValue): true
console.log('regExp3.test(strValue): ', regExp3.test(strValue));