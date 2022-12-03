// based on this answer here
// https://stackoverflow.com/questions/41427029/replace-a-letter-with-its-alphabet-position

export default (text: string): string => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let code = text.toUpperCase().charCodeAt(i);
    if (code > 64 && code < 91) result += code - 64 + " ";
  }

  return result.slice(0, result.length - 1);
};
