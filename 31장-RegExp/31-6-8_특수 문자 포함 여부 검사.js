const strValue = '~`!@#$%^&*()+-=|';

const regExp = /^[^\w\d\sㄱ-힣]+$/g;
console.log('regExp.test(strValue): ', regExp.test(strValue));
