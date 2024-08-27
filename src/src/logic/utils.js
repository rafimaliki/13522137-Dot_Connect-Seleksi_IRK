const copyArray = (arr) => (Array.isArray(arr) ? arr.map(copyArray) : arr);

const sortNextCellsG = (nextCells, board) => {
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

const getAdjacentEmptyCount = (row, col, board) => {
  let count = 0;
  const directions = [
    [-1, 0], // above
    [0, 1], // right
    [1, 0], // below
    [0, -1], // left
  ];

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;
    if (
      r >= 0 &&
      r < board.length &&
      c >= 0 &&
      c < board[0].length &&
      board[r][c] === 0
    ) {
      count++;
    }
  }

  return count;
};

const sortNextCells = (nextCells, board) => {
  return nextCells.sort((a, b) => {
    const adjEmptyA = getAdjacentEmptyCount(a[0], a[1], board);
    const adjEmptyB = getAdjacentEmptyCount(b[0], b[1], board);

    // Prioritize forced cells (cells with exactly 1 adjacent empty cell)
    if (adjEmptyA !== adjEmptyB) {
      return adjEmptyA - adjEmptyB; // Lower count means higher priority (forced cells)
    }

    // If both are forced or neither is, sort by distance to border
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

const getNextCellsBF = (row, col, board) => {
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

  return nextCells;
};

const getNextCellsG = (row, col, board) => {
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

  nextCells = sortNextCellsG(nextCells, board);

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

const isValidBoard = (board, prevRow, prevCol) => {
  var countForcedCell = 0;
  const emptyCells = countEmptyCells(board);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        const nextCells = getNextCells(row, col, board);

        if (
          (prevRow === row - 1 && prevCol === col) ||
          (prevRow === row + 1 && prevCol === col) ||
          (prevRow === row && prevCol === col - 1) ||
          (prevRow === row && prevCol === col + 1)
        ) {
          nextCells.push([prevRow, prevCol]);
        }
        const countNextCells = nextCells.length;
        if (countNextCells === 1) {
          countForcedCell++;
        } else if (countNextCells === 0 && emptyCells > 1) {
          return false;
        }
      }
    }
  }
  // console.log(countForcedCell);

  return countForcedCell <= 1;
};

export {
  copyArray,
  getNextCells,
  countEmptyCells,
  getStartingCell,
  isValidBoard,
  getNextCellsBF,
  getNextCellsG,
};
