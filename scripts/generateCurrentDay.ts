import path from "path";
import fs from "fs";

const day = new Date().getDate();

const runnerFileContent = `import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(${day});
};

runner();
`;

const writeTo = `${path.dirname("")}/days/${day}/`;

// check it doesn't exist so we don't clear it
if (fs.existsSync(writeTo)) throw new Error("Already made it doofus");

// create directory
fs.mkdirSync(writeTo);

// create README.md template
fs.writeFileSync(`${writeTo}/README.md`, "");

// create runner files
fs.writeFileSync(`${writeTo}/1.ts`, runnerFileContent.toString());

fs.writeFileSync(`${writeTo}/2.ts`, runnerFileContent.toString());

// create empty input.txt
fs.writeFileSync(`${writeTo}/input.txt`, "");

console.log(`Created template @ directory: ${writeTo}

Godspeed`);
