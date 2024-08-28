import {
  copyArray,
  countEmptyCells,
  getStartingCell,
  getNextCellsBF,
  isValidBoard,
} from "./utils";

const heuristic = (path, state, score, rows, cols) => {
  const [row, col] = path[path.length - 1];

  const distanceToBorder = Math.min(row, col, rows - 1 - row, cols - 1 - col);

  const pathLength = path.length;

  return distanceToBorder + pathLength + score * 3;
  return score * 3;
};

const findStartPosition = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        return [i, j];
      }
    }
  }
  return null;
};

const astar = (grid) => {
  console.log("Solving with astar");

  const rows = grid.length;
  const cols = grid[0].length;
  const start = findStartPosition(grid);

  const emptyCells = countEmptyCells(grid) + 1;

  let queue = [];

  const initialState = grid.map((row) => row.slice());
  initialState[start[0]][start[1]] = 2;
  queue.push({ path: [start], state: initialState, score: 0 });

  let longestPath = [];
  let count = 0;

  while (queue.length > 0) {
    count++;
    // console.log(count, queue.length);

    queue.sort(
      (a, b) =>
        heuristic(b.path, b.state, b.score, rows, cols) -
        heuristic(a.path, a.state, a.score, rows, cols)
    );
    const current = queue.pop();
    const [row, col] = current.path[current.path.length - 1];

    if (current.path.length === emptyCells) {
      console.log("loop:", count);
      return current.path;
    }

    const directions = getNextCellsBF(row, col, current.state);

    directions.forEach(([nextRow, nextCol], i) => {
      const newState = copyArray(current.state);
      newState[nextRow][nextCol] = 2;

      if (isValidBoard(newState, nextRow, nextCol)) {
        queue.push({
          path: [...current.path, [nextRow, nextCol]],
          state: newState,
          score: (current.score - i) * 3,
        });
      }
    });
  }

  return longestPath.length === 0 ? null : longestPath;
};

export default astar;
