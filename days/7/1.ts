import getFileContent from "../../helpers/getFileContent";

interface node {
  name: string;
  isDir: boolean;
  children: node[];
  parent?: node;
  size?: number;
}

// iterate through each node, and if it's a directory, iterate through it as well
// i don't really understand the history callback part - but this SO article + links explain it a bit better:
// https://stackoverflow.com/questions/55114354/how-to-use-recursion-function-to-traverse-tree-in-javascript
const getFileSizes = (node: node, history = (size: number) => {}): number => {
  // if it is a file - return this size immeditaely back to the parent
  if (!node.isDir) {
    return node.size || 0;
  }

  // if it's a directory - iterate through it's children, get the file sizes, and then sum them together
  const dirSize = node.children
    .map((kid) => getFileSizes(kid, history))
    .reduce((a, b) => a + b);

  // call the callback with the current directory name and size
  history(dirSize);

  // our recursive base case - returns the summed size of the directory
  return dirSize;
};

const runner = async () => {
  // batter up
  const fileContent = getFileContent(7);

  const chunks = fileContent.split("\n");

  // root
  let tree: node = {
    name: "/",
    isDir: true,
    children: [],
    parent: this,
  };

  let currentNode = tree;
  // start it empty
  let currentCommand = undefined;

  for (const line of chunks) {
    if (line.startsWith("$")) {
      currentCommand = line.startsWith("$ cd") ? "cd" : "ls";

      if (currentCommand === "cd") {
        const movingTo = line.split("$ cd ")[1];

        switch (movingTo) {
          case "/":
            currentNode = tree;
            break;
          case "..":
            currentNode = currentNode.parent || currentNode;
            break;
          default:
            currentNode =
              currentNode.children.find(
                (kid) => kid.isDir && kid.name === movingTo
              ) || currentNode;
        }
      }
    } else {
      if (currentCommand === "ls") {
        const [sizeOrDir, name] = line.split(" ");

        if (!Number.isNaN(parseInt(sizeOrDir))) {
          const newNode: node = {
            name,
            size: parseInt(sizeOrDir),
            isDir: false,
            children: [],
            parent: currentNode,
          };
          currentNode.children.push(newNode);
        }

        if (sizeOrDir === "dir") {
          const newNode: node = {
            name,
            isDir: true,
            children: [],
            parent: currentNode,
          };
          currentNode.children.push(newNode);
        }
      }
    }
  }

  // create the tree

  let runningCount = 0;

  getFileSizes(tree, (size) => {
    // max allowed size
    if (size <= 100000) {
      runningCount += size;
    }
  });

  console.log(runningCount);
};

runner();
