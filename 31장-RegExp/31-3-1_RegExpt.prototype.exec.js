const strValue = 'Is this all there is?';

const regExp = /is/;
/**
 * [
 *    'is',
 *    index: 5,
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExp.exec(strValue));
