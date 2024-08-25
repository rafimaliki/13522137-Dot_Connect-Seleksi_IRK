import Adjacent from "./Adjacent";

class BoardCellData {
  constructor(row, col, color, adjacent, type, connections) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.adjacent = adjacent;
    this.type = type;
    this.connections = connections;
  }

  connect(other) {
    // console.log("Connecting");
    if (
      (this.isAdjacentTo(other.row, other.col) && other.color === 0) ||
      other.color === this.color
    ) {
      if (this.isValidPrevCell() && other.isValidNewCell()) {
        this.connections++;
        other.connections++;
        this.adjacent = new Adjacent(
          this.row - other.row === 1 || this.adjacent.top,
          this.col - other.col === -1 || this.adjacent.right,
          this.row - other.row === -1 || this.adjacent.bottom,
          this.col - other.col === 1 || this.adjacent.left
        );
        other.adjacent = new Adjacent(
          other.row - this.row === 1,
          other.col - this.col === -1,
          other.row - this.row === -1,
          other.col - this.col === 1
        );
        other.color = this.color;
        return true;
      }
    }
    return false;
  }

  isValidPrevCell() {
    if (this.type === "start" && this.connections === 0) {
      return true;
    }
    if (this.type === "normal" && this.connections === 1) {
      return true;
    }
    return false;
  }

  isValidNewCell() {
    if (
      (this.type === "normal" && this.connections === 0) ||
      (this.type === "start" && this.connections === 0)
    ) {
      return true;
    }
    return false;
  }

  isAdjacentTo(row, col) {
    if (this.row === row && this.col === col) {
      return false;
    }
    if (this.row === row && Math.abs(this.col - col) === 1) {
      return true;
    }
    if (this.col === col && Math.abs(this.row - row) === 1) {
      return true;
    }
    return false;
  }

  isEqual(other) {
    if (this.connection === other.connection) {
      return true;
    }
    return false;
  }
}
export default BoardCellData;
