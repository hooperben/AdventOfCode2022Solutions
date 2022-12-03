import _ from "lodash";
import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(2);
  // get number chunks
  const splitArray = fileContent.split("\n");

  // dictionaries
  interface variableKeyString {
    [key: string]: string;
  }
  interface variableKeyNumber {
    [key: string]: number;
  }

  // if he plays A,B or C returns the X,Y or Z that that defeats
  const hisBeats: variableKeyString = {
    A: "Z",
    B: "X",
    C: "Y",
  };
  // vice versa
  const myBeats: variableKeyString = {
    Y: "A",
    Z: "B",
    X: "C",
  };

  // points for each of the plays
  const points: variableKeyNumber = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
  };

  // track the total scores
  let me = 0;
  let them = 0;

  // x means need to lose
  // y means need to draw
  // z means need to win
  splitArray.forEach((round) => {
    const moves = round.split(" ");
    const theirMove = moves[0];
    const myMove = moves[1];

    if (hisBeats[theirMove] === myMove) {
      // they win
      them = them + 6 + points[theirMove];
      me = me + points[myMove];
    } else if (myBeats[myMove] === theirMove) {
      // i win
      me = me + 6 + points[myMove];
      them = them + points[theirMove];
    } else {
      // draw
      me = me + 3 + points[myMove];
      them = them + 3 + points[theirMove];
    }
  });

  console.log(me);
};

runner();
