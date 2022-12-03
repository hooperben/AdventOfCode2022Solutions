import fs from "fs";
import path from "path";

export default (day: number): string => {
  const fileLocation = `${path.dirname("")}/days/${day}/input.txt`;
  const fileContent = fs.readFileSync(fileLocation).toString();

  // a new line at the end kept being annoying
  return fileContent[fileContent.length - 1] === "\n"
    ? fileContent.substring(0, fileContent.length - 1)
    : fileContent;
};
