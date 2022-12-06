import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(6);

  let output = 0;
  let current = "";
  let found = false;

  fileContent.split("").forEach((char) => {
    if (current.indexOf(char) === -1 && !found) {
      current = current.concat(char);
      if (current.length === 4) {
        output = fileContent.indexOf(current) + 4;
        found = true;
        return;
      }
    } else {
      // if char is already in the string - return the last occurance of
      // the current char + 1
      current = current
        .substring(current.indexOf(char) + 1, current.length)
        .concat(char);
    }
  });
  console.log(output);
};

runner();
