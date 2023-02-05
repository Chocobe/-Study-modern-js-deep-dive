const strValue = 'kyw05171@gmail.com';

const regExp = /[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/g;
// regExp.test(strValue): true
console.log('regExp.test(strValue): ', regExp.test(strValue));