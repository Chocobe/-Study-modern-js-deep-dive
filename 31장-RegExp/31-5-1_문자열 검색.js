const strValue = 'Is this all there is?';

const regExp = /is/;
/**
 * [
 *    'is',
 *    index: 5
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExp.exec(strValue));

const regExpI = /is/i;
/**
 * [
 *    'Is',
 *    index: 0,
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExpI.exec(strValue));

const regExpIG = /is/ig;
/**
 * [
 *    'Is',
 *    index: 0,
 *    input: 'Is this all there is?',
 *    groups: undefined,
 * ]
 */
console.log(regExpIG.exec(strValue));

/**
 * [ 'Is', 'is', 'is' ]
 */
console.log(strValue.match(regExpIG));
