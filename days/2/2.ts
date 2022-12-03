import _ from "lodash";
import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(2);
  // get number chunks
  const splitArray = fileContent.split("\n");

  // 0
  // A = rock
  // B = Paper
  // C = scissors

  // 1
  // X = rock
  // Y = Paper
  // Z = scissors

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
  const myBeatsHisMove: variableKeyString = {
    A: "Y",
    B: "Z",
    C: "X",
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

  // a converter that translates his moves (A, B, C) into my language (X, Y, Z)
  const hisToMine: variableKeyString = {
    A: "X",
    B: "Y",
    C: "Z",
  };

  let me = 0;
  let opponent = 0;

  // x means need to lose
  // y means need to draw
  // z means need to win

  splitArray.forEach((round) => {
    const moves = round.split(" ");
    const opponentMove = moves[0];
    const myMove = moves[1];

    let myNewMove = "";
    if (myMove === "X") {
      // need to lose
      // my move should be equal to hisBeats[oppenentMove]
      myNewMove = hisBeats[opponentMove];
      opponent = opponent + 6 + points[opponentMove];
      me = me + points[myNewMove];
    } else if (myMove === "Y") {
      // need to draw
      // my move should be equal to his
      myNewMove = hisToMine[opponentMove];
      me = me + 3 + points[myNewMove];
      opponent = opponent + 3 + points[opponentMove];
    } else {
      // need to win
      // my move should be equal to
      myNewMove = myBeatsHisMove[opponentMove];
      me = me + 6 + points[myNewMove];
      opponent = opponent + points[opponentMove];
    }
  });

  console.log(me);
};

runner();
