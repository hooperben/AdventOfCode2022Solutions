import getFileContent from "../../helpers/getFileContent";
import alphabetPosition from "../../helpers/alphabetPosition";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(3);

  const rucksacks = fileContent.split("\n");

  // create an array of arrays [x, y] to represent compartments
  const items = rucksacks.map((rucksack) => {
    const length = rucksack.length;
    return [
      rucksack.substring(0, length / 2),
      rucksack.substring(length / 2, length),
    ];
  });

  let runningTotal = 0;

  items.forEach((current) => {
    const first = current[0];
    const second = current[1];

    if (first === "" || second === "") return;

    let alreadyFound: string[] = new Array();
    for (let i = 0; i < first.length; i++) {
      const regex = new RegExp(`${first[i]}`, "g");
      const sharedChars = (second.match(regex) || []).length;

      if (sharedChars > 0) {
        const coord = second.indexOf(first[i]);
        const char = second.charAt(coord);
        if (!alreadyFound.includes(char)) {
          alreadyFound.push(char);
        }
      }
    }

    const stringifiedCharacter = [...new Set(alreadyFound)][0];

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
  });

  console.log(runningTotal);
};

runner();
