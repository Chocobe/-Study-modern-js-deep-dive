const strValue = 'A AA B BB Aa Bb';

const regExp1 = /A|B/g;
/**
 * [
 *    'A',
 *    'A',
 *    'A',
 *    'B',
 *    'B',
 *    'B',
 *    'A',
 *    'B',
 * ]
 */
console.log(strValue.match(regExp1));

const regExp2 = /[AB]/g;
/**
 * [
 *    'A',
 *    'A',
 *    'A',
 *    'B',
 *    'B',
 *    'B',
 *    'A',
 *    'B',
 * ]
 */
console.log(strValue.match(regExp2));



const strValue2 = 'AA BB 12,345';

const regExp3 = /[A-C]/g;
/** [ 'A', 'A', 'B', 'B' ] */
console.log(strValue2.match(regExp3));

const regExp4 = /[A-Za-z]/g;
/** [ 'A', 'A', 'B', 'B', ] */
console.log(strValue2.match(regExp4));

const regExp5 = /[0-9]/g;
/** [ '1', '2', '3', '4', '5' ] */
console.log(strValue2.match(regExp5));

const regExp6 = /[0-9,]+/g;
/** [ '12,345' ] */
console.log(strValue2.match(regExp6));

const regExp7 = /[\d,]+/g;
/** [ '12,345' ] */
console.log(strValue2.match(regExp7));

const regExp8 = /[\D,]+/g;
/** [ 'AA BB ', ',' ] */
console.log(strValue2.match(regExp8));



const strValue3 = 'Aa Bb 12,345 !@#$%^&*()_-+=`~';

const regExp9 = /[\w,]+/g;
/** [ 'Aa', 'Bb', '12,345', '_' ] */
console.log(strValue3.match(regExp9));

const regExp10 = /[\W,]+/g;
/** [ ' ', ' ', ' !@#$%^&*()' '-+=`~' ] */
console.log(strValue3.match(regExp10));