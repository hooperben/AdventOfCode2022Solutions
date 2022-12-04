import getFileContent from "../../helpers/getFileContent";
import _ from "lodash";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(4);

  const chunks = fileContent.split("\n");

  let count = 0;

  chunks.forEach((item) => {
    const current = item.split(",");
    const firstRange = current[0].split("-");
    const secondRange = current[1].split("-");

    const parsedF0 = parseInt(firstRange[0]);
    const parsedF1 = parseInt(firstRange[1]);
    const parsedS0 = parseInt(secondRange[0]);
    const parsedS1 = parseInt(secondRange[1]);

    // gets an array of numbers that represents the range these numbers cover
    const getRangeArray = (start: number, end: number) => {
      return [1].map((_) => {
        let counter = 0;
        let found: number[] = new Array();

        while (counter + start <= end) {
          found.push(start + counter++);
        }

        return found;
      });
    };

    const firstRangeArray = getRangeArray(parsedF0, parsedF1)[0];
    const secondRangeArray = getRangeArray(parsedS0, parsedS1)[0];

    // find the intersection of the generated arrays
    const intersection = firstRangeArray.filter((x) =>
      secondRangeArray.includes(x)
    );

    // if it's not empty - we are sweet
    if (intersection.length > 0) {
      count++;
    }
  });

  console.log(count);
};

runner();
