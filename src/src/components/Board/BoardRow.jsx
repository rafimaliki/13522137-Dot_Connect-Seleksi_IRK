import BoardCell from "./BoardCell";
import Adjacent from "../../class/Adjacent";
import BoardCellData from "../../class/BoardCellData";

const BoardRow = ({
  row,
  board,
  setBoard,
  dragging,
  setDragging,
  prevIndex,
  setPrevIndex,
  emptyCells,
  setEmptyCells,
}) => {
  return (
    <div className="flex">
      {row.map((cell, index) => (
        <BoardCell
          key={index}
          data={cell}
          board={board}
          setBoard={setBoard}
          dragging={dragging}
          setDragging={setDragging}
          prevIndex={prevIndex}
          setPrevIndex={setPrevIndex}
          emptyCells={emptyCells}
          setEmptyCells={setEmptyCells}
        />
      ))}
    </div>
  );
};

export default BoardRow;
