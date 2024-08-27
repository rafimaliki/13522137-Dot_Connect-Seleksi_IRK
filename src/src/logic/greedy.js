import {
  copyArray,
  countEmptyCells,
  getStartingCell,
  getNextCellsG,
  isValidBoard,
} from "./utils";

let count = 0;
let prune = 0;

const recursiveSearch = (board, row, col, emptyCells, path) => {
  count++;
  if (emptyCells === 0) {
    console.log("recursion: ", count);
    return path;
  }

  // console.log(count++);

  const boardCopy = copyArray(board);
  boardCopy[row][col] = 2;

  const nextCells = getNextCellsG(row, col, boardCopy);

  if (emptyCells > 0 && nextCells.length === 0) {
    return null;
  }

  for (let cell of nextCells) {
    const [nextRow, nextCol] = cell;

    const pathCopy = copyArray(path);
    pathCopy.push([nextRow, nextCol]);

    const result = recursiveSearch(
      boardCopy,
      nextRow,
      nextCol,
      emptyCells - 1,
      pathCopy
    );

    if (result) {
      return result;
    }
  }

  return null;
};

const greedy = (board) => {
  count = 0;
  prune = 0;
  console.log("Solving with greedy");

  const emptyCells = countEmptyCells(board);
  const startingCell = getStartingCell(board);

  if (!isValidBoard(board, startingCell[0], startingCell[1])) {
    console.log("Invalid board");
    return null;
  }

  const path = [startingCell];

  const resultPath = recursiveSearch(
    board,
    startingCell[0],
    startingCell[1],
    emptyCells,
    path
  );

  return resultPath;
};

export default greedy;
