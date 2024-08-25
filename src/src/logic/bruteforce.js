import {
  copyArray,
  countEmptyCells,
  getStartingCell,
  getNextCells,
} from "./utils";

let count = 0;

const recursiveSearch = (board, row, col, emptyCells, path) => {
  count++;
  console.log(emptyCells, count, row, col);
  const boardCopy = copyArray(board);
  boardCopy[row][col] = 2;
  const nextCells = getNextCells(row, col, boardCopy);

  if (emptyCells === 0) {
    console.log("Solved!");
    return path;
  }

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

const bruteForce = (board) => {
  count = 0;
  console.log("Solving with brute force");

  const emptyCells = countEmptyCells(board);
  const startingCell = getStartingCell(board);

  if (startingCell[0] === -1) {
    console.log("No starting cell found.");
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

export default bruteForce;
