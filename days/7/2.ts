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
const getFileSizes = (
  node: node,
  history = (name: string, size: number) => {}
): number => {
  // if it is a file - return this size immeditaely back to the parent
  if (!node.isDir) {
    return node.size || 0;
  }

  // if it's a directory - iterate through it's children, get the file sizes, and then sum them together
  const dirSize = node.children
    .map((kid) => getFileSizes(kid, history))
    .reduce((a, b) => a + b);

  // call the callback with the current directory name and size
  history(node.name, dirSize);

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

  const totalSize = 70000000;
  const neededSize = 30000000;

  // the amount of space used by current files
  const usedSpace = getFileSizes(tree);

  // the amount of space free on the drive
  const availableSpace = totalSize - usedSpace;

  // file needs to be atleast this large
  const minimumFolderSize = neededSize - availableSpace;

  let potentials = new Array<{ name: string; size: number }>();

  getFileSizes(tree, (name, size) => {
    if (size >= minimumFolderSize) {
      potentials.push({
        name,
        size,
      });
    }
  });

  // find the values closest to the minimumFolderSize
  potentials.sort((a, b) => a.size - b.size);

  console.log(potentials[0].size);
};

runner();
