const strValue = 'A AA B BB Aa Bb AAA';

const regExp1 = /A{1,2}/g;
/** [ 'A', 'AA', 'A', 'AA', 'A' ] */
console.log(strValue.match(regExp1));

const regExp2 = /A{1}/g;
/** [ 'A', 'A', 'A', 'A', 'A', 'A', 'A', ] */
console.log(strValue.match(regExp2));

const regExp3 = /A{2,}/g;
/** [ 'AA', 'AAA' ] */
console.log(strValue.match(regExp3));

const regExp4 = /A+/g;
/** [ 'A', 'AA', 'A', 'AAA' ] */
console.log(strValue.match(regExp4));

const regExp5 = /A?/g;
/**
 * [
 *    'A', '',
 *    'A', 'A', '',
 *    '', '',
 *    '', '', '',
 *    'A', '', '',
 *    '', '', '',
 *    'A', 'A', 'A', '',
 * ]
 */
console.log(strValue.match(regExp5));

const regExp6 = /A*/g;
/**
 * 'A', '',  
 * 'AA', '',
 * '', '',  
 * '', '', '',
 * 'A', '', '',
 * '', '', '',   
 * 'AAA', ''
 */
console.log(strValue.match(regExp6));