import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(4);

  const chunks = fileContent.split("\n");

  let count = 0;

  chunks.forEach((item) => {
    const current = item.split(",");
    const firstRange = current[0].split("-");
    const secondRange = current[1].split("-");

    // need to check if firstRange is within secondRange

    const parsedF0 = parseInt(firstRange[0]);
    const parsedF1 = parseInt(firstRange[1]);
    const parsedS0 = parseInt(secondRange[0]);
    const parsedS1 = parseInt(secondRange[1]);

    if (
      (parsedF0 >= parsedS0 && parsedF1 <= parsedS1) ||
      (parsedS0 >= parsedF0 && parsedS1 <= parsedF1)
    ) {
      count++;
    }
  });
  console.log(count);
};

runner();
