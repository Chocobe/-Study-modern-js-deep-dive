const strValue = 'Is this all there is?';

// 임의의 문자 3개인 패턴
const regExp = /.../g;

/**
 * [ 'Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?' ]
 */
console.log(strValue.match(regExp));
