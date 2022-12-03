import _ from "lodash";
import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(1);

  // array of number chunks
  const chunks = fileContent.split("\n");

  // keep an array to track the sum of all the chunks
  let runingCounts: number[] = new Array();

  let sum = 0;

  chunks.forEach((item) => {
    // if item is empty - that means this chunk is the end of a record
    if (item !== "") {
      sum += parseInt(item);
    } else {
      runingCounts.push(sum);
      sum = 0;
    }
  });

  // as the input ends on a number - add the last sum value into the array
  runingCounts.push(sum);

  // return the counts in desceding order
  const sorted = runingCounts.sort((a, b) => {
    return b - a;
  });

  // log the first one
  console.log(sorted[0]);
};

runner();
