const copyArray = (arr) => (Array.isArray(arr) ? arr.map(copyArray) : arr);

const sortNextCells = (nextCells, board) => {
  return nextCells.sort((a, b) => {
    const distanceA = Math.min(
      a[0],
      a[1],
      board.length - a[0] - 1,
      board[0].length - a[1] - 1
    );
    const distanceB = Math.min(
      b[0],
      b[1],
      board.length - b[0] - 1,
      board[0].length - b[1] - 1
    );
    return distanceA - distanceB;
  });
};

const getNextCells = (row, col, board) => {
  let nextCells = [];

  // Check above
  if (board[row - 1]?.[col] === 0) {
    nextCells.push([row - 1, col]);
  }

  // Check right
  if (col + 1 < board[row].length && board[row][col + 1] === 0) {
    nextCells.push([row, col + 1]);
  }

  // Check below
  if (board[row + 1]?.[col] === 0) {
    nextCells.push([row + 1, col]);
  }

  // Check left
  if (col - 1 >= 0 && board[row][col - 1] === 0) {
    nextCells.push([row, col - 1]);
  }

  nextCells = sortNextCells(nextCells, board);

  return nextCells;
};

const countEmptyCells = (board) => {
  let count = 0;
  for (let row of board) {
    for (let cell of row) {
      if (cell === 0) {
        count++;
      }
    }
  }
  return count;
};

const getStartingCell = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 2) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
};

export { copyArray, getNextCells, countEmptyCells, getStartingCell };
