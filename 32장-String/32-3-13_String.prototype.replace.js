/** @param { string } str */
function snakeToCamel(str) {
  return str.replace(/_[a-z]/g, match => {
    return match[1].toUpperCase();
  });
}

/** @param { string } str */
function camelToSnake(str) {
  return str.replace(/.[A-Z]/g, match => {
    return `${match[0]}_${match[1].toLowerCase()}`;
  });
}

// snakeToCamel(snakeValue): helloWorld
console.log(`snakeToCamel('hello_world'): ${snakeToCamel('hello_world')}`);

// camelToSnake('helloWorld'): hello_world
console.log(`camelToSnake('helloWorld'): ${camelToSnake('helloWorld')}`);
