class CreateBoard {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [];

    this.create();
  }

  create() {
    for (let i = 0; i < this.row; i++) {
      const newRow = [];
      for (let j = 0; j < this.col; j++) {
        newRow.push(0);
      }
      this.board.push(newRow);
    }

    this.board[0][0] = 2;
  }

  randomize(block) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.board[i][j] = 0;
      }
    }

    block = Math.floor(Math.random() * block) + 1;

    let blocksPlaced = 0;
    while (blocksPlaced < block) {
      const randomRow = Math.floor(Math.random() * this.row);
      const randomCol = Math.floor(Math.random() * this.col);
      if (this.board[randomRow][randomCol] === 0) {
        this.board[randomRow][randomCol] = 1;
        blocksPlaced++;
      }
    }

    let placedTwo = false;
    while (!placedTwo) {
      const randomRow = Math.floor(Math.random() * this.row);
      const randomCol = Math.floor(Math.random() * this.col);
      if (this.board[randomRow][randomCol] === 0) {
        this.board[randomRow][randomCol] = 2;
        placedTwo = true;
      }
    }
  }

  printBoard() {
    this.board.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

export default CreateBoard;
