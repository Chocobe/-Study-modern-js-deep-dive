/**
 * @param { string } strings
 * @param { string } bgColor
 */
const styleMixins = (strings, bgColor) => {
  const styles = strings[0];
  const ending = strings[1].trim() || ";";

  const color = 
    (bgColor === "#000")
      ? "#fff" 
      : (bgColor === "#fff")
        ? "#000"
        : "inherit";

  return `
    ${styles} ${bgColor}${ending}
    color: ${color};
  `.replace(/\s{2,}/g, "\n  ");
};

const styleInstance = styleMixins`
  font-size: 20px;
  font-weight: 900;
  background-color: ${"#000"};
`;

console.log(styleInstance);