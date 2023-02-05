const strValue = 'AA BB 12 Aa Bb';

const regExp1 = /[^A-Za-z ]+/g;
/** [ '12' ] */
console.log(strValue.match(regExp1));

const regExp2 = /[^0-9]+/g;
/** ['AA BB ', ' Aa Bb'] */
console.log(strValue.match(regExp2));