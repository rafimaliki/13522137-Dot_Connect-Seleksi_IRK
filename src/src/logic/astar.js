import {
  copyArray,
  countEmptyCells,
  getStartingCell,
  getNextCells,
  isValidBoard,
} from "./utils";

function astar(grid) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let rows = grid.length;
  let cols = grid[0].length;
  let start = null;

  // Find the start position
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        start = [i, j];
        break;
      }
    }
  }

  function isValid(x, y, state) {
    return (
      x >= 0 &&
      x < rows &&
      y >= 0 &&
      y < cols &&
      state[x][y] !== 1 &&
      state[x][y] !== 2
    );
  }

  // Improved heuristic: sum of Manhattan distances to all unvisited empty cells
  function heuristic(path, state) {
    const [cx, cy] = path[path.length - 1];
    let distanceSum = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (state[i][j] === 0) {
          // Only consider unvisited empty cells
          distanceSum += Math.abs(cx - i) + Math.abs(cy - j);
        }
      }
    }

    return distanceSum;
  }

  let queue = [];

  // Initialize the starting board state
  let initialState = grid.map((row) => row.slice());
  initialState[start[0]][start[1]] = 2;
  queue.push({ path: [start], state: initialState });

  let longestPath = [];
  let count = 0;

  while (queue.length > 0) {
    console.log(count++);

    // Sort the queue based on the modified heuristic
    queue.sort(
      (a, b) => heuristic(b.path, b.state) - heuristic(a.path, a.state)
    );
    let current = queue.pop();
    let [cx, cy] = current.path[current.path.length - 1];

    if (!isValidBoard(current.state, cx, cy)) {
      console.log("pruned");
      continue;
    }

    if (current.path.length > longestPath.length) {
      longestPath = current.path;
    }

    for (let [dx, dy] of directions) {
      let nx = cx + dx;
      let ny = cy + dy;

      // Copy the current state for the next step
      let newState = current.state.map((row) => row.slice());

      if (isValid(nx, ny, newState)) {
        // Mark the new cell as visited
        newState[nx][ny] = 2;
        queue.push({ path: [...current.path, [nx, ny]], state: newState });
      }
    }
  }

  return longestPath;
}

export default astar;
