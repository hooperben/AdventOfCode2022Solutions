import getFileContent from "../../helpers/getFileContent";
import alphabetPosition from "../../helpers/alphabetPosition";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(3);

  const rucksacks = fileContent.split("\n");

  let runningTotal = 0;

  for (let i = 0; i < rucksacks.length / 3; i++) {
    let found: string[] = new Array();

    const first = rucksacks[i * 3];
    const second = rucksacks[i * 3 + 1];
    const third = rucksacks[i * 3 + 2];

    for (let j = 0; j < first.length; j++) {
      if (second.indexOf(first[j]) !== -1 && third.indexOf(first[j]) !== -1) {
        found.push(first[j]);
      }
    }

    const stringifiedCharacter = [...new Set(found)][0];

    let sum = 0;

    sum = parseInt(alphabetPosition(stringifiedCharacter));

    // if its upper case add 26
    if (
      stringifiedCharacter.toUpperCase() === stringifiedCharacter &&
      stringifiedCharacter.toLowerCase() !== stringifiedCharacter
    ) {
      sum += 26;
    }
    runningTotal = runningTotal + sum;
  }

  console.log(runningTotal);
};

runner();
