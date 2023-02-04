const strValue = 'Is this all there is?';

const regExp1 = /is/;
/**
 * [
 *    'is',
 *    index: 5
 *    input: 'Is this all there is?',
 *    group: undefined,
 * ]
 */
console.log(strValue.match(regExp1));

const regExp2 = /is/g;
// ['is', 'is']
console.log(strValue.match(regExp2));
