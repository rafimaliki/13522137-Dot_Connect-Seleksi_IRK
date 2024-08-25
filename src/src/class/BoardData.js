import Adjacent from "./Adjacent";
import BoardCellData from "./BoardCellData";

class BoardData {
  constructor(board, processedBoard) {
    if (board) {
      this.rows = board.length;
      this.cols = board[0].length;
      this.cells = [];
      this.startIndex = [];
      this.init(board);
    } else {
      this.rows = processedBoard.cells.length;
      this.cols = processedBoard.cells[0].length;
      this.cells = processedBoard.cells;
      this.startIndex = processedBoard.startIndex;
    }
  }

  init(board) {
    for (let row = 0; row < this.rows; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.cols; col++) {
        let type = "normal";

        if (board[row][col] === 1) {
          type = "blocked";
        } else if (board[row][col] > 1) {
          type = "start";
          this.startIndex = [row, col];
        }

        this.cells[row][col] = new BoardCellData(
          row,
          col,
          board[row][col],
          new Adjacent(false, false, false, false),
          type,
          0
        );
      }
    }
  }

  setCell(row, col, shape, color, adjacent) {
    this.cells[row][col] = new BoardCellData(row, col, shape, color, adjacent);
  }

  getCell(row, col) {
    return this.cells[row][col];
  }

  connectCell(row, col, prevIndex) {
    const prevCell = this.cells[prevIndex[0]][prevIndex[1]];
    const newCell = this.cells[row][col];
    const success = prevCell.connect(newCell);

    if (!success) {
      // console.log("Invalid connection");
      return false;
    } else {
      // console.log("Success");
      return new BoardData(null, {
        cells: this.cells,
        startIndex: this.startIndex,
      });
    }
  }

  clearConnections() {
    const newCells = this.cells.map((row) =>
      row.map((cell) => {
        let color = cell.color;
        if (cell.type === "normal") {
          color = 0;
        }
        return new BoardCellData(
          cell.row,
          cell.col,
          color,
          new Adjacent(false, false, false, false),
          cell.type,
          0
        );
      })
    );

    return new BoardData(null, {
      cells: newCells,
      startIndex: this.startIndex,
    });
  }
}

export default BoardData;
