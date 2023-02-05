const strValue = 'https://github.com/Chocobe';

const regExp1 = /^https?:\/\//g;
// regExp1.test(strValue): true
console.log('regExp1.test(strValue): ', regExp1.test(strValue));

const regExp2 = /^(http|https):\/\//g;
// regExp2.test(strValue): true
console.log('regExp2.test(strValue): ', regExp2.test(strValue));
