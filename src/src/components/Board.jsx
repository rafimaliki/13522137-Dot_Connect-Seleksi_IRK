import React, { useState, useEffect } from "react";

import BoardRow from "./BoardRow";
import Button from "./Button";
import SolveButton from "./SolveButton";

const Board = ({ boardData, board, setBoard }) => {
  const [dragging, setDragging] = useState(false);
  const [prevIndex, setPrevIndex] = useState(board.startIndex);
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const clearBoard = () => {
    if (isSolving) return;
    const newBoard = board.clearConnections();

    setBoard(newBoard);
    setPrevIndex(newBoard.startIndex);
    setIsSolved(false);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false);
    };
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className="bg-white box-shadow-lg rounded-lg">
        {board.cells.map((row, index) => (
          <BoardRow
            key={index}
            row={row}
            board={board}
            setBoard={setBoard}
            dragging={dragging}
            setDragging={setDragging}
            prevIndex={prevIndex}
            setPrevIndex={setPrevIndex}
          />
        ))}
      </div>
      <Button color="red" onclick={clearBoard} title="Clear" />
      <SolveButton
        boardData={boardData}
        board={board}
        setBoard={setBoard}
        isSolving={isSolving}
        setIsSolving={setIsSolving}
        isSolved={isSolved}
        setIsSolved={setIsSolved}
        setPrevIndex={setPrevIndex}
      />
    </>
  );
};

export default Board;
